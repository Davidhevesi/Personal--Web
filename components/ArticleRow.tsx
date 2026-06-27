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
}

export function ArticleRow({ category, categorySlug, title, deck, date, readTime, slug }: ArticleRowProps) {
  return (
    <article className={styles.row}>
      <Link href={`/category/${categorySlug}`} className={styles.category}>
        {category}
      </Link>
      <Link href={`/${slug}`} className={styles.title}>
        {title}
      </Link>
      <p className={styles.deck}>{deck}</p>
      <p className={styles.meta}>{date} · {readTime} min read</p>
    </article>
  )
}
