'use client'
import { Button } from './Button'
import { useState } from 'react'
import Icon from '@repo/sanity-web/src/components/Icons'
import { AnimatePresence, motion } from 'motion/react'
import { NAVIGATION_QUERYResult } from 'sanity.types'

/**
 *
 * @returns: En NavigationItem-komponent ...
 * @example: <NavigationItem />
 * @alias: NavigationItem
 * @summary: Denne komponent bruges til at ...
 * @version: 1.0.0
 * @property: [...]
 * @author: Kasper Buchholtz
 *
 **/

interface NavigationItemProps {
  item: NAVIGATION_QUERYResult['links'][number]
}

export default function NavigationItem({ item }: NavigationItemProps) {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen)
  }
  return (
    <li>
      <Button
        onClick={toggleSubmenu}
        link={item.link as any}
        variant="none"
        className="w-full block relative pr-8"
      >
        {item?.link?.label}
        {item.links && item.links.length > 0 && (
          <Icon
            type="chevronDown"
            className={`size-3 fill-current absolute transition right-0 top-1/2 -translate-y-1/2 ${isSubmenuOpen ? 'transform rotate-180' : ''}`}
          />
        )}
      </Button>
      <AnimatePresence>
        {item.links && item.links.length > 0 && isSubmenuOpen && (
          <motion.ul
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="pl-4 mt-2 space-y-2 overflow-hidden"
          >
            {item.links.map((subItem, index) => (
              <NavigationItem key={index} item={subItem as any} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  )
}
