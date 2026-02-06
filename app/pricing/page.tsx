import Link from 'next/link'
import { Check, FileText } from 'lucide-react'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">BaselineDocs</span>
          </Link>
        </nav>
      </header>

      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600 mb-12">
          Start with a 14-day free trial. No credit card required.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-8 border-2 rounded-2xl bg-white">
            <h3 className="text-2xl font-bold mb-2">Starter</h3>
            <p className="text-gray-600 mb-6">Perfect for small teams</p>
            <div className="mb-6">
              <span className="text-5xl font-bold">$29</span>
              <span className="text-gray-600">/month</span>
            </div>
            <Link href="/signup" className="block w-full py-3 rounded-lg font-semibold mb-6 bg-gray-100 hover:bg-gray-200">
              Start Free Trial
            </Link>
            <ul className="space-y-3 text-left text-sm">
              <li className="flex gap-2"><Check className="h-5 w-5 text-green-600" /> 10 users</li>
              <li className="flex gap-2"><Check className="h-5 w-5 text-green-600" /> 500 documents</li>
              <li className="flex gap-2"><Check className="h-5 w-5 text-green-600" /> 10GB storage</li>
            </ul>
          </div>

          <div className="p-8 border-2 border-blue-600 rounded-2xl bg-white shadow-xl scale-105">
            <div className="bg-blue-600 text-white text-sm font-semibold py-1 px-4 rounded-full inline-block mb-4">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-2">Professional</h3>
            <p className="text-gray-600 mb-6">For growing teams</p>
            <div className="mb-6">
              <span className="text-5xl font-bold">$99</span>
              <span className="text-gray-600">/month</span>
            </div>
            <Link href="/signup" className="block w-full py-3 rounded-lg font-semibold mb-6 bg-blue-600 text-white hover:bg-blue-700">
              Start Free Trial
            </Link>
            <ul className="space-y-3 text-left text-sm">
              <li className="flex gap-2"><Check className="h-5 w-5 text-green-600" /> 50 users</li>
              <li className="flex gap-2"><Check className="h-5 w-5 text-green-600" /> Unlimited documents</li>
              <li className="flex gap-2"><Check className="h-5 w-5 text-green-600" /> 100GB storage</li>
            </ul>
          </div>

          <div className="p-8 border-2 rounded-2xl bg-white">
            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
            <p className="text-gray-600 mb-6">For large organizations</p>
            <div className="mb-6">
              <span className="text-5xl font-bold">$299</span>
              <span className="text-gray-600">/month</span>
            </div>
            <Link href="/signup" className="block w-full py-3 rounded-lg font-semibold mb-6 bg-gray-100 hover:bg-gray-200">
              Start Free Trial
            </Link>
            <ul className="space-y-3 text-left text-sm">
              <li className="flex gap-2"><Check className="h-5 w-5 text-green-600" /> Unlimited users</li>
              <li className="flex gap-2"><Check className="h-5 w-5 text-green-600" /> Unlimited documents</li>
              <li className="flex gap-2"><Check className="h-5 w-5 text-green-600" /> Unlimited storage</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
