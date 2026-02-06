import Link from 'next/link'
import { FileText } from 'lucide-react'

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-white">
        <nav className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">BaselineDocs</span>
          </Link>
        </nav>
      </header>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold mb-6">Features</h1>
        <p className="text-xl text-gray-600">Comprehensive document control features coming soon...</p>
        <Link href="/signup" className="inline-block mt-8 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Start Free Trial
        </Link>
      </div>
    </div>
  )
}
