import styles from './ProsConsList.module.css'

interface ProsConsListProps {
  pros: string[]
  cons: string[]
}

export function ProsConsList({ pros, cons }: ProsConsListProps) {
  return (
    <div className={styles.grid}>
      <div className={styles.col}>
        <p className={styles.colHeading}>Pros</p>
        <ul className={styles.list}>
          {pros.map((item, i) => (
            <li key={i} className={styles.pro}>{item}</li>
          ))}
        </ul>
      </div>
      <div className={styles.col}>
        <p className={styles.colHeading}>Cons</p>
        <ul className={styles.list}>
          {cons.map((item, i) => (
            <li key={i} className={styles.con}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
