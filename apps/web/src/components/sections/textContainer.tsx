import React from 'react'
import Section from '@/components/sections/Section'
import { TextContainerProps } from '@/types/TextContainer.types'
import InnerBlocks from '../molecules/InnerBlocks'
import { InnerBlocks as InnerBlocks_types } from 'sanity.types'

/**
 *
 * @returns: En tekstcontainer.
 * @example: <TextContainer data={data} /> || <TextContainer data={data} hasChild>Children</TextContainer>
 * @alias: TextContainer
 * @summary: Denne komponent bruges til at vise en tekstcontainer.
 * @version: 2.0.0
 * @property: [data, children, hasChild, paddingX, paddingTop, paddingBottom]
 * @author: Kasper Buchholtz
 *
 **/

const TextContainer: React.FC<TextContainerProps> = ({
  data,
  hasChild = false,
  children,
  paddingX,
  paddingTop,
  paddingBottom,
  ...props
}) => {
  return (
    <Section {...props} data={data}>
      <div className="col-start-1 -col-end-1 sm:col-start-2 sm:-col-end-2 lg:col-start-3 lg:-col-end-3 xl:col-start-6 xl:-col-end-6 2xl:col-start-6 2xl:-col-end-6">
        {hasChild ? (
          <div>{children}</div>
        ) : (
          <InnerBlocks index={12} blocks={data?.innerBlocks as InnerBlocks_types} />
        )}
      </div>
    </Section>
  )
}

export default TextContainer
