import { defineField, defineType } from 'sanity'
import { SquareHalf } from '@mynaui/icons-react'

export default defineType({
    name: 'footer.cta',
    title: 'Footer CTA',
    type: 'document',
    icon: SquareHalf,
    groups: [
        {
            default: true,
            name: 'content',
            title: 'Indhold',
        },
        {
            name: 'placement',
            title: 'Placering',
        },
        {
            name: 'settings',
            title: 'Indstillinger',
        },
    ],
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',
            group: 'settings',
            description: 'Titel for CTA (bruges internt)',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            type: 'array',
            name: 'ctaItems',
            description: 'CTA items der vises lige over footeren',
            title: 'CTA items',
            group: 'content',
            of: [
                defineField({
                    type: 'object',
                    name: 'ctaItem',
                    title: 'CTA item',
                    preview: {
                        select: {
                            title: 'title',
                            subtitle: 'subtitle',
                            media: 'image',
                            link: 'link',
                        },
                        prepare({ title, subtitle, media, link }) {
                            return {
                                title,
                                subtitle,
                                media,
                            }
                        }
                    },
                    fields: [
                        defineField({
                            name: 'title',
                            type: 'string',
                            title: 'Title',
                            description: 'Titel for CTA item',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'link',
                            type: 'link',
                            title: 'Link',
                            description: 'Link til en kollektion, side eller ekstern URL',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'subtitle',
                            type: 'string',
                            title: 'Subtitle',
                            description: 'Undertekst for CTA item',
                        }),
                        defineField({
                            name: 'image',
                            type: 'image',
                            title: 'Image',
                            description: 'Billede der vises i CTA item',
                            options: {
                                hotspot: true,
                            },
                        })
                    ]
                }),
            ],
        }),
        defineField({
            name: 'appearsOnPages',
            type: 'array',
            title: 'Appears on pages',
            description: 'Vælg de sider hvor denne CTA skal vises',
            group: 'placement',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'page' }, { type: 'collection' }, { type: 'product' }],
                },
            ],
            validation: (Rule) => Rule.min(1).error('Vælg mindst én side'),
        }),
    ],
    orderings: [
        {
            name: 'titleAsc',
            title: 'Titel (A-Å)',
            by: [{ field: 'title', direction: 'asc' }],
        },
        {
            name: 'titleDesc',
            title: 'Titel (Å-A)',
            by: [{ field: 'title', direction: 'desc' }],
        },
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({ title }) {
            return {
                title,
                subtitle: 'Footer CTA',
                media: SquareHalf,
            }
        },
    },
})