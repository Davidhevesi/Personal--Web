'use client'

import { PortableText } from '@portabletext/react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components: any = {
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
