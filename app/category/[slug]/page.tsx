import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteNav } from '@/components/SiteNav'
import { SiteFooter } from '@/components/SiteFooter'
import { ArticleRow } from '@/components/ArticleRow'
import { CategoryChip } from '@/components/CategoryChip'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { sanityClient } from '@/lib/sanity'
import { categoryPageQuery, allCategorySlugsQuery } from '@/lib/queries'
import { toArticleRowProps } from '@/lib/format'
import type { Category, PostSummary } from '@/lib/types'
import styles from './page.module.css'

export const revalidate = 60

type CategoryPageData = {
  category: Pick<Category, 'title' | 'slug' | 'description'> | null
  posts: PostSummary[]
  categories: Pick<Category, 'title' | 'slug'>[]
}

export async function generateStaticParams() {
  const slugs = await sanityClient.fetch<{ slug: string }[]>(allCategorySlugsQuery)
  return slugs.filter((s) => s.slug).map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const data = await sanityClient.fetch<CategoryPageData>(categoryPageQuery, { slug })
  if (!data.category) return { title: 'Category Not Found' }
  return {
    title: `${data.category.title} Reviews`,
    description: data.category.description,
    alternates: { canonical: `https://hevesi.studio/category/${slug}` },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await sanityClient.fetch<CategoryPageData>(categoryPageQuery, { slug })

  if (!data.category) notFound()

  const { category, posts, categories } = data

  return (
    <>
      <SiteNav />
      <main>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>{category.title}</h1>
            {category.description && (
              <p className={styles.description}>{category.description}</p>
            )}
            <p className={styles.count}>{posts.length} article{posts.length !== 1 ? 's' : ''}</p>
          </header>

          <div className={styles.filterStrip}>
            {categories.map((cat) => (
              <CategoryChip
                key={cat.slug.current}
                label={cat.title}
                href={`/category/${cat.slug.current}`}
                active={cat.slug.current === slug}
              />
            ))}
          </div>

          <div className={styles.articles}>
            {posts.length > 0 ? (
              posts.map((post) => (
                <ArticleRow key={post.slug.current} {...toArticleRowProps(post)} />
              ))
            ) : (
              <p style={{ paddingTop: '48px', fontFamily: 'var(--font-sans)', color: 'var(--text-muted)' }}>
                No articles in this category yet.
              </p>
            )}
          </div>
        </div>

        <NewsletterSignup size="inline" />
      </main>
      <SiteFooter />
    </>
  )
}
