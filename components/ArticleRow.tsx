import Link from 'next/link'
import styles from './ArticleRow.module.css'

interface ArticleRowProps {
  category: string
  categorySlug: string
  title: string
  deck: string
  date: string
  readTime: number
  slug: string
  index?: number
}

export function ArticleRow({ category, categorySlug, title, deck, date, readTime, slug, index }: ArticleRowProps) {
  return (
    <article className={`${styles.row} ${index != null ? styles.numbered : ''}`}>
      {index != null && (
        <span className={styles.index} aria-hidden="true">
          {String(index).padStart(2, '0')}
        </span>
      )}
      <div className={styles.body}>
        <Link href={`/category/${categorySlug}`} className={styles.category}>
          {category}
        </Link>
        <Link href={`/${slug}`} className={styles.title}>
          {title}
        </Link>
        <p className={styles.deck}>{deck}</p>
        <p className={styles.meta}>{date} · {readTime} min read</p>
      </div>
    </article>
  )
}
