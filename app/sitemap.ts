import type { MetadataRoute } from 'next'
import { CASE_STUDIES } from '@/lib/case-studies'
import { absUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: absUrl('/'), lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...CASE_STUDIES.map((c) => ({
      url: absUrl(`/work/${c.slug}`),
      lastModified: now,
      changeFrequency: c.status === 'Live' ? ('weekly' as const) : ('yearly' as const),
      priority: 0.8,
    })),
  ]
}
