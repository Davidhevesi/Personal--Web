import Link from 'next/link'
import type { Metadata } from 'next'
import { SiteNav } from '@/components/SiteNav'
import { SiteFooter } from '@/components/SiteFooter'
import { ArticleRow } from '@/components/ArticleRow'
import { CategoryChip } from '@/components/CategoryChip'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { sanityClient } from '@/lib/sanity'
import { homepageQuery } from '@/lib/queries'
import { toArticleRowProps } from '@/lib/format'
import type { HomepageData } from '@/lib/types'
import styles from './page.module.css'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'AI Tools Review — Honest Reviews of AI Tools',
  description: 'Independent, in-depth reviews of AI writing, coding, and productivity tools.',
  alternates: { canonical: 'https://hevesi.studio' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AI Tools Review',
  url: 'https://hevesi.studio',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://hevesi.studio/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

export default async function HomePage() {
  const data = await sanityClient.fetch<HomepageData>(homepageQuery)
  const featured = data.featured
  const latest = data.latest ?? []
  const categories = data.categories ?? []

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.inner}>
            <p className={styles.tagline}>
              Honest reviews of AI tools that actually matter.
            </p>
            {featured && (
              <div className={styles.featuredBlock}>
                <Link href={`/category/${featured.category?.slug?.current ?? ''}`} className={styles.featuredCategory}>
                  {featured.category?.title}
                </Link>
                <Link href={`/${featured.slug.current}`} className={styles.featuredTitle}>
                  {featured.title}
                </Link>
                <p className={styles.featuredDeck}>{featured.seoDescription}</p>
                <span className={styles.featuredMeta}>{featured.readingTimeMin ?? 5} min read</span>
              </div>
            )}
          </div>
        </section>

        {/* Latest Articles */}
        <section className={styles.section}>
          <div className={styles.inner}>
            <h2 className={styles.sectionHeading}>Latest Articles</h2>
            {latest.map((article) => (
              <ArticleRow key={article.slug.current} {...toArticleRowProps(article)} />
            ))}
          </div>
        </section>

        {/* Category Strip */}
        <section className={styles.section} style={{ paddingTop: 0 }}>
          <div className={styles.inner}>
            <p className={styles.browseLabel}>Browse by category</p>
            <div className={styles.chips}>
              {categories.map((cat) => (
                <CategoryChip key={cat.slug.current} label={cat.title} href={`/category/${cat.slug.current}`} />
              ))}
            </div>
          </div>
        </section>

        <NewsletterSignup size="full" />
      </main>
      <SiteFooter />
    </>
  )
}
