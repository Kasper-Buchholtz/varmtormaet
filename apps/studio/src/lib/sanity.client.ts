import { createClient, type SanityClient } from 'next-sanity'
import { readToken, apiVersion, dataset, projectId, useCdn } from './sanity.api'
import Appconfig from '@repo/utils/src/superego.config'

export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
    stega: {
      enabled: true,
      studioUrl: Appconfig.studioUrl,
    },
  })

  if (readToken) {
    if (!readToken) {
      throw new Error('You must provide a token to preview drafts')
    }
    return client.withConfig({
      token: readToken,
      useCdn: true,
      ignoreBrowserTokenWarning: true,
      perspective: 'published',
    })
  }
  return client
}
export const client = getClient()
