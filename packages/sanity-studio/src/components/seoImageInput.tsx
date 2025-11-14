import { Badge, Flex, Stack, Button, Card, Text } from '@sanity/ui'
import type { ImageInputProps } from 'sanity'
import { useFormValue, useClient } from 'sanity'
import { PatchEvent, set, unset } from 'sanity'
import { useEffect, useState } from 'react'

export function InputWithImageDefault(props: ImageInputProps): JSX.Element {
  const document = useFormValue([])

  if (!document) {
    return props.renderDefault(props)
  }

  const { mainImage } = document as {
    mainImage?: {
      asset?: {
        _ref: string
      }
      alt?: string
      hotspot?: any
      crop?: any
    }
  }

  const client = useClient()
  const [defaultImage, setDefaultImage] = useState<any>(null)

  useEffect(() => {
    // Fetch default image from footer or settings
    client.fetch('*[_type == "footer"][0].object.defaultSeoImage').then((result) => {
      if (result) setDefaultImage(result)
    })
  }, [client])

  const handleInsertMainImage = () => {
    if (mainImage) {
      const imageValue = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: mainImage.asset?._ref
        },
        ...(mainImage.alt && { alt: mainImage.alt }),
        ...(mainImage.hotspot && { hotspot: mainImage.hotspot }),
        ...(mainImage.crop && { crop: mainImage.crop })
      }
      props.onChange?.(PatchEvent.from(set(imageValue)))
    }
  }

  const handleInsertDefaultImage = () => {
    if (defaultImage) {
      const imageValue = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: defaultImage.asset?._ref
        },
        ...(defaultImage.alt && { alt: defaultImage.alt }),
        ...(defaultImage.hotspot && { hotspot: defaultImage.hotspot }),
        ...(defaultImage.crop && { crop: defaultImage.crop })
      }
      props.onChange?.(PatchEvent.from(set(imageValue)))
    }
  }

  const handleClearImage = () => {
    props.onChange?.(PatchEvent.from(unset()))
  }

  const hasMainImage = mainImage?.asset?._ref
  const hasDefaultImage = defaultImage?.asset?._ref
  const hasCurrentValue = props.value?.asset?._ref

  return (
    <Stack space={3}>
      {/* Show placeholder info when no custom image */}
      {!hasCurrentValue && hasMainImage && (
        <Card tone="caution" padding={3} radius={2}>
          <Text size={1}>
            💡 Vil bruge "Udvalgt billede" som SEO billede. Tilføj et billede nedenfor for at overskrive.
          </Text>
        </Card>
      )}

      {/* Normal image input - completely untouched */}
      {props.renderDefault(props)}
    </Stack>
  )
}