import React from 'react'
import Heading from '@/components/atoms/Heading'
import { Button } from '@/components/atoms/Button'
import Paragraph from '@/components/atoms/Paragraph'
import Accordion from '@/components/molecules/Accordion'
import { clean } from '@/utils/sanitize'
import { extractPlainText } from '@/utils/StructuredJsonData'
import {
  Accordion as AccordionType,
  Heading as HeadingType,
  InnerBlocks as InnerBlocks_types,
  TextBlock,
} from 'sanity.types'

interface InnerBlocks_Type {
  blocks: InnerBlocks_types
  index?: number
}

const InnerBlocks = ({ blocks, index }: InnerBlocks_Type) => {
  return (
    <React.Fragment key={index}>
      {blocks?.map((block, index) => {
        switch (block._type) {
          case 'heading':
            return <InnerBlocks.Title key={index} data={block} />
          case 'textBlock':
            return <InnerBlocks.Paragraphs key={index} data={block} />
          case 'button':
            return (
              <div key={index} className="mt-8">
                <Button link={block.link} variant={clean(block.style) as any}>
                  {block.link.label}
                </Button>
              </div>
            )
          case 'accordion':
            return <InnerBlocks.AccordionGroup key={index} data={block} />
          default:
            return null
        }
      })}
    </React.Fragment>
  )
}

export default InnerBlocks

InnerBlocks.Title = Title
InnerBlocks.AccordionGroup = AccordionGroup
InnerBlocks.Paragraphs = Paragraphs

/* compound components */
function Title({ data }: { data: HeadingType }) {
  return (
    <Heading spacing="default" data={data}>
      {data.text}
    </Heading>
  )
}

function AccordionGroup({ data }: { data: AccordionType }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data?.accordions?.map((accordion) => ({
      '@type': 'Question',
      name: accordion?.title || null,
      acceptedAnswer: {
        '@type': 'Answer',
        text: extractPlainText(accordion?.body) || null,
      },
    })),
  }

  return (
    <div className="w-full mt-8 mb-8 space-y-4">
      {data?.accordions?.map((accordion, index) => (
        <Accordion
          key={index}
          title={accordion?.title}
          unfloded={clean(accordion?.unfloded as any) || false}
        >
          <Paragraph isPortableText size="regular">
            {accordion?.body as any}
          </Paragraph>
        </Accordion>
      ))}
      {data.turnIntoStructuredData == true && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </div>
  )
}

function Paragraphs({ data }: { data: TextBlock }) {
  return <Paragraph isPortableText>{data.body as any}</Paragraph>
}
