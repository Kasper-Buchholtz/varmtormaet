import { WarningOutlineIcon } from '@sanity/icons'
import { StringFieldProps, useFormValue } from 'sanity'
import { Box, Card, Flex, Stack, Text } from '@sanity/ui'
import { productUrl } from '../../utils/shopifyUrl'

type Store = {
  id: number
  status: string
  isDeleted: boolean
}

export default function ProductHiddenInput(props: StringFieldProps) {
  const store: Store = useFormValue(['store']) as Store

  let message
  if (!store) {
    return <></>
  } else {
    const shopifyProductUrl = productUrl(store?.id)
    const isActive = store?.status === 'active'
    const isDeleted = store?.isDeleted

    if (!isActive) {
      message = (
        <>
          Det har ikke en <code>aktiv</code> status i Shopify.
        </>
      )
    }
    if (isDeleted) {
      message = 'Det er blevet slettet fra Shopify.'
    }

    return (
      <Card padding={4} radius={2} shadow={1} tone="critical">
        <Flex align="flex-start">
          <Text size={2}>
            <WarningOutlineIcon />
          </Text>
          <Box flex={1} marginLeft={3}>
            <Box>
              <Text size={2} weight="semibold">
                Dette produkt er skjult
              </Text>
            </Box>
            <Stack marginTop={4} space={2}>
              <Text size={1}>{message}</Text>
            </Stack>
            {!isDeleted && shopifyProductUrl && (
              <Box marginTop={4}>
                <Text size={1}>
                  →{' '}
                  <a href={shopifyProductUrl} target="_blank" rel="noreferrer">
                    Åbn i Shopify
                  </a>
                </Text>
              </Box>
            )}
          </Box>
        </Flex>
      </Card>
    )
  }
}