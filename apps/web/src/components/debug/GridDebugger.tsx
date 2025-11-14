import React from 'react'
import Section from '../sections/Section'

const GridDebugger = () => {
  return (
    <div className="fixed top-0 right-0 w-full h-full  z-[calc(infinity+10)] pointer-events-none">
      <Section
        className="h-full bg-superego-green/10 *:bg-superego-green/20 *:block"
        paddingBottom="none"
        paddingTop="none"
      >
        <span />
        <span />
        <span />
        <span />
        <span className="xs:hidden sm:block" />
        <span className="xs:hidden sm:block" />
        <span className="xs:hidden sm:block" />
        <span className="xs:hidden sm:block" />
        <span className="xs:hidden md:block" />
        <span className="xs:hidden md:block" />
        <span className="xs:hidden md:block" />
        <span className="xs:hidden md:block" />
        <span className="xs:hidden xl:block" />
        <span className="xs:hidden xl:block" />
        <span className="xs:hidden xl:block" />
        <span className="xs:hidden xl:block" />
        <span className="xs:hidden xl:block" />
        <span className="xs:hidden xl:block" />
        <span className="xs:hidden xl:block" />
        <span className="xs:hidden xl:block" />
        <span className="xs:hidden xl:block" />
        <span className="xs:hidden xl:block" />
        <span className="xs:hidden xl:block" />
        <span className="xs:hidden xl:block" />
      </Section>
    </div>
  )
}

export default GridDebugger
