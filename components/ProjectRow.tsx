import { Tag } from './Tag'
import type { Project } from '@/lib/projects'
import styles from './ProjectRow.module.css'

interface ProjectRowProps extends Project {
  index?: number
}

export function ProjectRow({ title, kind, href, summary, tags, index }: ProjectRowProps) {
  return (
    <article className={`${styles.row} ${index != null ? styles.numbered : ''}`}>
      {index != null && (
        <span className={styles.index} aria-hidden="true">
          {String(index).padStart(2, '0')}
        </span>
      )}
      <div className={styles.body}>
        <p className={styles.kind}>{kind}</p>
        <a href={href} className={styles.title} target="_blank" rel="noopener noreferrer">
          {title}
          <span className={styles.arrow} aria-hidden="true">↗</span>
        </a>
        <p className={styles.summary}>{summary}</p>
        <div className={styles.tags}>
          {tags.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
      </div>
    </article>
  )
}
