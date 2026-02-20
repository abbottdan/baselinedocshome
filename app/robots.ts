import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/signup/complete', '/signup/verify', '/api/'],
    },
    sitemap: 'https://www.baselinedocs.com/sitemap.xml',
  }
}
