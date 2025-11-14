'use client'
import React, { ReactNode } from 'react'
import { motion } from 'motion/react'

/**
 *
 * @returns: En component der animere et element ind i viewet.
 * @example: <FadeUp />
 * @alias: FadeUp
 * @summary: Denne komponent bruges til at animere et element ind i viewet. Brug AsChild for at anvende animationen på et child elementet.
 * @version: 2.0.0
 * @property: [children, delay, duration, className, asChild]
 * @author: Kasper Buchholtz
 *
 **/

export function FadeUp({
  children,
  delay = 0,
  duration = 0.5,
  className = '',
  asChild = false,
  ...props
}: {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  asChild?: boolean
  [key: string]: any
}) {
  const motionProps = {
    ...props,
    className,
    variants: {
      hidden: {
        opacity: 0,
        y: 16,
      },
      visible: {
        opacity: 1,
        y: 0,
      },
    },
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true },
    transition: { delay, type: 'spring', duration },
  }

  if (asChild) {
    // When asChild is true, we need to clone the child and add motion props to it
    const child = React.Children.only(children) as React.ReactElement
    const MotionChild = motion(child.type as React.ComponentType<any>)

    return (
      <MotionChild
        {...motionProps}
        {...child.props}
        className={`${motionProps.className} ${child.props.className || ''}`.trim()}
      />
    )
  }

  return <motion.div {...motionProps}>{children}</motion.div>
}

FadeUp.displayName = 'FadeUp'
