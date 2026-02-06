'use client'

import { useSearchParams } from 'next/navigation'
import { FileText, Check, ArrowRight } from 'lucide-react'
import { useEffect } from 'react'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const subdomain = searchParams.get('subdomain')
  const appUrl = `https://${subdomain}.${process.env.NEXT_PUBLIC_BASE_DOMAIN || 'baselinedocs.com'}`

  useEffect(() => {
    // Redirect after 5 seconds
    const timer = setTimeout(() => {
      window.location.href = appUrl
    }, 5000)
    return () => clearTimeout(timer)
  }, [appUrl])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Account Created Successfully!</h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Your BaselineDocs workspace is ready at:
        </p>
        
        <div className="bg-white border-2 border-blue-600 rounded-lg p-6 mb-8">
          <p className="text-sm text-gray-600 mb-2">Your workspace URL:</p>
          <p className="text-2xl font-mono font-semibold text-blue-600 break-all">
            {appUrl}
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-gray-700">14-day free trial activated</p>
          </div>
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-gray-700">Admin account created</p>
          </div>
          <div className="flex items-center gap-3 text-left">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-gray-700">Welcome email sent</p>
          </div>
        </div>

        <a
          href={appUrl}
          className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700"
        >
          Go to Your Workspace <ArrowRight className="h-5 w-5" />
        </a>

        <p className="text-sm text-gray-500 mt-4">
          Redirecting automatically in 5 seconds...
        </p>
      </div>
    </div>
  )
}
