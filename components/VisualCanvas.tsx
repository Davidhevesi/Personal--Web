import styles from './VisualCanvas.module.css'

type Variant = 'blank' | 'diagram' | 'cards'

interface VisualCanvasProps {
  eyebrow?: string
  title?: string
  description?: string
  children?: React.ReactNode
  variant?: Variant
}

/**
 * A reusable visual "board" for explaining something inside a post — a framework,
 * diagram, breakdown, or comparison. Calm, rounded, editorial. Looks intentional
 * even when empty (shows a placeholder). Drop it into any post.
 */
export function VisualCanvas({
  eyebrow,
  title,
  description,
  children,
  variant = 'blank',
}: VisualCanvasProps) {
  const hasHeader = Boolean(eyebrow || title || description)
  return (
    <figure className={styles.canvas}>
      {hasHeader && (
        <figcaption className={styles.header}>
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          {title && <h3 className={styles.title}>{title}</h3>}
          {description && <p className={styles.description}>{description}</p>}
        </figcaption>
      )}
      <div className={`${styles.board} ${styles[variant]}`}>
        {children ?? <p className={styles.placeholder}>Add visual framework here</p>}
      </div>
    </figure>
  )
}

interface VisualCanvasCardProps {
  heading: string
  items?: string[]
  children?: React.ReactNode
}

/** A single column/card for the `cards` variant. */
export function VisualCanvasCard({ heading, items, children }: VisualCanvasCardProps) {
  return (
    <div className={styles.card}>
      <h4 className={styles.cardHeading}>{heading}</h4>
      {items && items.length > 0 && (
        <ul className={styles.cardList}>
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
      {children}
    </div>
  )
}
