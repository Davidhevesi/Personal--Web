import Link from 'next/link'
import type { Block } from '@/lib/case-studies'
import styles from './CaseStudyBlock.module.css'

/** Renders one content block of a case study section. */
export function CaseStudyBlock({ block }: { block: Block }) {
  switch (block.type) {
    case 'p':
      return <p className={styles.p}>{block.text}</p>

    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul'
      return (
        <Tag className={block.ordered ? styles.ol : styles.ul}>
          {block.items.map((item, i) => (
            <li key={i}>
              {item.lead && <strong>{item.lead}</strong>} {item.text}
            </li>
          ))}
        </Tag>
      )
    }

    case 'checklist':
      return (
        <ul className={styles.checklist}>
          {block.items.map((item) => (
            <li key={item}>
              <span className={styles.box} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      )

    case 'table':
      return (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                {block.columns.map((c) => (
                  <th key={c} scope="col">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className={r === block.highlightRow ? styles.highlight : undefined}>
                  {row.map((cell, c) =>
                    c === 0 ? <th key={c} scope="row">{cell}</th> : <td key={c}>{cell}</td>,
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'log':
      return (
        <ol className={styles.log}>
          {block.entries.map((e) => (
            <li key={e.date} className={styles.logEntry}>
              <span className={styles.logDate}>{e.date}</span>
              <span className={styles.logText}>{e.text}</span>
            </li>
          ))}
        </ol>
      )

    case 'source':
      return <p className={styles.source}>{block.text}</p>

    case 'link':
      return (
        <Link href={block.href} className={styles.link}>
          {block.label} <span aria-hidden="true" className={styles.arrow}>→</span>
        </Link>
      )
  }
}
