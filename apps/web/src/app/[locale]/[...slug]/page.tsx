import React from 'react'
import { useLoadPage } from '@/hooks/useLoadPage'
import { PageBuilder } from '@/components/global/PageBuilder'
import PageContainer from '@/components/global/PageContainer'
import { notFound } from 'next/navigation'
import { metaData } from '@/utils/metadataUtils'
import { draftMode } from 'next/headers'
import { Page } from 'sanity.types'
import { Params } from '@/types/params.types'

export interface PageParams {
  params: Promise<Params>
}

export default async function DynamicRoute({ params }: PageParams) {
  const { slug: slugArray, locale: locale } = await params
  const slug = slugArray.join('/')
  const page = await useLoadPage(slug, locale) as unknown as Page

  if (!page) {
    notFound()
  }

  if (page.seoGroup?.radioField === 'hidden') {
    if (!(await draftMode()).isEnabled) {
      notFound()
    }
  }
  return (
    <PageContainer pageType="subpage">
      {page.pageBuilder && (
        <PageBuilder documentId={page._id} documentType={page._type} sections={page.pageBuilder} />
      )}
    </PageContainer >
  )
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug: slugArray, locale: locale } = await params
  const slug = slugArray.join('/')

  const page = await useLoadPage(slug, locale) as unknown as Page
  return metaData({ locale }, page)
}
