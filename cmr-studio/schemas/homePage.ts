import { defineField, defineType } from 'sanity'

// Singleton document — one homepage config
export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  // Singleton: hide "Create new" in Studio structure (controlled via structureTool config)
  fields: [
    // Hero
    defineField({
      name: 'hero', title: 'Hero Section', type: 'object',
      fields: [
        defineField({ name: 'heading',    title: 'Heading',    type: 'string' }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 2 }),
        defineField({
          name: 'slides', title: 'Hero Slides', type: 'array',
          of: [{ type: 'object', fields: [
            defineField({ name: 'image',   title: 'Background Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'eyebrow', title: 'Eyebrow Text',     type: 'string' }),
            defineField({ name: 'title',   title: 'Slide Title',      type: 'string' }),
            defineField({ name: 'cta',     title: 'CTA Label',        type: 'string' }),
            defineField({ name: 'ctaHref', title: 'CTA Link',         type: 'string' }),
          ]}],
        }),
      ],
    }),

    // Stats
    defineField({
      name: 'stats', title: 'Statistics', type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'value', title: 'Value (e.g. 600+)', type: 'string' }),
        defineField({ name: 'label', title: 'Label',             type: 'string' }),
        defineField({ name: 'sub',   title: 'Sub-label',         type: 'string' }),
      ]}],
    }),

    // About / Philosophy
    defineField({
      name: 'about', title: 'About Section', type: 'object',
      fields: [
        defineField({ name: 'eyebrow', title: 'Eyebrow',     type: 'string' }),
        defineField({ name: 'heading', title: 'Heading',     type: 'string' }),
        defineField({ name: 'body1',   title: 'Paragraph 1', type: 'text', rows: 3 }),
        defineField({ name: 'body2',   title: 'Paragraph 2', type: 'text', rows: 3 }),
        defineField({ name: 'ctaLabel', title: 'CTA Label',  type: 'string' }),
        defineField({ name: 'ctaHref',  title: 'CTA Link',   type: 'string' }),
      ],
    }),

    // SEO
    defineField({
      name: 'seo', title: 'SEO', type: 'object',
      fields: [
        defineField({ name: 'title',       title: 'Meta Title',       type: 'string' }),
        defineField({ name: 'description', title: 'Meta Description', type: 'text',   rows: 2 }),
        defineField({ name: 'ogImage',     title: 'OG Image',         type: 'image' }),
      ],
    }),
  ],
})
