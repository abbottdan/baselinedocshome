import Link from 'next/link'
import { LogoLight } from '@/components/Logo'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <LogoLight className="h-8 w-8" />
              <span className="text-xl font-bold text-white">
                Baseline<span className="text-blue-400">Docs</span>
              </span>
            </div>
            <p className="text-sm mb-4">
              Document control for quality management systems.
            </p>
            <p className="text-xs text-slate-500">
              Part of the{' '}
              <a href="https://www.clearstridetools.com" className="text-slate-400 hover:text-white transition-colors">
                ClearStride Tools
              </a>{' '}
              suite.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
            </ul>
          </div>

          {/* Also from ClearStride */}
          <div>
            <h3 className="text-white font-semibold mb-4">Also from ClearStride</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.baselinereqs.com" className="hover:text-white transition-colors">
                  BaselineReqs
                  <span className="ml-2 text-xs text-slate-600">Requirements</span>
                </a>
              </li>
              <li>
                <a href="https://www.baselineinventory.com" className="hover:text-white transition-colors">
                  BaselineInventory
                  <span className="ml-2 text-xs text-slate-600">Operations</span>
                </a>
              </li>
              <li>
                <a href="https://www.clearstridetools.com" className="hover:text-white transition-colors">
                  clearstridetools.com
                </a>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:support@baselinedocs.com" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li><Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-sm">
          <p>© {year} BaselineDocs — a <a href="https://www.clearstridetools.com" className="text-slate-400 hover:text-white transition-colors">ClearStride Tools</a> product. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
