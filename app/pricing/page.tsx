import type { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/components/Logo'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Pricing | BaselineDocs',
  description: 'Simple, transparent pricing for document control. 30-day free trial, no credit card required.',
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
              <span className="text-xl font-bold text-slate-900">
                Baseline<span className="text-blue-600">Docs</span>
              </span>
            </Link>
            <div className="flex items-center space-x-8">
              <Link href="/features" className="text-slate-600 hover:text-slate-900">Features</Link>
              <Link href="/pricing" className="text-slate-900 font-medium">Pricing</Link>
              <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h1>
          <p className="text-xl text-slate-600 mb-2">
            Start free for 30 days. No credit card required.
          </p>
          <p className="text-sm text-slate-400">BaselineDocs — part of the ClearStride Tools suite</p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-4 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              name="Trial"
              price="Free"
              period="30 days"
              description="Full access to evaluate BaselineDocs"
              accent="blue"
              features={[
                '2 users included',
                '25 documents',
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
              accent="blue"
              features={[
                '10 users included',
                '$5 / seat overage',
                '100 documents',
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
              description="For growing teams needing more capacity"
              accent="blue"
              features={[
                '25 users included',
                '$7 / seat overage',
                '1,000 documents',
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

      {/* Suite Savings — how the discount actually works */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border-2 border-blue-100 bg-white p-10 shadow-sm">
            <div className="text-center mb-8">
              <span className="inline-block bg-blue-600 text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
                Suite Savings
              </span>
              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                Add tools as you grow — pay less for each one
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Start with BaselineDocs today. When your team is ready to add BaselineReqs or BaselineInventory,
                you do it directly from your admin panel — and each additional tool is automatically discounted.
              </p>
            </div>

            {/* Step-by-step path */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <SuiteStep
                step="1"
                label="Start here"
                title="BaselineDocs"
                price="$49"
                note="Full price"
                runningTotal="$49/mo"
                accent="blue"
              />
              <SuiteStep
                step="2"
                label="Admin panel → Add a tool"
                title="+ BaselineReqs or BaselineInventory"
                price="$42"
                note="15% off"
                runningTotal="$91/mo"
                accent="blue"
              />
              <SuiteStep
                step="3"
                label="Admin panel → Add a tool"
                title="+ Third Baseline tool"
                price="$39"
                note="20% off"
                runningTotal="$130/mo"
                accent="blue"
              />
            </div>

            <div className="bg-slate-50 rounded-xl p-5 text-sm text-slate-600 space-y-2">
              <p className="font-semibold text-slate-800">How it works</p>
              <ul className="space-y-1.5 list-none">
                <li className="flex gap-2"><span className="text-blue-500 font-bold">→</span> Sign up for BaselineDocs and start your trial</li>
                <li className="flex gap-2"><span className="text-blue-500 font-bold">→</span> When ready, go to <strong>Admin → Billing → Add a tool</strong> to add your second or third Baseline product</li>
                <li className="flex gap-2"><span className="text-blue-500 font-bold">→</span> Discounts apply automatically — 15% off the 2nd tool, 20% off the 3rd</li>
                <li className="flex gap-2"><span className="text-blue-500 font-bold">→</span> All tools must be on the same tier (Starter or Pro). Suite-wide tier upgrades apply to all tools at once</li>
                <li className="flex gap-2"><span className="text-blue-500 font-bold">→</span> Additional tools are added immediately and billed at your next renewal</li>
              </ul>
            </div>

            <p className="text-center text-xs text-slate-400 mt-4">
              Pro plan follows the same structure: $89 → $165 → $236/mo for 1, 2, or 3 tools.
            </p>
          </div>
        </div>
      </section>

      {/* Add-on pricing */}
      <section className="py-4 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Add-ons</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <AddonCard
              title="Extra seats"
              starter="$5 / seat / mo"
              pro="$7 / seat / mo"
              note="Added immediately, charged at next renewal"
              accent="blue"
            />
            <AddonCard
              title="Extra storage"
              starter="$5 / 10 GB block / mo"
              pro="$5 / 10 GB block / mo"
              note="Added immediately, charged at next renewal"
              accent="blue"
            />
            <AddonCard
              title="Custom contract"
              starter="Contact us"
              pro="Contact us"
              note="Required at 200+ seats on any plan"
              accent="blue"
              isContact
            />
          </div>
        </div>
      </section>

      {/* Feature limit table */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Plan limits</h2>
          <p className="text-slate-500 text-center text-sm mb-10">All limits are soft blocks — users see a friendly message and are directed to their admin.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 px-6 text-slate-500 font-semibold">Limit</th>
                  <th className="text-center py-3 px-6 text-slate-500 font-semibold">Trial</th>
                  <th className="text-center py-3 px-6 text-slate-700 font-semibold">Starter</th>
                  <th className="text-center py-3 px-6 text-blue-700 font-semibold">Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <TableRow label="Users included" trial="2" starter="10" pro="25" />
                <TableRow label="Seat overage" trial="N/A" starter="$5/seat" pro="$7/seat" />
                <TableRow label="Documents" trial="25" starter="100" pro="1,000" />
                <TableRow label="Storage included" trial="1 GB" starter="5 GB" pro="20 GB" />
                <TableRow label="Storage add-ons" trial="N/A" starter="10 GB @ $5/mo" pro="10 GB @ $5/mo" />
                <TableRow label="Version control" trial="✓" starter="✓" pro="✓" />
                <TableRow label="Approval workflows" trial="✓" starter="✓" pro="✓" />
                <TableRow label="Audit trail" trial="✓" starter="✓" pro="✓" />
                <TableRow label="Email support" trial="Standard" starter="Standard" pro="Priority" />
                <TableRow label="Onboarding assistance" trial="—" starter="—" pro="✓" />
                <TableRow label="Custom contract" trial="—" starter="200+ seats" pro="200+ seats" />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">Common questions</h2>
          <div className="space-y-4">
            <FAQItem
              question="How does the 30-day free trial work?"
              answer="Sign up and get full access for 30 days — no credit card required. At the end of the trial you can choose to continue with a paid plan or cancel with no obligation."
            />
            <FAQItem
              question="What happens when I hit a document or storage limit?"
              answer="You'll see a friendly message. Your admin gets notified at 75% and 90% of any limit, and can add storage blocks or upgrade the plan directly from the admin panel."
            />
            <FAQItem
              question="How do I add a second or third Baseline tool?"
              answer="Once you're on a paid plan, go to Admin → Billing → Add a tool. You'll see BaselineReqs and BaselineInventory with their discounted prices applied automatically — 15% off the second tool, 20% off the third. All tools are added at the same tier."
            />
            <FAQItem
              question="Can I upgrade just one tool to Pro?"
              answer="No — when you upgrade, all tools in your suite upgrade together. This keeps permissions, seat counts, and billing clean across the whole suite."
            />
            <FAQItem
              question="How do seat overages work?"
              answer="You can add seats at any time from the admin panel. Extra seats are $5/seat/mo on Starter and $7/seat/mo on Pro. They're added immediately and charged at your next renewal."
            />
            <FAQItem
              question="What is a custom contract?"
              answer="At 200+ seats on any plan, we move to a custom contract with negotiated pricing. Contact us and we'll get you set up."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-slate-300 text-lg mb-8">30-day free trial. No credit card required.</p>
          <Link href="/signup" className="inline-block bg-blue-600 text-white font-bold px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg">
            Start Free Trial
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// ─── Components ───────────────────────────────────────────────────────────────

type Accent = 'blue' | 'red' | 'green'

const accentClasses: Record<Accent, {
  badge: string; ring: string; cta: string; ctaHighlighted: string
  check: string; bg: string; stepNum: string; stepBorder: string
}> = {
  blue: {
    badge: 'bg-yellow-400 text-slate-900',
    ring: 'border-blue-500',
    cta: 'bg-blue-600 text-white hover:bg-blue-700',
    ctaHighlighted: 'bg-white text-blue-600 hover:bg-blue-50',
    check: 'text-blue-500',
    bg: 'bg-blue-600',
    stepNum: 'bg-blue-600 text-white',
    stepBorder: 'border-blue-200',
  },
  red: {
    badge: 'bg-yellow-400 text-slate-900',
    ring: 'border-red-500',
    cta: 'bg-red-600 text-white hover:bg-red-700',
    ctaHighlighted: 'bg-white text-red-600 hover:bg-red-50',
    check: 'text-red-500',
    bg: 'bg-red-600',
    stepNum: 'bg-red-600 text-white',
    stepBorder: 'border-red-200',
  },
  green: {
    badge: 'bg-yellow-400 text-slate-900',
    ring: 'border-green-600',
    cta: 'bg-green-700 text-white hover:bg-green-800',
    ctaHighlighted: 'bg-white text-green-700 hover:bg-green-50',
    check: 'text-green-600',
    bg: 'bg-green-700',
    stepNum: 'bg-green-700 text-white',
    stepBorder: 'border-green-200',
  },
}

function PricingCard({ name, price, period, description, accent, features, cta, ctaLink, highlighted, badge }: {
  name: string; price: string; period: string; description: string; accent: Accent
  features: string[]; cta: string; ctaLink: string; highlighted: boolean; badge?: string
}) {
  const a = accentClasses[accent]
  return (
    <div className={`relative rounded-2xl p-8 flex flex-col ${
      highlighted
        ? `${a.bg} text-white shadow-2xl border-4 ${a.ring}`
        : 'bg-white border-2 border-slate-200 shadow-sm'
    }`}>
      {badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className={`${a.badge} px-4 py-1 rounded-full text-xs font-bold`}>{badge}</span>
        </div>
      )}
      <div className="text-center mb-6">
        <h3 className={`text-xl font-bold mb-3 ${highlighted ? 'text-white' : 'text-slate-900'}`}>{name}</h3>
        <div className="mb-1">
          <span className={`text-5xl font-bold ${highlighted ? 'text-white' : 'text-slate-900'}`}>{price}</span>
        </div>
        <p className={`text-sm ${highlighted ? 'text-white/70' : 'text-slate-400'}`}>{period}</p>
      </div>
      <p className={`text-center text-sm mb-6 ${highlighted ? 'text-white/80' : 'text-slate-500'}`}>{description}</p>
      <ul className="space-y-3 mb-8 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${highlighted ? 'text-white/70' : a.check}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span className={`text-sm ${highlighted ? 'text-white/90' : 'text-slate-700'}`}>{f}</span>
          </li>
        ))}
      </ul>
      <Link href={ctaLink}
        className={`block w-full text-center py-3 rounded-lg font-semibold transition-colors text-sm ${
          highlighted ? a.ctaHighlighted : a.cta
        }`}>
        {cta}
      </Link>
    </div>
  )
}

function SuiteStep({ step, label, title, price, note, runningTotal, accent }: {
  step: string; label: string; title: string; price: string
  note: string; runningTotal: string; accent: Accent
}) {
  const a = accentClasses[accent]
  return (
    <div className={`rounded-xl border-2 ${a.stepBorder} bg-white p-5`}>
      <div className="flex items-center gap-3 mb-3">
        <span className={`w-7 h-7 rounded-full ${a.stepNum} text-xs font-bold flex items-center justify-center flex-shrink-0`}>{step}</span>
        <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-sm font-semibold text-slate-800 mb-2">{title}</p>
      <div className="flex items-baseline gap-1.5 mb-1">
        <span className="text-2xl font-bold text-slate-900">{price}</span>
        <span className="text-sm text-slate-500">/mo</span>
        <span className="ml-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{note}</span>
      </div>
      <p className="text-xs text-slate-400">Running total: <strong className="text-slate-600">{runningTotal}</strong></p>
    </div>
  )
}

function AddonCard({ title, starter, pro, note, accent, isContact }: {
  title: string; starter: string; pro: string; note: string; accent: Accent; isContact?: boolean
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h3 className="font-semibold text-slate-900 mb-4">{title}</h3>
      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between">
          <span className="text-slate-500">Starter</span>
          <span className="font-medium text-slate-800">{starter}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Pro</span>
          <span className="font-medium text-slate-800">{pro}</span>
        </div>
      </div>
      <p className="text-xs text-slate-400">{note}</p>
      {isContact && (
        <a href="mailto:hello@clearstridetools.com" className="mt-4 block text-center text-sm font-semibold text-blue-600 hover:text-blue-700">
          Contact us →
        </a>
      )}
    </div>
  )
}

function TableRow({ label, trial, starter, pro }: { label: string; trial: string; starter: string; pro: string }) {
  return (
    <tr>
      <td className="py-3 px-6 text-slate-700">{label}</td>
      <td className="py-3 px-6 text-center text-slate-500 bg-slate-50">{trial}</td>
      <td className="py-3 px-6 text-center text-slate-800 font-medium">{starter}</td>
      <td className="py-3 px-6 text-center text-blue-700 font-medium bg-blue-50">{pro}</td>
    </tr>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200">
      <h3 className="font-semibold text-slate-900 mb-2">{question}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{answer}</p>
    </div>
  )
}
