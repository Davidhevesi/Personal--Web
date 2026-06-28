import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'
import { SITE_NAME } from '@/lib/seo'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = `${SITE_NAME} — honest, independent AI tool reviews`

export default function OgImage() {
  return renderOgImage({
    title: 'Honest reviews of the AI tools you use.',
    eyebrow: SITE_NAME,
  })
}
