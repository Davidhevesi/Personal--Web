import { defineField, defineType } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Site Name', type: 'string' }),
    defineField({ name: 'siteTagline', title: 'Site Tagline', type: 'string' }),
    defineField({ name: 'newsletterHeadline', title: 'Newsletter Headline', type: 'string' }),
    defineField({ name: 'newsletterDescription', title: 'Newsletter Description', type: 'string' }),
    defineField({
      name: 'navLinks',
      title: 'Nav Links',
      type: 'array',
      of: [{
        type: 'object',
        name: 'navLink',
        fields: [
          { name: 'label', type: 'string', title: 'Label' },
          { name: 'href', type: 'string', title: 'URL' },
        ],
      }],
    }),
  ],
})
