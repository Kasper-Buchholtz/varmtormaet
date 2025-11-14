import type { QueryParams } from 'next-sanity'
import type { UnfilteredResponseQueryOptions } from '@sanity/client'
import { draftMode } from 'next/headers'
import 'server-only'
import { readToken } from '@/sanity/lib/sanity.api'
import { sanityFetch } from '@/sanity/lib/sanity.live'
import { PAGE_QUERY } from '@/sanity/queries/documents/page.query'
import { SeoGroup } from 'sanity.types'

export type PagePayload = {
  mainImage?: any
  _id?: string
  _type: string
  slug: { current: string }
  title?: string
  body?: any
  pageBuilder: any[]
  seoGroup: SeoGroup
  description?: string
  date?: string
  localeInfo: {
    locale?: string
    _translations?: {
      title?: string
      slug?: { current: string }
      locale?: string
    }[]
  }
}

const DEFAULT_PARAMS = {} as QueryParams

export async function loadQuery<QueryResponse>({
  query,
  params = DEFAULT_PARAMS,
}: {
  query: string
  params?: QueryParams
  groqQuery?: string
}): Promise<QueryResponse> {
  const isDraftMode = (await draftMode()).isEnabled
  const token = readToken

  if (isDraftMode && !token) {
    throw new Error('The `SANITY_API_READ_TOKEN` environment variable is required in Draft Mode.')
  }

  const perspective = isDraftMode ? 'drafts' : 'published'

  const options = {
    filterResponse: false,
    useCdn: true,
    resultSourceMap: isDraftMode ? 'withKeyArraySelector' : false,
    token: isDraftMode ? token : undefined,
    perspective,
    next: {
      tags: ['sanity'],
      revalidate: isDraftMode ? 0 : 60,
    },
  } satisfies UnfilteredResponseQueryOptions

  /* @deprecated
  const result = await client.fetch<QueryResponse>(query, params, {
    ...options,
    stega: isDraftMode,
  } as UnfilteredResponseQueryOptions)
  return result.result
 */

  const result = await sanityFetch({
    query,
    params,
    ...options,
  })
  return result.data
}

export async function useLoadPage(slug: string, locale: string, groqQuery?: string) {
  return loadQuery<PagePayload | null>({
    query: groqQuery || PAGE_QUERY,
    params: { slug, locale },
  })
}
