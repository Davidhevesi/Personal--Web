import Link from 'next/link'
import styles from './Button.module.css'

interface ButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  arrow?: boolean
  /** Opens in a new tab. Use for links that leave the site. */
  external?: boolean
}

export function Button({ href, children, variant = 'primary', arrow = false, external = false }: ButtonProps) {
  const className = `${styles.btn} ${variant === 'primary' ? styles.primary : styles.secondary}`
  const content = (
    <>
      {children}
      {arrow && <span className={styles.arrow} aria-hidden="true">→</span>}
    </>
  )

  if (external || href.startsWith('mailto:')) {
    return (
      <a
        href={href}
        className={className}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }

  return <Link href={href} className={className}>{content}</Link>
}
