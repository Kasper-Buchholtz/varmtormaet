import React, { useState, useMemo } from 'react'
import { Button, Card, Stack, Text, Spinner, KBD } from '@sanity/ui'
import { useClient } from 'sanity'
import * as XLSX from 'xlsx'
import { CloudUpload } from '@mynaui/icons-react'

type Row = { OLD_URL?: string; NEW_URL?: string } | Record<string, any>

function normalizePath(input: string): string | null {
  if (!input) return null
  let url = String(input).trim()

  // if it contains protocol/host, strip down to pathname
  try {
    if (/^https?:\/\//i.test(url)) {
      const { pathname } = new URL(url)
      url = pathname || '/'
    }
  } catch {
    // not a full URL, continue
  }

  // drop query + hash if present
  url = url.split('?')[0].split('#')[0].trim()

  // ensure leading slash
  if (!url.startsWith('/')) url = `/${url}`

  // collapse duplicate slashes
  url = url.replace(/\/{2,}/g, '/')

  // convert empty to root
  if (url === '') url = '/'

  return url
}

const REDIRECT_DOC_ID = 'redirects'

export default function ImportRedirects() {
  const client = useClient({ apiVersion: '2023-10-01' })
  const [file, setFile] = useState<File | null>(null)
  const [busy, setBusy] = useState(false)
  const [report, setReport] = useState<{
    added: number
    skipped: number
    total: number
    errors: string[]
  } | null>(null)

  const disabled = useMemo(() => busy || !file, [busy, file])

  async function handleImport() {
    if (!file) return
    console.log('Importing redirects from file:', file.name)
    setBusy(true)
    setReport(null)

    try {
      const ab = await file.arrayBuffer()
      const wb = XLSX.read(ab)
      const ws = wb.Sheets[wb.SheetNames[0]]
      const rows = XLSX.utils.sheet_to_json<Row>(ws) ?? []

      let total = 0,
        added = 0,
        skipped = 0
      const errors: string[] = []
      const seen = new Set<string>()

      // Fetch existing redirects to avoid duplicates
      const existingDoc = await client.getDocument(REDIRECT_DOC_ID)
      const existingSubLinks: any[] = existingDoc?.subLinks || []
      const existingPairs = new Set(
        existingSubLinks.map(
          (item) => `${item?.sourceUrl?.current ?? ''}→${item?.destinationUrl?.current ?? ''}`,
        ),
      )

      const items = rows
        .map((r, idx) => {
          // support various header spellings
          const rawOld = (r['OLD URL'] ??
            r['OLD_URL'] ??
            r['Old URL'] ??
            r['OLD'] ??
            r['old'] ??
            r['Source'] ??
            r['Gammel'] ??
            r['Old'] ??
            r['Fra'] ??
            r['FROM']) as string | undefined
          const rawNew = (r['NEW URL'] ??
            r['NEW_URL'] ??
            r['New URL'] ??
            r['NEW'] ??
            r['new'] ??
            r['Destination'] ??
            r['Ny'] ??
            r['New'] ??
            r['Til'] ??
            r['TO']) as string | undefined

          const from = normalizePath(rawOld ?? '')
          const to = normalizePath(rawNew ?? '')

          total++

          if (!from || !to) {
            skipped++
            errors.push(`Række ${idx + 2}: Mangler OLD eller NEW URL`)
            return null
          }
          if (from === to) {
            skipped++
            return null
          }

          const key = `${from}→${to}`
          if (seen.has(key) || existingPairs.has(key)) {
            skipped++
            return null
          }
          seen.add(key)
          added++
          return {
            _type: 'object',
            isInternal: true,
            sourceUrl: { _type: 'slug', current: from },
            destinationUrl: { _type: 'slug', current: to },
          }
        })
        .filter(Boolean) as any[]

      // ensure our singleton exists
      await client.createIfNotExists({
        _id: REDIRECT_DOC_ID,
        _type: 'redirect',
        subLinks: [],
        test: 'This is a singleton document used to store redirects imported via the Import Redirects tool.',
      })

      // append in batches to avoid huge patches
      const batchSize = 200
      for (let i = 0; i < items.length; i += batchSize) {
        const slice = items.slice(i, i + batchSize)
        await client
          .patch(REDIRECT_DOC_ID)
          .setIfMissing({ subLinks: [] })
          .insert('after', 'subLinks[-1]', slice)
          .commit({ autoGenerateArrayKeys: true })
      }

      setReport({ added, skipped, total, errors })
    } catch (e: any) {
      setReport({ added: 0, skipped: 0, total: 0, errors: [String(e?.message || e)] })
    } finally {
      setBusy(false)
    }
  }

  return (
    <Card padding={4} radius={3} shadow={1} height={'fill'}>
      <Stack
        space={4}
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card
          style={{
            border: '2px dashed #285042',
            padding: '20px',
            borderRadius: '8px',
            position: 'relative',
          }}
          tone="positive"
        >
          <CloudUpload size={76} style={{ margin: '0 auto' }} />
          <div style={{ textAlign: 'center' }}>
            <Text size={2} weight="bold" style={{ marginBottom: '20px' }}>
              Importer Redirects (Excel)
            </Text>
            <Text style={{ marginBottom: '20px' }}>
              Forventede kolonner:
              <KBD style={{ margin: '5px 4px' }}>OLD URL</KBD>
              og
              <KBD style={{ margin: '5px 4px' }}>NEW URL</KBD>. Første ark vil blive læst.
            </Text>
            <Text style={{ marginBottom: '20px' }}>
              Tryk her for at vælge fil eller træk og slip
            </Text>
            <input
              style={{ marginBottom: '20px', inset: '0', position: 'absolute', opacity: 0 }}
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
            {/* Hide button until a file is uploaded */}
            {file && (
              <div style={{ marginBottom: '20px' }}>
                <Text style={{ marginBottom: '20px' }}>
                  Filen er importeret. Tryk på knappen for at oprette redirects.
                </Text>
                <Button
                  text={busy ? 'Opretter redirects...' : 'Opret redirects'}
                  onClick={handleImport}
                  disabled={disabled}
                  tone="primary"
                  mode="default"
                />
                {busy && <Spinner style={{ marginLeft: 8 }} />}
              </div>
            )}
          </div>
        </Card>

        {report && (
          <Card padding={3} tone="positive" radius={2}>
            <Stack space={2}>
              <Text>Behandlet: {report.total}</Text>
              <Text>Tilføjet: {report.added}</Text>
              <Text>Sprunget over: {report.skipped}</Text>
              {report.errors?.length > 0 && (
                <Card padding={3} tone="caution" radius={2}>
                  <Text weight="semibold">Noter:</Text>
                  <ul style={{ marginTop: 8 }}>
                    {report.errors.slice(0, 10).map((e, i) => (
                      <li key={i}>
                        <code>{e}</code>
                      </li>
                    ))}
                  </ul>
                  {report.errors.length > 10 && <Text>…og {report.errors.length - 10} mere</Text>}
                </Card>
              )}
            </Stack>
          </Card>
        )}
      </Stack>
    </Card>
  )
}
