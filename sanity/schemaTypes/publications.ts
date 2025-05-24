import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const STATUS = [
    { title: 'Published', value: 'published' },
    { title: 'Under Review', value: 'underReview' },
    { title: 'To be Submitted', value: 'toBeSubmitted' },
]

export const TYPE = [
    { title: 'Journal', value: 'journal' },
    { title: 'Conference', value: 'conference' },
    { title: 'Other', value: 'other' },
]

export const Publications = defineType({
    name: 'publications',
    title: 'Publications',
    type: 'document',
    icon: DocumentTextIcon,
    fields: [
        defineField({
            name: 'type',
            type: 'string',
            title: 'Publication Type',
            validation: rule => rule.required(),
            options: {
                list: TYPE.map(({ title, value }) => ({ title, value })),
                layout: 'radio',
            },
        }),
        defineField({
            name: 'title',
            type: 'string',
            title: 'Publication Name',
            validation: rule => rule.required(),
        }),
        defineField({
            name: 'publisher',
            type: 'string',
            title: 'Name of the Journal or Conference and the Year',
            validation: rule => rule.required(),
            description: 'e.g: Journal of Applied Physics, 2021'
        }),
        defineField({
            name: 'authors',
            type: 'string',
            title: 'Authors',
            validation: rule => rule.required(),
            description: 'Comma separated list of authors (e.g: S. Thirimanne, J. Smith)'
        }),
        defineField({
            name: 'status',
            type: 'string',
            title: 'Publication Status',
            validation: rule => rule.required(),
            options: {
                list: STATUS.map(({ title, value }) => ({ title, value })),
                layout: 'radio',
            },
        }),
        defineField({
            name: 'url',
            type: 'string',
            title: 'URL',
            description: 'Add the URL if the publication is available online. Type N/A if not available',
            validation: rule => rule.required(),
        }),

    ]

});