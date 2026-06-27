import Link from 'next/link'
import styles from './ArticleHeader.module.css'

interface ArticleHeaderProps {
  category: string
  categorySlug: string
  title: string
  updatedAt: string
  readTime: number
}

export function ArticleHeader({ category, categorySlug, title, updatedAt, readTime }: ArticleHeaderProps) {
  return (
    <header className={styles.header}>
      <Link href={`/category/${categorySlug}`} className={styles.category}>
        {category}
      </Link>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.meta}>Last updated {updatedAt} · {readTime} min read</p>
    </header>
  )
}
