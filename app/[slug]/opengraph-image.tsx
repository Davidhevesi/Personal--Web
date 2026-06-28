import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'
import { sanityClient } from '@/lib/sanity'
import { postQuery } from '@/lib/queries'
import { SITE_NAME } from '@/lib/seo'
import type { Post } from '@/lib/types'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = `${SITE_NAME} review`

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await sanityClient.fetch<Post | null>(postQuery, { slug })

  if (!post) {
    return renderOgImage({ title: SITE_NAME, eyebrow: 'Review' })
  }

  return renderOgImage({
    title: post.title,
    eyebrow: post.category?.title ?? 'Review',
    score: typeof post.verdictScore === 'number' ? post.verdictScore : undefined,
  })
}
