import { EditIcon, EyeOpenIcon, FolderIcon, LockIcon, RefreshIcon } from '@sanity/icons'
import {
  PresentationNavigateContextValue,
  usePresentationNavigate,
  usePresentationParams,
} from 'sanity/presentation'
import { Box, Button, Card, Flex, Spinner, Stack, Text, TextInput } from '@sanity/ui'
import * as PathUtils from '@sanity/util/paths'
import { getDocumentPath, stringToslug } from '@repo/sanity-web/src/utils/urls'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import {
  FormFieldValidationStatus,
  FormPatch,
  PatchEvent,
  Path,
  SanityDocument,
  set,
  unset,
  useFormValue,
} from 'sanity'
import { styled } from 'styled-components'
import { useDebounce, useDebouncedCallback } from 'use-debounce'

import { useAsync } from '../hooks/useAsync'
import { SlugContext, useslugContext } from '../hooks/usePathnameContext'
import { useslugPrefix } from '../hooks/usePathnamePrefix'
import { DocumentWithLocale, slugInputProps, slugOptions, slugSourceFn } from '../types'

const UnlockButton = styled(Button)`
  position: static !important;
  cursor: pointer;
  > span:nth-of-type(2) {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
`

const FolderText = styled(Text)`
  span {
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
`

const slugDebounceTime = 1000

export function slugFieldComponent(props: slugInputProps): JSX.Element {
  const fieldOptions = props.schemaType.options as slugOptions | undefined
  const { prefix } = useslugPrefix(props)
  const folderOptions = fieldOptions?.folder ?? { canUnlock: true }

  const i18nOptions = useMemo(
    () =>
      fieldOptions?.i18n ?? {
        enabled: false,
        defaultLocaleId: undefined,
        localizeslug: undefined,
      },
    [fieldOptions],
  )

  const autoNavigate = fieldOptions?.autoNavigate ?? false
  const document = useFormValue([]) as DocumentWithLocale
  const {
    inputProps: { onChange, value, readOnly },
    title,
    description,
    validation = [],
  } = props
  const segments = value?.current?.split('/').slice(0)
  const folder = segments?.slice(0, -1).join('/')
  const slug = segments?.slice(-1)[0] || ''
  const [folderLocked, setFolderLocked] = useState(!!folder)
  const folderCanUnlock = !readOnly && folderOptions.canUnlock
  const sourceField = fieldOptions?.source

  const navigate = useSafeNavigate()
  const preview = useSafePreview()
  const debouncedNavigate = useDebouncedCallback((newPreview?: string) => {
    if (navigate) {
      navigate(newPreview)
    }
  }, slugDebounceTime)

  const localizedslug = getDocumentPath(
    {
      ...document,
      locale: i18nOptions.enabled ? document.locale : undefined,
      slug: value?.current,
    },
    i18nOptions.defaultLocaleId || '',
    i18nOptions.localizeslug,
  )
  const [debouncedLocalizedslug] = useDebounce(localizedslug, slugDebounceTime)

  const fullPathInputRef = useRef<HTMLInputElement>(null)
  const pathSegmentInputRef = useRef<HTMLInputElement>(null)

  const inputValidationProps = useMemo(
    () =>
      validation.length
        ? {
            customValidity: validation[0].message,
          }
        : {},
    [validation],
  )

  const updateFinalSegment = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const segment = stringToslug(e.currentTarget.value)
      // When updating only the final path segment, we don't allow slashes / sub-paths.
      // User must unlock the folder before doing so.
      const finalValue = [folder, segment].filter((part) => typeof part === 'string').join('/')

      runChange({
        onChange,
        value: finalValue,
        document,
        i18nOptions,
        prevLocalizedslug: debouncedLocalizedslug,
        preview,
        navigate: autoNavigate ? debouncedNavigate : undefined,
      })
    },
    [
      folder,
      onChange,
      document,
      i18nOptions,
      debouncedLocalizedslug,
      preview,
      autoNavigate,
      debouncedNavigate,
    ],
  )

  const updateFullPath = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      runChange({
        onChange,
        value: e.currentTarget.value,
        document,
        i18nOptions,
        prevLocalizedslug: debouncedLocalizedslug,
        preview,
        navigate: autoNavigate ? debouncedNavigate : undefined,
      })
    },
    [
      onChange,
      document,
      i18nOptions,
      debouncedLocalizedslug,
      preview,
      autoNavigate,
      debouncedNavigate,
    ],
  )

  const unlockFolder: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault()
      setFolderLocked(false)
      requestAnimationFrame(() => {
        fullPathInputRef?.current?.focus?.()
      })
    },
    [setFolderLocked, fullPathInputRef],
  )

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = useCallback(() => {
    setFolderLocked(!!folder)
  }, [folder, setFolderLocked])

  const pathInput = useMemo(() => {
    if (folderLocked && folder) {
      return (
        <Flex gap={1} align="center">
          <Card
            paddingLeft={2}
            paddingRight={1}
            paddingY={1}
            border
            radius={1}
            tone="transparent"
            style={{ position: 'relative' }}
          >
            <Flex gap={2} align="center">
              <Text muted>
                <FolderIcon />
              </Text>
              <FolderText muted>{folder}</FolderText>
              <UnlockButton
                icon={folderCanUnlock ? EditIcon : LockIcon}
                onClick={unlockFolder}
                title={
                  folderCanUnlock ? 'Rediger stiens mappe' : 'Mappen er låst og kan ikke ændres'
                }
                mode="bleed"
                tone="primary"
                padding={2}
                fontSize={1}
                disabled={!folderCanUnlock}
              >
                <span />
              </UnlockButton>
            </Flex>
          </Card>
          <Text muted size={2}>
            /
          </Text>
          <Box flex={1}>
            <TextInput
              value={slug}
              onChange={updateFinalSegment}
              ref={pathSegmentInputRef}
              onBlur={handleBlur}
              disabled={readOnly}
              {...inputValidationProps}
            />
          </Box>
          {sourceField && (
            <GenerateButton
              sourceField={sourceField}
              document={document}
              onChange={onChange}
              folder={folder}
              disabled={readOnly}
              localizedslug={localizedslug}
              i18nOptions={i18nOptions}
              preview={preview}
              navigate={autoNavigate ? debouncedNavigate : undefined}
            />
          )}
          {!autoNavigate && <PreviewButton localizedslug={localizedslug || ''} />}
        </Flex>
      )
    }

    // If unlocked or no folder, show a plain input for the full path
    return (
      <Flex gap={1} align="center">
        <Box flex={1}>
          <TextInput
            value={value?.current || ''}
            onChange={updateFullPath}
            ref={fullPathInputRef}
            onBlur={handleBlur}
            disabled={readOnly}
            style={{ flex: 1 }}
            {...inputValidationProps}
          />
        </Box>
        {sourceField && (
          <GenerateButton
            sourceField={sourceField}
            document={document}
            onChange={onChange}
            folder={folder}
            disabled={readOnly}
            localizedslug={localizedslug}
            i18nOptions={i18nOptions}
            preview={preview}
            navigate={autoNavigate ? debouncedNavigate : undefined}
          />
        )}
        {!autoNavigate && <PreviewButton localizedslug={localizedslug || ''} />}
      </Flex>
    )
  }, [
    autoNavigate,
    debouncedNavigate,
    document,
    folder,
    folderCanUnlock,
    folderLocked,
    handleBlur,
    i18nOptions,
    inputValidationProps,
    localizedslug,
    onChange,
    preview,
    readOnly,
    slug,
    sourceField,
    unlockFolder,
    updateFinalSegment,
    updateFullPath,
    value,
  ])

  return (
    <Stack space={3}>
      <Stack space={2} flex={1}>
        <Flex align="center" paddingY={1}>
          <Text size={1} weight="semibold">
            {title}
          </Text>
          {validation.length > 0 && (
            <Box marginLeft={2}>
              <FormFieldValidationStatus fontSize={1} placement="top" validation={validation} />
            </Box>
          )}
        </Flex>
        {description && <Text size={1}>{description}</Text>}
      </Stack>

      {typeof value?.current === 'string' && (
        <Text muted>
          {prefix}
          {localizedslug}
        </Text>
      )}

      {pathInput}
    </Stack>
  )
}

function runChange({
  document,
  onChange,
  value,
  i18nOptions,
  prevLocalizedslug,
  preview,
  navigate,
}: {
  document: DocumentWithLocale
  onChange: (patch) => void
  value?: string
  i18nOptions?: slugOptions['i18n']
  prevLocalizedslug?: string
  preview?: string | null
  navigate?: PresentationNavigateContextValue
}) {
  // We use stringToslug to ensure that the value is a valid slug.
  // We also allow trailing slashes to make it possible to create folders
  const finalValue = value ? stringToslug(value, { allowTrailingSlash: true }) : undefined

  onChange(
    typeof value === 'string'
      ? set({
          current: finalValue,
          _type: 'slug',
        })
      : unset(),
  )

  // Auto-navigate to the updated path in Presentation if enabled
  if (navigate) {
    const newLocalizedslug = getDocumentPath(
      {
        ...document,
        locale: i18nOptions?.enabled ? document.locale : undefined,
        slug: finalValue,
      },
      i18nOptions?.defaultLocaleId || '',
      i18nOptions?.localizeslug,
    )

    // Auto-navigate if this document is currently being previewed,
    // or if it's a brand new document being created.
    if (preview === prevLocalizedslug || !document._createdAt) {
      navigate(newLocalizedslug)
    }
  }
}

function PreviewButton({ localizedslug }: { localizedslug: string }) {
  const navigate = useSafeNavigate()
  const preview = useSafePreview()

  const handleClick = useCallback(() => {
    if (!navigate || typeof localizedslug !== 'string') {
      return
    }

    navigate(localizedslug)
  }, [navigate, localizedslug])

  return (
    !!navigate && (
      <Button
        text="Preview"
        fontSize={1}
        height={'100%'}
        mode="default"
        tone="default"
        icon={EyeOpenIcon}
        disabled={typeof localizedslug !== 'string' || preview === localizedslug}
        title="Preview page"
        onClick={handleClick}
      />
    )
  )
}

function GenerateButton({
  sourceField,
  document,
  onChange,
  folder,
  disabled,
  localizedslug,
  i18nOptions,
  preview,
  navigate,
}: {
  sourceField: string | Path | slugSourceFn
  document: DocumentWithLocale
  onChange: (patch: FormPatch | PatchEvent | FormPatch[]) => void
  folder?: string
  disabled?: boolean
  localizedslug?: string
  i18nOptions?: slugOptions['i18n']
  preview?: string | null
  navigate?: PresentationNavigateContextValue
}) {
  const slugContext = useslugContext()

  const updateslug = useCallback(
    (nextslug: string) => {
      const finalValue = [...(folder ? [folder] : []), stringToslug(nextslug)]
        .filter((part) => typeof part === 'string')
        .join('')

      runChange({
        onChange,
        value: finalValue,
        document,
        i18nOptions,
        prevLocalizedslug: localizedslug,
        preview,
        navigate,
      })
    },
    [document, folder, i18nOptions, localizedslug, navigate, onChange, preview],
  )

  const [generateState, handleGenerateSlug] = useAsync(() => {
    return getNewFromSource(sourceField, document, slugContext).then((newFromSource) =>
      updateslug(
        stringToslug(newFromSource?.trim() || '', {
          allowTrailingSlash: true,
        }),
      ),
    )
  }, [sourceField, slugContext, updateslug])

  const isUpdating = generateState?.status === 'pending'

  return (
    <Button
      fontSize={1}
      height="100%"
      mode="ghost"
      tone="default"
      icon={isUpdating ? Spinner : RefreshIcon}
      aria-label="Generate"
      onClick={handleGenerateSlug}
      disabled={disabled || isUpdating}
    />
  )
}

async function getNewFromSource(
  source: string | Path | slugSourceFn,
  document: SanityDocument,
  context: SlugContext,
): Promise<string | undefined> {
  return typeof source === 'function'
    ? source(document, context)
    : (PathUtils.get(document, source) as string | undefined)
}

function useSafeNavigate() {
  try {
    const navigate = usePresentationNavigate()
    return navigate
  } catch (e) {
    return null
  }
}

function useSafePreview() {
  try {
    const presentationParams = usePresentationParams()
    const { preview } = presentationParams
    return preview
  } catch (e) {
    return null
  }
}
