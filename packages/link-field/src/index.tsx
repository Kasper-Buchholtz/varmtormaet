import { defineField, definePlugin, defineType, type ObjectInputProps } from 'sanity'
import { CustomLinkInput } from './components/CustomLinkInput'
import { LinkInput } from './components/LinkInput'
import { LinkTypeInput } from './components/LinkTypeInput'
import { isCustomLink } from './helpers/typeGaurds'
import type { LinkFieldPluginOptions, LinkValue } from './types'

/**
 * A plugin that adds a custom Link field for creating internal and external links,
 * as well as `mailto` and `tel`-links, all using the same intuitive UI.
 *
 * @param options - Options for the plugin. See {@link LinkFieldPluginOptions}
 *
 * @example Minimal example
 * ```ts
 * // sanity.config.ts
 * import { defineConfig } from 'sanity'
 * import { linkField } from 'sanity-plugin-link-field'
 *
 * export default defineConfig((
 *  // ...
 *  plugins: [
 *    linkField()
 *  ]
 * })
 *
 * // mySchema.ts
 * import { defineField, defineType } from 'sanity';
 *
 * export const mySchema = defineType({
 *  // ...
 *  fields: [
 *    // ...
 *    defineField({
 *      name: 'link',
 *      title: 'Link',
 *      type: 'link'
 *    }),
 *  ]
 *});
 * ```
 */
export const linkField = definePlugin<LinkFieldPluginOptions | void>((opts) => {
  const {
    linkableSchemaTypes = ['page'],
    weakReferences = false,
    referenceFilterOptions,
    descriptions = {
      internal: 'Link til en anden side eller dokument på hjemmesiden.',
      external:
        'Link til en absolut URL til en side på en anden hjemmeside ( kræver https:// eller http:// ).',
      blank: 'Åbn linket i et nyt faneblad.',
      email: 'Link til at sende en e-mail til den angivne adresse.',
      phone: 'Link til at ringe til det angivne telefonnummer.',
      advanced: 'Valgfrit. Tilføj ankerlinks og brugerdefinerede parametre.',
      parameters: "Valgfrit. Tilføj brugerdefinerede parametre til URL'en, f.eks. UTM-tags.",
      anchor: 'Valgfrit. Tilføj et anker for at linke til en bestemt sektion på siden.',
      label: 'Tilføj en label til linket.',
      text: 'Valgfrit. Tilføj en label til linket.',
      file: 'Link til en fil, der er uploadet til hjemmesiden. F.eks. PDF, Word-dokument eller billede.',
    },
    enableLinkParameters = true,
    enableAnchorLinks = true,
    customLinkTypes = [],
  } = opts || {}

  const linkType = {
    name: 'link',
    title: 'Link',
    type: 'object',
    fieldsets: [
      {
        name: 'advanced',
        title: 'Advanced',
        description: descriptions.advanced,
        options: {
          collapsible: true,
          collapsed: true,
        },
      },
    ],
    fields: [
      defineField({
        name: 'text',
        type: 'string',
        description: descriptions.text,
      }),

      defineField({
        name: 'type',
        type: 'string',
        initialValue: 'internal',
        validation: (Rule) => Rule.required(),
        components: {
          input: (props) => LinkTypeInput({ customLinkTypes, linkableSchemaTypes, ...props }),
        },
      }),

      // Internal
      defineField({
        name: 'internalLink',
        type: 'reference',
        to: linkableSchemaTypes.map((type) => ({
          type,
        })),
        weak: weakReferences,
        options: {
          disableNew: true,
          ...referenceFilterOptions,
        },
        description: descriptions?.internal,
        hidden: ({ parent }) => !!parent?.type && parent?.type !== 'internal',
      }),

      // External
      defineField({
        name: 'url',
        type: 'url',
        description: descriptions?.external,
        validation: (rule) =>
          rule.uri({
            allowRelative: true,
            scheme: ['https', 'http'],
          }),
        hidden: ({ parent }) => parent?.type !== 'external',
      }),
      // E-mail
      defineField({
        name: 'email',
        type: 'email',
        description: descriptions?.email,
        hidden: ({ parent }) => parent?.type !== 'email',
      }),
      // File
      defineField({
        name: 'file',
        type: 'file',
        description: descriptions?.file,
        options: {
          storeOriginalFilename: true,
        },
        hidden: ({ parent }) => parent?.type !== 'file',
      }),

      // Phone
      defineField({
        name: 'phone',
        type: 'string',
        description: descriptions?.phone,
        validation: (rule) =>
          rule.custom((value, context) => {
            if (!value || (context.parent as any)?.type !== 'phone') {
              return true
            }

            return (
              (new RegExp(/^\+?[0-9\s-]*$/).test(value) &&
                !value.startsWith('-') &&
                !value.endsWith('-')) ||
              'Skal være et gyldigt telefonnummer'
            )
          }),
        hidden: ({ parent }) => parent?.type !== 'phone',
      }),

      //Label
      defineField({
        name: 'label',
        type: 'string',
        title: 'Label',
        description: descriptions?.label,
      }),

      // Custom
      defineField({
        name: 'value',
        type: 'string',
        description: descriptions?.external,
        hidden: ({ parent }) => !parent || !isCustomLink(parent as LinkValue),
        components: {
          input: (props) => CustomLinkInput({ customLinkTypes, ...props }),
        },
      }),

      // New tab
      defineField({
        title: 'Åbn i nyt faneblad',
        name: 'blank',
        type: 'boolean',
        initialValue: false,
        description: descriptions.blank,
        hidden: ({ parent }) => parent?.type === 'email' || parent?.type === 'phone',
      }),

      // Parameters
      ...(enableLinkParameters || enableAnchorLinks
        ? [
            // Anchor
            ...(enableAnchorLinks
              ? [
                  defineField({
                    title: 'Anchor',
                    name: 'anchor',
                    type: 'string',
                    description: descriptions.anchor,
                    validation: (rule) =>
                      rule.custom((value, context) => {
                        if (
                          !value ||
                          (context.parent as any)?.type === 'email' ||
                          (context.parent as any)?.type === 'phone'
                        ) {
                          return true
                        }

                        if (value.indexOf('#') !== 0) {
                          return 'Skal starte med #; f.eks. #side-sektion-1'
                        }

                        if (value.length === 1) {
                          return 'Skal indeholde mindst ét tegn'
                        }

                        return (
                          new RegExp(/^([-?/:@._~!$&'()*+,;=a-zA-Z0-9]|%[0-9a-fA-F]{2})*$/).test(
                            value.replace(/^#/, ''),
                          ) || 'Skal være en gyldig ankerlink'
                        )
                      }),
                    hidden: ({ parent }) => parent?.type === 'email' || parent?.type === 'phone',
                    fieldset: 'advanced',
                  }),
                ]
              : []),
            ...(enableLinkParameters
              ? [
                  defineField({
                    title: 'Parametre',
                    name: 'parameters',
                    type: 'string',
                    description: descriptions.parameters,
                    validation: (rule) =>
                      rule.custom((value, context) => {
                        if (
                          !value ||
                          (context.parent as any)?.type === 'email' ||
                          (context.parent as any)?.type === 'phone'
                        ) {
                          return true
                        }

                        if (value.indexOf('?') !== 0) {
                          return 'Skal starte med ?; f.eks. ?utm_source=example.com&utm_medium=referral'
                        }

                        if (value.length === 1) {
                          return 'Skal indeholde mindst ét tegn'
                        }

                        return true
                      }),
                    hidden: ({ parent }) => parent?.type === 'email' || parent?.type === 'phone',
                    fieldset: 'advanced',
                  }),
                ]
              : []),
          ]
        : []),
    ],
    components: {
      input: (props: ObjectInputProps) =>
        LinkInput({
          customLinkTypes,
          ...props,
          value: props.value as LinkValue,
        }),
    },
  }

  return {
    name: 'link-field',
    schema: {
      types: [defineType(linkType)],
    },
  }
})
