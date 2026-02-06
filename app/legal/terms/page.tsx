import Link from 'next/link'
import { FileText } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <nav className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">BaselineDocs</span>
          </Link>
        </nav>
      </header>
      <div className="container mx-auto px-4 py-12 max-w-4xl prose">
        <h1>Terms of Service</h1>
        <p className="lead">Last updated: February 6, 2026</p>
        <p>Terms of Service content to be added...</p>
      </div>
    </div>
  )
}
