import React from 'react'
import { motion } from 'motion/react'

/**
 *
 * @returns: En component der animere et element ind i viewet.
 * @example: <AnimateSlideIn />
 * @alias: AnimateSlideIn
 * @summary: Denne komponent bruges til at animere et element ind i viewet.
 * @version: 1.0.0
 * @property: [direction, children]
 * @author: Kasper Buchholtz
 *
 **/

interface AnimateSlideInProps {
  direction: 'left' | 'right' | 'top' | 'bottom'
  children: React.ReactNode
}

const AnimateSlideIn: React.FC<AnimateSlideInProps> = ({ direction, children }) => {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? '-10%' : direction === 'right' ? '10%' : 0,
      y: direction === 'top' ? '-10%' : direction === 'bottom' ? '10%' : 0,
    },
    visible: { opacity: 1, x: 0, y: 0 },
  }

  return (
    <motion.div className="col-span-full" initial="hidden" animate="visible" variants={variants}>
      {children}
    </motion.div>
  )
}

export default AnimateSlideIn
