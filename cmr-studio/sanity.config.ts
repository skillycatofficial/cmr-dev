import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool }    from '@sanity/vision'
import { schemaTypes }   from './schemas'

export default defineConfig({
  name:     'cmr-studio',
  title:    'CMR Developers Studio',
  projectId: '6m8pghl3',
  dataset:   'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('CMR Content')
          .items([
            S.listItem()
              .title('Home Page')
              .id('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.divider(),
            S.documentTypeListItem('project')     .title('Projects / Villas'),
            S.documentTypeListItem('testimonial') .title('Testimonials'),
            S.documentTypeListItem('blogPost')    .title('Blog / Stories'),
            S.documentTypeListItem('galleryItem') .title('Gallery'),
            S.documentTypeListItem('award')       .title('Awards'),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
})
