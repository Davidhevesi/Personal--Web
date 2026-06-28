import type { Metadata } from 'next'
import { SiteNav } from '@/components/SiteNav'
import { SiteFooter } from '@/components/SiteFooter'
import { JsonLd } from '@/components/JsonLd'
import { SITE_NAME, SITE_URL, AUTHOR, PERSON, absUrl } from '@/lib/seo'
import styles from './page.module.css'

const title = 'About & review methodology'
const description = `Who writes ${SITE_NAME}, and how every AI tool is tested, scored, and reviewed — independently, with affiliate links always disclosed.`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/about' },
  openGraph: { type: 'profile', url: '/about', title, description },
  twitter: { title, description },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': `${SITE_URL}/about#aboutpage`,
      url: absUrl('/about'),
      name: title,
      description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#person` },
      inLanguage: 'en',
    },
    {
      ...PERSON,
      description:
        'Independent reviewer of AI assistants, coding tools, and writing apps. Tests every tool hands-on before publishing a scored verdict.',
      jobTitle: 'AI tools reviewer',
      knowsAbout: ['AI assistants', 'AI coding tools', 'AI writing tools', 'developer tooling'],
    },
  ],
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <SiteNav />
      <main>
        <div className={styles.container}>
          <header className={styles.header}>
            <p className={styles.kicker}>About</p>
            <h1 className={styles.title}>Honest reviews, from someone who actually uses the tools.</h1>
            <p className={styles.lede}>
              {SITE_NAME} is written by {AUTHOR.name}. Every review here comes from real, daily,
              paid-for use — not press releases, demos, or vendor talking points.
            </p>
          </header>

          <section className={styles.section}>
            <h2 className={styles.h2}>Who writes this</h2>
            <p className={styles.p}>
              I&apos;m {AUTHOR.name}. I build software and use AI tools every day for writing, coding,
              and research. {SITE_NAME} exists because most &ldquo;best AI tool&rdquo; articles are
              thin, SEO-farmed, and optimised for clicks over the truth. I wanted the opposite: a
              small number of deeply-tested reviews I&apos;d actually trust myself.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>How we test</h2>
            <p className={styles.p}>Every review follows the same process so the scores mean something:</p>
            <ol className={styles.steps}>
              <li><strong>Pay for it.</strong> Tools are tested on real paid plans, not trial accounts or vendor comps.</li>
              <li><strong>Use it for real work.</strong> At least a few weeks of genuine day-to-day use across the tasks the tool claims to be good at.</li>
              <li><strong>Push the limits.</strong> We test where tools break — long context, edge cases, rate limits, and the unglamorous daily friction.</li>
              <li><strong>Compare honestly.</strong> Each tool is judged against its real alternatives at the same price point.</li>
              <li><strong>Score out of 10</strong> with a plain-English verdict, concrete pros and cons, and clear guidance on who it&apos;s for.</li>
            </ol>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>How we stay independent</h2>
            <p className={styles.p}>
              Some posts use affiliate links — if you buy through one it helps support the site at no
              extra cost to you, and it&apos;s always disclosed at the top of the page. What never
              happens: paid placements, sponsored reviews, or a vendor changing a verdict. Affiliate
              links only ever point to tools I already pay for and recommend. You should be able to act
              on a verdict here without wondering what I got paid to say it.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.h2}>Get in touch</h2>
            <p className={styles.p}>
              Spotted something wrong, or want a tool reviewed? Reach out on{' '}
              <a className={styles.link} href="https://github.com/Davidhevesi" target="_blank" rel="noopener noreferrer">GitHub</a>.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
