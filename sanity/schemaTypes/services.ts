import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const VARIENT = [
    { title: 'Journals', value: 'journals' },
    { title: 'Conferences', value: 'conferences' },
    { title: 'Books', value: 'books' },
    { title: 'Not Applicable', value: 'not_applicable' },
]

export const TYPE = [
    { title: 'Organization', value: 'organization' },
    { title: 'Review and Program Comittee Membership', value: 'committee' },
]

export const Services = defineType({
    name: 'services',
    title: 'Services',
    type: 'document',
    icon: DocumentTextIcon,
    fields: [
        defineField({
            name: 'type',
            type: 'string',
            title: 'Service Type',
            validation: rule => rule.required(),
            options: {
                list: TYPE.map(({ title, value }) => ({ title, value })),
                layout: 'radio',
            },
        }),
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',
            validation: rule => rule.required(),
        }),
        defineField({
            name: 'publisher',
            type: 'string',
            title: 'Organization/Committee Name',
            validation: rule => rule.required(),
            description: 'e.g: Journal of Applied Physics'
        }),
        defineField({
            name: 'year',
            type: 'string',
            title: 'Year',
            validation: rule => rule.required(),
        }),
        defineField({
            name: 'location',
            type: 'string',
            title: 'Location',
        }),
        defineField({
            name: 'committee',
            type: 'string',
            title: 'Committee',
            options: {
                list: VARIENT.map(({ title, value }) => ({ title, value })),
            },
        }),

    ]

});