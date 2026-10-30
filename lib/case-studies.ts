/**
 * Case studies. Each entry renders at /work/<slug> and as a card on the homepage.
 * Content is block-based so a new case study needs data only, no new components.
 */

export interface ListItem {
  /** Bold lead-in, e.g. "New market" */
  lead?: string
  text: string
}

export type Block =
  | { type: 'p'; text: string }
  | { type: 'list'; ordered?: boolean; items: ListItem[] }
  | { type: 'checklist'; items: string[] }
  | { type: 'table'; columns: string[]; rows: string[][]; highlightRow?: number }
  | { type: 'log'; entries: { date: string; text: string }[] }
  | { type: 'source'; text: string }
  | { type: 'link'; label: string; href: string }

export interface Section {
  id: string
  heading: string
  blocks: Block[]
}

export interface CaseStudy {
  slug: string
  title: string
  /** Short label shown above the title, e.g. "Where it started" */
  eyebrow: string
  status: 'Live' | 'Complete'
  /** Shown on live case studies, e.g. "Oct 29, 2026" */
  updated?: string
  summary: string
  /** The one number that sells the card on the homepage */
  card: { title: string; value: string; label: string }
  metrics: { value: string; label: string }[]
  facts: { label: string; value: string }[]
  sections: Section[]
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'boosted-reel',
    title: "One boosted reel brought in half the business's revenue",
    eyebrow: 'Where it started · Instagram boost',
    status: 'Complete',
    summary:
      "How a single Instagram boost grew a wedding brand's audience and bookings, and what I learned when it stopped working.",
    card: {
      title: 'One boosted Instagram reel',
      value: '~50%',
      label: "of the business's revenue, plus ~1,200 new followers.",
    },
    metrics: [
      { value: '~50%', label: "of the business's revenue came from this one boosted reel." },
      { value: '~1,200', label: "of the account's ~2,200 Instagram followers came from it." },
    ],
    facts: [
      { label: 'Brand', value: 'Hevesi Journal (my company)' },
      { label: 'Channel', value: 'Instagram post boost' },
      { label: 'My role', value: 'Creative, editing, boosting' },
    ],
    sections: [
      {
        id: 'what-happened',
        heading: 'What happened',
        blocks: [
          {
            type: 'p',
            text: 'A great piece of creative, a simple boost, then a lesson in what kills momentum.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              {
                lead: 'Boosted one strong reel.',
                text: 'A wedding film reel from the Piedmont Room, boosted on Instagram.',
              },
              {
                lead: 'It took off.',
                text: 'It brought engaged brides, more than half the followers, and half the revenue.',
              },
              {
                lead: 'Then it stalled.',
                text: 'Turning it on and off broke its momentum. The audience drifted to spammy, low-intent accounts.',
              },
            ],
          },
        ],
      },
      {
        id: 'lessons',
        heading: 'What I learned',
        blocks: [
          {
            type: 'list',
            items: [
              { lead: 'Creative is the lever.', text: 'One strong reel did more than any targeting setting.' },
              { lead: "Don't toggle a winner.", text: 'Stopping and starting resets learning. Keep it steady.' },
              { lead: 'Watch audience quality.', text: "More followers isn't better if they're not buyers." },
            ],
          },
        ],
      },
      {
        id: 'next',
        heading: 'What came next',
        blocks: [
          {
            type: 'p',
            text: 'Boosts hit a ceiling. So I moved to full Meta Ads Manager campaigns, with real targeting, landing pages and lead tracking.',
          },
          { type: 'link', label: 'See case study 2: the NYC campaign', href: '/work/nyc-wedding-campaign' },
        ],
      },
    ],
  },
  {
    slug: 'nyc-wedding-campaign',
    title: 'Cutting cost per qualified lead in half for a premium wedding brand',
    eyebrow: 'Full Meta campaign · NYC weddings',
    status: 'Live',
    updated: 'Oct 29, 2026',
    summary:
      'How I tested my way from cheap lead-form ads to a video ad and landing page that bring in leads who actually book, on $30 a day.',
    card: {
      title: 'Full Meta campaign for NYC weddings',
      value: '−51%',
      label: 'cost per qualified lead. Goal met: a lead booked a sales call.',
    },
    metrics: [
      { value: '−51%', label: 'cost per qualified lead, from about $174 to about $86.' },
      { value: '$172', label: 'cost per booked sales call (1 Zoom call so far)' },
      { value: '~3%', label: 'click-through rate on video, vs 1.5% static' },
      { value: '~$13k', label: 'top package these ads sell' },
    ],
    facts: [
      { label: 'Brand', value: 'Hevesi Journal (my company)' },
      { label: 'Channel', value: 'Meta: Instagram + Facebook' },
      { label: 'My role', value: 'Strategy, creative, ads, tracking' },
      { label: 'Budget', value: '$20–30 per day' },
      { label: 'Goal', value: "Qualified leads who book a sales call. Closing is the sales team's job." },
      { label: 'Tools', value: 'Meta Ads Manager, Meta Pixel, Windsor.ai, Claude, Premiere' },
    ],
    sections: [
      {
        id: 'challenge',
        heading: 'The challenge',
        blocks: [
          {
            type: 'p',
            text: 'Sell an expensive, trust-based service to strangers in a new city, on a small-business budget.',
          },
          {
            type: 'list',
            items: [
              { lead: 'New market.', text: 'Known in Atlanta. Starting from zero in New York City.' },
              { lead: 'High ticket.', text: 'Packages up to ~$13k. Lead quality matters more than lead count.' },
              { lead: 'Small budget.', text: '$20–30 a day. Every test has to earn its spend.' },
            ],
          },
        ],
      },
      {
        id: 'approach',
        heading: 'How I got there',
        blocks: [
          {
            type: 'p',
            text: 'Six small tests. I logged every change and its result, so each decision built on the last.',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              { lead: 'Tried lead-form ads.', text: 'Cheap leads, but most never replied. Paused them.' },
              { lead: 'Built a NYC landing page.', text: 'Fewer leads, better ones. One wanted the ~$13k package.' },
              { lead: 'Tested video vs. static.', text: 'The static ad wore out. Video won on cost and lead quality.' },
              {
                lead: 'Added retargeting.',
                text: 'Reached Instagram engagers, 180-day site visitors, and people who watched 50% of the video.',
              },
              { lead: 'Pre-tested hooks for free.', text: 'Ran Instagram trial reels before paying to promote new creative.' },
              { lead: 'Set a scaling rule.', text: '+20% budget per booking, a week apart. Now $30/day.' },
            ],
          },
        ],
      },
      {
        id: 'results',
        heading: "The cheapest lead isn't the best lead",
        blocks: [
          {
            type: 'p',
            text: "Lead forms cost the least per lead, but those people didn't reply. Video sits in the middle and brought a lead who booked a call.",
          },
          {
            type: 'table',
            columns: ['Approach', 'Cost per lead', 'Leads', 'Lead quality'],
            rows: [
              ['Lead-form ads', '~$22', '7', 'Mostly no reply'],
              ['Retargeting', '$64', '1', 'Not rated yet'],
              ['Video → landing page (current winner)', '~$86', '2', 'Booked a sales call'],
              ['Static → landing page', '$174', '1', 'Strong, ~$13k package'],
            ],
            highlightRow: 2,
          },
          {
            type: 'source',
            text: 'Cost per lead by ad approach. Source: Meta Ads Manager via Windsor.ai, Sep 21 – Oct 25, 2026. Small sample, judged weekly.',
          },
        ],
      },
      {
        id: 'lessons',
        heading: 'What I learned',
        blocks: [
          { type: 'p', text: 'Lessons I now apply to any paid social account.' },
          {
            type: 'list',
            items: [
              { lead: 'Optimize for quality.', text: 'For a high-ticket offer, cost per lead alone is the wrong goal.' },
              { lead: 'Landing pages filter.', text: 'A dedicated page lets serious buyers qualify themselves.' },
              { lead: 'Video builds trust.', text: 'It works best with cold audiences. Statics are next for warm ones.' },
              { lead: 'Watch frequency.', text: "Past ~3.5, the static ad's click rate fell to 0.5%. Refresh before then." },
              { lead: "Don't toggle ads.", text: 'Switching a reel on and off stopped it producing inquiries.' },
              { lead: 'Judge weekly.', text: 'Small budgets bring results in clumps. Scale only on bookings.' },
            ],
          },
        ],
      },
      {
        id: 'updates',
        heading: 'Live updates',
        blocks: [
          { type: 'p', text: 'Newest first. A new entry lands here after each weekly review.' },
          {
            type: 'log',
            entries: [
              {
                date: 'Oct 25, 2026',
                text: 'Video hit $172 spent and 2 leads (~$86 each). Declared the winner and raised budget from $25 to $30 a day.',
              },
              {
                date: 'Oct 22, 2026',
                text: "A new video lead booked a Zoom sales call. A trial reel tested a new hook: strong start, weak finish, so I'm fixing it first.",
              },
              {
                date: 'Oct 21, 2026',
                text: 'Meta moved budget to video on its own as the static ad wore out. Added a high-save carousel to retargeting.',
              },
              { date: 'Oct 20, 2026', text: 'Started a decision log. 30-day snapshot: $567 spent, 2 website leads.' },
              {
                date: 'Early Oct 2026',
                text: 'Paused lead-form ads. Moved traffic to a new NYC landing page. Launched the video test and retargeting.',
              },
            ],
          },
        ],
      },
      {
        id: 'next',
        heading: "What's next",
        blocks: [
          {
            type: 'checklist',
            items: [
              'Weekly review around Nov 1: fresh creative if clicks stay low',
              'Test couple-specific static ads in retargeting',
              'Confirm Pixel + Conversions API lead tracking',
              'Scale ahead of engagement season, Dec–Feb',
            ],
          },
        ],
      },
    ],
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug)
}
