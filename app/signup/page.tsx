'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FileText, CheckCircle, XCircle, Loader2 } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    companyName: '',
    subdomain: '',
    fullName: '',
    email: '',
    password: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/create-tenant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.details) {
          const fieldErrors: Record<string, string> = {}
          data.details.forEach((err: any) => {
            fieldErrors[err.path[0]] = err.message
          })
          setErrors(fieldErrors)
        } else {
          setErrors({ general: data.error || 'An error occurred' })
        }
        setIsSubmitting(false)
        return
      }

      // Success! Redirect to success page
      router.push(`/signup/success?subdomain=${data.subdomain}`)
    } catch (error) {
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

          <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Your Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="John Smith"
                required
              />
              {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Work Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="john@acme.com"
                required
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="••••••••"
                required
              />
              <p className="text-sm text-gray-600 mt-1">
                Must be at least 8 characters with uppercase, lowercase, and number
              </p>
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || subdomainStatus === 'taken' || subdomainStatus === 'checking'}
              className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating your account...
                </>
              ) : (
                'Create Account'
              )}
            </button>

            <p className="text-sm text-gray-600 text-center">
              By signing up, you agree to our{' '}
              <Link href="/legal/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/legal/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
