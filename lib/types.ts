export type SanitySlug = { current: string }

export type CategoryRef = { title: string; slug: SanitySlug }

export type FaqItem = { question: string; answer: string }

export type ComparisonTableData = {
  headers: string[]
  rows: { cells: string[] }[]
}

export type Post = {
  title: string
  slug: SanitySlug
  updatedAt: string
  publishedAt?: string
  author?: string
  category: CategoryRef
  tags?: string[]
  readingTimeMin?: number
  seoDescription: string
  verdictSummary?: string
  verdictLabel?: string
  verdictScore?: number
  toolName?: string
  toolWebsite?: string
  priceUSD?: number
  body?: unknown[]
  comparisonTable?: ComparisonTableData
  pros?: string[]
  cons?: string[]
  faq?: FaqItem[]
  featured?: boolean
}

export type PostSummary = {
  title: string
  slug: SanitySlug
  category: CategoryRef
  seoDescription: string
  updatedAt: string
  readingTimeMin?: number
  verdictLabel?: string
}

export type Category = {
  title: string
  slug: SanitySlug
  description?: string
  sortOrder?: number
}

export type SiteSettings = {
  siteName: string
  siteTagline: string
  newsletterHeadline?: string
  newsletterDescription?: string
  navLinks?: { label: string; href: string }[]
  defaultAuthor?: string
  social?: { twitter?: string; github?: string; linkedin?: string }
}

export type SitemapData = {
  posts: { slug: string; lastmod: string; title: string; seoDescription?: string }[]
  categories: { slug: string; lastmod: string; title: string }[]
}

export type HomepageData = {
  featured: PostSummary | null
  latest: PostSummary[]
  categories: Pick<Category, 'title' | 'slug'>[]
  reviewCount: number
}
