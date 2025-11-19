import { Lock } from '@mynaui/icons-react'
import { Box, Text, TextInput, Tooltip } from '@sanity/ui'
import {
  StringInputProps,
  useFormValue,
  SanityDocument,
  StringSchemaType,
  set,
  unset,
} from 'sanity'

type Props = StringInputProps<StringSchemaType & { options?: { field?: string } }>

const ProxyString = (props: Props) => {
  const { schemaType, value, onChange } = props

  const path = schemaType?.options?.field
  const doc = useFormValue([]) as SanityDocument

  // Helper to resolve nested values like "slug.current"
  const proxyValue =
    path && doc
      ? (path.split('.').reduce((acc, segment) => (acc as any)?.[segment], doc) as
        | string
        | undefined) ?? ''
      : ''

  const handleChange = (event: any) => {
    const nextValue = event.currentTarget.value
    onChange(nextValue ? set(nextValue) : unset())
  }

  return (
    <Tooltip
      content={
        <Box padding={2}>
          <Text muted size={1} >
            Denne værdi sættes i Shopify (<code>{path}</code>)
          </Text>
        </Box>
      }
      portal
    >
      <TextInput
        iconRight={Lock}
        value={value ?? ''}
        placeholder={proxyValue || 'Ingen værdi fra Shopify endnu'}
        onChange={handleChange}
      />
    </Tooltip>
  )
}

export default ProxyString