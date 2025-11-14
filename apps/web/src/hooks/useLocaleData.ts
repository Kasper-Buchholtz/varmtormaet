import { useState, useEffect } from 'react'
import { client } from '@/sanity/lib/sanity.client'
import { LOCALE_QUERY } from '@/sanity/queries/organisms/locale.query'

const useLocaleData = (locale, slug) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching with:', { locale, slug })
        const result = await client.fetch(LOCALE_QUERY, { locale, slug })
        console.log('Fetched result:', result)
        setData(result)
      } catch (error) {
        console.error('Error fetching navigation data:', error)
      }
    }

    if (locale && slug) fetchData()
  }, [locale, slug])

  return data
}

export default useLocaleData
