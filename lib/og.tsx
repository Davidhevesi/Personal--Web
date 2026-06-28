import { ImageResponse } from 'next/og'
import { SITE_NAME } from '@/lib/seo'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

const BG = '#fcfcfc'
const INK = '#141517'
const MUTED = '#6b6f76'
const ACCENT = '#0f6e74'

/** Shared 1200x630 OG/Twitter card used by home + post routes. */
export function renderOgImage({
  title,
  eyebrow,
  score,
}: {
  title: string
  eyebrow?: string
  score?: number
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: BG,
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: INK,
              color: BG,
              fontSize: 28,
              fontWeight: 700,
              borderRadius: 8,
            }}
          >
            H
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: INK, letterSpacing: '-0.02em' }}>
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {eyebrow ? (
            <div
              style={{
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: ACCENT,
                marginBottom: 20,
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              fontSize: title.length > 60 ? 60 : 74,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: INK,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 24, color: MUTED }}>
            Independent, hands-on AI tool reviews
          </div>
          {typeof score === 'number' ? (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, color: ACCENT }}>
              <span style={{ fontSize: 56, fontWeight: 700, letterSpacing: '-0.02em' }}>{score}</span>
              <span style={{ fontSize: 28, fontWeight: 600, color: MUTED }}>/10</span>
            </div>
          ) : null}
        </div>
      </div>
    ),
    { ...OG_SIZE },
  )
}
