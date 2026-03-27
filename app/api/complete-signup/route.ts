import { NextRequest, NextResponse } from 'next/server'
import { platformAdmin, productsAdmin } from '@/lib/supabase'
import { stripe } from '@/lib/stripe'
import { isReservedSubdomain } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, email, fullName, companyName, subdomain, authMethod } = body

    if (!userId || !email || !companyName || !subdomain) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (isReservedSubdomain(subdomain)) {
      return NextResponse.json(
        { error: 'Subdomain is reserved' },
        { status: 400 }
      )
    }

    // Check subdomain availability in platform.tenants
    const { data: existingTenant } = await platformAdmin
      .schema('platform')
      .from('tenants')
      .select('id')
      .eq('subdomain', subdomain)
      .single()

    if (existingTenant) {
      return NextResponse.json(
        { error: 'Subdomain already taken' },
        { status: 400 }
      )
    }

    // Check if user already has a tenant in shared.users
    const { data: existingUser } = await productsAdmin
      .schema('shared')
      .from('users')
      .select('id, tenant_id')
      .eq('id', userId)
      .single()

    if (existingUser?.tenant_id) {
      return NextResponse.json(
        { error: 'User already has an account' },
        { status: 400 }
      )
    }

    // Create tenant in platform.tenants
    const { data: tenant, error: tenantError } = await platformAdmin
      .schema('platform')
      .from('tenants')
      .insert({
        company_name: companyName,
        subdomain: subdomain,
        auth_method: ['google', 'microsoft'].includes(authMethod) ? authMethod : 'email',
        is_active: true,
      })
      .select()
      .single()

    if (tenantError || !tenant) {
      console.error('Tenant creation error:', tenantError)
      return NextResponse.json(
        { error: 'Failed to create tenant' },
        { status: 500 }
      )
    }

    // Create Stripe customer
    let stripeCustomerId: string | null = null
    try {
      const stripeCustomer = await stripe.customers.create({
        email: email,
        name: companyName,
        metadata: { tenant_id: tenant.id, subdomain },
      })
      stripeCustomerId = stripeCustomer.id

      await platformAdmin
        .schema('platform')
        .from('tenants')
        .update({ stripe_customer_id: stripeCustomerId })
        .eq('id', tenant.id)
    } catch (stripeError) {
      console.error('Stripe customer creation error:', stripeError)
    }

    // Create or update shared.users record
    if (existingUser) {
      // User row exists (created by auth trigger) — update with tenant + name
      await productsAdmin
        .schema('shared')
        .from('users')
        .update({
          tenant_id: tenant.id,
          full_name: fullName,
          is_master_admin: false,
          is_active: true,
        })
        .eq('id', userId)
    } else {
      // No user row yet — insert
      const { error: userError } = await productsAdmin
        .schema('shared')
        .from('users')
        .insert({
          id: userId,
          tenant_id: tenant.id,
          email: email,
          full_name: fullName,
          is_master_admin: false,
          is_active: true,
        })

      if (userError) {
        console.error('User record creation error:', userError)
      }
    }

    // Write tenant_admin role to docs.user_roles
    await productsAdmin
      .schema('docs')
      .from('user_roles')
      .upsert({
        user_id: userId,
        tenant_id: tenant.id,
        role: 'tenant_admin',
      }, { onConflict: 'user_id,tenant_id' })

    // Create trial subscription in platform.product_subscriptions
    const trialEndsAt = new Date()
    trialEndsAt.setDate(trialEndsAt.getDate() + 30) // 30-day trial

    await platformAdmin
      .schema('platform')
      .from('product_subscriptions')
      .insert({
        tenant_id: tenant.id,
        product: 'baselinedocs',
        plan: 'trial',
        status: 'trialing',
        stripe_customer_id: stripeCustomerId,
        user_limit: 2,
        trial_ends_at: trialEndsAt.toISOString(),
        current_period_start: new Date().toISOString(),
        current_period_end: trialEndsAt.toISOString(),
      })

    // TODO: Send welcome email via Resend

    return NextResponse.json({
      success: true,
      subdomain: subdomain,
      tenantId: tenant.id,
    })

  } catch (error) {
    console.error('Complete signup error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
