import { NextRequest, NextResponse } from 'next/server'
import { platformAdmin, productsAdmin } from '@/lib/supabase'
import { stripe } from '@/lib/stripe'
import { signupSchema } from '@/lib/validations'
import { isReservedSubdomain } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const validation = signupSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.errors },
        { status: 400 }
      )
    }

    const { companyName, subdomain, fullName, email, password } = validation.data

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

    // Check email availability in shared.users
    const { data: existingUser } = await productsAdmin
      .schema('shared')
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
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
        auth_method: 'password',
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

    // Create Stripe customer and update tenant with stripe_customer_id
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
      // Non-fatal — can be fixed manually
    }

    // Create auth user in products DB (auth lives there)
    const { data: authData, error: authError } = await productsAdmin.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true,
      user_metadata: { full_name: fullName, tenant_id: tenant.id },
    })

    if (authError || !authData.user) {
      console.error('Auth user creation error:', authError)
      // Rollback tenant
      await platformAdmin.schema('platform').from('tenants').delete().eq('id', tenant.id)
      return NextResponse.json(
        { error: 'Failed to create user account' },
        { status: 500 }
      )
    }

    // Create user record in shared.users (no is_admin — use is_master_admin: false)
    const { error: userError } = await productsAdmin
      .schema('shared')
      .from('users')
      .insert({
        id: authData.user.id,
        tenant_id: tenant.id,
        email: email,
        full_name: fullName,
        is_master_admin: false,
        is_active: true,
      })

    if (userError) {
      console.error('User record creation error:', userError)
    }

    // Write tenant_admin role to docs.user_roles
    await productsAdmin
      .schema('docs')
      .from('user_roles')
      .insert({
        user_id: authData.user.id,
        tenant_id: tenant.id,
        role: 'tenant_admin',
      })

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
      redirectUrl: `https://${subdomain}.${process.env.NEXT_PUBLIC_BASE_DOMAIN}`,
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
