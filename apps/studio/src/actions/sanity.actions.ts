import { EyeOpenIcon, EyeClosedIcon } from '@sanity/icons'
import { DocumentActionComponent, DocumentActionProps } from 'sanity'

export function createVisualAction(originalAction: DocumentActionComponent) {
  const BetterButtonAction = (props: DocumentActionProps) => {
    const originalResult = originalAction(props)
    if (!originalResult) {
      return originalResult
    }
    return {
      ...originalResult,
      tone: 'positive',
      icon: originalResult.disabled ? EyeOpenIcon : EyeClosedIcon,
    }
  }
  return BetterButtonAction
}
