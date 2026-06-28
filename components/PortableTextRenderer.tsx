'use client'

import { PortableText } from '@portabletext/react'
import { ComparisonTable } from './ComparisonTable'
import { VisualCanvas, VisualCanvasCard } from './VisualCanvas'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components: any = {
  types: {
    // Inline data table (reuses the same component as the standalone field).
    dataTable: ({ value }: { value: { headers?: string[]; rows?: { cells: string[] }[] } }) => (
      <ComparisonTable headers={value.headers ?? []} rows={value.rows ?? []} />
    ),
    // Reusable visual board (frameworks / breakdowns / diagrams).
    visualCanvas: ({
      value,
    }: {
      value: {
        variant?: 'blank' | 'diagram' | 'cards'
        eyebrow?: string
        title?: string
        description?: string
        columns?: { heading: string; items?: string[] }[]
      }
    }) => (
      <VisualCanvas
        variant={value.variant}
        eyebrow={value.eyebrow}
        title={value.title}
        description={value.description}
      >
        {value.columns?.length
          ? value.columns.map((col, i) => (
              <VisualCanvasCard key={i} heading={col.heading} items={col.items} />
            ))
          : undefined}
      </VisualCanvas>
    ),
  },
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => <p>{children}</p>,
    h2: ({ children, value }: { children?: React.ReactNode; value: { _key?: string } }) => (
      <h2 id={value._key}>{children}</h2>
    ),
    h3: ({ children, value }: { children?: React.ReactNode; value: { _key?: string } }) => (
      <h3 id={value._key}>{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote>{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => <strong>{children}</strong>,
    em: ({ children }: { children?: React.ReactNode }) => <em>{children}</em>,
    code: ({ children }: { children?: React.ReactNode }) => <code>{children}</code>,
    link: ({ value, children }: { value?: { href: string }; children?: React.ReactNode }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
}

export function PortableTextRenderer({ value }: { value: unknown[] }) {
  return (
    <div className="prose">
      <PortableText value={value as Parameters<typeof PortableText>[0]['value']} components={components} />
    </div>
  )
}
