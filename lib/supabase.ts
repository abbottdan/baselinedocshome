import { createClient } from '@supabase/supabase-js'

/**
 * Platform DB client — clearstride_platform
 * Used for: platform.tenants, platform.product_subscriptions
 */
export const platformAdmin = createClient(
  process.env.PLATFORM_SUPABASE_URL!,
  process.env.PLATFORM_SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

/**
 * Products DB client — clearstride_products
 * Used for: shared.users, docs.user_roles
 */
export const productsAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Legacy alias — kept for auth callback which uses .auth.exchangeCodeForSession
// Points to products DB (auth lives there)
export const supabaseAdmin = productsAdmin
