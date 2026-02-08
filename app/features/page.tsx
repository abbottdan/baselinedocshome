import Link from 'next/link'
import Logo from '@/components/Logo'

export default function FeaturesPage() {
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
              <Link href="/features" className="text-gray-700 font-medium">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
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
            Everything You Need for Document Control
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Purpose-built for quality management systems, compliance, and regulated industries
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Version Control */}
            <FeatureCard
              icon={<VersionIcon />}
              title="Version Control"
              description="Automatic version numbering with alphabetic (vA, vB, vC) for prototypes and numeric (v1, v2, v3) for production documents. Complete version history with audit trails."
            />

            {/* Approval Workflows */}
            <FeatureCard
              icon={<ApprovalIcon />}
              title="Multi-Approver Workflows"
              description="Flexible approval routing with multiple reviewers. Track approval status in real-time. Rejection workflows with required comments."
            />

            {/* Document Numbering */}
            <FeatureCard
              icon={<NumberingIcon />}
              title="Smart Document Numbering"
              description="Customizable document types with unique prefixes (FORM-00001, PROC-00042). Sequential numbering managed automatically. Never duplicate document IDs."
            />

            {/* Prototype to Production */}
            <FeatureCard
              icon={<PromoteIcon />}
              title="Prototype to Production"
              description="Seamless promotion from prototype to production status. Maintain separate version sequences. Ensure production documents meet approval requirements."
            />

            {/* Audit Trail */}
            <FeatureCard
              icon={<AuditIcon />}
              title="Complete Audit Trail"
              description="Every action logged with timestamp and user. Track document lifecycle from creation to obsolescence. Full traceability for compliance needs."
            />

            {/* Search & Filter */}
            <FeatureCard
              icon={<SearchIcon />}
              title="Advanced Search"
              description="Find documents instantly by number or title. Filter by type, status, project, or date range. Sort and organize documents your way."
            />

            {/* File Management */}
            <FeatureCard
              icon={<FileIcon />}
              title="Secure File Storage"
              description="Attach multiple files per document. Support for PDF, Office, images, and more. Version-specific file management. Download signed URLs for security."
            />

            {/* Project Tracking */}
            <FeatureCard
              icon={<ProjectIcon />}
              title="Project Association"
              description="Link documents to projects with P-##### codes. Track all documents related to a project. Filter documents by project number."
            />

            {/* Access Control */}
            <FeatureCard
              icon={<SecurityIcon />}
              title="Role-Based Permissions"
              description="Admin and user roles with granular permissions. Draft documents private until released. Secure access control for your organization."
            />

            {/* Dashboard */}
            <FeatureCard
              icon={<DashboardIcon />}
              title="Centralized Dashboard"
              description="See pending approvals at a glance. Track documents you created. View recent activity across the system. Quick access to common tasks."
            />

            {/* Document Types */}
            <FeatureCard
              icon={<TypeIcon />}
              title="Custom Document Types"
              description="Configure unlimited document types. Define prefixes and descriptions. Activate or deactivate types as needed. Admin-only configuration."
            />

            {/* Compliance */}
            <FeatureCard
              icon={<ComplianceIcon />}
              title="Quality Management Ready"
              description="Comprehensive audit trails with timestamp and user tracking. Version control and approval workflows designed to support ISO 9001 document control requirements."
            />

          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Document Lifecycle Management
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Track documents from draft through approval, release, and eventual obsolescence. 
                Every state change is logged with full traceability.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckIcon />
                  <span>Draft → In Approval → Released → Obsolete</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon />
                  <span>Automatic status transitions based on workflow rules</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon />
                  <span>Previous versions remain accessible for audit</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon />
                  <span>"See Latest Released" button on obsolete documents</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-8 shadow-lg">
              <div className="space-y-4">
                <StatusBadge status="Draft" color="gray" />
                <StatusBadge status="In Approval" color="yellow" />
                <StatusBadge status="Released" color="green" />
                <StatusBadge status="Obsolete" color="slate" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-8 shadow-lg">
              <div className="space-y-4 text-center">
                <div className="text-5xl font-bold text-blue-600">FORM-00042vB</div>
                <div className="text-sm text-gray-600">↓ Promote to Production ↓</div>
                <div className="text-5xl font-bold text-blue-800">FORM-00042v1</div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Prototype to Production Workflow
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Develop and test documents as prototypes, then promote them to production 
                status when ready. Version numbering automatically adjusts.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <CheckIcon />
                  <span>Prototype: Alphabetic versions (vA, vB, vC)</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon />
                  <span>Production: Numeric versions (v1, v2, v3)</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon />
                  <span>Original prototype remains in Released state</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon />
                  <span>Production documents require approval workflow</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to streamline your document control?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start your 14-day free trial. No credit card required.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Get Started Free
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

// Feature Card Component
function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}

// Status Badge Component
function StatusBadge({ status, color }: { status: string, color: string }) {
  const colors = {
    gray: 'bg-gray-200 text-gray-800',
    yellow: 'bg-yellow-200 text-yellow-800',
    green: 'bg-green-200 text-green-800',
    slate: 'bg-slate-200 text-slate-800',
  }
  
  return (
    <div className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${colors[color as keyof typeof colors]}`}>
      {status}
    </div>
  )
}

// Check Icon
function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

// Feature Icons
function VersionIcon() {
  return (
    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </div>
  )
}

function ApprovalIcon() {
  return (
    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
      <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  )
}

function NumberingIcon() {
  return (
    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
      <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
      </svg>
    </div>
  )
}

function PromoteIcon() {
  return (
    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
      <svg className="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    </div>
  )
}

function AuditIcon() {
  return (
    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
      <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    </div>
  )
}

function SearchIcon() {
  return (
    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
      <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  )
}

function FileIcon() {
  return (
    <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
      <svg className="w-6 h-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    </div>
  )
}

function ProjectIcon() {
  return (
    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
      <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    </div>
  )
}

function SecurityIcon() {
  return (
    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
      <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    </div>
  )
}

function DashboardIcon() {
  return (
    <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
      <svg className="w-6 h-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    </div>
  )
}

function TypeIcon() {
  return (
    <div className="w-12 h-12 bg-lime-100 rounded-lg flex items-center justify-center">
      <svg className="w-6 h-6 text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    </div>
  )
}

function ComplianceIcon() {
  return (
    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
      <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    </div>
  )
}
