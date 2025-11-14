import { ChevronDoubleDown, LinkOne } from '@mynaui/icons-react'
import { defineField, defineType } from 'sanity'

export const buttonType = defineType({
  name: 'button',
  type: 'object',
  groups: [
    { title: 'Design', name: 'design' },
    { title: 'Indhold', name: 'content' },
  ],
  description:
    'Knappen er et visuelt iøjnefaldende link på hjemmesiden, og kan bruges til at udføre en specifik handling. F.eks. at føre brugeren videre til ny side.',
  title: 'Knap',
  icon: LinkOne,
  fields: [
    defineField({
      group: 'content',
      name: 'link',
      title: 'Link',
      type: 'link',
    }),
    defineField({
      group: 'design',
      description: 'Vælg en stil for knappen',
      name: 'style',
      type: 'string',
      title: 'Stil',
      options: {
        layout: 'radio',
        list: [
          { title: 'Primær', value: 'primary' },
          { title: 'Sekundær', value: 'secondary' },
          { title: 'Gennemsigtig', value: 'ghost' },
        ],
      },
      initialValue: 'primary',
    }),
  ],
  preview: {
    select: {
      label: 'link.label',
      style: 'style',
      internalTitle: 'link.internalLink.title',
      internalSlug: 'link.internalLink.slug.current',
      mailto: 'link.email',
      tel: 'link.phone',
      fileUrl: 'link.file.asset.url',
      url: 'link.url',
    },
    prepare({ label, style, internalTitle, internalSlug, mailto, tel, fileUrl, url }) {
      const styleName = style?.charAt(0).toUpperCase() + style.slice(1) || 'Ukendt stil'

      let linkType = 'Ingen link'
      let linkTarget = ''

      if (internalSlug) {
        linkType = 'Intern link'
        linkTarget = `→ ${
          internalSlug?.charAt(0).toUpperCase() + internalSlug.slice(1) || 'Ukendt slug'
        }`
      } else if (internalTitle) {
        linkType = 'Intern link'
        linkTarget = `${ChevronDoubleDown} ${internalTitle}`
      } else if (mailto) {
        linkType = 'E-mail'
        linkTarget = `→ mailto:${mailto}`
      } else if (tel) {
        linkType = 'Telefon'
        linkTarget = `→ tel:${tel}`
      } else if (fileUrl) {
        linkType = 'Fil'
        linkTarget = `→ ${fileUrl}`
      } else if (url) {
        linkType = 'Ekstern link'
        linkTarget = `→ ${url}`
      }

      return {
        title: label || 'Knap',
        subtitle: `${linkType} ${linkTarget} | ${styleName}`,
      }
    },
  },
})
