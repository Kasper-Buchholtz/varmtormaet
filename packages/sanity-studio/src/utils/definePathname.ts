import { ComponentType } from 'react'
import {
  defineField,
  FieldDefinition,
  ObjectFieldProps,
  SlugValidationContext,
  SlugValue,
} from 'sanity'
import { slugFieldComponent } from '../components'
import { slugParams } from '../types'

export function definePathname(
  schema: slugParams = { name: 'slug' },
): FieldDefinition<'slug'> & any {
  const slugOptions = schema?.options

  return defineField({
    ...schema,
    name: schema.name ?? 'slug',
    title: schema?.title ?? 'URL',
    type: 'slug',
    components: {
      ...schema.components,
      field: (schema.components?.field ?? slugFieldComponent) as unknown as ComponentType<
        ObjectFieldProps<SlugValue>
      >,
    },
    options: {
      ...(slugOptions ?? {}),
      isUnique: slugOptions?.isUnique ?? (isUnique as any as any), // Type assertion to bypass the error
    },
  })
}

async function isUnique(slug: SlugValue, context: SlugValidationContext): Promise<boolean> {
  const { document, getClient } = context
  const client = getClient({ apiVersion: '2023-06-21' })
  const id = document?._id.replace(/^drafts\./, '')
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug: slug.current,
    slugWithoutSlash: slug.current?.replace(/\/$/, ''),
    locale: (document as any)?.locale ?? null,
  }
  const query = `*[!(_id in [$draft, $published]) && (pathname.current == $slug || pathname.current == $slugWithoutSlash) && locale == $locale]`
  const result = await client.fetch(query, params)
  return result.length === 0
}
