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

export function SeoInputWithCharacterCount(props: TextInputProps): JSX.Element {
  const document = useFormValue([])

  if (!document) {
    return props.renderDefault(props)
  }

  const { name, title } = document as {
    name?: string
    title?: string
  }

  let defaultTitle: string | undefined = undefined
  const [ltFeedback, setLtFeedback] = useState<string[]>([])
  const [ltLoading, setLtLoading] = useState(false)

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
  useEffect(() => {
    const checkGrammar = async () => {
      if (!props.value || props.value.length < 10) {
        setLtFeedback([])
        return
      }

      setLtLoading(true)

      try {
        const res = await fetch('https://api.languagetool.org/v2/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            text: props.value,
            language: 'da',
          }),
        })

        const result = await res.json()

        const messages = result.matches.map(
          (match: any) => `${match.message} (${match.context.text})`
        )

        setLtFeedback(messages)
      } catch (err) {
        console.error('LanguageTool error:', err)
      } finally {
        setLtLoading(false)
      }
    }

    checkGrammar()
  }, [props.value])


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
      {ltLoading && <div style={{ fontSize: '13px', color: '#999' }}>Tjekker sprog...</div>}

      {ltFeedback.length > 0 && (
        <div style={{ paddingTop: '4px', fontSize: '13px', color: '#cc3300' }}>
          <strong>Grammatik & Stil:</strong>
          <ul style={{ paddingLeft: '16px', marginTop: '4px' }}>
            {ltFeedback.map((msg, idx) => (
              <li key={idx}>• {msg}</li>
            ))}
          </ul>
        </div>
      )}

      {props.value && (
        <Flex direction="column" style={{ paddingTop: '4px' }}>
          {(() => {
            const { score, issues, tone } = evaluateSeoQuality(
              props.value,
              [webTitle, 'Holstebro', 'Superego'] // 👈 optional keywords
            )
            return (
              <>
                <Badge tone={tone} padding={1}>
                  SEO score: {score}/100
                </Badge>
                {issues.length > 0 && (
                  <ul style={{ paddingTop: '4px', fontSize: '13px', color: '#666' }}>
                    {issues.map((issue, i) => (
                      <li key={i}>• {issue}</li>
                    ))}
                  </ul>
                )}
              </>
            )
          })()}
        </Flex>
      )}

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


function evaluateSeoQuality(text: string, keywords: string[] = []): {
  score: number
  issues: string[]
  tone: BadgeTone
} {
  let score = 100
  const issues: string[] = []

  if (text.length < 50) {
    issues.push('For kort – tilføj mere beskrivende tekst')
    score -= 15
  }
  if (text.length > 160) {
    issues.push('For lang – prøv at forkorte teksten')
    score -= 10
  }
  if (!text.match(/^[A-ZÆØÅ]/)) {
    issues.push('Bør starte med stort begyndelsesbogstav')
    score -= 5
  }
  if (/click here|read more|learn more/i.test(text)) {
    issues.push('Undgå generiske CTA\'er som "klik her"')
    score -= 10
  }
  if (!/[a-zA-ZæøåÆØÅ]{4,}/.test(text)) {
    issues.push('Teksten indeholder ikke nok meningsfulde ord')
    score -= 20
  }

  const containsKeyword = keywords.some((k) =>
    text.toLowerCase().includes(k.toLowerCase())
  )
  if (!containsKeyword) {
    issues.push('Overvej at inkludere et nøgleord (f.eks. firmanavn eller by)')
    score -= 10
  }

  let tone: BadgeTone = 'positive'
  if (score < 70) tone = 'caution'
  if (score < 50) tone = 'critical'

  return { score, issues, tone }
}
