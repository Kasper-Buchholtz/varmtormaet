'use client'
import React from 'react'
import { sectionComponents } from '@/components/sections'
import { createDataAttribute } from '@sanity/visual-editing'
import { useOptimistic } from '@sanity/visual-editing/react'
import { PageBuilderProps, PageData, Section } from '@/types/PageBuilder.types'
import { dataset, projectId } from '@/sanity/lib/sanity.api'

const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || projectId || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || dataset || '',
}

export function PageBuilder({
  sections: initialSections,
  documentId,
  documentType,
}: PageBuilderProps) {
  const sections = useOptimistic<Section[], PageData>(
    initialSections,
    (currentSections, action) => {
      if (action.id !== documentId) {
        return currentSections
      }

      if (action.document.sections) {
        return action.document.sections
      }

      return currentSections
    },
  )

  function randomKey() {
    return Math.random().toString(36).substring(7)
  }

  return (
    <main
      data-sanity={createDataAttribute({
        ...sanityConfig,
        id: documentId,
        type: documentType,
        path: 'pageBuilder',
      }).toString()}
    >
      {sections.map((section) => (
        <section
          key={section._key || randomKey()}
          data-sanity={createDataAttribute({
            ...sanityConfig,
            id: documentId,
            type: documentType,
            path: `pageBuilder[_key=="${section._key}"]`,
          }).toString()}
        >
          {renderSection(section)}
        </section>
      ))}
    </main>
  )
}

function renderSection(section: Section) {
  const Component = sectionComponents[section._type]
  if (!Component) {
    console.warn(`Unknown section type: ${section._type}`)
    return null
  }
  return <Component data={section} />
}
