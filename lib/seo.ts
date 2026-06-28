/**
 * Central SEO / site identity config. Single source of truth for the canonical
 * domain, brand, author, and structured-data entities. Everything that needs a
 * URL or brand fact imports from here so nothing is hardcoded.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hevesi.studio'
).replace(/\/$/, '')

export const SITE_NAME = 'Hevesi Research'

export const SITE_DESCRIPTION =
  'Independent, hands-on reviews of AI assistants, coding tools, and writing apps — so you know what is worth paying for before you spend a cent.'

export const SITE_LOCALE = 'en_US'

export const AUTHOR = {
  name: 'David Hevesi',
  url: `${SITE_URL}/about`,
}

/** Public profiles used for Organization/Person `sameAs`. Keep only real ones. */
export const SOCIAL_LINKS = ['https://github.com/Davidhevesi']

export const TWITTER_HANDLE = '' // e.g. '@hevesiresearch' once it exists

/** Build an absolute URL from a path ('/about' -> 'https://hevesi.studio/about'). */
export function absUrl(path = '/'): string {
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`
}

/** Organization entity reused across JSON-LD graphs. */
export const ORGANIZATION = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: absUrl('/icon'),
  },
  sameAs: SOCIAL_LINKS,
} as const

/** Person entity (the author) reused across JSON-LD graphs. */
export const PERSON = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: AUTHOR.name,
  url: AUTHOR.url,
  sameAs: SOCIAL_LINKS,
} as const
