import { sanityClient } from '@/lib/sanity'
import { sitemapQuery } from '@/lib/queries'
import { buildLlmsTxt } from '@/lib/structured-data'
import type { SitemapData } from '@/lib/types'

export const revalidate = 60

export async function GET() {
  const data = await sanityClient.fetch<SitemapData>(sitemapQuery)
  return new Response(buildLlmsTxt(data), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
