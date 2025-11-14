import { useEffect, useState } from 'react'
import { motion, Variants } from 'framer-motion'
import { cn } from '@/utils/twMerge'

interface TypewriterProps {
  text: string | string[]
  speed?: number
  initialDelay?: number
  waitTime?: number
  deleteSpeed?: number
  loop?: boolean
  className?: string
  showCursor?: boolean
  hideCursorOnType?: boolean
  cursorChar?: string | React.ReactNode
  cursorAnimationVariants?: {
    initial: Variants['initial']
    animate: Variants['animate']
  }
  cursorClassName?: string
}

/**
 *
 * @returns A typewriter animation React component that types and optionally deletes text, supporting multiple strings, looping, and customizable cursor.
 * @example <Typewriter text={["Hello", "World!"]} speed={60} loop={false} />
 * @alias Typewriter
 * @summary This component animates text as if being typed and deleted, with options for speed, delay, looping, cursor appearance, and more.
 * @version 1.0.0
 * @property text - The string or array of strings to animate.
 * @property speed - Typing speed in milliseconds per character (default: 50).
 * @property initialDelay - Delay before typing starts in milliseconds (default: 0).
 * @property waitTime - Time to wait before deleting or switching text in milliseconds (default: 2000).
 * @property deleteSpeed - Speed of deleting characters in milliseconds (default: 30).
 * @property loop - Whether to loop through the texts (default: true).
 * @property className - Additional CSS classes for the wrapper.
 * @property showCursor - Whether to show the cursor (default: true).
 * @property hideCursorOnType - Hide the cursor while typing or deleting (default: false).
 * @property cursorChar - The character to use as the cursor (default: "|").
 * @property cursorClassName - CSS classes for the cursor element (default: "ml-1").
 * @property cursorAnimationVariants - Framer Motion animation variants for the cursor.
 * @author Kasper Buchholtz
 *
 **/
const Typewriter = ({
  text,
  speed = 50,
  initialDelay = 0,
  waitTime = 2000,
  deleteSpeed = 30,
  loop = true,
  className,
  showCursor = true,
  hideCursorOnType = false,
  cursorChar = '|',
  cursorClassName = 'ml-1',
  cursorAnimationVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.01,
        repeat: Infinity,
        repeatDelay: 0.4,
        repeatType: 'reverse',
      },
    },
  },
}: TypewriterProps) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  const texts = Array.isArray(text) ? text : [text]

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const currentText = texts[currentTextIndex]

    const startTyping = () => {
      if (isDeleting) {
        if (displayText === '') {
          setIsDeleting(false)
          if (currentTextIndex === texts.length - 1 && !loop) {
            return
          }
          setCurrentTextIndex((prev) => (prev + 1) % texts.length)
          setCurrentIndex(0)
          timeout = setTimeout(() => {}, waitTime)
        } else {
          timeout = setTimeout(() => {
            setDisplayText((prev) => prev.slice(0, -1))
          }, deleteSpeed)
        }
      } else {
        if (currentIndex < currentText.length) {
          timeout = setTimeout(() => {
            setDisplayText((prev) => prev + currentText[currentIndex])
            setCurrentIndex((prev) => prev + 1)
          }, speed)
        } else if (texts.length > 1) {
          timeout = setTimeout(() => {
            setIsDeleting(true)
          }, waitTime)
        }
      }
    }

    // Apply initial delay only at the start
    if (currentIndex === 0 && !isDeleting && displayText === '') {
      timeout = setTimeout(startTyping, initialDelay)
    } else {
      startTyping()
    }

    return () => clearTimeout(timeout)
  }, [
    currentIndex,
    displayText,
    isDeleting,
    speed,
    deleteSpeed,
    waitTime,
    texts,
    currentTextIndex,
    loop,
  ])

  return (
    <div className={`inline whitespace-pre-wrap tracking-tight ${className}`}>
      <span>{displayText}</span>
      {showCursor && (
        <motion.span
          variants={cursorAnimationVariants}
          className={cn(
            cursorClassName,
            hideCursorOnType && (currentIndex < texts[currentTextIndex].length || isDeleting)
              ? 'hidden'
              : '',
          )}
          initial="initial"
          animate="animate"
        >
          {cursorChar}
        </motion.span>
      )}
    </div>
  )
}

export { Typewriter }
