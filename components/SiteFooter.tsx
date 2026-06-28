import Link from 'next/link'
import styles from './SiteFooter.module.css'

const FOOTER_LINKS = [
  { label: 'AI Assistants', href: '/category/ai-assistants' },
  { label: 'Coding Tools', href: '/category/coding-tools' },
  { label: 'Writing Tools', href: '/category/writing-tools' },
  { label: 'About', href: '/about' },
]

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <Link href="/" className={styles.name}>Hevesi Research</Link>
          <ul className={styles.links}>
            {FOOTER_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.link}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <p className={styles.copy}>© 2026 Hevesi Research. Independent AI tool reviews.</p>
      </div>
    </footer>
  )
}
