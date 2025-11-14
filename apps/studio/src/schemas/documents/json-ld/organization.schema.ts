import { defineArrayMember, defineField, defineType } from 'sanity'
import { File } from '@mynaui/icons-react'

export default defineType({
  name: 'organization',
  title: 'Organisation',
  type: 'document',
  icon: File,
  groups: [
    { name: 'content', title: 'Indhold' },
    { name: 'pageBuilder', title: 'Sideopbygning' },
    { name: 'settings', title: 'SideIndstillinger' },
    { name: 'seo', title: 'SEO' },
  ],

  fields: [
    defineField({
      name: 'legalName',
      description: 'Organisationens officielle navn, f.eks. det registrerede virksomhedsnavn.',
      title: 'Organisationsnavn',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
      description: 'Den officielle URL for organisationens hjemmeside.',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Kontakt e-mail for organisationen, f.eks. info@virksomhed.dk',
    }),
    defineField({
      name: 'telephone',
      title: 'Telefonnummer',
      type: 'string',
      description: 'Kontakt telefonnummer for organisationen, f.eks. +45 1234 5678',
    }),
    defineField({
      name: 'faxNumber',
      title: 'Fax Number',
      type: 'string',
      description: 'Faxnummer for organisationen, hvis relevant.',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'address',
      type: 'object',
      description: 'Organisationens fysiske adresse.',
      title: 'Adresse',
      fields: [
        {
          name: 'streetAddress',
          type: 'string',
          title: 'Vejnavn og husnummer',
          description: 'F.eks. Store Torv 1, 2.',
        },
        { name: 'postalCode', type: 'string', title: 'Postnummer', description: 'F.eks. 7500' },
        { name: 'addressLocality', type: 'string', title: 'By', description: 'F.eks. Holstebro' },
        {
          name: 'addressRegion',
          type: 'string',
          title: 'Region',
          description: 'F.eks. Region Midtjylland',
        },
        { name: 'addressCountry', type: 'string', title: 'Land', description: 'F.eks. DK, FR, DE' },
      ],
    }),
    defineField({
      name: 'foundingDate',
      description: 'Datoen hvor organisationen blev grundlagt.',
      title: 'Dato for grundlæggelse',
      type: 'date',
    }),
    defineField({
      name: 'founder',
      description: 'Navnet på grundlæggeren af organisationen.',
      title: 'Grundlægger',
      type: 'string', // or reference to a Person document
    }),
    defineField({
      name: 'taxID',
      title: 'Skatte-ID',
      description: 'Skatte-ID for organisationen, f.eks. CVR-nummer i Danmark.',
      type: 'string',
    }),
    defineField({
      name: 'vatID',
      title: 'Moms-ID',
      description: 'Momsregistreringsnummer for organisationen, hvis relevant.',
      type: 'string',
    }),
    defineField({
      name: 'duns',
      description: 'DUNS-nummer (Data Universal Numbering System) for organisationen.',
      title: 'DUNS-ID',
      type: 'string',
    }),
    defineField({
      name: 'slogan',
      title: 'Slogan',
      description: 'Et kort slogan eller tagline for organisationen.',
      type: 'string',
    }),
    defineField({
      name: 'sameAs',
      description: 'Andre relevante URLer, f.eks. sociale medier eller referencer.',
      title: "Andre URL'er (Social/Reference URLs)",
      type: 'array',
      of: [{ type: 'url' }],
    }),
    defineField({
      name: 'description',
      title: 'Beskrivelse',
      description: 'En kort beskrivelse af organisationen, dens mission eller værdier.',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'legalName',
      media: 'logo',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Organization',
        media: media || File,
      }
    },
  },
})
