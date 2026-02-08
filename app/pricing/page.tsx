import Link from 'next/link'
import Logo from '@/components/Logo'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <Logo className="h-8 w-8" />
              <span className="text-xl font-bold text-gray-900">Baseline Docs</span>
            </Link>
            <div className="flex items-center space-x-8">
              <Link href="/features" className="text-gray-600 hover:text-gray-900">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-700 font-medium">
                Pricing
              </Link>
              <Link 
                href="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Choose the plan that fits your team. All plans include 30-day free trial.
          </p>
          <p className="text-lg text-blue-600 font-semibold">
            No credit card required to start
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Starter Plan */}
            <PricingCard
              name="Starter"
              price="$29"
              period="per month"
              description="Perfect for small teams getting started with document control"
              features={[
                "10 users",
                "150 documents",
                "100 MB storage",
                "Version control",
                "Approval workflows",
                "Basic audit trail",
                "Email support",
              ]}
              cta="Start Free Trial"
              ctaLink="/signup"
              highlighted={false}
            />

            {/* Professional Plan */}
            <PricingCard
              name="Professional"
              price="$99"
              period="per month"
              description="For growing teams with advanced document control needs"
              features={[
                "50 users",
                "500 documents",
                "2 GB storage",
                "Everything in Starter, plus:",
                "Priority email support",
                "Onboarding assistance",
              ]}
              cta="Start Free Trial"
              ctaLink="/signup"
              highlighted={true}
              badge="Most Popular"
            />

            {/* Enterprise Plan */}
            <PricingCard
              name="Enterprise"
              price="Custom"
              period="contact sales"
              description="For large organizations with specific requirements"
              features={[
                "Unlimited users",
                "Unlimited documents",
                "Unlimited storage",
                "Everything in Professional, plus:",
                "Dedicated account manager",
                "Custom integrations",
                "SLA guarantee",
                "Phone & chat support",
              ]}
              cta="Request a Quote"
              ctaLink="mailto:sales@baselinedocs.com"
              highlighted={false}
            />

          </div>

          {/* A la carte note */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 text-lg">
              Need additional users, documents, or storage?{' '}
              <a href="mailto:sales@baselinedocs.com" className="text-blue-600 hover:text-blue-700 font-semibold">
                A la carte additions available - Request a quote
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Compare Plans
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 text-gray-600 font-semibold">Feature</th>
                  <th className="text-center py-4 px-6 text-gray-900 font-bold">Starter</th>
                  <th className="text-center py-4 px-6 text-gray-900 font-bold">Professional</th>
                  <th className="text-center py-4 px-6 text-gray-900 font-bold">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <ComparisonRow feature="Users" starter="10" professional="50" enterprise="Unlimited" />
                <ComparisonRow feature="Documents" starter="150" professional="500" enterprise="Unlimited" />
                <ComparisonRow feature="Storage" starter="100 MB" professional="2 GB" enterprise="Unlimited" />
                <ComparisonRow feature="Version Control" starter={true} professional={true} enterprise={true} />
                <ComparisonRow feature="Approval Workflows" starter={true} professional={true} enterprise={true} />
                <ComparisonRow feature="Audit Trail" starter={true} professional={true} enterprise={true} />
                <ComparisonRow feature="Document Types" starter={true} professional={true} enterprise={true} />
                <ComparisonRow feature="Search & Filter" starter={true} professional={true} enterprise={true} />
                <ComparisonRow feature="Project Association" starter={true} professional={true} enterprise={true} />
                <ComparisonRow feature="File Attachments" starter={true} professional={true} enterprise={true} />
                <ComparisonRow feature="Email Support" starter="Standard" professional="Priority" enterprise="24/7" />
                <ComparisonRow feature="Onboarding Call" starter={false} professional={true} enterprise={true} />
                <ComparisonRow feature="Account Manager" starter={false} professional={false} enterprise={true} />
                <ComparisonRow feature="Custom Integrations" starter={false} professional={false} enterprise={true} />
                <ComparisonRow feature="SLA Guarantee" starter={false} professional={false} enterprise={true} />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <FAQItem
              question="How does the 30-day free trial work?"
              answer="Sign up for any plan and get full access for 30 days. No credit card required. At the end of the trial, you can choose to continue with a paid plan or cancel with no obligation."
            />
            <FAQItem
              question="Can I change plans later?"
              answer="Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated."
            />
            <FAQItem
              question="What happens if I exceed my plan limits?"
              answer="We'll notify you when you're approaching your limits. You can upgrade to a higher plan or purchase a la carte additions. We'll never interrupt your service without warning."
            />
            <FAQItem
              question="Do you offer annual billing?"
              answer="Yes! Contact us for annual billing options with discounted rates."
            />
            <FAQItem
              question="What payment methods do you accept?"
              answer="We accept all major credit cards (Visa, Mastercard, American Express) via Stripe. Enterprise customers can pay by invoice."
            />
            <FAQItem
              question="Can I get a custom plan?"
              answer="Absolutely! If none of our standard plans fit your needs, contact us for a custom quote. We can adjust users, documents, storage, and features to match your requirements."
            />
            <FAQItem
              question="Is my data secure?"
              answer="Yes. All data is encrypted in transit and at rest. We use industry-standard security practices and host on secure infrastructure. Your documents are isolated to your organization."
            />
            <FAQItem
              question="Can I export my data?"
              answer="Yes. You can export your documents and audit logs at any time. If you cancel, you'll have 30 days to export your data before it's deleted."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start your 30-day free trial today. No credit card required.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Logo className="h-8 w-8" />
            <span className="text-xl font-bold text-white">Baseline Docs</span>
          </div>
          <p className="mb-4">© 2025 Baseline Docs. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <Link href="/features" className="hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/signup" className="hover:text-white transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Pricing Card Component
function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  ctaLink,
  highlighted,
  badge,
}: {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  ctaLink: string
  highlighted: boolean
  badge?: string
}) {
  return (
    <div className={`relative rounded-2xl p-8 ${
      highlighted 
        ? 'bg-blue-600 text-white shadow-2xl scale-105 border-4 border-blue-500' 
        : 'bg-white border-2 border-gray-200 shadow-lg'
    }`}>
      {badge && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
            {badge}
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className={`text-2xl font-bold mb-2 ${highlighted ? 'text-white' : 'text-gray-900'}`}>
          {name}
        </h3>
        <div className="mb-2">
          <span className={`text-5xl font-bold ${highlighted ? 'text-white' : 'text-gray-900'}`}>
            {price}
          </span>
        </div>
        <p className={highlighted ? 'text-blue-100' : 'text-gray-500'}>
          {period}
        </p>
      </div>

      <p className={`text-center mb-6 ${highlighted ? 'text-blue-100' : 'text-gray-600'}`}>
        {description}
      </p>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg 
              className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${highlighted ? 'text-blue-200' : 'text-green-500'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className={highlighted ? 'text-blue-50' : 'text-gray-700'}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href={ctaLink}
        className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
          highlighted
            ? 'bg-white text-blue-600 hover:bg-blue-50'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {cta}
      </Link>
    </div>
  )
}

// Comparison Row Component
function ComparisonRow({
  feature,
  starter,
  professional,
  enterprise,
}: {
  feature: string
  starter: boolean | string
  professional: boolean | string
  enterprise: boolean | string
}) {
  const renderCell = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <svg className="w-6 h-6 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-6 h-6 text-gray-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )
    }
    return <span className="text-gray-900 font-medium">{value}</span>
  }

  return (
    <tr>
      <td className="py-4 px-6 text-gray-700">{feature}</td>
      <td className="py-4 px-6 text-center">{renderCell(starter)}</td>
      <td className="py-4 px-6 text-center">{renderCell(professional)}</td>
      <td className="py-4 px-6 text-center">{renderCell(enterprise)}</td>
    </tr>
  )
}

// FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{question}</h3>
      <p className="text-gray-600">{answer}</p>
    </div>
  )
}
