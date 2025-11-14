import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '@/sanity/lib/sanity.client'
import { readToken } from '@/sanity/lib/sanity.api'
const token = readToken
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token }),
})
