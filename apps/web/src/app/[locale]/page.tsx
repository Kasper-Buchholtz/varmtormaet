import React from 'react'
import { useLoadPage } from '@/hooks/useLoadPage'
import { PageBuilder } from '@/components/global/PageBuilder'
import PageContainer from '@/components/global/PageContainer'
import { notFound } from 'next/navigation'
import { metaData } from '@/utils/metadataUtils'
import { Page } from 'sanity.types'
import posthog from 'posthog-js'

export default async function IndexRoute({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale
  const page = await useLoadPage('/', locale) as unknown as Page
  if (!page) {
    notFound()
  }
  posthog.capture('my event', { property: 'value' })
  return (
    <PageContainer pageType="frontpage">
      {page.pageBuilder && (
        <PageBuilder documentId={page._id} documentType={page._type} sections={page.pageBuilder} />
      )}
      {/* <Schema
        as="webPage"
        title={clean(page.title || page.seoGroup?.seoTitle)}
        description={clean(page.seoGroup?.seoDescription)}
        baseURL={clean(Appconfig.WebsiteUrl)}
        path={clean(page.slug.current)}
        dateModified={clean(page._updatedAt)}
        datePublished={clean(page._createdAt)}
      /> */}
    </PageContainer>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale

  const page = await useLoadPage('/', locale) as unknown as Page
  return metaData({ locale }, page)
}


