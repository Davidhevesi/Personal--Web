import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og'
import { CASE_STUDIES, getCaseStudy } from '@/lib/case-studies'

export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE
export const alt = 'Case study'

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }))
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
  const study = getCaseStudy((await params).slug)
  return renderOgImage({ title: study?.title ?? 'Case study', eyebrow: 'Case study' })
}
