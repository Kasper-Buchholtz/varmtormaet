'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'

/**
 *
 * @returns: En SplitText-komponent med GSAP animation
 * @example: <SplitText>Hej verden</SplitText>
 * @alias: SplitText
 * @summary: Denne komponent splitter teksten op i <span> elementer og animerer dem ved mount
 * @version: 2.0.0
 * @property: [children, ease, duration, stagger]
 * @author: Kasper Buchholtz
 *
 **/

gsap.registerPlugin(SplitText)

type TextSplitProps = {
  children: React.ReactNode
  ease?: string | gsap.EaseFunction
  duration?: number
  stagger?: number
}

const TextSplit = ({
  children,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
}: TextSplitProps) => {
  const container = useRef()

  useGSAP(
    () => {
      const split = new SplitText(container.current, {
        type: 'words,chars',
        wordsClass: 'word',
        charsClass: 'char',
      })

      gsap.from(split.chars, {
        duration: duration,
        opacity: 0,
        y: 10,
        ease: ease,
        stagger: stagger,
      })

      // Optional cleanup
      return () => {
        split.revert() // undo splitting when component unmounts
      }
    },
    { scope: container },
  )

  return <div ref={container}>{children}</div>
}

export default TextSplit
