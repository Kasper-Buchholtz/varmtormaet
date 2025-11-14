export interface Seo {
  radioField: string
  seoDescription: string
  seoTitle: string
  seoKeywords: {
    _key: string
    _type: string
    keyword: string
  }[]
  seoImage: {
    _type: string
    asset: {
      _ref: any
      _type: string
    }
  }
}
