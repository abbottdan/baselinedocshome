import Link from 'next/link'
import Logo from '@/components/Logo'
import Footer from '@/components/Footer'

export default function HomePage() {
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
              <Link href="/features" className="text-slate-600 hover:text-slate-900">
                Features
              </Link>
              <Link href="/pricing" className="text-slate-600 hover:text-slate-900">
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
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full mb-6">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Designed for ISO 9001 Compliance
              </div>
              <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Document Control for Quality Management Systems
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Purpose-built for regulated industries. Version control, approval workflows,
                and complete audit trails in one powerful platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/signup"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/features"
                  className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-slate-400 transition-colors text-center"
                >
                  View Features
                </Link>
              </div>
              <p className="text-sm text-slate-500 mt-4">
                30-day free trial · No credit card required
              </p>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Logo className="h-10 w-10" />
                    <div>
                      <div className="text-lg font-bold text-slate-900">FORM-00042v2</div>
                      <div className="text-sm text-slate-500">Quality Inspection Form</div>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Released
                  </span>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-slate-600 text-sm">
                    <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Approved by 3 reviewers
                  </div>
                  <div className="flex items-center text-slate-600 text-sm">
                    <svg className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Version history tracked
                  </div>
                  <div className="flex items-center text-slate-600 text-sm">
                    <svg className="w-4 h-4 mr-2 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Complete audit trail
                  </div>
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Document Coverage</div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">92% reviewed this cycle</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything You Need for Document Control
            </h2>
            <p className="text-xl text-slate-600">
              Built for compliance, designed for simplicity
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<VersionIcon />}
              title="Version Control"
              description="Automatic numbering with alphabetic versions for prototypes (vA, vB) and numeric for production (v1, v2)."
            />
            <FeatureCard
              icon={<ApprovalIcon />}
              title="Approval Workflows"
              description="Multi-approver routing with status tracking. Rejection workflows with required comments."
            />
            <FeatureCard
              icon={<AuditIcon />}
              title="Audit Trail"
              description="Every action logged with timestamp and user. Full traceability for compliance and quality audits."
            />
            <FeatureCard
              icon={<SearchIcon />}
              title="Advanced Search"
              description="Find documents instantly by number, title, type, status, or project. Powerful filtering and sorting."
            />
            <FeatureCard
              icon={<SecurityIcon />}
              title="Access Control"
              description="Role-based permissions with admin and user roles. Draft documents stay private until released."
            />
            <FeatureCard
              icon={<ComplianceIcon />}
              title="Quality Management Ready"
              description="Designed to support ISO 9001 document control requirements with comprehensive audit trails and approval workflows."
            />
          </div>

          <div className="text-center mt-12">
            <Link
              href="/features"
              className="text-blue-600 hover:text-blue-700 font-semibold text-lg"
            >
              View all features →
            </Link>
          </div>
        </div>
      </section>

      {/* Cross-product Section */}
      <section className="py-16 px-4 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6">Part of the ClearStride Tools Suite</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://www.baselinereqs.com"
              className="flex items-center gap-3 px-6 py-3 rounded-xl border border-slate-200 bg-white hover:border-red-200 hover:shadow-sm transition-all group"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 flex-shrink-0"></span>
              <div className="text-left">
                <div className="font-semibold text-slate-900 group-hover:text-red-600 transition-colors text-sm">BaselineReqs</div>
                <div className="text-xs text-slate-500">Requirements traceability & approval workflows</div>
              </div>
            </a>
            <a
              href="https://www.baselineinventory.com"
              className="flex items-center gap-3 px-6 py-3 rounded-xl border border-slate-200 bg-white hover:border-green-200 hover:shadow-sm transition-all group"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-green-700 flex-shrink-0"></span>
              <div className="text-left">
                <div className="font-semibold text-slate-900 group-hover:text-green-700 transition-colors text-sm">BaselineInventory</div>
                <div className="text-xs text-slate-500">Stock tracking & fulfillment workflows</div>
              </div>
            </a>
            <a
              href="https://www.clearstridetools.com"
              className="text-sm text-slate-500 hover:text-slate-700 transition-colors px-4"
            >
              clearstridetools.com →
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to streamline your document control?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Start your 30-day free trial. No credit card required.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-xl border border-slate-100 hover:border-blue-100 hover:shadow-sm transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function VersionIcon() {
  return (
    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>
  )
}

function ApprovalIcon() {
  return (
    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
      <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  )
}

function AuditIcon() {
  return (
    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
      <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    </div>
  )
}

function SearchIcon() {
  return (
    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  )
}

function SecurityIcon() {
  return (
    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
      <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    </div>
  )
}

function ComplianceIcon() {
  return (
    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    </div>
  )
}
