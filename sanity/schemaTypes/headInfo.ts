import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'


export const HeadInfo = defineType({
    name: 'headInfo',
    title: 'Head Info',
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
            validation: rule => rule.required(),
        }),
    ]
});