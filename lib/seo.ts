/**
 * Central SEO / site identity config. Single source of truth for the canonical
 * domain, name, contact details, and structured-data entities. Everything that
 * needs a URL or identity fact imports from here so nothing is hardcoded.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://davidhevesi.com'
).replace(/\/$/, '')

export const SITE_NAME = 'David Hevesi'

export const SITE_TAGLINE = 'Paid social and growth marketing'

export const SITE_DESCRIPTION =
  'Paid social case studies from David Hevesi: from one boosted Instagram reel to a full Meta campaign that cut cost per qualified lead in half.'

export const SITE_LOCALE = 'en_US'

export const CONTACT_EMAIL = 'davidhevesi@protonmail.com'

export const LINKEDIN_URL = 'https://www.linkedin.com/in/dhevesi/'

/** Public profiles used for Person `sameAs`. Keep only real ones. */
export const SOCIAL_LINKS = [LINKEDIN_URL]

export const TWITTER_HANDLE = '' // e.g. '@davidhevesi' once it exists

/** Build an absolute URL from a path ('/work' -> 'https://davidhevesi.com/work'). */
export function absUrl(path = '/'): string {
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`
}

/** Person entity reused across JSON-LD graphs. */
export const PERSON = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: SITE_TAGLINE,
  email: `mailto:${CONTACT_EMAIL}`,
  sameAs: SOCIAL_LINKS,
} as const
