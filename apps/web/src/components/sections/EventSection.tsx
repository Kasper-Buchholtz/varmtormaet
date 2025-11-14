import React from 'react'
import Section, { Section_Variants } from './Section'
import Heading from '../atoms/Heading'
import EventCard from '../molecules/EventCard'
import { clean } from '@/utils/sanitize'
import { cn } from '@/utils/twMerge'
import { EventType } from 'sanity.types'

/**
 *
 * @returns: En sektion med events.
 * @example: <EventSection />
 * @alias: EventSection
 * @summary: Denne komponent bruges til at vise en sektion med events.
 * @version: 1.0.0
 * @property: [section, amount]
 * @author: Kasper Buchholtz
 *
 **/

type EventSectionProps = {
  data: EventType
}
const EventSection = ({ data }: EventSectionProps) => {
  return (
    <>
      <Section data={data}>
        <EventSection.Title heading={data.heading} />
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
          <EventSection.All section={data} />
          <EventSection.Manual section={data} />
          <EventSection.Newest section={data} />
        </ul>
      </Section>
    </>
  )
}

export default EventSection

EventSection.Title = Title
EventSection.All = All
EventSection.Manual = Manual
EventSection.Newest = Newest

function Newest({ section }) {
  return (
    <>
      {clean(section?.view) === 'newest' && (
        <>{section?.events?.map((event, index) => <EventCard key={index} event={event} />)}</>
      )}
    </>
  )
}

function Manual({ section }) {
  return (
    <>
      {clean(section?.view) === 'manual' && (
        <>{section?.events?.map((event, index) => <EventCard key={index} event={event} />)}</>
      )}
    </>
  )
}

function All({ section }) {
  return (
    <>
      {clean(section?.view) === 'all' && (
        <>{section?.events?.map((event, index) => <EventCard key={index} event={event} />)}</>
      )}
    </>
  )
}

function Title({ heading }) {
  return (
    <div className="col-span-full">
      <Heading data={heading}>{heading.text}</Heading>
    </div>
  )
}
