import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Projects / Villas',
  type: 'document',
  fields: [
    defineField({ name: 'name',     title: 'Project Name',  type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug',     title: 'Slug',          type: 'slug',   options: { source: 'name' }, validation: r => r.required() }),
    defineField({ name: 'location', title: 'Location',      type: 'string', validation: r => r.required() }),
    defineField({
      name: 'status', title: 'Status', type: 'string',
      options: { list: ['On Going', 'Just Launched', 'Completed'], layout: 'radio' },
      validation: r => r.required(),
    }),
    defineField({ name: 'price',    title: 'Starting Price (e.g. ₹60 Lakhs Onwards)', type: 'string' }),
    defineField({ name: 'heroImage', title: 'Hero / Card Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'gallery',  title: 'Gallery',  type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({
      name: 'badge', title: 'Villa Count Badge', type: 'object',
      fields: [
        defineField({ name: 'num',   title: 'Count',  type: 'string' }),
        defineField({ name: 'label', title: 'Label',  type: 'string' }),
      ],
    }),
    defineField({ name: 'isRERA',   title: 'RERA Registered', type: 'boolean', initialValue: true }),
    defineField({ name: 'reraNumber', title: 'RERA Number', type: 'string' }),
    defineField({ name: 'overview', title: 'Overview', type: 'text', rows: 4 }),
    defineField({
      name: 'amenities', title: 'Amenities', type: 'array',
      of: [{ type: 'object', fields: [
        defineField({ name: 'icon',  title: 'Icon (emoji or short text)', type: 'string' }),
        defineField({ name: 'label', title: 'Amenity Label',              type: 'string' }),
      ]}],
    }),
    defineField({ name: 'featured', title: 'Show on Homepage', type: 'boolean', initialValue: false }),
    defineField({ name: 'order',    title: 'Display Order',    type: 'number' }),
  ],
  orderings: [{ title: 'Display Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'location', media: 'heroImage' },
  },
})
