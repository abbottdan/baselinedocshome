import Image from 'next/image'

export default function Logo({ className = "h-8 w-8" }: { className?: string }) {
  // Parse height from className for next/image sizing (e.g. "h-8 w-8" → 32px)
  const sizeMap: Record<string, number> = {
    'h-6': 24, 'h-7': 28, 'h-8': 32, 'h-10': 40, 'h-12': 48, 'h-16': 64,
  }
  const heightClass = className.split(' ').find(c => c.startsWith('h-')) ?? 'h-8'
  const size = sizeMap[heightClass] ?? 32

  return (
    <Image
      src="/logo.svg"
      alt="ClearStride logo"
      width={size}
      height={size}
      className={className}
      priority
    />
  )
}
