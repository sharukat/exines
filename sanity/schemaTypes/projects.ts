import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const Projects = defineType({
    name: 'projects',
    title: 'Projects',
    icon: DocumentTextIcon,
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',
            validation: rule => rule.required(),
        }),
        defineField({
            name: 'user',
            type: 'string',
            title: 'Your name',
            validation: rule => rule.required(),
        }),
        defineField({
            name: 'description',
            type: 'string',
            title: 'Description',
            validation: rule => rule.required(),
        }),
        defineField({
            name: 'link',
            type: 'string',
            title: 'GitHub Link',
            description: 'Type N/A if not available'
        }),
        defineField({
            name: 'image',
            type: 'image',
            title: 'Image',
            options: {
                hotspot: true,
            },
        }),
    ]
})