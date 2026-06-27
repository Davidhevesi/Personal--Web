import styles from './VerdictBox.module.css'

interface VerdictBoxProps {
  verdict: string
  label: string
  score?: number
}

export function VerdictBox({ verdict, label, score }: VerdictBoxProps) {
  return (
    <div className={styles.box}>
      <div className={styles.content}>
        <span className={styles.label}>Verdict</span>
        <p className={styles.verdict}>{verdict}</p>
        <span className={styles.verdictLabel}>{label}</span>
      </div>
      {score !== undefined && (
        <div className={styles.score}>{score}/10</div>
      )}
    </div>
  )
}
