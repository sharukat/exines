import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const ROLE = [
    { title: 'Professor', value: 'professor' },
    { title: 'PhD', value: 'phd' },
    { title: 'Masters', value: 'masters' },
    { title: 'Undergraduate', value: 'undergraduate' },
    { title: 'Interns or Visitors', value: 'internvisitor' },
    { title: 'Collaborator', value: 'collaborator' },
]

export const Team = defineType({
    name: 'team',
    title: 'Team',
    icon: DocumentTextIcon,
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            title: 'Name',
            validation: rule => rule.required(),
        }),
        defineField({
            name: 'role',
            type: 'string',
            title: 'Role',
            validation: rule => rule.required(),
            options: {
                list: ROLE.map(({ title, value }) => ({ title, value })),
                layout: 'radio',
            },
        }),
        defineField({
            name: 'alumni',
            type: 'boolean',
            title: 'Is an alumni?',
            validation: rule => rule.required(),
        }),
        defineField({
            name: 'image',
            type: 'image',
            title: 'Image',
            options: {
                hotspot: true,
            },
            validation: rule => rule.required(),
        }),
        defineField({
            name: 'website',
            type: 'string',
            title: 'Personal Website',
            description: 'If no website, type N/A'
        }),
        defineField({
            name: 'linkedin',
            type: 'string',
            title: 'LinkedIn',
        }),
    ]
});