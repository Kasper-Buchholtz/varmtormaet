import { ChevronDownIcon } from '@sanity/icons'
import { Link, Earth, Envelope, Telephone, File } from '@mynaui/icons-react'
import { Button, Menu, MenuButton, MenuItem } from '@sanity/ui'
import { set, type StringInputProps } from 'sanity'
import styled from 'styled-components'
import { CustomLinkType, LinkFieldPluginOptions, LinkType } from '../types'
import React from 'react'

const defaultLinkTypes: LinkType[] = [
  { title: 'Intern', value: 'internal', icon: Link },
  { title: 'URL', value: 'external', icon: Earth },
  { title: 'Email', value: 'email', icon: Envelope },
  { title: 'Tlf', value: 'phone', icon: Telephone },
  { title: 'File', value: 'file', icon: File },
]

const LinkTypeButton = styled(Button)`
  height: 35px;

  svg.lucide {
    width: 1rem;
    height: 1rem;
  }
`

const LinkTypeMenuItem = styled(MenuItem)`
  svg.lucide {
    width: 1rem;
    height: 1rem;
  }
`

/**
 * Custom input component for the "type" field on the link object.
 * Renders a button with an icon and a dropdown menu to select the link type.
 */
export function LinkTypeInput({
  value,
  onChange,
  customLinkTypes = [],
  linkableSchemaTypes,
}: StringInputProps & {
  customLinkTypes?: CustomLinkType[]
  linkableSchemaTypes: LinkFieldPluginOptions['linkableSchemaTypes']
}) {
  const linkTypes = [
    // Disable internal links if not enabled for any schema types
    ...defaultLinkTypes.filter(
      ({ value }) => value !== 'internal' || linkableSchemaTypes?.length > 0,
    ),
    ...customLinkTypes,
  ]

  const selectedType = linkTypes.find((type) => type.value === value) || linkTypes[0]
  if (!selectedType) {
    return null
  }

  return (
    <MenuButton
      button={
        <LinkTypeButton
          type="button"
          mode="ghost"
          icon={selectedType.icon}
          iconRight={ChevronDownIcon}
          title="Select link type"
          aria-label={`Select link type (currently: ${selectedType.title})`}
        />
      }
      id="link-type"
      menu={
        <Menu>
          {linkTypes.map((type) => (
            <LinkTypeMenuItem
              key={type.value}
              text={type.title}
              icon={type.icon}
              onClick={() => {
                onChange(set(type.value))
              }}
            />
          ))}
        </Menu>
      }
    />
  )
}
