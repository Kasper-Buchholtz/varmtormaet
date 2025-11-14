import { useState, useEffect } from 'react'
import { client } from '@/sanity/lib/sanity.client'
import { FOOTER_QUERY } from '@/sanity/queries/documents/footer.query'

/**
 * Custom hook to fetch and manage footer data based on the provided locale.
 *
 * @param locale - The locale string used to fetch localized footer data.
 * @returns The fetched footer data or `null` if the data is not yet available.
 *
 * @remarks
 * This hook uses the `useEffect` hook to fetch data asynchronously when the `locale` changes.
 * It relies on a `client.fetch` method to retrieve data using the `FOOTER_QUERY`.
 * If an error occurs during the fetch, it will be logged to the console.
 *
 * @example
 * ```tsx
 * const footerData = useFooterData('en-US');
 * ```
 */

const useFooterData = (locale) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await client.fetch(FOOTER_QUERY, { locale: locale })
        result = await result
        setData(result)
      } catch (error) {
        console.error('Error fetching Footer data:', error)
      }
    }

    fetchData()
  }, [locale])

  return data
}

export default useFooterData
