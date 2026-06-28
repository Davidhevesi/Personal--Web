import Link from 'next/link'
import styles from './Button.module.css'

interface ButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  arrow?: boolean
}

export function Button({ href, children, variant = 'primary', arrow = false }: ButtonProps) {
  const className = `${styles.btn} ${variant === 'primary' ? styles.primary : styles.secondary}`
  return (
    <Link href={href} className={className}>
      {children}
      {arrow && <span className={styles.arrow} aria-hidden="true">→</span>}
    </Link>
  )
}
