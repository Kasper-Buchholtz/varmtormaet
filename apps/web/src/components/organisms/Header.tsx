import { AnimatePresence } from 'motion/react'
import Link from 'next/link'
import * as React from 'react'
import { useEffect } from 'react'
import Navigation from '@/components/organisms/Navigation'
import Logo from '../atoms/Logo'
import Section from '../sections/Section'
import NavigationGroup from './NavigationGroup'
import { useParams } from 'next/navigation'
import { resolveHomeHref } from '@repo/utils/src/resolveHref'

export default function Header() {
  const locale = useParams().locale
  const [isOpen, setIsOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)


  const handleCloseNav = () => {
    setIsOpen(false)
  }

  const handleScroll = () => {
    if (window.scrollY > 420) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    // Check scroll position on mount
    handleScroll()

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <Section
        paddingBottom="none"
        paddingTop="none"
        tag="header"
        data-scroll={isScrolled}
        className={`
          fixed top-0 right-0 w-full py-4 se-grid z-9999999999 h-20 transition-all 
          data-[scroll=true]:bg-superego-light-50 bg-transparent page-type-subpage:bg-superego-dark data-[scroll=true]:page-type-subpage:bg-superego-flamingo
        `}
      >
        <Link
          className="col-span-2 col-start-1 md:col-span-5 xl:col-span-6"
          href={resolveHomeHref(locale as string)}
          title=""
        >
          <Logo className="w-full h-auto max-w-xs" variant="dark" />
        </Link>
        <NavigationGroup isOpen={isOpen} setIsOpen={setIsOpen} />
      </Section>
      <AnimatePresence mode="wait">
        {isOpen && <Navigation onClose={handleCloseNav} />}
      </AnimatePresence>
    </>
  )
}
