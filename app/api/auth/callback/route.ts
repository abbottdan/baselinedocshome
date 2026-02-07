import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { stripe } from '@/lib/stripe'
import { isReservedSubdomain } from '@/lib/utils'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  if (!code) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/signup?error=no_code`)
  }

  try {
    // Parse state to get signup data
    const stateData = state ? JSON.parse(decodeURIComponent(state)) : null
    
    if (!stateData || stateData.action !== 'signup') {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/signup?error=invalid_state`)
    }

    const { subdomain, companyName } = stateData

    // Exchange code for session
    const { data: { session }, error: authError } = await supabaseAdmin.auth.exchangeCodeForSession(code)

    if (authError || !session) {
      console.error('OAuth exchange error:', authError)
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/signup?error=auth_failed`)
    }

    const { user } = session

    // Validate subdomain
    if (isReservedSubdomain(subdomain)) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/signup?error=subdomain_reserved`)
    }

    // Check if subdomain exists
    const { data: existingTenant } = await supabaseAdmin
      .from('tenants')
      .select('id')
      .eq('subdomain', subdomain)
      .single()

    if (existingTenant) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/signup?error=subdomain_taken`)
    }

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', user.email!)
      .single()

    if (existingUser) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/signup?error=email_exists`)
    }

    // Create tenant
    const { data: tenant, error: tenantError } = await supabaseAdmin
      .from('tenants')
      .insert({
        company_name: companyName,
        subdomain: subdomain,
        billing_email: user.email,
      })
      .select()
      .single()

    if (tenantError || !tenant) {
      console.error('Tenant creation error:', tenantError)
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/signup?error=tenant_creation_failed`)
    }

    // Create Stripe customer
    let stripeCustomer
    try {
      stripeCustomer = await stripe.customers.create({
        email: user.email!,
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

    // Create user record
    const { error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        id: user.id,
        tenant_id: tenant.id,
        email: user.email!,
        full_name: user.user_metadata?.full_name || user.email!.split('@')[0],
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

    // Redirect to success page
    const successUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/signup/success?subdomain=${subdomain}`
    return NextResponse.redirect(successUrl)

  } catch (error) {
    console.error('OAuth callback error:', error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/signup?error=unexpected`)
  }
}
