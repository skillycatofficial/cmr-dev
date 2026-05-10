import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({ name: 'name',    title: 'Customer Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'project', title: 'Project / Villa', type: 'string' }),
    defineField({ name: 'since',   title: 'Customer Since (e.g. Since 2022)', type: 'string' }),
    defineField({ name: 'quote',   title: 'Testimonial Quote', type: 'text', rows: 4, validation: r => r.required() }),
    defineField({ name: 'photo',   title: 'Photo (optional)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'initials', title: 'Initials (e.g. RN)', type: 'string' }),
    defineField({ name: 'color',   title: 'Avatar Color', type: 'string',
      options: { list: [
        { title: 'Forest Green', value: 'bg-[#0F2F2B]' },
        { title: 'Gold',         value: 'bg-brand-gold' },
        { title: 'Charcoal',     value: 'bg-[#1A1A1A]' },
      ]},
      initialValue: 'bg-[#0F2F2B]',
    }),
    defineField({ name: 'featured', title: 'Show on Homepage', type: 'boolean', initialValue: true }),
    defineField({ name: 'order',    title: 'Display Order',    type: 'number' }),
  ],
  orderings: [{ title: 'Display Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'project', media: 'photo' },
  },
})
