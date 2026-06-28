'use client'

import Link from 'next/link'
import { useRef } from 'react'
import styles from './SiteNav.module.css'

const NAV_LINKS = [
  { label: 'AI Assistants', href: '/category/ai-assistants' },
  { label: 'Coding Tools', href: '/category/coding-tools' },
  { label: 'Writing Tools', href: '/category/writing-tools' },
]

export function SiteNav() {
  const dialogRef = useRef<HTMLDialogElement>(null)

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Hevesi Research
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
          <Link href="/#newsletter" className={styles.subscribe}>
            Subscribe
          </Link>
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
              Hevesi Research
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
          <Link
            href="/#newsletter"
            className={styles.dialogSubscribe}
            onClick={() => dialogRef.current?.close()}
          >
            Subscribe
          </Link>
        </div>
      </dialog>
    </nav>
  )
}
