import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'
import { SITE_NAME, SITE_TAGLINE } from '@/lib/seo'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`

export default function OgImage() {
  return renderOgImage({ title: 'Paid social case studies', eyebrow: 'Portfolio' })
}
