/**
 * Portfolio content. Single source of truth for the work shown on the homepage.
 * Add a project here and it appears in the list, the structured data, and the stats.
 */

export type ProjectKind = 'System' | 'Skills' | 'Research' | 'Case study'

export interface Project {
  title: string
  kind: ProjectKind
  href: string
  summary: string
  tags: string[]
}

export const PROJECTS: Project[] = [
  {
    title: 'Market Saturation Analyzer',
    kind: 'System',
    href: 'https://github.com/Davidhevesi/Market-Saturation-analizer',
    summary:
      'Finds the creative patterns a market has already worn out, plus the positioning gaps and angles nobody is using yet. Run it before a campaign launches, while blending in is still fixable.',
    tags: ['Marketing', 'Research', 'Content strategy'],
  },
  {
    title: 'Marketing Skills Repo',
    kind: 'Skills',
    href: 'https://github.com/Davidhevesi/marketing-skills-repo',
    summary:
      'Claude skills and repeatable frameworks for content, positioning, and campaign strategy. Each skill works alone. Chain a few and you have a campaign workflow.',
    tags: ['Claude', 'Prompts', 'Automation'],
  },
  {
    title: 'Social Media Skills',
    kind: 'Skills',
    href: 'https://github.com/Davidhevesi/Social-Media-Skills',
    summary:
      'Prompt systems for researching, planning, and writing social content. Covers ideation, captions, turning a brief into a post, and formatting for each platform.',
    tags: ['Social media', 'Prompts', 'Content'],
  },
  {
    title: 'YouTube Skills Repo',
    kind: 'Skills',
    href: 'https://github.com/Davidhevesi/youtube-skills-repo',
    summary:
      'Prompts for video ideas, titles, hooks, and scripts. Made for people who publish video on a schedule and want the research-to-script step to go faster.',
    tags: ['YouTube', 'Video', 'Prompts'],
  },
]

export const FOCUS_AREAS = [
  'AI outreach pipelines for hospitality and boutique brands',
  'Prompt systems that check content for saturation and suggest new angles',
  'Skills frameworks that map what AI can do onto day-to-day marketing operations',
  'Creative testing and campaign personalization at scale',
]
