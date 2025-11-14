import Link from 'next/link'
import React from 'react'
import Heading from '@/components/atoms/Heading'
import Paragraph from '@/components/atoms/Paragraph'
import { formatDate } from '@/utils/date'
import Card from '../atoms/Card'
import { resolveHref } from '@repo/utils/src/resolveHref'
import Photo from '../atoms/Photo'

/**
 *
 * @returns: En artikel card, der viser information om en artikel.
 * @example: <ArticleCard />
 * @alias: ArticleCard
 * @summary: Denne komponent bruges til at vise information om en artikel.
 * @version: 1.0.0
 * @property: [article]
 * @author: Kasper Buchholtz
 **/

type ArticleCardProps = {
  article: {
    locale: string
    title: string
    _id: string
    slug: string
    date: string
    _key: string
    _type: 'article'
    mainImage: any
  }
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const locale = article?.locale || 'da'
  return (
    <>
      <Card
        key={article?._key}
        className="relative overflow-hidden shadow-md col-span-full xs:col-span-2 sm:col-span-4 xl:col-span-6 group rounded-xl bg-superego-light-base text-superego-dark"
      >
        {article?.slug && (
          <Link
            className="absolute inset-0 z-10 w-full h-full "
            href={resolveHref(locale, article._type, article.slug)}
          ></Link>
        )}
        {article?.mainImage && (
          <div className="relative object-cover w-full overflow-hidden">
            <Photo image={article?.mainImage} aspectRatio="4/3" lqip />
          </div>
        )}
        <div className="flex flex-col justify-between p-8 space-y-10 xs:p-10 min-h-40 ">
          <Heading text="wrap" size="md" tag="h4" spacing="none" clamp={3}>
            {article?.title}
          </Heading>
          {article?.date && (
            <div className="text-superego-green">
              <Paragraph>{formatDate(article.date)}</Paragraph>
            </div>
          )}
        </div>
      </Card>
    </>
  )
}

export default ArticleCard
