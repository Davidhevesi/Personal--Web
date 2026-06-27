import type { Metadata } from 'next'
import { lora, ibmPlexSans, ibmPlexMono } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'AI Tools Review',
    template: '%s | AI Tools Review',
  },
  description: 'Independent, in-depth reviews of AI writing, coding, and productivity tools.',
  alternates: { canonical: 'https://hevesi.studio' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${lora.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
