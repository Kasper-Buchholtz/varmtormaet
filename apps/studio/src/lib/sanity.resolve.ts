import { resolveHref } from '@repo/utils/src/resolveHref'
import { defineDocuments, defineLocations } from 'sanity/presentation'
/**
 * Sets up the Presentation Resolver API,
 * see https://www.sanity.io/docs/presentation-resolver-api for more information.
 */

export const mainDocuments = defineDocuments([
  {
    route: '/begivenheder/:slug',
    filter: `_type == "event" && slug.current == $slug`,
  },
  {
    route: '/artikler/:slug',
    filter: `_type == "article" && slug.current == $slug`,
  },
  {
    route: '/:slug',
    filter: `_type == "page" && slug.current == $slug`,
  },
  {
    route: '/',
    filter: `_type == "page" && slug.current == "/"`,
  },
])

export const locations = {
  settings: defineLocations({
    message: 'Dette dokumentet er globalt og vil påvirke hele hjemmesiden.',
    tone: 'caution',
  }),

  navigation: defineLocations({
    message: 'Dette dokument er en del af navigationen.',
    tone: 'caution',
  }),

  footer: defineLocations({
    message: 'Dette dokument er en del af footer.',
    tone: 'caution',
  }),

  redirect: defineLocations({
    message: 'Dette dokument er en del af redirects.',
    tone: 'caution',
  }),

  article: defineLocations({
    message: 'Dette dokument er en del af "Artikler".',
    tone: 'caution',
    select: { title: 'title', slug: 'slug.current' },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Untitled',
          message: 'Dette dokument er en del af "Artikler".',
          href: resolveHref('da', 'article', doc?.slug)!,
        },
      ],
    }),
  }),
  event: defineLocations({
    select: { title: 'title', slug: 'slug.current' },
    resolve: (doc) => ({
      locations: [
        {
          title: doc?.title || 'Untitled',
          href: resolveHref('da', 'event', doc?.slug)!,
        },
      ],
    }),
  }),
  page: defineLocations({
    select: { title: 'title', slug: 'slug.current' },
    message: 'Dette dokument er en del af "Sider".',
    resolve: (doc) => ({
      message: 'Brugt på disse sider',
      tone: 'positive',
      locations: [
        {
          title: doc?.title || 'Untitled',
          href:
            doc?.slug === 'forside'
              ? resolveHref('da', 'page', '')!
              : resolveHref('da', 'page', doc?.slug)!,
        },
      ],
    }),
  }),
}
