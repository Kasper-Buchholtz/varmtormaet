import { SchemaTypeDefinition } from 'sanity'
import * as Documents from '../schemas/documents/_index'
import * as Atoms from '../schemas/atoms/_index'
import * as Sections from '../schemas/sections/_index'
import * as Modules from '../schemas/modules/_index'

const documentTypes = [...Object.values(Documents)]
const sectionTypes = [...Object.values(Sections)]
const atomTypes = [...Object.values(Atoms)]
const moduleTypes = [...Object.values(Modules)]

export const schema: { types: SchemaTypeDefinition[]; templates: any } = {
  types: [
    ...documentTypes, // Documents
    ...atomTypes, // Atoms
    ...sectionTypes, // Sections
    ...moduleTypes, // Modules
  ],
  templates: (prev: Array<{ id: string; [key: string]: any }>) => [
    ...prev.filter(
      (template: { id: string }) => !['page', 'article', 'event'].includes(template.id),
    ),
    // Add custom templates here
    // example below
    // {
    //   id: 'kind-match',
    //   title: 'Kind Match',
    //   schemaType: 'article',
    //   value: (params: { value: any }) => ({
    //     // kind will be prefilled
    //     kind: params.value,
    //     pagebuilder: [],
    //   }),
    // },
  ],
}
