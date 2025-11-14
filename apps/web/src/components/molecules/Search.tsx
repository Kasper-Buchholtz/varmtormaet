'use client'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { groq } from 'next-sanity'
import * as React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { AdvancedButton } from '@/components/atoms/AdvancedButton'
import Icon from '@repo/sanity-web/src/components/Icons'
import { client } from '@/sanity/lib/sanity.client'
import Heading from '../atoms/Heading'
import { defaultOptions } from '@/hooks/useAnimate'
import { resolveHref } from '@repo/utils/src/resolveHref'
import { resolveDocumentType } from '@repo/utils/src/ResolveDocumentType'

const DEBOUNCE_DELAY = 300

export async function getSearchResults(query: string) {
  const formattedQuery = `*${query.toLowerCase()}*`

  return client.fetch(
    groq`
      *[_type in ["page", "event", "article"] && (lower(title) match $formattedQuery || lower(description) match $formattedQuery)]{
        _rev,
        locale,
        _createdAt,
        _type,
        _id,
        "slug": slug.current,
        title,
        _updatedAt
      }`,
    { formattedQuery },
  )
}

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = useCallback(async () => {
    if (query.trim() === '') return
    setIsLoading(true)
    setError(null)
    try {
      const searchResults = await getSearchResults(query)
      setResults(searchResults)
    } catch (err) {
      setError('Failed to fetch search results.')
    } finally {
      setIsLoading(false)
    }
  }, [query])

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      handleSearch()
    }, DEBOUNCE_DELAY)

    return () => clearTimeout(debounceTimeout)
  }, [query, handleSearch])

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev)
    if (isSearchOpen) {
      setQuery('')
      setResults([])
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault()
      toggleSearch()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isSearchOpen])

  return (
    <>
      <button onClick={toggleSearch} className=" group size-11.5 my-auto" aria-label="Open search">
        <Icon
          className="mx-auto my-auto transition-all md:mx-auto size-8 fill-superego-dark group-hover:rotate-12 filter bg-blend-exclusion group-hover:fill-superego-green"
          type="Search"
        />
      </button>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            data-lenis-prevent="true"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%', transition: { duration: 0.25 } }}
            transition={{ duration: defaultOptions.duration, ease: defaultOptions.ease }}
            className="fixed pt-2.5 h-20 pb-2.5 top-0 right-0 w-full px-4 xs:px-4 sm:px-13 md:px-24 lg:px-19 xl:px-36 2xl:px-52 bg-superego-light-light z-[calc(infinity+1)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-title"
          >
            <h2 id="search-title" className="sr-only">
              Search
            </h2>
            <label className="relative block w-full" htmlFor="text">
              <input
                autoFocus
                className="w-full px-4 transition-all border rounded-lg h-14 border-dark ring-0 ring-green ring-offset-0 focus-within:ring-2 focus-within:ring-green focus-within:ring-offset-2"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search query"
              />
              <div className="absolute -translate-y-1/2 right-4 top-1/2">
                <AdvancedButton onClick={toggleSearch} variant="primary">
                  Search
                </AdvancedButton>
              </div>
            </label>
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <ul className="mt-4 space-y-4 overflow-y-auto rounded max-h-96">
              {results.map((result) => (
                <SearchResult key={result._rev} result={result} />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isSearchOpen && (
          <motion.button
            className="fixed z-998 top-0 right-0 w-screen h-screen bg-superego-dark/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={toggleSearch}
            aria-label="Close search"
          />
        )}
      </AnimatePresence>
    </>
  )
}

const SearchResult = ({ result }) => {
  return (
    <li className="relative" page-type={result._type} key={result.title}>
      <Link
        href={resolveHref(result.locale, result?._type, result.slug)}
        target="_self"
        className="block px-6 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 bg-superego-light-base"
      >
        <Heading spacing="none" size="xs" tag="h6">
          {result.title}
        </Heading>

        <span className="absolute px-2 py-1 -translate-y-1/2 border rounded-md text-small bg-superego-dark text-superego-light-base top-1/2 right-4 ">
          {resolveDocumentType('page')}
        </span>
      </Link>
    </li>
  )
}
