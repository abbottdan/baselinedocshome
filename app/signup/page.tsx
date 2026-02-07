'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FileText, CheckCircle, XCircle, Loader2 } from 'lucide-react'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    subdomain: '',
  })
  const [subdomainStatus, setSubdomainStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string[]>([])

  // Debug logging
  const addDebug = (message: string) => {
    console.log('[DEBUG]', message)
    setDebugInfo(prev => [...prev, `${new Date().toISOString()}: ${message}`])
  }

  useEffect(() => {
    addDebug('Component mounted')
    addDebug(`NEXT_PUBLIC_SUPABASE_URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET'}`)
    addDebug(`NEXT_PUBLIC_SUPABASE_ANON_KEY: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET (length: ' + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length + ')' : 'NOT SET'}`)
    addDebug(`NEXT_PUBLIC_SITE_URL: ${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}`)
  }, [])

  // Check subdomain availability
  const checkSubdomain = async (subdomain: string) => {
    if (subdomain.length < 3) {
      setSubdomainStatus('idle')
      return
    }

    addDebug(`Checking subdomain: ${subdomain}`)
    setSubdomainStatus('checking')
    
    try {
      const res = await fetch('/api/check-subdomain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subdomain }),
      })
      const data = await res.json()
      addDebug(`Subdomain check result: ${JSON.stringify(data)}`)
      
      setSubdomainStatus(data.available ? 'available' : 'taken')
      if (!data.available) {
        setErrors(prev => ({ ...prev, subdomain: data.message }))
      } else {
        setErrors(prev => ({ ...prev, subdomain: '' }))
      }
    } catch (error) {
      addDebug(`Subdomain check error: ${error}`)
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
    addDebug('Google signup clicked')
    setErrors({})

    // Validate
    if (!formData.companyName || formData.companyName.length < 2) {
      addDebug('Validation failed: company name too short')
      setErrors({ companyName: 'Company name must be at least 2 characters' })
      return
    }

    if (!formData.subdomain || formData.subdomain.length < 3) {
      addDebug('Validation failed: subdomain too short')
      setErrors({ subdomain: 'Subdomain must be at least 3 characters' })
      return
    }

    if (subdomainStatus === 'taken') {
      addDebug('Validation failed: subdomain taken')
      setErrors({ subdomain: 'This subdomain is already taken' })
      return
    }

    setIsSubmitting(true)
    addDebug('Starting OAuth flow')

    try {
      // Check if Supabase is initialized
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        throw new Error('Supabase URL not configured')
      }
      
      if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error('Supabase anon key not configured')
      }

      // Store signup data in sessionStorage
      const signupData = {
        companyName: formData.companyName,
        subdomain: formData.subdomain,
        action: 'signup',
        timestamp: Date.now(),
      }
      
      addDebug(`Storing signup data: ${JSON.stringify(signupData)}`)
      sessionStorage.setItem('signup_data', JSON.stringify(signupData))
      
      // Import Supabase dynamically
      addDebug('Importing Supabase client')
      const { createClient } = await import('@supabase/supabase-js')
      
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      )
      
      addDebug('Supabase client created')
      
      // CRITICAL FIX: redirectTo should point to where user lands AFTER OAuth completes
      // Supabase will handle the OAuth callback automatically at /auth/v1/callback
      // Then redirect user here with session in URL hash
      const redirectUrl = `${window.location.origin}/signup/complete`
      addDebug(`Redirect URL (after OAuth): ${redirectUrl}`)
      
      // Start OAuth - Supabase handles the callback automatically
      addDebug('Calling signInWithOAuth')
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // This is where Supabase sends user AFTER completing OAuth
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) {
        addDebug(`OAuth error: ${JSON.stringify(error)}`)
        setErrors({ general: `OAuth failed: ${error.message}` })
        setIsSubmitting(false)
        return
      }

      addDebug('OAuth initiated successfully')
      addDebug(`OAuth data: ${JSON.stringify(data)}`)
      
      // If we get here without redirect, show message
      if (!data.url) {
        throw new Error('No OAuth URL returned')
      }
      
      addDebug(`Redirecting to: ${data.url}`)
      // Browser will redirect automatically
      
    } catch (error) {
      console.error('Signup error:', error)
      addDebug(`Signup error: ${error}`)
      setErrors({ 
        general: error instanceof Error ? error.message : 'Failed to start signup process' 
      })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">BaselineDocs</span>
            </Link>
            <Link 
              href="/signin" 
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto mt-16 px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h1>
          <p className="text-gray-600 mb-8">Get started with your 14-day free trial</p>

          {errors.general && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{errors.general}</p>
            </div>
          )}

          {/* Company Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company name
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
              placeholder="Acme Inc"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.companyName && (
              <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
            )}
          </div>

          {/* Subdomain */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Choose your subdomain
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={formData.subdomain}
                onChange={(e) => handleSubdomainChange(e.target.value)}
                placeholder="acme"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="px-3 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-600 text-sm">
                .baselinedocs.com
              </span>
            </div>
            
            {/* Subdomain Status Indicator */}
            {formData.subdomain.length >= 3 && (
              <div className="mt-2 flex items-center space-x-2">
                {subdomainStatus === 'checking' && (
                  <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
                )}
                {subdomainStatus === 'available' && (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Available</span>
                  </>
                )}
                {subdomainStatus === 'taken' && (
                  <>
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-600">Already taken</span>
                  </>
                )}
              </div>
            )}
            
            {formData.subdomain && (
              <p className="mt-1 text-sm text-gray-500">
                Your app will be available at: <span className="font-medium">{formData.subdomain}.baselinedocs.com</span>
              </p>
            )}
            
            {errors.subdomain && (
              <p className="mt-1 text-sm text-red-600">{errors.subdomain}</p>
            )}
          </div>

          {/* Google Signup Button */}
          <button
            onClick={handleGoogleSignup}
            disabled={isSubmitting || subdomainStatus === 'checking' || subdomainStatus === 'taken'}
            className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="font-medium text-gray-900">Starting signup...</span>
              </>
            ) : (
              <>
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="font-medium text-gray-900">Continue with Google</span>
              </>
            )}
          </button>

          <p className="mt-6 text-xs text-center text-gray-500">
            By signing up, you agree to our{' '}
            <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
          </p>
        </div>

        {/* Debug Panel */}
        {debugInfo.length > 0 && (
          <details className="mt-4 p-4 bg-gray-100 rounded-lg">
            <summary className="cursor-pointer font-medium text-sm text-gray-700">
              Debug Info ({debugInfo.length} logs)
            </summary>
            <div className="mt-2 space-y-1 max-h-96 overflow-auto">
              {debugInfo.map((info, i) => (
                <div key={i} className="text-xs font-mono text-gray-600 break-all">
                  {info}
                </div>
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  )
}
