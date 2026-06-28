import type { MetadataRoute } from 'next'
import { sanityClient } from '@/lib/sanity'
import { sitemapQuery } from '@/lib/queries'
import { absUrl } from '@/lib/seo'
import type { SitemapData } from '@/lib/types'

export const revalidate = 60

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await sanityClient.fetch<SitemapData>(sitemapQuery)
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absUrl('/'), lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: absUrl('/about'), lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]

  const posts: MetadataRoute.Sitemap = (data.posts ?? []).map((p) => ({
    url: absUrl(`/${p.slug}`),
    lastModified: p.lastmod ? new Date(p.lastmod) : now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const categories: MetadataRoute.Sitemap = (data.categories ?? []).map((c) => ({
    url: absUrl(`/category/${c.slug}`),
    lastModified: c.lastmod ? new Date(c.lastmod) : now,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...posts, ...categories]
}
