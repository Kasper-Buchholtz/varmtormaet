'use client'
import { defineConfig } from 'sanity'
import { mediaAssetSource } from 'sanity-plugin-media'
import { dataset, projectId } from './src/lib/sanity.api'
import { schema } from './src/schemas'
import { DocumentStatus } from './src/lib/sanity.badge'
import { CustomToolMenu } from './src/components/ToolMenu'
import { createVisualAction } from './src/actions/sanity.actions'
import { myTheme } from './src/lib/sanity.theme'
import Appconfig from '@repo/utils/src/superego.config'
import SuperegoLogo from '@repo/dashboard/superego-logo'
import plugins from './src/plugins'
import { DeleteTranslationAction } from '@sanity/document-internationalization'

export default defineConfig({
  name: Appconfig.siteName,
  title: Appconfig.siteTitle,
  subtitle: 'Superweb Studio',
  projectId,
  theme: myTheme,
  icon: SuperegoLogo,
  dataset,
  schema,
  releases: {
    enabled: false,
  },
  scheduledPublishing: {
    enabled: false,
  },
  announcements: {
    enabled: false,
  },
  studio: {
    components: {
      toolMenu: CustomToolMenu,
    },
  },
  plugins,
  document: {
    DeleteTranslationAction(prev, { schemaType }) {
      // these will be the schema types you're passing to the plugin configuration
      return schemaType.includes(schemaType)
        ? prev.map((action) => (action.action === 'duplicate' ? DeleteTranslationAction : action))
        : prev
    },
    actions: (prev, context) =>
      prev.map((originalAction) =>
        originalAction.action === 'publish'
          ? (props) => {
              const action = createVisualAction(originalAction)(props)
              return {
                ...action,
                tone: 'positive', // Ensure tone is one of the allowed types
                label: action?.label || 'Publish', // Ensure label is defined
              }
            }
          : originalAction,
      ),
    badges: (prev, context) => {
      if (
        context.schemaType === 'page' ||
        context.schemaType === 'article' ||
        context.schemaType === 'events'
      ) {
        return [DocumentStatus, ...prev]
      }
      return prev
    },
  },
  form: {
    // Don't use this plugin when selecting files only (but allow all other enabled asset sources)
    file: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource)
      },
    },
  },
})
