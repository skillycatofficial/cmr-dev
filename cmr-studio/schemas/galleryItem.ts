import { defineField, defineType } from 'sanity'

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({ name: 'label',    title: 'Label',    type: 'string', validation: r => r.required() }),
    defineField({ name: 'image',    title: 'Image',    type: 'image',  options: { hotspot: true }, validation: r => r.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string',
      options: { list: ['EXTERIOR', 'INTERIOR', 'AMENITIES', 'LIFESTYLE'], layout: 'radio' },
      validation: r => r.required(),
    }),
    defineField({ name: 'featured', title: 'Show on Homepage', type: 'boolean', initialValue: true }),
    defineField({ name: 'order',    title: 'Display Order',    type: 'number' }),
  ],
  orderings: [{ title: 'Display Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'label', subtitle: 'category', media: 'image' },
  },
})
