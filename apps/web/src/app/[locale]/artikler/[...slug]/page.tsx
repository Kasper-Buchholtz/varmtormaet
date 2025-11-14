import React from 'react'
import { useLoadPage } from '@/hooks/useLoadPage'
import PageContainer from '@/components/global/PageContainer'
import { notFound } from 'next/navigation'
import Section from '@/components/sections/Section'
import Heading from '@/components/atoms/Heading'
import Paragraph from '@/components/atoms/Paragraph'
import { formatDate } from '@/utils/date'
import TextContainer from '@/components/sections/textContainer'
import { metaData } from '@/utils/metadataUtils'
import { draftMode } from 'next/headers'
import { ARTICLE_QUERY } from '@/sanity/queries/documents/article.query'
import Photo from '@/components/atoms/Photo'
import { ARTICLE_QUERYResult } from 'sanity.types'
import Schema from '@/components/global/Schema'
import Appconfig from '@repo/utils/src/superego.config'
import { clean } from '@/utils/sanitize'
import { Params } from '@/types/params.types'


export default async function DynamicRoute({ params }: { params: Promise<Params> }) {
  const resolvedParams = await params // Await the Promise
  const slug = `${resolvedParams.slug.join('/')}`
  const page = await useLoadPage(slug, 'da', ARTICLE_QUERY) as unknown as ARTICLE_QUERYResult


  if (!page) {
    notFound()
  }

  if (page.seoGroup?.radioField === 'hidden') {
    if (!(await draftMode()).isEnabled) {
      notFound()
    }
  }
  return (
    <PageContainer pageType="articlepage">
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
          tag={'div'}
        >
          <div className="col-span-full">
            <Heading spacing="small">{page.title}</Heading>
            <Heading size="xs" tag="p" spacing="default">
              {page.date ? formatDate(page.date) : ''}
            </Heading>
            {/* <Paragraph>{page.description}</Paragraph> */}
          </div>
        </Section>
        <div className="order-1 col-span-full sm:col-span-8 md:col-span-6 lg:col-span-6 xl:col-span-12 md:order-2">
          <Photo image={page.mainImage} />
        </div>
      </Section>
      <TextContainer variant="light">
        <Paragraph isPortableText>{page.body as any}</Paragraph>
      </TextContainer>
      <Schema
        as='article'
        title={clean(page.title)}
        description={clean(page.description)}
        baseURL={Appconfig.WebsiteUrl}
        path={clean(page.slug.current)}

      />
    </PageContainer>
  )
}



export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const locale = (await params).locale
  const { slug: slugArray } = await params
  const slug = slugArray.join('/')
  const page = await useLoadPage(slug, 'da', ARTICLE_QUERY) as unknown as ARTICLE_QUERYResult
  return metaData({ locale }, page)
}