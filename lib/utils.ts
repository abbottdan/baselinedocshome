import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format subdomain to lowercase with hyphens
export function formatSubdomain(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-')
}

// Check if subdomain is reserved
const RESERVED_SUBDOMAINS = [
  'www', 'app', 'api', 'admin', 'dashboard',
  'staging', 'dev', 'test', 'demo', 'docs',
  'blog', 'status', 'support', 'help',
  'mail', 'email', 'smtp', 'ftp', 'ssh',
  'cdn', 'static', 'assets', 'files',
]

export function isReservedSubdomain(subdomain: string): boolean {
  return RESERVED_SUBDOMAINS.includes(subdomain.toLowerCase())
}
