import styles from './NewsletterSignup.module.css'

interface NewsletterSignupProps {
  size?: 'full' | 'inline'
}

export function NewsletterSignup({ size = 'full' }: NewsletterSignupProps) {
  const isFull = size === 'full'

  return (
    <section className={isFull ? styles.sectionFull : styles.sectionInline}>
      <div className={styles.inner}>
        <h2 className={isFull ? styles.headlineFull : styles.headlineInline}>
          Get the honest take on AI tools.
        </h2>
        <p className={`${styles.desc}${!isFull ? ` ${styles.descInline}` : ''}`}>
          One email when a review goes live. No newsletters, no noise.
        </p>
        <form className={styles.form} action="#" method="POST">
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            className={styles.input}
            aria-label="Email address"
          />
          <button type="submit" className={styles.button}>
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}
