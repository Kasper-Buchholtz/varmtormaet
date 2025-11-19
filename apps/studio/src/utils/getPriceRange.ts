import {DEFAULT_CURRENCY_CODE} from '../shopify/constants'

type PriceObject = {
  minVariantPrice: number
  maxVariantPrice: number
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('da', {
    currency: DEFAULT_CURRENCY_CODE,
    style: 'currency',
  }).format(num)
}

// Modified getPriceRange function to include quantity
export const getPriceRange = (price: PriceObject, quantity: number = 1) => {
  if (!price || typeof price?.minVariantPrice === 'undefined') {
    return 'Ingen pris fundet'
  }
  
  const minPrice = price.minVariantPrice * quantity;
  const maxPrice = price.maxVariantPrice ? price.maxVariantPrice * quantity : null;

  if (maxPrice && minPrice !== maxPrice) {
    return `${formatNumber(minPrice)} – ${formatNumber(maxPrice)}`
  }

  return formatNumber(minPrice)
}


