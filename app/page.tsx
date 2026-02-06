import Link from 'next/link'
import { ArrowRight, Check, FileText, Users, Shield, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">BaselineDocs</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
            <Link href="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Start Free Trial
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Document Control for<br />
          <span className="text-blue-600">Modern Teams</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Streamline your document control process with version control, approval workflows,
          and compliance tracking. Built for teams that move fast without breaking things.
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/signup" 
            className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 flex items-center gap-2"
          >
            Start Free Trial <ArrowRight className="h-5 w-5" />
          </Link>
          <Link 
            href="/features" 
            className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg text-lg font-semibold hover:border-gray-400"
          >
            Learn More
          </Link>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Free 14-day trial • No credit card required • Cancel anytime
        </p>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything you need to manage documents
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<FileText className="h-10 w-10 text-blue-600" />}
            title="Version Control"
            description="Track every change with alphabetic (Prototype) and numeric (Production) versioning. Never lose a document version again."
          />
          <FeatureCard 
            icon={<Users className="h-10 w-10 text-blue-600" />}
            title="Approval Workflows"
            description="Route documents through multi-approver reviews with comments and rejection handling. Keep everyone in the loop."
          />
          <FeatureCard 
            icon={<Shield className="h-10 w-10 text-blue-600" />}
            title="Audit Trail"
            description="Complete audit logs track every action. Know who did what, when, and why for compliance and accountability."
          />
          <FeatureCard 
            icon={<Zap className="h-10 w-10 text-blue-600" />}
            title="Fast Search"
            description="Find any document instantly with powerful search and filtering. Filter by type, status, project, or creator."
          />
          <FeatureCard 
            icon={<FileText className="h-10 w-10 text-blue-600" />}
            title="Multi-File Support"
            description="Attach multiple files to each document. PDFs, images, spreadsheets - we support them all."
          />
          <FeatureCard 
            icon={<Shield className="h-10 w-10 text-blue-600" />}
            title="Role-Based Access"
            description="Control who can see, edit, and approve documents with granular permissions and tenant isolation."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to streamline your document control?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join teams already using BaselineDocs to manage their critical documents
          </p>
          <Link 
            href="/signup" 
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-100"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
                <span className="font-bold">BaselineDocs</span>
              </div>
              <p className="text-sm text-gray-600">
                Document control for modern teams
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/signup">Sign Up</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/legal/terms">Terms of Service</Link></li>
                <li><Link href="/legal/privacy">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <p className="text-sm text-gray-600">
                hello@baselinedocs.com
              </p>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
            © 2026 BaselineDocs. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 border rounded-xl bg-white hover:shadow-lg transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
