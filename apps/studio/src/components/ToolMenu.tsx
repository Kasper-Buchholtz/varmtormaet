import { ToolLink, ToolMenuProps } from 'sanity'
import { Button, Flex } from '@sanity/ui'
import { PlugIcon } from '@sanity/icons'

export function CustomToolMenu(props: ToolMenuProps) {
  const { activeToolName, context, tools } = props
  const isSidebar = context === 'sidebar'

  // Change flex direction depending on context
  const direction = isSidebar ? 'column' : 'row'

  return (
    <Flex gap={1} direction={direction}>
      {tools.map((tool) => (
        <Button
          as={ToolLink}
          classID={tool.title}
          icon={tool.icon || PlugIcon}
          key={tool.name}
          name={tool.name}
          padding={2}
          selected={tool.name === activeToolName}
          text={tool.title === 'Media' ? 'Medier' : tool.title}
          tone="neutral"
          mode="bleed"
        />
      ))}
    </Flex>
  )
}
