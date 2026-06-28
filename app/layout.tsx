import type { Metadata } from 'next'
import { spaceGrotesk, ibmPlexSans, ibmPlexMono } from '@/lib/fonts'
import { JsonLd } from '@/components/JsonLd'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_LOCALE, AUTHOR, ORGANIZATION, TWITTER_HANDLE } from '@/lib/seo'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Honest, independent AI tool reviews`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
  creator: AUTHOR.name,
  publisher: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    url: SITE_URL,
    title: `${SITE_NAME} — Honest, independent AI tool reviews`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Honest, independent AI tool reviews`,
    description: SITE_DESCRIPTION,
    ...(TWITTER_HANDLE ? { creator: TWITTER_HANDLE, site: TWITTER_HANDLE } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    ORGANIZATION,
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en',
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <JsonLd data={websiteJsonLd} />
        {children}
      </body>
    </html>
  )
}
