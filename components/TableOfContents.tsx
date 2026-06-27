'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './TableOfContents.module.css'

interface Heading {
  id: string
  text: string
}

interface TableOfContentsProps {
  headings: Heading[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [headings])

  const linkList = (
    <ul className={styles.list}>
      {headings.map(({ id, text }) => (
        <li key={id} className={styles.item}>
          <a
            href={`#${id}`}
            className={activeId === id ? styles.activeLink : undefined}
          >
            {text}
          </a>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      {/* Desktop sticky */}
      <nav className={styles.toc} aria-label="Table of contents">
        <span className={styles.heading}>Contents</span>
        {linkList}
      </nav>

      {/* Mobile collapsed */}
      <details className={styles.details}>
        <summary className={styles.summary}>Contents ▾</summary>
        {linkList}
      </details>
    </>
  )
}
