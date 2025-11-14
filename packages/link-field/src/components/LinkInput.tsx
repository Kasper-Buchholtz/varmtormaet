import { Box, Flex, Stack, Text } from '@sanity/ui'
import { type FieldMember, FormFieldValidationStatus, ObjectInputMember } from 'sanity'
import styled from 'styled-components'
import { isCustomLink } from '../helpers/typeGaurds'
import { LinkInputProps } from '../types'
import React from 'react'

const ValidationErrorWrapper = styled(Box)`
  contain: size;
  margin-bottom: 6px;
  margin-left: auto;
  margin-right: 12px;
`

const FullWidthStack = styled(Stack)`
  width: 100%;
`

/**
 * Custom input component for the link object.
 * Nicely renders the type and link fields next to each other, with the
 * description and any validation errors for the link field below them.
 *
 * The rest of the fields ("blank" and "advanced") are rendered as usual.
 */
export function LinkInput(props: LinkInputProps) {
  const [textField, typeField, linkField, ...otherFields] = props.members as FieldMember[]
  const { options } = props.schemaType

  const {
    field: {
      validation: linkFieldValidation,
      schemaType: { description: linkFieldDescription },
    },
  } = linkField || { field: { validation: [], schemaType: { description: '' } } }

  const description =
    props.value && isCustomLink(props.value)
      ? props.customLinkTypes.find((type) => type.value === props.value?.type)?.description
      : linkFieldDescription

  const renderProps = {
    renderAnnotation: props.renderAnnotation,
    renderBlock: props.renderBlock,
    renderField: props.renderField,
    renderInlineBlock: props.renderInlineBlock,
    renderInput: props.renderInput,
    renderItem: props.renderItem,
    renderPreview: props.renderPreview,
  }

  return (
    <Stack space={4}>
      {/* Render the text field if enabled */}
      {options?.enableText && textField && (
        <ObjectInputMember
          member={{
            ...textField,
            kind: 'field',
            field: {
              ...textField.field,
              schemaType: {
                ...textField.field.schemaType,
                title: options?.textLabel || textField.field.schemaType.title,
              },
            },
          }}
          {...renderProps}
        />
      )}

      <style>
        {`
  .full-width-stack fieldset> div:first-child{
    background-color: red;
    display: none !important;
  }
    `}
      </style>

      <Stack space={3}>
        {/* Render a label for the link field if there's also a text field enabled. */}
        {/* If there's no text field, the label here is irrelevant */}
        {options?.enableText && (
          <Text as="label" weight="medium" size={1}>
            Link
          </Text>
        )}

        <Flex gap={2} align="flex-start">
          {/* Render the type field (without its label) */}
          {typeField && (
            <ObjectInputMember
              member={{
                ...typeField,
                kind: 'field',
                field: {
                  ...typeField.field,
                  schemaType: {
                    ...typeField.field.schemaType,
                    title: undefined,
                    description: undefined,
                  },
                },
              }}
              {...renderProps}
            />
          )}

          <FullWidthStack space={2} className="full-width-stack">
            {linkField && (
              <ObjectInputMember
                member={{
                  ...linkField,
                  kind: 'field',
                  field: {
                    ...linkField.field,
                    schemaType: {
                      ...linkField.field.schemaType,
                      title: undefined,
                      description: undefined,
                    },
                  },
                }}
                {...renderProps}
              />
            )}
            {/* Render any validation errors for the link field */}
            {linkFieldValidation.length > 0 && (
              <ValidationErrorWrapper>
                <FormFieldValidationStatus
                  fontSize={1}
                  placement="top"
                  validation={linkFieldValidation}
                />
              </ValidationErrorWrapper>
            )}
          </FullWidthStack>
        </Flex>
        {/* Render the description of the selected link field, if any */}
        {description && (
          <Text muted size={1}>
            {description}
          </Text>
        )}
      </Stack>
      {/* Render the rest of the fields as usual */}
      {otherFields.map((field) => (
        <ObjectInputMember key={field.key} member={field} {...renderProps} />
      ))}
    </Stack>
  )
}
