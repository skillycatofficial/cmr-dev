import { defineField, defineType } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog / Stories',
  type: 'document',
  fields: [
    defineField({ name: 'title',    title: 'Title',    type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug',     title: 'Slug',     type: 'slug',   options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string',
      options: { list: ['Lifestyle', 'Design', 'NRI Guide', 'Architecture', 'News', 'Tips'] },
    }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'date', validation: r => r.required() }),
    defineField({ name: 'readTime',    title: 'Read Time (e.g. 4 min read)', type: 'string' }),
    defineField({ name: 'excerpt',     title: 'Excerpt / Summary', type: 'text', rows: 3 }),
    defineField({ name: 'coverImage',  title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'body', title: 'Body Content', type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({ name: 'featured', title: 'Show on Homepage', type: 'boolean', initialValue: false }),
  ],
  orderings: [{ title: 'Newest First', name: 'publishedAt', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'coverImage' },
  },
})
