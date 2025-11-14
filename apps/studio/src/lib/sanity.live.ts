import { defineLive } from 'next-sanity/live'
import { client } from './sanity.client'
import { readToken } from './sanity.api'
const token = readToken

export const { sanityFetch, SanityLive } = defineLive({
  client,
  browserToken: token,
  serverToken: token,
})
