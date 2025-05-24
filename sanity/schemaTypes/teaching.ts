import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'


export const Teaching = defineType({
    name: 'teaching',
    title: 'Teaching',
    type: 'document',
    icon: DocumentTextIcon,
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',
            validation: rule => rule.required(),
        }),
        defineField({
            name: 'description',
            type: 'string',
            title: 'Description',
            validation: rule => rule.required(),
        }),

    ]

});