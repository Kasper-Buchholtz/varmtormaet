import { stegaClean } from '@sanity/client/stega'

export const sanitizeString = (str: string): string => {
  return str.replace(/[^\x20-\x7E]/g, '')
}

export const clean = (data: string): string => {
  return stegaClean(data) // Perform the data cleaning logic here
}
