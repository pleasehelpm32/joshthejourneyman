// post.ts
import {defineType, defineField} from 'sanity'

export const post = defineType({
  name: 'post', // Internal name for the document type
  title: 'Blog Post', // Human-readable title in Sanity Studio
  type: 'document', // This is a top-level document
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string', // Simple text field
      validation: (Rule) => Rule.required(), // Make it required
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug', // Auto-generates URL-friendly slugs
      options: {source: 'title', maxLength: 96}, // Bases it on title
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Short Summary',
      type: 'string', // Simple text
      description: 'A brief teaser for the homepage (max 150 characters)',
      validation: (Rule) => Rule.max(150).warning('Summary should be under 150 characters'), // Enforces limit with a warning
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array', // Rich text (Portable Text) for blog content
      of: [
        {
          type: 'block', // Standard text block with styling options
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'}, // Add H1 style
            {title: 'H2', value: 'h2'}, // Add H2 style
            {title: 'H3', value: 'h3'}, // Add H3 style
            {title: 'H4', value: 'h4'}, // Add H4 style
            {title: 'Quote', value: 'blockquote'}, // Add blockquote style
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'}, // Enable bullet lists
            {title: 'Numbered', value: 'number'}, // Enable numbered lists
          ],
          // Text-level formatting (bold, italic, etc.)
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'}, // Bold text
              {title: 'Emphasis', value: 'em'}, // Italic text
              {title: 'Code', value: 'code'}, // Inline code (optional)
            ],
            annotations: [
              {
                name: 'link', // For hyperlinks
                type: 'object',
                title: 'URL',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        // Allow embedding images directly within the rich text flow
        {
          type: 'image',
          options: {hotspot: true}, // Enables cropping and focus point for embedded images
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Main Video URL', // Renamed for clarity vs potential in-text videos
      type: 'url', // For embedding YouTube/Vimeo links
      description: 'The primary video associated with this post (e.g., YouTube watch URL)',
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array', // Array of strings for tech like "TypeScript", "Next.js"
      of: [{type: 'string'}],
      options: {layout: 'tags'}, // Makes it easy to add/remove in the UI
    }),
    defineField({
      name: 'thumbnail',
      title: 'Post Thumbnail Image', // Renamed for clarity
      type: 'image', // Upload images for project previews
      options: {hotspot: true}, // Allows cropping/focus points
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        },
      ],
    }),
  ],
})
