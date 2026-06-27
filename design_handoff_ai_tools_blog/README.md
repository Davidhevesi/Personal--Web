# Handoff: AI Tools Blog

## Overview

A minimal, editorial SEO blog for reviewing AI tools. The first article is "Is Claude Pro Worth It in 2026?" The site is designed to feel like a smart research desk — trustworthy, calm, and useful — not a SaaS product page or AI startup landing page.

**Stack:** Next.js (App Router) · Sanity CMS · Newsletter signup (ConvertKit / Beehiiv)

---

## About the Design Files

`Design Handoff.html` is a **design specification document** created in HTML — not production code to ship directly. It is a reference document containing the visual system, page structures, component list, color tokens, typography scale, spacing rules, Sanity content model, and anti-pattern guidance.

Your task is to **implement this design in Next.js** using the spec as your authoritative source of truth. Do not copy the HTML directly. Recreate the design using React components, CSS Modules, and Sanity's `@sanity/client` + Portable Text libraries.

---

## Fidelity

**High-fidelity spec.** The design document defines exact:
- Color tokens (in `oklch`)
- Typography scale (font families, sizes, weights, line-heights)
- Spacing values (4px base unit scale)
- Component structure and layout rules
- Sanity content fields and types
- Mobile breakpoint behavior

Implement the UI precisely to this spec. Do not substitute fonts, colors, or layout patterns.

---

## Pages

### 1. Homepage — `/`

**Purpose:** Entry point. Communicates the site's purpose, surfaces the featured article and latest posts, offers newsletter signup.

**Sections (top to bottom):**
- `SiteNav` — logo left, nav links right. Mobile: hamburger → slide-in drawer.
- `Hero` — typographic only (no image). Site tagline in Lora Display (~48px). Featured article block directly below: category label (mono, uppercase) → article title (serif, large) → one-sentence hook → read time. `border-bottom` separates from article list. Padding: 80px top, 72px bottom.
- `LatestArticles` — 2-column grid on desktop, 1-column on mobile. Each `ArticleRow`: category label · title · one-line deck · date + read time. Separated by hairline `border-bottom`. No card backgrounds.
- `CategoryStrip` — horizontal row of `CategoryChip` components. Wrap on desktop, horizontal scroll on mobile.
- `NewsletterSignup` — full-width section, `--bg-subtle` background, 96px vertical padding. Centered single column: Lora headline (~30px) · description · email input + button inline (44px height). Stack on mobile.
- `SiteFooter` — site name, nav links, copyright. No decoration.

---

### 2. Blog Post — `/[slug]`

**Purpose:** The primary content page. Reader arrives from search or homepage.

**Sections (top to bottom):**
- `SiteNav`
- `ArticleHeader` — category label (mono, accent color) · H1 in Lora Display · updated date + read time in muted mono. `border-bottom` below. 56px top padding.
- `VerdictBox` — appears before TOC/body. `--bg-subtle` background, 3px `--accent` left border, 24px padding. Contains: 2–3 sentence verdict + verdict label string + optional score (1–10).
- `ArticleBody` with `TableOfContents` — body column max-width 680px; TOC sticky sidebar 260px wide on screens ≥1100px (CSS Grid layout). TOC uses `IntersectionObserver` to highlight active H2. On mobile: TOC collapses to a dropdown above the body.
- `ComparisonTable` — inline within body. Simple `<table>`, sticky first column on mobile, `overflow-x: auto` wrapper. Header row gets `--bg-subtle`.
- `ProsConsList` — two columns side by side on desktop, stacked on mobile. Pros: faint green-accent left border. Cons: amber left border. Plain bullet lists, no icons.
- `FAQAccordion` — expandable with CSS `max-height` transition. Add `FAQPage` JSON-LD schema.
- `NewsletterSignup` — inline variant (same component, compact size prop).
- `SiteFooter`

---

### 3. Category Page — `/category/[slug]`

**Purpose:** Lists all articles in a category. Entry point from nav or category chips.

**Sections:**
- `SiteNav` — active category highlighted in nav
- `CategoryHeader` — H1 (Lora) · one-sentence description · article count in muted mono
- `TopicFilterStrip` — horizontal chip row for sub-topic filtering within category
- `ArticleList` — same `ArticleRow` pattern as homepage
- `NewsletterSignup` — compact inline version
- `SiteFooter`

---

## Design Tokens

Define all tokens as CSS custom properties in `globals.css` under `:root`. Use these exact names:

```css
:root {
  /* Backgrounds */
  --bg:            oklch(97.5% 0.007 78);   /* warm cream canvas */
  --bg-subtle:     oklch(93.5% 0.010 74);   /* section backgrounds */
  --bg-inset:      oklch(90%   0.012 74);   /* code blocks, chips */

  /* Text */
  --text:          oklch(17%  0.018 68);    /* primary — warm near-black */
  --text-mid:      oklch(42%  0.018 68);    /* secondary */
  --text-muted:    oklch(60%  0.012 68);    /* metadata, labels */

  /* Accent */
  --accent:        oklch(38%  0.082 192);   /* deep teal — links, CTA button, VerdictBox border */
  --accent-mid:    oklch(55%  0.055 192);   /* link color in body text */
  --accent-bg:     oklch(95%  0.025 192);   /* callout backgrounds */

  /* Semantic */
  --warn:          oklch(58%  0.13  55);    /* amber — Cons border, verdicts only */
  --warn-bg:       oklch(96%  0.025 78);

  /* Borders */
  --border:        oklch(86%  0.010 74);
  --border-strong: oklch(75%  0.015 74);
}
```

---

## Typography

Use `next/font/google` to self-host all fonts. This eliminates external font requests and ensures CLS = 0.

```ts
// lib/fonts.ts
import { Lora, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'

export const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
})

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})
```

Apply all three `variable` classes to the `<html>` element in `app/layout.tsx`.

**Scale:**

| Role        | Font              | Size  | Weight | Line-height | Usage                    |
|-------------|-------------------|-------|--------|-------------|--------------------------|
| Display     | Lora (serif)      | 48px  | 400    | 1.15        | Hero article title       |
| H1          | Lora              | 36px  | 500    | 1.25        | Page titles              |
| H2          | Lora              | 26px  | 500    | 1.3         | Article section headings |
| H3          | IBM Plex Sans     | 17px  | 600    | 1.4         | Sub-sections             |
| Body        | IBM Plex Sans     | 17px  | 400    | 1.72        | Article body copy        |
| Meta/Small  | IBM Plex Sans     | 13px  | 400    | —           | Date, read time          |
| Label       | IBM Plex Mono     | 11px  | 400    | —           | Category, tags (uppercase, 0.08em tracking) |

- Article body: `max-width: 680px`, `text-wrap: pretty`
- No justified text anywhere
- Paragraph spacing: `margin-bottom: 1em`

---

## Spacing

Base unit: **4px**. Use multiples only.

Common values: `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`

- Page max-width: `1160px`, centered
- Side padding (mobile): `16px`
- Section gap (homepage): `96px`
- Card/component internal padding: `24px`
- Compact component padding: `16px`
- Border-radius maximum: `4px` (never use 12px+ radii)

---

## Components

Build each as a standalone React component in `components/`. Use CSS Modules for per-component styles.

| Component            | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| `ArticleRow`         | Category label · title · deck · date · read time. No card background.      |
| `ArticleHeader`      | Post page header — category, H1, meta (date, read time)                     |
| `VerdictBox`         | Accent left border, bg-subtle background, verdict text + label + score     |
| `TableOfContents`    | Desktop: sticky sidebar. Mobile: collapsed dropdown. IntersectionObserver. |
| `ComparisonTable`    | Responsive table, sticky first column, overflow-x scroll wrapper           |
| `ProsConsList`       | Two-column layout, color-coded left borders                                 |
| `FAQAccordion`       | CSS max-height transition, FAQPage JSON-LD schema output                   |
| `NewsletterSignup`   | Two sizes: `full` (homepage section) and `inline` (post page CTA)          |
| `CategoryChip`       | 28px tall pill, bg-inset default, bg-accent when active                    |
| `SiteNav`            | Logo + links. Mobile: hamburger → drawer (no JS framework needed, CSS only)|
| `SiteFooter`         | Site name, nav links, copyright                                             |
| `PortableTextRenderer` | Maps Sanity block content to styled HTML via `@portabletext/react`       |

**Write a `.prose` stylesheet** that covers all output of `PortableTextRenderer`: `p, ul, ol, blockquote, h2, h3, strong, a, code, pre`. Do not use Tailwind Typography plugin.

---

## Interactions & Behavior

- **TOC active state:** `IntersectionObserver` watching all `h2[id]` elements in the article. When an H2 enters the viewport, mark its TOC link as active with `--accent` color. Only one active at a time.
- **FAQ Accordion:** Toggle `open` state on click. Animate with `max-height: 0 → max-height: 500px` (or measured height) and `overflow: hidden`. Easing: `ease-out`, `200ms`.
- **Mobile Nav Drawer:** CSS-only if possible (`:target` or `<dialog>`). If JS needed, keep it minimal — no animation library.
- **Newsletter form:** Plain `<form action="[provider-endpoint]" method="POST">`. Progressively enhance with a small React component only if you need AJAX + success state. No full modal.
- **Category chip filter:** Client component. Filter the article list in-memory (no page reload). If article count is large (>50), use URL query params instead so filtering is shareable.

---

## Sanity Content Model

### Document: `post`

| Field             | Type                      | Required | Notes                                         |
|-------------------|---------------------------|----------|-----------------------------------------------|
| `title`           | `string`                  | ✓        | Shown as H1                                   |
| `slug`            | `slug`                    | ✓        | Auto-generated from title                     |
| `updatedAt`       | `datetime`                | ✓        | "Last updated" in article header              |
| `category`        | `reference → category`    | ✓        | One primary category                          |
| `tags`            | `array of string`         |          | Sub-topics for filtering                      |
| `readingTimeMin`  | `number`                  |          | Override auto-calculated reading time         |
| `seoDescription`  | `text` (160 char)         | ✓        | Meta description                              |
| `verdictSummary`  | `text`                    |          | 2–3 sentences for VerdictBox                  |
| `verdictLabel`    | `string`                  |          | e.g. "Worth it for most users"                |
| `verdictScore`    | `number` (1–10)           |          | Optional numeric score                        |
| `body`            | `array` (block content)   | ✓        | Main article via Portable Text                |
| `comparisonTable` | `object` (custom)         |          | Headers + rows for ComparisonTable component  |
| `pros`            | `array of string`         |          | ProsConsList — pros                           |
| `cons`            | `array of string`         |          | ProsConsList — cons                           |
| `faq`             | `array of {question, answer}` |      | FAQAccordion + JSON-LD                        |
| `featured`        | `boolean`                 |          | Pin to homepage hero slot                     |

### Document: `category`

| Field         | Type     | Required | Notes                            |
|---------------|----------|----------|----------------------------------|
| `title`       | `string` | ✓        | Display name                     |
| `slug`        | `slug`   | ✓        | URL path                         |
| `description` | `text`   |          | One sentence for category header |
| `sortOrder`   | `number` |          | Controls display order           |

### Document: `siteSettings` (singleton)

| Field                   | Type                     | Notes                        |
|-------------------------|--------------------------|------------------------------|
| `siteName`              | `string`                 | Nav, footer, og:site_name    |
| `siteTagline`           | `string`                 | Hero tagline on homepage     |
| `newsletterHeadline`    | `string`                 | Newsletter section headline  |
| `newsletterDescription` | `string`                 | Newsletter one-line description |
| `navLinks`              | `array of {label, href}` | Top nav items                |

---

## Routing & Data Fetching

- `/` → ISR, `revalidate: 60` or on-demand via Sanity webhook
- `/[slug]` → ISR, revalidate on publish
- `/category/[slug]` → ISR, revalidate on publish

Use **GROQ queries** in `lib/queries.ts`. Never co-locate queries in page files. Use React Server Components — no `getStaticProps`.

```ts
// Example GROQ for homepage
export const homepageQuery = groq`{
  "featured": *[_type == "post" && featured == true][0]{
    title, slug, category->{title,slug}, verdictLabel, updatedAt
  },
  "latest": *[_type == "post"] | order(updatedAt desc)[0...12]{
    title, slug, category->{title,slug}, seoDescription, updatedAt, readingTimeMin
  },
  "categories": *[_type == "category"] | order(sortOrder asc){ title, slug }
}`
```

---

## SEO

- `generateMetadata()` per page. Export `alternates.canonical`.
- `Article` JSON-LD on post pages: `headline`, `dateModified`, `author`.
- `FAQPage` JSON-LD on posts with a `faq` array.
- `WebSite` + `SearchAction` schema on homepage.
- Use `next/image` for all images with correct `sizes` attribute.

---

## What to Avoid

The following patterns make the blog look like a generic AI-generated site. Do not use them:

- ❌ Purple-to-blue gradients anywhere
- ❌ Cards nested inside cards
- ❌ Rounded-square icon tiles above section headings
- ❌ Fake metrics ("10,000+ users")
- ❌ Hero images or stock photography
- ❌ `backdrop-filter: blur()` / glass morphism
- ❌ Bounce or elastic easing on any animation
- ❌ Gray text on colored backgrounds
- ❌ Inter or system-ui as the heading font (use Lora)
- ❌ Pure `#000000` / `#ffffff` — always use the warm token colors
- ❌ Box-shadows with color/glow
- ❌ Border-radius above `4px` on content components
- ❌ SaaS copy ("Explore our features", "Trusted by")

---

## Files in This Package

| File                  | Description                                                         |
|-----------------------|---------------------------------------------------------------------|
| `README.md`           | This file — authoritative implementation guide                      |
| `Design Handoff.html` | Full visual design spec document (open in browser to read)          |

---

*Handoff prepared June 2026. Design by Claude.*
