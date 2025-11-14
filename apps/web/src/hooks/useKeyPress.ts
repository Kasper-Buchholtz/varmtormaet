import { useEffect, useMemo, useRef } from 'react'

const normalizeKey = (key: string) => {
  return key.toLowerCase()
}

/**
 * Custom React hook to handle keyboard shortcuts involving multiple keys.
 *
 * @param keys - An array of key names (e.g., `['Control', 'S']`) that should be pressed together to trigger the callback.
 * @param callback - A function to be called when the specified key combination is pressed.
 *
 * @remarks
 * - The hook listens for `keydown`, `keyup`, and `blur` events on the `window` object.
 * - The callback is only triggered when all specified keys are pressed simultaneously, and not on key repeats.
 * - The hook normalizes key names for consistent matching.
 * - Cleans up event listeners on unmount or when dependencies change.
 *
 * @example
 * ```tsx
 * useKeyPress(['Control', 'S'], (e) => {
 *   e.preventDefault();
 *   // Handle Ctrl+S shortcut
 * });
 * ```
 */

export function useKeyPress(keys: string[], callback: (e: KeyboardEvent) => void) {
  const lastKeyPressed = useRef<Set<string>>(new Set([]))
  const keysSet = useMemo(() => {
    return new Set(keys.map((key) => normalizeKey(key)))
  }, [keys])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.repeat) return // To prevent this function from triggering on key hold e.g. Ctrl hold

    lastKeyPressed.current?.add(normalizeKey(e.key))

    // To bypass TypeScript check for the new ECMAScript method `isSubset`
    if ((keysSet as any).isSubsetOf(lastKeyPressed.current)) {
      e.preventDefault()
      callback(e)
    }
  }

  const handleKeyUp = (e: KeyboardEvent) => {
    lastKeyPressed.current?.delete(normalizeKey(e.key))
  }

  const handleBlur = () => {
    lastKeyPressed.current?.clear()
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('blur', handleBlur)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('blur', handleBlur)
    }
  }, [keysSet, callback])
}
