'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import Logo from '@/components/Logo'

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
        setErrors(prev => ({ ...prev, subdomain: 'This subdomain is already taken' }))
      } else {
        setErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors.subdomain
          return newErrors
        })
      }
    } catch (error) {
      console.error('Error checking subdomain:', error)
      setSubdomainStatus('idle')
    }
  }

  // Debounced subdomain check
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.subdomain.length >= 3) {
        checkSubdomain(formData.subdomain)
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [formData.subdomain])

  const handleSubdomainChange = (value: string) => {
    // Only allow lowercase letters, numbers, and hyphens
    const sanitized = value.toLowerCase().replace(/[^a-z0-9-]/g, '')
    setFormData(prev => ({ ...prev, subdomain: sanitized }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required'
    }
    
    if (!formData.subdomain.trim()) {
      newErrors.subdomain = 'Subdomain is required'
    } else if (formData.subdomain.length < 3) {
      newErrors.subdomain = 'Subdomain must be at least 3 characters'
    } else if (!/^[a-z0-9-]+$/.test(formData.subdomain)) {
      newErrors.subdomain = 'Only lowercase letters, numbers, and hyphens allowed'
    }
    
    if (subdomainStatus === 'taken') {
      newErrors.subdomain = 'This subdomain is already taken'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    if (subdomainStatus !== 'available') {
      setErrors({ subdomain: 'Please wait for subdomain availability check' })
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Store signup data in sessionStorage for after OAuth
      const signupData = {
        companyName: formData.companyName,
        subdomain: formData.subdomain,
        timestamp: new Date().toISOString(),
      }
      sessionStorage.setItem('pendingSignup', JSON.stringify(signupData))
      
      // Redirect to Supabase OAuth
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const redirectUrl = `${window.location.origin}/api/auth/callback`
      
      const authUrl = `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectUrl)}`
      
      window.location.href = authUrl
    } catch (error) {
      console.error('Error starting OAuth:', error)
      setErrors({ general: 'Failed to start sign up process. Please try again.' })
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Logo className="h-8 w-8" />
              <span className="text-xl font-bold text-gray-900">Baseline Docs</span>
            </Link>
            <div className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="https://app.baselinedocs.com" className="font-semibold text-blue-600 hover:text-blue-700">
                Sign in
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Benefits */}
          <div className="hidden lg:block">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Document Control Made Simple
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Join teams using Baseline Docs to streamline their quality management systems.
            </p>
            
            <div className="space-y-6">
              <BenefitItem
                icon={<CheckCircleIcon />}
                title="30-Day Free Trial"
                description="Full access to all features. No credit card required."
              />
              <BenefitItem
                icon={<CheckCircleIcon />}
                title="Quick Setup"
                description="Create your account and start managing documents in minutes."
              />
              <BenefitItem
                icon={<CheckCircleIcon />}
                title="Secure & Compliant"
                description="Built to support ISO 9001 document control requirements."
              />
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 lg:p-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
                  <Logo className="h-10 w-10" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
                <p className="text-gray-600">Get started with your 30-day free trial</p>
              </div>

              {errors.general && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{errors.general}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Acme Inc"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.companyName && (
                    <p className="mt-2 text-sm text-red-600">{errors.companyName}</p>
                  )}
                </div>

                {/* Subdomain */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Choose your subdomain
                  </label>
                  <div className="flex items-stretch rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all overflow-hidden">
                    <input
                      type="text"
                      value={formData.subdomain}
                      onChange={(e) => handleSubdomainChange(e.target.value)}
                      placeholder="acme"
                      className="flex-1 px-4 py-3 border-0 focus:ring-0 focus:outline-none"
                    />
                    <div className="flex items-center px-4 bg-gray-50 border-l border-gray-300 text-gray-600 text-sm font-medium">
                      .baselinedocs.com
                    </div>
                  </div>
                  
                  {/* Subdomain Status Indicator */}
                  {formData.subdomain.length >= 3 && (
                    <div className="mt-3 flex items-center space-x-2">
                      {subdomainStatus === 'checking' && (
                        <>
                          <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                          <span className="text-sm text-gray-600">Checking availability...</span>
                        </>
                      )}
                      {subdomainStatus === 'available' && (
                        <>
                          <div className="flex items-center justify-center w-5 h-5 bg-green-100 rounded-full">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="text-sm font-medium text-green-600">Available!</span>
                        </>
                      )}
                      {subdomainStatus === 'taken' && (
                        <>
                          <div className="flex items-center justify-center w-5 h-5 bg-red-100 rounded-full">
                            <XCircle className="h-4 w-4 text-red-600" />
                          </div>
                          <span className="text-sm font-medium text-red-600">Already taken</span>
                        </>
                      )}
                    </div>
                  )}
                  
                  {formData.subdomain && subdomainStatus === 'available' && (
                    <p className="mt-2 text-sm text-gray-600">
                      Your workspace: <span className="font-semibold text-gray-900">{formData.subdomain}.baselinedocs.com</span>
                    </p>
                  )}
                  
                  {errors.subdomain && (
                    <p className="mt-2 text-sm text-red-600">{errors.subdomain}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || subdomainStatus !== 'available'}
                  className="w-full bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 focus:ring-4 focus:ring-blue-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Setting up...</span>
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
                      <span>Continue with Google</span>
                    </>
                  )}
                </button>

                {/* Terms */}
                <p className="text-center text-xs text-gray-500">
                  By signing up, you agree to our{' '}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                    Privacy Policy
                  </Link>
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// Benefit Item Component
function BenefitItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}

// Check Circle Icon Component
function CheckCircleIcon() {
  return (
    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl">
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  )
}
