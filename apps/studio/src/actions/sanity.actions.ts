import { Eye, EyeSlash } from '@mynaui/icons-react'
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
      icon: originalResult.disabled ? Eye : EyeSlash,
    }
  }
  return BetterButtonAction
}
