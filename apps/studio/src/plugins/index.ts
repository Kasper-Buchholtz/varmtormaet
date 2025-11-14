'use client'
import { daDKLocale } from '@sanity/locale-da-dk'
import { visionTool } from '@sanity/vision'
import { isDev, Plugin as Plugin_Types } from 'sanity'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { media } from 'sanity-plugin-media'
import { apiVersion } from '../../src/lib/sanity.api'
import { linkField } from '@repo/link-field'
import { structure } from '../../src/structure'
import ImportRedirects from '../../src/components/ImportRedirects'
import { dashboard } from './dashboard.plugin'
import { pagesTool } from './pages.plugin'
import { documentInternationalizationTool } from './Internationalization.plugin'
import Appconfig from '@repo/utils/src/superego.config'

const plugins = [
  dashboard,
  structureTool({ structure, title: 'Indhold' }),
  pagesTool,
  ...(Appconfig.i18n.locales.length > 0 ? [documentInternationalizationTool] : []),
  media({
    creditLine: {
      enabled: true,
      excludeSources: ['unsplash'],
    },
    maximumUploadSize: 10000000,
  }),
  isDev && visionTool({ defaultApiVersion: apiVersion, title: 'Udviklingsværktøj' }),
  daDKLocale({ title: 'Dansk' }),
  unsplashImageAsset(),
  linkField({
    linkableSchemaTypes: ['page', 'event', 'article'],
  }),
  {
    name: 'redirect-import',
    title: 'Import Redirects',
    component: ImportRedirects,
  } as any,

  // other plugins
  // ...
] as Plugin_Types[]

export default plugins
