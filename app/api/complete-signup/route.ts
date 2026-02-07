import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { stripe } from '@/lib/stripe'
import { isReservedSubdomain } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, email, fullName, companyName, subdomain } = body

    // Validate required fields
    if (!userId || !email || !companyName || !subdomain) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate subdomain
    if (isReservedSubdomain(subdomain)) {
      return NextResponse.json(
        { error: 'Subdomain is reserved' },
        { status: 400 }
      )
    }

    // Check if subdomain exists
    const { data: existingTenant } = await supabaseAdmin
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

    // Check if user already has a tenant
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id, tenant_id')
      .eq('id', userId)
      .single()

    if (existingUser && existingUser.tenant_id) {
      return NextResponse.json(
        { error: 'User already has an account' },
        { status: 400 }
      )
    }

    // Create tenant
    const { data: tenant, error: tenantError } = await supabaseAdmin
      .from('tenants')
      .insert({
        company_name: companyName,
        subdomain: subdomain,
        billing_email: email,
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
    let stripeCustomer
    try {
      stripeCustomer = await stripe.customers.create({
        email: email,
        name: companyName,
        metadata: {
          tenant_id: tenant.id,
          subdomain: subdomain,
        },
      })

      // Update tenant with Stripe customer ID
      await supabaseAdmin
        .from('tenants')
        .update({ stripe_customer_id: stripeCustomer.id })
        .eq('id', tenant.id)
    } catch (stripeError) {
      console.error('Stripe customer creation error:', stripeError)
      // Continue anyway - can be fixed manually
    }

    // Create or update user record
    if (existingUser) {
      // Update existing user with tenant_id
      const { error: updateError } = await supabaseAdmin
        .from('users')
        .update({
          tenant_id: tenant.id,
          full_name: fullName,
          is_admin: true,
        })
        .eq('id', userId)

      if (updateError) {
        console.error('User update error:', updateError)
      }
    } else {
      // Create new user record
      const { error: userError } = await supabaseAdmin
        .from('users')
        .insert({
          id: userId,
          tenant_id: tenant.id,
          email: email,
          full_name: fullName,
          is_admin: true,
        })

      if (userError) {
        console.error('User record creation error:', userError)
        // Continue - user can still log in
      }
    }

    // Create trial billing record
    const trialEndsAt = new Date()
    trialEndsAt.setDate(trialEndsAt.getDate() + 14) // 14-day trial

    await supabaseAdmin
      .from('tenant_billing')
      .insert({
        tenant_id: tenant.id,
        stripe_customer_id: stripeCustomer?.id || null,
        plan: 'trial',
        status: 'trialing',
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
