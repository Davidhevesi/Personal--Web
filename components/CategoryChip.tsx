import Link from 'next/link'
import styles from './CategoryChip.module.css'

interface CategoryChipProps {
  label: string
  href: string
  active?: boolean
}

export function CategoryChip({ label, href, active }: CategoryChipProps) {
  return (
    <Link
      href={href}
      className={`${styles.chip}${active ? ` ${styles.active}` : ''}`}
    >
      {label}
    </Link>
  )
}
