import { defineField, defineType } from 'sanity'
import IconPickerInput from '@repo/sanity-studio/src/components/IconsField'
export const IconPicker = defineType({
  title: 'Ikoner',
  name: 'IconPicker',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      type: 'string',
      title: 'Ikoner',
      components: {
        input: IconPickerInput as any,
      },
      initialValue: 'facebook',
      options: {
        layout: 'dropdown',
        // Custom options that will be passed to your component
        /* @ts-expect-error */
        allowedGroups: ['social'], // Only show these groups
        showGroupFilter: true, // Show group filter buttons
        itemsPerLoad: 12, // Override default items per load
        columns: 6, // Override default column count
      },
    }),
  ],
  preview: {
    select: {
      icon: 'icon',
    },
    prepare(selection) {
      return {
        title: selection.icon.charAt(0).toUpperCase() + selection.icon.slice(1),
      }
    },
  },
})
