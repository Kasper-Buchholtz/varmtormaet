import { StructureResolver } from 'sanity/structure'
import pages from './page.structure'
import events from './event.structure'
import articles from './article.structure'
import employees from './employee.structure'
import settings from './settings.structure'
import forms from './form.structure'
import footer from './settings/footer.structure'
import navigation from './settings/navigation.structure'
import products from './product.structure'
import collections from './collections.structure'
import collectionCta from './collection.cta.structure'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Indhold')
    .items([
      S.divider().title('Marketingssider'),
      pages(S, context),
      S.divider().title('E-commerce'),
      products(S, context),
      collections(S, context),
      collectionCta(S, context),
      S.divider().title('Globale elementer'),
      forms(S, context),
      navigation(S, context),
      footer(S, context),
      S.divider(),
      settings(S, context),

      // Unused - keep for reference
      // events(S, context),
      // articles(S, context),
      // employees(S, context),
    ])
