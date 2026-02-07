'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FileText, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    subdomain: '',
  })
  const [subdomainStatus, setSubdomainStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Check subdomain availability
  const checkSubdomain = async (subdomain: string) => {
    if (subdomain.length < 3) {
      setSubdomainStatus('idle')
      return
    }

    setSubdomainStatus('checking')
    try {
      const res = await fetch('/api/check-subdomain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subdomain }),
      })
      const data = await res.json()
      setSubdomainStatus(data.available ? 'available' : 'taken')
      if (!data.available) {
        setErrors(prev => ({ ...prev, subdomain: data.message }))
      } else {
        setErrors(prev => ({ ...prev, subdomain: '' }))
      }
    } catch (error) {
      setSubdomainStatus('idle')
    }
  }

  const handleSubdomainChange = (value: string) => {
    const formatted = value.toLowerCase().replace(/[^a-z0-9-]/g, '')
    setFormData(prev => ({ ...prev, subdomain: formatted }))
    
    if (formatted.length >= 3) {
      const timeoutId = setTimeout(() => checkSubdomain(formatted), 500)
      return () => clearTimeout(timeoutId)
    }
  }

  const handleGoogleSignup = async () => {
    setErrors({})

    // Validate company name and subdomain
    if (!formData.companyName || formData.companyName.length < 2) {
      setErrors({ companyName: 'Company name must be at least 2 characters' })
      return
    }

    if (!formData.subdomain || formData.subdomain.length < 3) {
      setErrors({ subdomain: 'Subdomain must be at least 3 characters' })
      return
    }

    if (subdomainStatus === 'taken') {
      setErrors({ subdomain: 'This subdomain is already taken' })
      return
    }

    setIsSubmitting(true)

    try {
      // Store signup data in sessionStorage (will survive OAuth redirect)
      sessionStorage.setItem('signup_data', JSON.stringify({
        companyName: formData.companyName,
        subdomain: formData.subdomain,
        action: 'signup',
        timestamp: Date.now(),
      }))

      // Redirect to Google OAuth
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) {
        console.error('OAuth error:', error)
        setErrors({ general: 'Failed to start Google sign-in' })
        setIsSubmitting(false)
        return
      }

      // User will be redirected to Google
    } catch (error) {
      console.error('Signup error:', error)
      setErrors({ general: 'An unexpected error occurred' })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <nav className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">BaselineDocs</span>
          </Link>
        </nav>
      </header>

      {/* Signup Form */}
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-3xl font-bold mb-2">Start your free trial</h1>
          <p className="text-gray-600 mb-8">
            14 days free • No credit card required • Cancel anytime
          </p>

          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
              {errors.general}
            </div>
          )}

          <div className="space-y-6">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Company Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg ${errors.companyName ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Acme Corporation"
                required
              />
              {errors.companyName && <p className="text-red-600 text-sm mt-1">{errors.companyName}</p>}
            </div>

            {/* Subdomain */}
            <div>
              <label className="block text-sm font-medium mb-2">Choose your subdomain</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.subdomain}
                  onChange={(e) => handleSubdomainChange(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg pr-12 ${
                    errors.subdomain ? 'border-red-500' : 
                    subdomainStatus === 'available' ? 'border-green-500' :
                    'border-gray-300'
                  }`}
                  placeholder="acme"
                  required
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {subdomainStatus === 'checking' && <Loader2 className="h-5 w-5 animate-spin text-gray-400" />}
                  {subdomainStatus === 'available' && <CheckCircle className="h-5 w-5 text-green-600" />}
                  {subdomainStatus === 'taken' && <XCircle className="h-5 w-5 text-red-600" />}
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Your app will be available at: <span className="font-mono">{formData.subdomain || 'your-subdomain'}.baselinedocs.com</span>
              </p>
              {errors.subdomain && <p className="text-red-600 text-sm mt-1">{errors.subdomain}</p>}
            </div>

            {/* Google Sign Up Button */}
            <button
              onClick={handleGoogleSignup}
              disabled={isSubmitting || subdomainStatus === 'taken' || subdomainStatus === 'checking' || !formData.companyName || !formData.subdomain}
              className="w-full py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Connecting to Google...
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </>
              )}
            </button>

            <p className="text-sm text-gray-600 text-center">
              By signing up, you agree to our{' '}
              <Link href="/legal/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/legal/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
            </p>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Why Google?</span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                <strong>Secure & Simple:</strong> Sign in with Google keeps your account secure and makes logging in effortless. 
                No passwords to remember, and you'll be logged in automatically across devices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
