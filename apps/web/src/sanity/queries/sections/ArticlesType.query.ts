import groq from 'groq'

const ArticleCardQuery = groq`
title,
_id,
"slug": slug.current,
date,
locale,
_key,
mainImage,
_type
`

export const ArticlesTypeQuery = groq`
  _type == "ArticlesType" => {
    ...,
    heading,
    "articles": select(
      view == "newest" => *[_type == "article"] | order(date desc)[0...24]{
        ${ArticleCardQuery}
      },
      view == "manual" => articles[]->{
        ${ArticleCardQuery}
      },
      view == "all" => *[_type == "article"] | order(date desc){
        ${ArticleCardQuery}
      }
    )
  }
`
