'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'

export default function VerifyEmailPage() {
  const [email, setEmail] = useState<string | null>(null)
  const [resent, setResent] = useState(false)
  const [resending, setResending] = useState(false)

  useEffect(() => {
    // Pull the email from localStorage signup_data if available
    try {
      const raw = localStorage.getItem('signup_data')
      if (raw) {
        const data = JSON.parse(raw)
        // We don't store email in signup_data, but we can try to get it
        // from a separate key set during the signUp call
        const emailKey = localStorage.getItem('signup_email')
        if (emailKey) setEmail(emailKey)
      }
    } catch {}
  }, [])

  const handleResend = async () => {
    const storedEmail = localStorage.getItem('signup_email')
    if (!storedEmail) return

    setResending(true)
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      await supabase.auth.resend({
        type: 'signup',
        email: storedEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/signup/complete`,
        },
      })
      setResent(true)
    } catch (err) {
      console.error('Resend error:', err)
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Logo className="h-8 w-8" />
              <span className="text-xl font-bold text-gray-900">Baseline Docs</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-10 text-center">
          {/* Email icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
            <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-3">Check your email</h1>

          <p className="text-gray-600 mb-2">
            We sent a confirmation link to
          </p>
          {email && (
            <p className="font-semibold text-gray-900 mb-4">{email}</p>
          )}
          <p className="text-gray-600 mb-8">
            Click the link in the email to confirm your address and finish setting up your workspace.
          </p>

          {/* Resend */}
          <div className="border-t border-gray-100 pt-6">
            {resent ? (
              <p className="text-sm text-green-600 font-medium">✓ Confirmation email resent</p>
            ) : (
              <p className="text-sm text-gray-500">
                Didn't get it?{' '}
                <button
                  onClick={handleResend}
                  disabled={resending}
                  className="text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
                >
                  {resending ? 'Resending...' : 'Resend confirmation email'}
                </button>
              </p>
            )}
          </div>

          <p className="mt-4 text-xs text-gray-400">
            Wrong email?{' '}
            <Link href="/signup" className="text-blue-600 hover:text-blue-700">
              Start over
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
