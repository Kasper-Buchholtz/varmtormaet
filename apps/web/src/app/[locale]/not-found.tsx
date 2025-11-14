'use client'

import Link from 'next/link'
import React from 'react'
import { useParams } from 'next/navigation'
import PageContainer from '@/components/global/PageContainer'
import Section from '@/components/sections/Section'
import Heading from '@/components/atoms/Heading'
import Paragraph from '@/components/atoms/Paragraph'
import { AdvancedButton } from '@/components/atoms/AdvancedButton'

// Simple inline translation object
const translations = {
  da: {
    heading: 'Undskyld, noget gik galt',
    description:
      'Vi kan desværre ikke finde siden, du leder efter. Vend tilbage til forsiden eller få besvaret dine spørgsmål ved at kontakte os.',
    button: 'Gå til forsiden',
    slug: '/',
  },
  en: {
    heading: 'Sorry, something went wrong',
    description:
      "Unfortunately, we can't find the page you're looking for. Return to the homepage or get your questions answered by contacting us.",
    button: 'Go to frontpage',
    slug: '/en',
  },
}

const ErrorPage: React.FC = () => {
  const params = useParams()
  const locale = (params?.locale as 'da' | 'en') || 'da'
  const t = translations[locale]

  return (
    <PageContainer>
      <Section className="min-h-screen">
        <div className="my-auto text-center col-span-full">
          <Heading tag="h1" type="h1">
            {t?.heading}
          </Heading>
          <Paragraph size="regular">{t?.description}</Paragraph>
          <div className="flex justify-center gap-4 mt-8">
            <AdvancedButton variant="primary" asChild>
              <Link href={t?.slug}>{t?.button}</Link>
            </AdvancedButton>
          </div>
        </div>
      </Section>
    </PageContainer>
  )
}

export default ErrorPage
