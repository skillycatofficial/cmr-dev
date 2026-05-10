import { defineField, defineType } from 'sanity'

export const award = defineType({
  name: 'award',
  title: 'Awards & Recognition',
  type: 'document',
  fields: [
    defineField({ name: 'name',  title: 'Award Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'year',  title: 'Year',       type: 'string' }),
    defineField({ name: 'image', title: 'Award Image / Certificate', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [{ title: 'Display Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'year', media: 'image' },
  },
})
