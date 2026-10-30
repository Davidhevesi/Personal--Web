'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { SITE_NAME, CONTACT_EMAIL, LINKEDIN_URL } from '@/lib/seo'
import styles from './SiteNav.module.css'

const NAV_LINKS = [
  { label: 'Case studies', href: '/#case-studies' },
  { label: 'Contact', href: '/#contact' },
  { label: 'LinkedIn', href: LINKEDIN_URL },
]

export function SiteNav() {
  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          {SITE_NAME}
        </Link>

        <div className={styles.right}>
          <ul className={styles.links}>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={`mailto:${CONTACT_EMAIL}`} className={styles.subscribe}>
            Get in touch
          </a>
        </div>

        <button
          className={styles.hamburger}
          aria-label="Open menu"
          onClick={() => dialogRef.current?.showModal()}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M3 5h14M3 10h14M3 15h14" />
          </svg>
        </button>
      </div>

      <dialog ref={dialogRef} className={styles.dialog}>
        <div className={styles.dialogInner}>
          <div className={styles.dialogHeader}>
            <Link href="/" className={styles.logo} onClick={() => dialogRef.current?.close()}>
              {SITE_NAME}
            </Link>
            <button
              className={styles.dialogClose}
              aria-label="Close menu"
              onClick={() => dialogRef.current?.close()}
            >
              ×
            </button>
          </div>
          <ul className={styles.dialogLinks}>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={styles.dialogLink}
                  onClick={() => dialogRef.current?.close()}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={`mailto:${CONTACT_EMAIL}`} className={styles.dialogSubscribe}>
            Get in touch
          </a>
        </div>
      </dialog>
    </nav>
  )
}
