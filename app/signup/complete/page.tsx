'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function SignupCompletePage() {
  const router = useRouter()
  const [status, setStatus] = useState('Processing your signup...')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    completeSignup()
  }, [])

  const completeSignup = async () => {
    try {
      console.log('[SignupComplete] Starting signup completion')
      
      // Get signup data from localStorage (persists across tabs/email confirmation links)
      const signupDataStr = localStorage.getItem('signup_data')
      if (!signupDataStr) {
        throw new Error('Signup data not found. Please start the signup process again.')
      }

      const signupData = JSON.parse(signupDataStr)
      console.log('[SignupComplete] Signup data:', signupData)

      // Import Supabase client
      const { createClient } = await import('@supabase/supabase-js')
      
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error('Supabase configuration missing')
      }

      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      )

      // Get the session from Supabase (should be automatically set after OAuth redirect)
      setStatus('Verifying your account...')
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        console.error('[SignupComplete] Session error:', sessionError)
        throw new Error(`Failed to get session: ${sessionError.message}`)
      }

      if (!session) {
        console.error('[SignupComplete] No session found')
        throw new Error('Authentication failed. Please try signing up again.')
      }

      console.log('[SignupComplete] Session obtained:', {
        userId: session.user.id,
        email: session.user.email,
      })

      // Now call our complete-signup API with user info + signup data
      setStatus('Creating your workspace...')
      
      const completeData = {
        userId: session.user.id,
        email: session.user.email!,
        fullName: session.user.user_metadata?.full_name || session.user.email!.split('@')[0],
        companyName: signupData.companyName,
        subdomain: signupData.subdomain,
      }

      console.log('[SignupComplete] Calling complete-signup API:', completeData)

      const response = await fetch('/api/complete-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeData),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error('[SignupComplete] Complete-signup error:', result)
        throw new Error(result.error || 'Failed to complete signup')
      }

      console.log('[SignupComplete] Signup completed successfully:', result)

      // Clear signup data
      localStorage.removeItem('signup_data')
      localStorage.removeItem('signup_email')

      // Redirect to success page
      setStatus('Success! Redirecting to your workspace...')
      setTimeout(() => {
        window.location.href = `https://${signupData.subdomain}.baselinedocs.com`
      }, 2000)

    } catch (err) {
      console.error('[SignupComplete] Error:', err)
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Signup Failed
            </h2>
            <p className="text-sm text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => router.push('/signup')}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 text-blue-600 animate-spin mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Setting up your account
          </h2>
          <p className="text-sm text-gray-600">{status}</p>
        </div>
      </div>
    </div>
  )
}
