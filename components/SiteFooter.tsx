import Link from 'next/link'
import { SITE_NAME, SITE_TAGLINE, CONTACT_EMAIL, LINKEDIN_URL } from '@/lib/seo'
import styles from './SiteFooter.module.css'

const FOOTER_LINKS = [
  { label: 'Case studies', href: '/#case-studies' },
  { label: 'LinkedIn', href: LINKEDIN_URL },
  { label: 'Email', href: `mailto:${CONTACT_EMAIL}` },
]

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <Link href="/" className={styles.name}>{SITE_NAME}</Link>
          <ul className={styles.links}>
            {FOOTER_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={styles.link}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <p className={styles.copy}>© {new Date().getFullYear()} {SITE_NAME}. {SITE_TAGLINE}.</p>
      </div>
    </footer>
  )
}
