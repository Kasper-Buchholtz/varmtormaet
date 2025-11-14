import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '../../../lib/sanity.client'
import { readToken } from '../../../lib/sanity.api'
const token = readToken
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token }),
})
