import { defineField, defineType } from 'sanity'

export const postSchema = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'publishedAt', title: 'First Published', type: 'datetime', validation: (Rule) => Rule.required() }),
    defineField({ name: 'updatedAt', title: 'Last Updated', type: 'datetime', validation: (Rule) => Rule.required() }),
    defineField({ name: 'author', title: 'Author', type: 'string', initialValue: 'David Hevesi' }),
    defineField({ name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }], validation: (Rule) => Rule.required() }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'readingTimeMin', title: 'Reading Time (minutes)', type: 'number' }),
    defineField({ name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 3, validation: (Rule) => Rule.required().max(160) }),
    defineField({ name: 'verdictSummary', title: 'Verdict Summary', type: 'text', rows: 4 }),
    defineField({ name: 'verdictLabel', title: 'Verdict Label', type: 'string', description: 'e.g. "Worth it for most users"' }),
    defineField({ name: 'verdictScore', title: 'Verdict Score (1–10)', type: 'number', validation: (Rule) => Rule.min(1).max(10) }),
    defineField({ name: 'toolName', title: 'Tool Name (for Review schema)', type: 'string', description: 'The product being reviewed, e.g. "Claude Pro". Powers rich-result rating stars.' }),
    defineField({ name: 'toolWebsite', title: 'Tool Website', type: 'url' }),
    defineField({ name: 'priceUSD', title: 'Price (USD / month)', type: 'number', description: 'Optional — adds an Offer to the review schema.' }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{
        type: 'block',
        styles: [
          { title: 'Normal', value: 'normal' },
          { title: 'H2', value: 'h2' },
          { title: 'H3', value: 'h3' },
        ],
        marks: {
          decorators: [
            { title: 'Strong', value: 'strong' },
            { title: 'Emphasis', value: 'em' },
            { title: 'Code', value: 'code' },
          ],
          annotations: [{
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [{ name: 'href', type: 'url', title: 'URL' }],
          }],
        },
      }, {
        type: 'object',
        name: 'visualCanvas',
        title: 'Visual Canvas',
        fields: [
          { name: 'variant', type: 'string', title: 'Variant', options: { list: ['blank', 'diagram', 'cards'] }, initialValue: 'cards' },
          { name: 'eyebrow', type: 'string', title: 'Eyebrow' },
          { name: 'title', type: 'string', title: 'Title' },
          { name: 'description', type: 'text', rows: 2, title: 'Description' },
          {
            name: 'columns', type: 'array', title: 'Columns (cards variant)',
            of: [{
              type: 'object', name: 'column',
              fields: [
                { name: 'heading', type: 'string', title: 'Heading' },
                { name: 'items', type: 'array', of: [{ type: 'string' }], title: 'Items' },
              ],
              preview: { select: { title: 'heading' } },
            }],
          },
        ],
        preview: { select: { title: 'title', subtitle: 'variant' } },
      }, {
        type: 'object',
        name: 'dataTable',
        title: 'Table',
        fields: [
          { name: 'headers', type: 'array', of: [{ type: 'string' }], title: 'Column Headers' },
          {
            name: 'rows', type: 'array', title: 'Rows',
            of: [{ type: 'object', name: 'row', fields: [{ name: 'cells', type: 'array', of: [{ type: 'string' }], title: 'Cells' }] }],
          },
        ],
        preview: { select: { title: 'headers' }, prepare: ({ title }: { title?: string[] }) => ({ title: title?.join(' · ') ?? 'Table' }) },
      }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'comparisonTable',
      title: 'Comparison Table',
      type: 'object',
      fields: [
        { name: 'headers', type: 'array', of: [{ type: 'string' }], title: 'Column Headers' },
        {
          name: 'rows', type: 'array', title: 'Rows',
          of: [{ type: 'object', name: 'row', fields: [{ name: 'cells', type: 'array', of: [{ type: 'string' }], title: 'Cells' }] }],
        },
      ],
    }),
    defineField({ name: 'pros', title: 'Pros', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'cons', title: 'Cons', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [{
        type: 'object',
        name: 'faqItem',
        fields: [
          defineField({ name: 'question', type: 'string', title: 'Question', validation: (Rule) => Rule.required() }),
          defineField({ name: 'answer', type: 'text', title: 'Answer', validation: (Rule) => Rule.required() }),
        ],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        preview: { select: { title: 'question' } } as any,
      }],
    }),
    defineField({ name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category.title' },
  },
})
