import type { PostSummary } from './types'

export function formatMonthYear(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export function toArticleRowProps(post: PostSummary) {
  return {
    title: post.title,
    slug: post.slug.current,
    category: post.category?.title ?? '',
    categorySlug: post.category?.slug?.current ?? '',
    deck: post.seoDescription,
    date: formatMonthYear(post.updatedAt),
    readTime: post.readingTimeMin ?? 5,
  }
}
