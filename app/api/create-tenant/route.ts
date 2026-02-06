import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { stripe } from '@/lib/stripe'
import { signupSchema } from '@/lib/validations'
import { isReservedSubdomain } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = signupSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.errors },
        { status: 400 }
      )
    }

    const { companyName, subdomain, fullName, email, password } = validation.data

    // Double-check subdomain
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

    // Check if email exists
    const { data: existingUser } = await supabaseAdmin
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

    // Create tenant first
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

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        full_name: fullName,
        tenant_id: tenant.id,
      },
    })

    if (authError || !authData.user) {
      console.error('Auth user creation error:', authError)
      // Rollback tenant
      await supabaseAdmin.from('tenants').delete().eq('id', tenant.id)
      return NextResponse.json(
        { error: 'Failed to create user account' },
        { status: 500 }
      )
    }

    // Create user record
    const { error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        id: authData.user.id,
        tenant_id: tenant.id,
        email: email,
        full_name: fullName,
        is_admin: true, // First user is admin
      })

    if (userError) {
      console.error('User record creation error:', userError)
      // User auth exists but record failed - they can still log in
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
