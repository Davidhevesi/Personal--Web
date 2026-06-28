import type { MetadataRoute } from 'next'
import { SITE_URL, absUrl } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/studio/'],
      },
    ],
    sitemap: absUrl('/sitemap.xml'),
    host: SITE_URL,
  }
}
