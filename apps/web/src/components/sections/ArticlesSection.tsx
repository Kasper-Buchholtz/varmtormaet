import React from 'react'
import ArticleCard from '../molecules/ArticleCard'
import Heading from '../atoms/Heading'
import Section, { Section_Variants } from './Section'
import { cn } from '@/utils/twMerge'
import { clean } from '@/utils/sanitize'
import { ArticlesType } from 'sanity.types'

/**
 *
 * @returns: En sektion med artikler.
 * @example: <ArticlesSection
 * @alias: ArticlesSection
 * @summary: Denne komponent bruges til at vise en sektion med artikler.
 * @version: 1.0.0
 * @property: [section]
 * @author: Kasper Buchholtz
 *
 **/

type ArticlesSectionProps = {
  data: ArticlesType
}

const ArticlesSection = ({ data }: ArticlesSectionProps) => {
  const { articles } = data
  return (
    <Section data={data}>
      <ArticlesSection.Title heading={data.heading} />
      <ul
        className={cn(
          Section_Variants({
            paddingX: 'none',
            paddingTop: 'none',
            paddingBottom: 'none',
            className: 'col-span-full bg-transparent',
          }),
        )}
      >
        <ArticlesSection.All section={data} articles={articles} />
        <ArticlesSection.Manual section={data} articles={articles} />
        <ArticlesSection.Newest section={data} articles={articles} />
      </ul>
    </Section>
  )
}

export default ArticlesSection

ArticlesSection.Title = Title
ArticlesSection.All = All
ArticlesSection.Manual = Manual
ArticlesSection.Newest = Newest

function Title({ heading }: { heading: ArticlesType['heading'] }) {
  return (
    <div className="col-span-full">
      <Heading data={heading}>{heading.text}</Heading>
    </div>
  )
}

function All({ section, articles }) {
  return (
    <>
      {clean(section.view) === 'all' && (
        <>
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </>
      )}
    </>
  )
}

function Manual({ section, articles }) {
  return (
    <>
      {clean(section.view) === 'manual' && (
        <>
          {articles.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </>
      )}
    </>
  )
}

function Newest({ section, articles }) {
  return (
    <>
      {clean(section.view) === 'newest' && (
        <>
          {articles.slice(0, 6).map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </>
      )}
    </>
  )
}
