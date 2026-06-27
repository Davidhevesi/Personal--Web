import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteNav } from '@/components/SiteNav'
import { SiteFooter } from '@/components/SiteFooter'
import { ArticleHeader } from '@/components/ArticleHeader'
import { VerdictBox } from '@/components/VerdictBox'
import { TableOfContents } from '@/components/TableOfContents'
import { ComparisonTable } from '@/components/ComparisonTable'
import { ProsConsList } from '@/components/ProsConsList'
import { FAQAccordion } from '@/components/FAQAccordion'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { PortableTextRenderer } from '@/components/PortableTextRenderer'
import { sanityClient } from '@/lib/sanity'
import { postQuery, allPostSlugsQuery } from '@/lib/queries'
import { formatMonthYear } from '@/lib/format'
import type { Post } from '@/lib/types'
import styles from './page.module.css'

export const revalidate = 60

type BodyBlock = {
  _type: string
  _key: string
  style?: string
  children?: { text?: string }[]
}

function getHeadings(body: unknown[] | undefined) {
  if (!body) return []
  return (body as BodyBlock[])
    .filter((block) => block._type === 'block' && block.style === 'h2')
    .map((block) => ({
      id: block._key,
      text: (block.children ?? []).map((child) => child.text ?? '').join(''),
    }))
}

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<{ slug: string }[]>(allPostSlugsQuery)
  return slugs.filter((s) => s.slug).map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await sanityClient.fetch<Post | null>(postQuery, { slug })
  if (!post) return { title: 'Article Not Found' }
  return {
    title: post.title,
    description: post.seoDescription,
    alternates: { canonical: `https://hevesi.studio/${slug}` },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await sanityClient.fetch<Post | null>(postQuery, { slug })

  if (!post) notFound()

  const headings = getHeadings(post.body)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    dateModified: post.updatedAt,
    author: { '@type': 'Person', name: 'David Hevesi' },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />
      <main>
        <div className={styles.container}>
          <ArticleHeader
            category={post.category?.title ?? ''}
            categorySlug={post.category?.slug?.current ?? ''}
            title={post.title}
            updatedAt={formatMonthYear(post.updatedAt)}
            readTime={post.readingTimeMin ?? 5}
          />

          {post.verdictSummary && (
            <VerdictBox
              verdict={post.verdictSummary}
              label={post.verdictLabel ?? ''}
              score={post.verdictScore}
            />
          )}

          <div className={styles.bodyGrid}>
            {headings.length > 0 && <TableOfContents headings={headings} />}

            <div className={styles.bodyCol}>
              {post.body && <PortableTextRenderer value={post.body} />}

              {post.comparisonTable?.headers?.length ? (
                <ComparisonTable
                  headers={post.comparisonTable.headers}
                  rows={post.comparisonTable.rows}
                />
              ) : null}

              {(post.pros?.length || post.cons?.length) ? (
                <ProsConsList pros={post.pros ?? []} cons={post.cons ?? []} />
              ) : null}

              {post.faq?.length ? <FAQAccordion items={post.faq} /> : null}
            </div>
          </div>

          <NewsletterSignup size="inline" />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
