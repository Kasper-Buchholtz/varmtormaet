export type Section = {
  _key: string
  _type: string
  [key: string]: any
}

export type PageSection = {
  _key: string
  _type: string
}

export type PageData = {
  _id: string
  _type: string
  sections?: PageSection[]
}

export type PageBuilderProps = {
  sections: Section[]
  documentId: string
  documentType: string
}
