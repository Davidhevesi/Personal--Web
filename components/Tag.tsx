import styles from './Tag.module.css'

export function Tag({ label }: { label: string }) {
  return <span className={styles.tag}>{label}</span>
}
