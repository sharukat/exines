import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const Posts = defineType({
    name: 'posts',
    title: 'Posts',
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
            name: 'image',
            type: 'image',
            title: 'Image',
            options: {
                hotspot: true,
            },
        }),
    ]
})