import Link from 'next/link'
import type { Metadata } from 'next'
import { SiteNav } from '@/components/SiteNav'
import { SiteFooter } from '@/components/SiteFooter'
import { ArticleRow } from '@/components/ArticleRow'
import { CategoryChip } from '@/components/CategoryChip'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { Button } from '@/components/Button'
import { sanityClient } from '@/lib/sanity'
import { homepageQuery } from '@/lib/queries'
import { toArticleRowProps } from '@/lib/format'
import type { HomepageData } from '@/lib/types'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/seo'
import styles from './page.module.css'

export const revalidate = 60

export const metadata: Metadata = {
  title: `${SITE_NAME} — Honest, independent AI tool reviews`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: { url: '/', title: `${SITE_NAME} — Honest, independent AI tool reviews`, description: SITE_DESCRIPTION },
}

export default async function HomePage() {
  const data = await sanityClient.fetch<HomepageData>(homepageQuery)
  const featured = data.featured
  const latest = data.latest ?? []
  const categories = data.categories ?? []
  const reviewCount = data.reviewCount ?? latest.length

  return (
    <>
      <SiteNav />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.inner}>
            <h1 className={styles.headline}>
              Honest reviews of<br />the AI tools you use.
            </h1>
            <p className={styles.subhead}>
              Independent, hands-on testing of AI assistants, coding tools, and writing apps —
              so you know what&apos;s worth paying for before you spend a cent.
            </p>
            <div className={styles.ctaRow}>
              <Button href="#latest" variant="primary" arrow>Browse reviews</Button>
              <Button href="#newsletter" variant="secondary">Subscribe</Button>
            </div>

            {/* Honest, content-derived stats — no traffic claims */}
            <dl className={styles.stats}>
              <div className={styles.stat}>
                <dt className={styles.statNum}>{reviewCount}</dt>
                <dd className={styles.statLabel}>in-depth reviews</dd>
              </div>
              <div className={styles.stat}>
                <dt className={styles.statNum}>{categories.length}</dt>
                <dd className={styles.statLabel}>categories</dd>
              </div>
              <div className={styles.stat}>
                <dt className={styles.statNum}>0</dt>
                <dd className={styles.statLabel}>affiliate links</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* Featured */}
        {featured && (
          <section className={styles.featuredSection}>
            <div className={styles.inner}>
              <p className={styles.kicker}>Featured</p>
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
            </div>
          </section>
        )}

        {/* Latest Articles */}
        <section id="latest" className={styles.section}>
          <div className={styles.inner}>
            <h2 className={styles.sectionHeading}>Latest reviews</h2>
            <div className={styles.list}>
              {latest.map((article, i) => (
                <ArticleRow key={article.slug.current} index={i + 1} {...toArticleRowProps(article)} />
              ))}
            </div>
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

        <div id="newsletter">
          <NewsletterSignup size="full" />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
