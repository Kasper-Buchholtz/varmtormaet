import React from 'react'
import { motion } from 'motion/react'

const FadeSplitText = ({ children }: { children: string }) => {
  return (
    <span aria-label={children}>
      {children.split('').map((char, index) => (
        <motion.span
          key={index}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: index * 0.1 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

export default FadeSplitText
