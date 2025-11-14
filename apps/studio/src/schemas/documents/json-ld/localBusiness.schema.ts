import { defineArrayMember, defineField, defineType } from 'sanity'
import { File, Store } from '@mynaui/icons-react'

export default defineType({
  name: 'localBusiness',
  title: 'Lokal Virksomhed',
  type: 'document',
  icon: Store,
  groups: [
    { name: 'content', title: 'Indhold' },
    { name: 'pageBuilder', title: 'Sideopbygning' },
    { name: 'settings', title: 'SideIndstillinger' },
    { name: 'seo', title: 'SEO' },
  ],

  fields: [
    defineField({
      name: 'currenciesAccepted',
      description:
        'Den accepterede valuta. Brug standardformater: ISO 4217 valutaformat, f.eks. "DKK"; tickersymbol for kryptovalutaer, f.eks. "BTC"; velkendte navne for Local Exchange Trading Systems (LETS) og andre valutatyper, f.eks. "Ithaca HOUR".',
      title: 'Accepterede Valutaer',
      type: 'string',
    }),
    defineField({
      name: 'openingHours',
      description:
        "De generelle åbningstider for en virksomhed. Åbningstider kan angives som et ugentligt tidsinterval, startende med dage og derefter antal gange pr. dag. Flere dage kan angives med kommaer ',', der adskiller hver dag. Dag- eller tidsintervaller angives med en bindestreg '-'.",
      title: 'Åbningstider',
      type: 'string',
    }),
    defineField({
      name: 'paymentAccepted',
      type: 'string',
      title: 'Accepterede Betalingsmetoder',
      description: 'Cash, Credit Card, Cryptocurrency, Local Exchange Tradings System, etc.',
    }),
    defineField({
      name: 'priceRange',
      type: 'string',
      title: 'Prisinterval',
      description:
        'Angiv et prisinterval for virksomheden, f.eks. "$$", "$$$", "€", "£". Dette kan være en generel indikation af virksomhedens prisklasse.',
    }),
  ],
  preview: {
    select: {
      title: 'legalName',
      media: 'logo',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Lokal Virksomhed',
        media: media || File,
      }
    },
  },
})
