import { SiteNav } from '@/components/SiteNav'
import { SiteFooter } from '@/components/SiteFooter'
import { CaseStudyCard } from '@/components/CaseStudyCard'
import { Button } from '@/components/Button'
import { JsonLd } from '@/components/JsonLd'
import { CASE_STUDIES } from '@/lib/case-studies'
import { SITE_URL, SITE_NAME, SITE_TAGLINE, CONTACT_EMAIL, LINKEDIN_URL, absUrl } from '@/lib/seo'
import styles from './page.module.css'

const workJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE_URL}/#case-studies`,
  name: 'Case studies',
  itemListElement: CASE_STUDIES.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: absUrl(`/work/${c.slug}`),
    name: c.title,
  })),
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={workJsonLd} />
      <SiteNav />
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.inner}>
            <p className={styles.kicker}>{SITE_NAME} · {SITE_TAGLINE}</p>
            <h1 className={styles.headline}>Paid social case studies</h1>
            <p className={styles.subhead}>
              From one boosted reel to a full Meta campaign. Pick one to read.
            </p>
          </div>
        </section>

        {/* Case studies */}
        <section id="case-studies" className={styles.caseStudies}>
          <div className={styles.inner}>
            <h2 className={styles.visuallyHidden}>Case studies</h2>
            <div className={styles.cards}>
              {CASE_STUDIES.map((study, i) => (
                <CaseStudyCard key={study.slug} study={study} number={i + 1} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className={styles.contact}>
          <div className={styles.inner}>
            <p className={styles.kicker}>Contact</p>
            <h2 className={styles.contactHeading}>Let&apos;s talk.</h2>
            <p className={styles.subhead}>
              I&apos;m looking for my next role in paid social and growth marketing. Email is the
              fastest way to reach me.
            </p>
            <div className={styles.ctaRow}>
              <Button href={`mailto:${CONTACT_EMAIL}`} variant="primary" arrow>{CONTACT_EMAIL}</Button>
              <Button href={LINKEDIN_URL} variant="secondary" external>LinkedIn</Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
