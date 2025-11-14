'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Section from '@/components/sections/Section'
import { usePathname } from 'next/navigation'

type BreadcrumbItem = {
  label?: string
  href?: string
}

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const pathSegments = pathname.split('/').filter((segment) => segment)

  if (pathname === '/') {
    return null
  }

  const items: BreadcrumbItem[] = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/')
    const label = segment.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
    return { label, href }
  })

  return (
    <Section paddingTop="none" variant="light" paddingBottom="none" paddingX="default">
      <nav
        data-type="breadcrumb"
        aria-label="breadcrumb"
        className="py-2 sm:py-4 lg:py-6 3xl:py-8 col-span-full"
      >
        <ol className="flex justify-start gap-4">
          <li className="flex gap-4 breadcrumb-item">
            <Link
              href="/"
              className="transition-colors text-superego-grey/40 hover:text-superego-grey/60"
            >
              Forside
            </Link>
            <span className="text-superego-grey/40">{'>'}</span>
          </li>
          {items.map((item, index) => (
            <li key={index} className="flex gap-4 breadcrumb-item">
              {index === items.length - 1 ? (
                <span className="text-superego-grey">{item.label}</span>
              ) : (
                <Link
                  className="transition-colors text-superego-grey/40 hover:text-superego-grey/60"
                  href={item.href || ''}
                >
                  {item.label}
                </Link>
              )}
              {index !== items.length - 1 && <span className="text-superego-grey/40">{'>'}</span>}
            </li>
          ))}
        </ol>
      </nav>
    </Section>
  )
}

export default Breadcrumbs
