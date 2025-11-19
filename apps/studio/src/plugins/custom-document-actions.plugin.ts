import { resolveDocumentActions, resolveNewDocumentOptions } from '../actions'
import { definePlugin } from 'sanity'

export const customDocumentActions = definePlugin({
  name: 'custom-document-actions',
  document: {
    actions: resolveDocumentActions,
    newDocumentOptions: resolveNewDocumentOptions,
  },
})
