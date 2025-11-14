'use client'
import Footer from '@/components/organisms/Footer'
import Header from '@/components/organisms/Header'
import { Lenis } from '@/components/global/Lenis'
import { Suspense } from 'react'

/**
 *
 * @returns: En container, der indeholder header, footer og børnekomponenter.
 * @example: <PageContainer />
 * @alias: PageContainer
 * @summary: Denne komponent bruges til at vise en container, der indeholder header, footer og børnekomponenter.
 * @version: 1.0.0
 * @property: [children]
 * @author: Kasper Buchholtz
 *
 **/

export default function PageContainer({
  pageType = 'subpage',
  lenis = {
    lerp: 0.1,
    duration: 1.2,
    smoothTouch: false, //smooth scroll for touch devices
    smooth: true,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 2,
    anchors: true,
  },
  children,
}: {
  pageType?: 'subpage' | 'frontpage' | 'articlepage' | 'eventpage'
  lenis?: {
    lerp: number
    duration: number
    smoothTouch: boolean
    smooth: boolean
    easing: (t: number) => number
    orientation: string
    gestureOrientation: string
    smoothWheel: boolean
    touchMultiplier: number
    anchors: boolean
  }
  children: React.ReactNode
}) {
  return (
    <div data-pagetype={pageType}>
      <Header />
      <Lenis
        options={lenis}
        root={typeof document !== 'undefined' ? document.documentElement : null}
      />
      {children}
      <Suspense>
        <Footer />
      </Suspense>
    </div>

  )
}
