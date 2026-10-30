import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SiteNav } from '@/components/SiteNav'
import { SiteFooter } from '@/components/SiteFooter'
import { Button } from '@/components/Button'
import { JsonLd } from '@/components/JsonLd'
import { CaseStudyBlock } from '@/components/CaseStudyBlock'
import { CASE_STUDIES, getCaseStudy } from '@/lib/case-studies'
import { SITE_URL, CONTACT_EMAIL, absUrl } from '@/lib/seo'
import styles from './page.module.css'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug)
  if (!study) return {}
  const path = `/work/${study.slug}`
  return {
    title: `Case study: ${study.title}`,
    description: study.summary,
    alternates: { canonical: path },
    openGraph: { type: 'article', url: path, title: study.title, description: study.summary },
    twitter: { title: study.title, description: study.summary },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy((await params).slug)
  if (!study) notFound()
  const number = CASE_STUDIES.indexOf(study) + 1
  const next = CASE_STUDIES[number % CASE_STUDIES.length]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${absUrl(`/work/${study.slug}`)}#article`,
    headline: study.title,
    description: study.summary,
    url: absUrl(`/work/${study.slug}`),
    author: { '@id': `${SITE_URL}/#person` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    inLanguage: 'en',
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <SiteNav />
      <main>
        <article className={styles.container}>
          <header className={styles.header}>
            <Link href="/#case-studies" className={styles.back}>← All case studies</Link>
            <p className={styles.kicker}>
              Case study {number} · {study.eyebrow}
              {study.status === 'Live' && <span className={styles.live}>Live</span>}
            </p>
            <h1 className={styles.title}>{study.title}</h1>
            <p className={styles.lede}>{study.summary}</p>
            {study.updated && <p className={styles.updated}>Updated weekly · Last update {study.updated}</p>}
          </header>

          <dl className={styles.metrics}>
            {study.metrics.map((m) => (
              <div key={m.label} className={styles.metric}>
                <dt className={styles.metricValue}>{m.value}</dt>
                <dd className={styles.metricLabel}>{m.label}</dd>
              </div>
            ))}
          </dl>

          <dl className={styles.facts}>
            {study.facts.map((f) => (
              <div key={f.label} className={styles.fact}>
                <dt className={styles.factLabel}>{f.label}</dt>
                <dd className={styles.factValue}>{f.value}</dd>
              </div>
            ))}
          </dl>

          {study.sections.map((section) => (
            <section key={section.id} id={section.id} className={styles.section}>
              <h2 className={styles.h2}>{section.heading}</h2>
              {section.blocks.map((block, i) => (
                <CaseStudyBlock key={i} block={block} />
              ))}
            </section>
          ))}

          <footer className={styles.cta}>
            <p className={styles.ctaText}>Want to talk about this campaign, or a role where I&apos;d do this work?</p>
            <div className={styles.ctaRow}>
              <Button href={`mailto:${CONTACT_EMAIL}`} variant="primary" arrow>Email me</Button>
              {next !== study && (
                <Button href={`/work/${next.slug}`} variant="secondary">Next: {next.card.title}</Button>
              )}
            </div>
          </footer>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
