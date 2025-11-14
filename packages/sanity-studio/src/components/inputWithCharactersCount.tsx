import type { BadgeTone } from '@sanity/ui'
import { Badge, Flex, Stack, Button, Card } from '@sanity/ui'
import type { TextInputProps, TextOptions } from 'sanity'
import { useFormValue, useClient } from 'sanity'
import { PatchEvent, set, unset } from 'sanity'
import { useEffect, useState } from 'react'

type CountedTextOptions = {
  maxLength?: number
  minLength?: number
} & TextOptions

function CharacterCount(props: { value?: string } & CountedTextOptions) {
  if (!props.maxLength && !props.minLength) {
    return null
  }

  const { value = '' } = props

  const maxPercentage = props.maxLength && (value.length / props.maxLength) * 100

  let tone: BadgeTone = 'primary'

  if (maxPercentage && maxPercentage > 100) {
    tone = 'critical'
  } else if (maxPercentage && maxPercentage > 75) {
    tone = 'caution'
  }

  if (props.minLength && value.length < props.minLength) {
    tone = 'caution'
  }
  return (
    <Badge tone={tone}>
      {value.length} / {props.maxLength}
    </Badge>
  )
}

export function InputWithCharacterCount(props: TextInputProps): JSX.Element {
  const document = useFormValue([])

  if (!document) {
    return props.renderDefault(props)
  }

  const { name, title } = document as {
    name?: string
    title?: string
  }

  let defaultTitle: string | undefined = undefined

  const client = useClient()
  const [webTitle, setWebTitle] = useState('')

  useEffect(() => {
    client.fetch('*[_type == "footer"][0].object.companyName').then((result) => {
      if (result) setWebTitle(result)
    })
  }, [client])

  if (props.id?.startsWith('seoGroup.')) {
    defaultTitle = title ?? name ?? undefined
  }

  props.elementProps.placeholder = defaultTitle

  const handleInsertSideTitle = () => {
    const existing = props.value || ''
    const insert = `${defaultTitle}`
    props.onChange?.(PatchEvent.from(set(`${existing} ${insert}`.trim())))
  }

  const handleInsertWebTitle = () => {
    const existing = props.value || ''
    const insert = `${webTitle}`
    if (webTitle) {
      props.onChange?.(PatchEvent.from(set(`${existing} ${insert}`.trim())))
    }
  }

  const handleInsertSeparator = () => {
    const existing = props.value || ''
    const insert = '|'
    props.onChange?.(PatchEvent.from(set(`${existing} ${insert}`.trim())))
  }

  return (
    <Stack space={2}>
      {props.renderDefault(props)}

      <Flex justify="flex-end" gap={2} align={'center'}>
        <DynamicBar
          value={props.value}
          maxLength={(props.schemaType.options as CountedTextOptions)?.maxLength}
        />
        <div style={{ flexShrink: 0 }}>
          <CharacterCount
            value={props.value}
            {...((props.schemaType.options || {}) as CountedTextOptions)}
          />
        </div>
      </Flex>
      <Flex justify="flex-start" align="center" gap={3}>
        <Card padding={1}>
          <Button
            text="Indsæt sidetitel"
            tone="primary"
            onClick={handleInsertSideTitle}
            mode="ghost"
          />
        </Card>
        <Card padding={1}>
          <Button
            text="Indsæt seperator"
            tone="primary"
            onClick={handleInsertSeparator}
            mode="ghost"
          />
        </Card>
        <Card padding={1}>
          <Button
            text="Indsæt hjemmesidens titel"
            tone="primary"
            onClick={handleInsertWebTitle}
            mode="ghost"
          />
        </Card>
      </Flex>
    </Stack>
  )
}

function DynamicBar({ value = '', maxLength = 100 }: { value?: string; maxLength?: number }) {
  const length = value.length
  const rawPercentage = (length / maxLength) * 100
  const percentage = Math.min(rawPercentage, 100)

  let background = 'gray'

  if (rawPercentage > 100) {
    background = '#dc2626' //red
  } else if (rawPercentage > 75) {
    background = '#ffde21' //yellow
  } else {
    background = '#22c55e' //green
  }

  return (
    <div
      style={{
        height: '6px',
        backgroundColor: '#F3F3F5',
        borderRadius: '3px',
        width: '100%',
        border: '1px solid #E0E0E0',
      }}
    >
      <div
        style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: background,
          borderRadius: '3px',
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  )
}
