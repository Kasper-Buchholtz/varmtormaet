import React from 'react'
import { useLoadPage } from '@/hooks/useLoadPage'
import { PageBuilder } from '@/components/global/PageBuilder'
import PageContainer from '@/components/global/PageContainer'
import { notFound } from 'next/navigation'
import { metaData } from '@/utils/metadataUtils'
import Section from '@/components/sections/Section'
import Heading from '@/components/atoms/Heading'
import Paragraph from '@/components/atoms/Paragraph'
import { formatDate } from '@/utils/date'
import { draftMode } from 'next/headers'
import { EVENT_QUERY } from '@/sanity/queries/documents/event.query'
import Photo from '@/components/atoms/Photo'
import { EVENT_QUERYResult } from 'sanity.types'
import { Params } from '@/types/params.types'

export default async function DynamicRoute({ params }: { params: Promise<Params> }) {
  const { slug: slugArray } = await params
  const slug = slugArray.join('/')
  const page = await useLoadPage(slug, 'da', EVENT_QUERY) as unknown as EVENT_QUERYResult

  if (!page) {
    notFound()
  }

  if (page.seoGroup?.radioField === 'hidden') {
    if (!(await draftMode()).isEnabled) {
      notFound()
    }
  }
  return (
    <PageContainer pageType="eventpage">
      <Section
        variant="light"
        paddingTop="none"
        paddingX="none"
        paddingBottom="none"
        className="h-screen/1.6"
      >
        <Section
          paddingBottom="none"
          className="order-2 col-span-full sm:col-span-8 md:col-span-6 lg:col-span-6 xl:col-span-12 md:order-1 md:my-auto"
          tag="div"
        >
          <div className="col-span-full">
            <Heading spacing="small">{page.title}</Heading>
            <Heading size="xs" tag="h6" spacing="default">
              {formatDate(page.date ?? '')}
            </Heading>
            <Paragraph>{page.description}</Paragraph>
          </div>
        </Section>
        <div className="order-1 col-span-full sm:col-span-8 md:col-span-6 lg:col-span-6 xl:col-span-12 md:order-2">
          <Photo image={page.mainImage} />
        </div>
      </Section>

      {page.pageBuilder && (
        <PageBuilder documentId={page._id} documentType={page._type} sections={page.pageBuilder as any} />

      )}
    </PageContainer>
  )
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const locale = (await params).locale
  const { slug: slugArray } = await params
  const slug = slugArray.join('/')
  const page = await useLoadPage(slug, 'da', EVENT_QUERY) as unknown as EVENT_QUERYResult

  return metaData({ locale }, page)
}
