import Link from 'next/link'
import type { CaseStudy } from '@/lib/case-studies'
import styles from './CaseStudyCard.module.css'

export function CaseStudyCard({ study, number }: { study: CaseStudy; number: number }) {
  return (
    <Link href={`/work/${study.slug}`} className={styles.card}>
      <p className={styles.kicker}>
        Case study {number} · {study.status === 'Live' ? 'Live now' : study.eyebrow.split(' · ')[0]}
        {study.status === 'Live' && <span className={styles.dot} aria-hidden="true" />}
      </p>
      <h3 className={styles.title}>{study.card.title}</h3>
      <p className={styles.value}>{study.card.value}</p>
      <p className={styles.label}>{study.card.label}</p>
      <span className={styles.read}>
        Read case study <span aria-hidden="true" className={styles.arrow}>→</span>
      </span>
    </Link>
  )
}
