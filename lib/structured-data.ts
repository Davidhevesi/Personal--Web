import { SITE_URL, SITE_NAME, absUrl, ORGANIZATION, PERSON, AUTHOR } from '@/lib/seo'
import type { Post, SitemapData } from '@/lib/types'

/**
 * Build the JSON-LD @graph for a review post: Article + (Review/Rating when the
 * post actually scores a tool) + BreadcrumbList. FAQPage is emitted separately
 * by the FAQAccordion component.
 */
export function buildPostJsonLd(post: Post) {
  const slug = post.slug.current
  const url = absUrl(`/${slug}`)
  const image = absUrl(`/${slug}/opengraph-image`)
  const datePublished = post.publishedAt ?? post.updatedAt
  const dateModified = post.updatedAt
  const categoryTitle = post.category?.title ?? ''
  const categorySlug = post.category?.slug?.current ?? ''
  const authorName = post.author ?? AUTHOR.name

  const author = { ...PERSON, name: authorName }

  const graph: Record<string, unknown>[] = []

  graph.push({
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.seoDescription,
    url,
    mainEntityOfPage: url,
    image,
    datePublished,
    dateModified,
    author,
    publisher: ORGANIZATION,
    inLanguage: 'en',
    ...(categoryTitle ? { articleSection: categoryTitle } : {}),
    ...(post.tags?.length ? { keywords: post.tags.join(', ') } : {}),
  })

  // Only emit a Review when there is an actual rating (single-tool reviews).
  if (typeof post.verdictScore === 'number') {
    graph.push({
      '@type': 'Review',
      '@id': `${url}#review`,
      name: post.title,
      url,
      reviewBody: post.verdictSummary ?? post.seoDescription,
      datePublished,
      dateModified,
      author,
      publisher: ORGANIZATION,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: post.verdictScore,
        bestRating: 10,
        worstRating: 1,
      },
      itemReviewed: {
        '@type': 'SoftwareApplication',
        name: post.toolName ?? post.title,
        applicationCategory: categoryTitle || 'AI tool',
        operatingSystem: 'Web',
        ...(post.toolWebsite ? { url: post.toolWebsite } : {}),
        ...(typeof post.priceUSD === 'number'
          ? { offers: { '@type': 'Offer', price: post.priceUSD, priceCurrency: 'USD' } }
          : {}),
      },
    })
  }

  graph.push({
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      ...(categoryTitle
        ? [{ '@type': 'ListItem', position: 2, name: categoryTitle, item: absUrl(`/category/${categorySlug}`) }]
        : []),
      { '@type': 'ListItem', position: categoryTitle ? 3 : 2, name: post.title, item: url },
    ],
  })

  return { '@context': 'https://schema.org', '@graph': graph }
}

/** Build CollectionPage + BreadcrumbList + ItemList for a category page. */
export function buildCategoryJsonLd(
  category: { title: string; slug: { current: string }; description?: string },
  posts: { title: string; slug: { current: string } }[],
) {
  const url = absUrl(`/category/${category.slug.current}`)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#collection`,
        name: `${category.title} — ${SITE_NAME}`,
        description: category.description,
        url,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        inLanguage: 'en',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: category.title, item: url },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#itemlist`,
        itemListElement: posts.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: absUrl(`/${p.slug.current}`),
          name: p.title,
        })),
      },
    ],
  }
}

/** Markdown body for /llms.txt — helps AI answer engines understand + cite the site. */
export function buildLlmsTxt(data: SitemapData): string {
  const lines: string[] = []
  lines.push(`# ${SITE_NAME}`)
  lines.push('')
  lines.push(
    `> Independent, hands-on reviews of AI assistants, coding tools, and writing apps. ` +
      `Every review is based on real usage, scored out of 10, with pros, cons, and a clear verdict. ` +
      `No affiliate links.`,
  )
  lines.push('')
  lines.push('## Reviews')
  for (const p of data.posts ?? []) {
    const desc = p.seoDescription ? `: ${p.seoDescription}` : ''
    lines.push(`- [${p.title}](${absUrl(`/${p.slug}`)})${desc}`)
  }
  lines.push('')
  lines.push('## Categories')
  for (const c of data.categories ?? []) {
    lines.push(`- [${c.title}](${absUrl(`/category/${c.slug}`)})`)
  }
  lines.push('')
  lines.push('## About')
  lines.push(`- [About & review methodology](${absUrl('/about')})`)
  lines.push('')
  return lines.join('\n')
}
