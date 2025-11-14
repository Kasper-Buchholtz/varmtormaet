import { useState, useEffect } from 'react'

/**
 * Custom hook to evaluate and respond to a media query.
 *
 * @param query - A media query string to evaluate (e.g., `(min-width: 768px)`).
 * @returns A boolean indicating whether the media query matches the current viewport.
 *
 * @example
 * ```tsx
 * const isLargeScreen = useMediaQuery('(min-width: 1024px)');
 *
 * return (
 *   <div>
 *     {isLargeScreen ? 'Large screen' : 'Small screen'}
 *   </div>
 * );
 * ```
 *
 * @remarks
 * This hook uses the `window.matchMedia` API to evaluate the media query and listens for changes
 * to update the state accordingly. It ensures compatibility with server-side rendering by checking
 * if the `window` object is defined.
 */

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQueryList = window.matchMedia(query)
      const documentChangeHandler = () => setMatches(mediaQueryList.matches)

      // Set the initial state
      documentChangeHandler()

      // Listen for changes
      mediaQueryList.addEventListener('change', documentChangeHandler)

      return () => {
        mediaQueryList.removeEventListener('change', documentChangeHandler)
      }
    }
  }, [query])

  return matches
}
