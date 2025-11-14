'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Heading from '@/components/atoms/Heading'
import Icon from '@repo/sanity-web/src/components/Icons'
import { AccordionContextType, AccordionProps } from '@/types/Accordion.types'

const AccordionContext = createContext<AccordionContextType | null>(null)

const useAccordion = () => {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('useAccordion must be used within an AccordionProvider')
  }
  return context
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  unfloded = false,
  children,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(unfloded)

  useEffect(() => {
    setIsOpen(unfloded)
  }, [unfloded])

  const toggle = () => setIsOpen(!isOpen)

  return (
    <AccordionContext.Provider value={{ isOpen: isOpen ? 'true' : 'false', toggle }}>
      <div
        className={`accordion relative w-full rounded bg-superego-light-0 text-superego-dark group ${className}`}
        data-type="accordion"
      >
        <AccordionButton>{title}</AccordionButton>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AccordionPanel>{children}</AccordionPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AccordionContext.Provider>
  )
}

const AccordionButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toggle, isOpen } = useAccordion()
  return (
    <button
      className="flex items-center justify-between w-full px-4 py-4 transition-colors accordion-button group/state"
      onClick={toggle}
      aria-expanded={isOpen}
      data-state={isOpen}
    >
      <Heading spacing="none" className="m-0 text-left" tag="h6" size="md">
        {children}
      </Heading>
      <AccordionIcon />
    </button>
  )
}

const AccordionIcon: React.FC = () => {
  return (
    <span className="absolute right-4">
      <Icon
        type="chevronDown"
        className="text-superego-dark group-data-[state=true]/state:rotate-180 transition-all size-6"
      />
    </span>
  )
}

const AccordionPanel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="px-4 pb-6 accordion-panel">{children}</div>
)

export default Accordion
