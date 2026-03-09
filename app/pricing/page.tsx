import type { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/components/Logo'

export const metadata: Metadata = {
  title: 'Pricing | BaselineDocs - Simple, Transparent Plans',
  description: 'Simple, transparent pricing for document control software. Start with a 30-day free trial. No credit card required.',
  openGraph: {
    title: 'Pricing | BaselineDocs',
    description: 'Simple, transparent pricing for document control. Start free, no credit card required.',
    url: 'https://www.baselinedocs.com/pricing',
  },
}

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
              <Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
              <Link href="/pricing" className="text-gray-700 font-medium">Pricing</Link>
              <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Start free for 30 days. No credit card required.
          </p>
          <p className="text-lg text-blue-600 font-semibold">
            BaselineDocs — part of the ClearStride Tools suite
          </p>
        </div>
      </section>

      {/* Single-Tool Pricing Cards */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">BaselineDocs Plans</h2>
          <p className="text-gray-500 text-center mb-10">Document control for your team</p>

          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              name="Free Trial"
              price="FREE"
              period="30 days"
              description="Full access to evaluate BaselineDocs with your team"
              features={[
                '3 seats included',
                '1 GB storage',
                'Version control',
                'Approval workflows',
                'Audit trail',
                'No credit card required',
              ]}
              cta="Start Free Trial"
              ctaLink="/signup"
              highlighted={false}
            />
            <PricingCard
              name="Starter"
              price="$49"
              period="per month"
              description="For small teams with established document workflows"
              features={[
                '10 seats included',
                '$5 / seat overage',
                '5 GB storage',
                '10 GB add-ons @ $5/mo',
                'Version control',
                'Approval workflows',
                'Audit trail',
                'Email support',
              ]}
              cta="Start Free Trial"
              ctaLink="/signup"
              highlighted={false}
            />
            <PricingCard
              name="Pro"
              price="$89"
              period="per month"
              description="For growing teams with more users and documents"
              features={[
                '50 seats included',
                '$7 / seat overage',
                '20 GB storage',
                '10 GB add-ons @ $5/mo',
                'Everything in Starter',
                'Priority support',
                'Onboarding assistance',
              ]}
              cta="Start Free Trial"
              ctaLink="/signup"
              highlighted={true}
              badge="Most Popular"
            />
          </div>
        </div>
      </section>

      {/* Bundle Upsell */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl bg-gradient-to-r from-blue-900 to-blue-700 p-10 text-white shadow-2xl">
            <div className="text-center mb-8">
              <span className="inline-block bg-yellow-400 text-gray-900 text-sm font-bold px-4 py-1 rounded-full mb-4">
                BUNDLE &amp; SAVE 20%
              </span>
              <h2 className="text-3xl font-bold mb-3">Add BaselineReqs and save on both tools</h2>
              <p className="text-blue-200 text-lg max-w-2xl mx-auto">
                BaselineReqs is our requirements management tool — built to pair with BaselineDocs.
                Link requirements directly to controlled documents and close the loop on traceability.
                Bundle both tools and get 20% off every month.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <BundleCard
                name="Bundle Starter"
                price="$79"
                saving="Save $19/mo"
                vsIndividual="vs. $98 separately"
                seats="10 seats"
                storage="5 GB storage"
                ctaLink="/signup"
                highlighted={false}
              />
              <BundleCard
                name="Bundle Pro"
                price="$143"
                saving="Save $35/mo"
                vsIndividual="vs. $178 separately"
                seats="50 seats"
                storage="20 GB storage"
                ctaLink="/signup"
                highlighted={true}
              />
            </div>

            <p className="text-center text-blue-300 text-sm mt-6">
              Both tools, same tier, one subscription. Seat overages and storage add-ons apply per tool.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Compare Plans</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 text-gray-600 font-semibold">Feature</th>
                  <th className="text-center py-4 px-6 text-gray-500 font-bold">Trial</th>
                  <th className="text-center py-4 px-6 text-gray-900 font-bold">Starter</th>
                  <th className="text-center py-4 px-6 text-blue-700 font-bold">Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <ComparisonRow feature="Price" trial="FREE" starter="$49/mo" pro="$89/mo" />
                <ComparisonRow feature="Duration" trial="30 days" starter="—" pro="—" />
                <ComparisonRow feature="Seats included" trial="3" starter="10" pro="50" />
                <ComparisonRow feature="Per-seat overage" trial="N/A" starter="$5/seat" pro="$7/seat" />
                <ComparisonRow feature="Storage" trial="1 GB" starter="5 GB" pro="20 GB" />
                <ComparisonRow feature="Storage add-ons" trial="N/A" starter="10 GB @ $5/mo" pro="10 GB @ $5/mo" />
                <ComparisonRow feature="Version Control" trial={true} starter={true} pro={true} />
                <ComparisonRow feature="Approval Workflows" trial={true} starter={true} pro={true} />
                <ComparisonRow feature="Audit Trail" trial={true} starter={true} pro={true} />
                <ComparisonRow feature="Custom Document Types" trial={true} starter={true} pro={true} />
                <ComparisonRow feature="Project Association" trial={true} starter={true} pro={true} />
                <ComparisonRow feature="File Attachments" trial={true} starter={true} pro={true} />
                <ComparisonRow feature="Email Support" trial="Standard" starter="Standard" pro="Priority" />
                <ComparisonRow feature="Onboarding Assistance" trial={false} starter={false} pro={true} />
                <ComparisonRow feature="Bundle discount available" trial={false} starter={true} pro={true} />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <FAQItem
              question="How does the 30-day free trial work?"
              answer="Sign up and get full access for 30 days — no credit card required. At the end of the trial you can choose to continue with a paid plan or cancel with no obligation."
            />
            <FAQItem
              question="What happens when I go over my seat limit?"
              answer="We use soft blocking — we'll notify you as you approach your seat limit. Overage seats are billed at $5/seat (Starter) or $7/seat (Pro) per month. We won't cut off your team without warning."
            />
            <FAQItem
              question="How does storage overage work?"
              answer="You can add storage in 10 GB blocks at $5/mo each on both Starter and Pro. On the free trial, storage is capped at 1 GB with no add-ons available."
            />
            <FAQItem
              question="What is BaselineReqs and why would I bundle?"
              answer="BaselineReqs is our requirements management tool. When used with BaselineDocs, you can link requirements directly to controlled documents — giving you full traceability from requirement to released document. Bundling both tools at the same tier saves you 20% every month."
            />
            <FAQItem
              question="Can I change plans later?"
              answer="Yes. You can upgrade or downgrade at any time. Changes take effect immediately and billing is prorated."
            />
            <FAQItem
              question="Do you offer annual billing?"
              answer="Yes — contact us for annual billing with discounted rates."
            />
            <FAQItem
              question="What payment methods do you accept?"
              answer="All major credit cards (Visa, Mastercard, Amex) via Stripe. Enterprise customers can pay by invoice."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-blue-100 text-lg mb-8">30-day free trial. No credit card required. Up and running in minutes.</p>
          <Link href="/signup" className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors text-lg">
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Logo className="h-8 w-8" />
                <span className="text-xl font-bold text-white">Baseline Docs</span>
              </div>
              <p className="text-sm">Document control for quality management systems.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="mailto:support@baselinedocs.com" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2026 ClearStride. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ─── Components ───────────────────────────────────────────────────────────────

function PricingCard({
  name, price, period, description, features, cta, ctaLink, highlighted, badge,
}: {
  name: string; price: string; period: string; description: string
  features: string[]; cta: string; ctaLink: string; highlighted: boolean; badge?: string
}) {
  return (
    <div className={`relative rounded-2xl p-8 ${
      highlighted
        ? 'bg-blue-600 text-white shadow-2xl scale-105 border-4 border-blue-500'
        : 'bg-white border-2 border-gray-200 shadow-lg'
    }`}>
      {badge && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">{badge}</span>
        </div>
      )}
      <div className="text-center mb-6">
        <h3 className={`text-2xl font-bold mb-2 ${highlighted ? 'text-white' : 'text-gray-900'}`}>{name}</h3>
        <div className="mb-2">
          <span className={`text-5xl font-bold ${highlighted ? 'text-white' : 'text-gray-900'}`}>{price}</span>
        </div>
        <p className={highlighted ? 'text-blue-100' : 'text-gray-500'}>{period}</p>
      </div>
      <p className={`text-center mb-6 ${highlighted ? 'text-blue-100' : 'text-gray-600'}`}>{description}</p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start">
            <svg className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${highlighted ? 'text-blue-200' : 'text-green-500'}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className={highlighted ? 'text-blue-50' : 'text-gray-700'}>{feature}</span>
          </li>
        ))}
      </ul>
      <Link href={ctaLink}
        className={`block w-full text-center py-3 px-6 rounded-lg font-semibold transition-colors ${
          highlighted ? 'bg-white text-blue-600 hover:bg-blue-50' : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}>
        {cta}
      </Link>
    </div>
  )
}

function BundleCard({
  name, price, saving, vsIndividual, seats, storage, ctaLink, highlighted = false,
}: {
  name: string; price: string; saving: string; vsIndividual: string
  seats: string; storage: string; ctaLink: string; highlighted?: boolean
}) {
  return (
    <div className={`rounded-xl p-6 ${highlighted ? 'bg-white text-gray-900 shadow-xl' : 'bg-blue-800 text-white'}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`text-xl font-bold ${highlighted ? 'text-gray-900' : 'text-white'}`}>{name}</h3>
          <p className={`text-sm ${highlighted ? 'text-gray-500' : 'text-blue-300'}`}>{vsIndividual}</p>
        </div>
        <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">{saving}</span>
      </div>
      <div className="mb-4">
        <span className={`text-4xl font-bold ${highlighted ? 'text-gray-900' : 'text-white'}`}>{price}</span>
        <span className={`text-sm ml-1 ${highlighted ? 'text-gray-500' : 'text-blue-300'}`}>/mo</span>
      </div>
      <ul className={`space-y-2 text-sm mb-6 ${highlighted ? 'text-gray-700' : 'text-blue-100'}`}>
        <li>✦ BaselineDocs + BaselineReqs</li>
        <li>✦ {seats} included</li>
        <li>✦ {storage} included</li>
        <li>✦ Seat &amp; storage add-ons available</li>
      </ul>
      <Link href={ctaLink}
        className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors ${
          highlighted ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-blue-700 hover:bg-blue-50'
        }`}>
        Start Free Trial
      </Link>
    </div>
  )
}

function ComparisonRow({
  feature, trial, starter, pro,
}: {
  feature: string; trial: boolean | string; starter: boolean | string; pro: boolean | string
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
      <td className="py-4 px-6 text-center bg-gray-50">{renderCell(trial)}</td>
      <td className="py-4 px-6 text-center">{renderCell(starter)}</td>
      <td className="py-4 px-6 text-center bg-blue-50">{renderCell(pro)}</td>
    </tr>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{question}</h3>
      <p className="text-gray-600">{answer}</p>
    </div>
  )
}
