import { usePostHog } from 'posthog-js/react'
import { Slot } from '@radix-ui/react-slot'
import { forwardRef } from 'react'

/**
 *
 * @returns: En TrackButton-komponent der sporer klik på knappen og sender data til PostHog.
 * @example: 
 *  <TrackButton trackEvent="custom_button_click" trackProperties={{ foo: 'bar' }}>Click me</TrackButton>
 *  <TrackButton trackEvent="custom_button_click" trackProperties={{ foo: bar }} asChild><Button>Click me</Button></TrackButton>
 * @alias: TrackButton
 * @summary: Denne komponent bruges til at spore brugerinteraktioner med knapper.
 * @version: 1.0.0
 * @property: [asChild, children, trackEvent, trackProperties]
 * @author: Kasper Buchholtz
 *
**/

type TrackButtonProps = {
    asChild?: boolean
    children: React.ReactNode
    trackEvent?: string
    trackProperties?: Record<string, any>
}

export const TrackButton = forwardRef<HTMLElement, TrackButtonProps>(
    ({ asChild = false, children, trackEvent, trackProperties, ...props }, ref) => {
        const posthog = usePostHog()

        const handleClick = (e: React.MouseEvent) => {
            // Extract button text for auto-generated event name
            let buttonText = ''

            const extractText = (node: any): string => {
                if (typeof node === 'string') return node
                if (typeof node === 'number') return node.toString()
                if (node?.props?.children) {
                    if (Array.isArray(node.props.children)) {
                        return node.props.children.map(extractText).join(' ')
                    }
                    return extractText(node.props.children)
                }
                return ''
            }

            if (children) {
                buttonText = extractText(children)
            }

            const eventName = trackEvent || `button_click_${buttonText.toLowerCase().replace(/\s+/g, '_')}`

            posthog?.capture(eventName, {
                button_text: buttonText,
                component: 'TrackButton',
                ...trackProperties,
            })
        }

        const Comp = asChild ? Slot : 'button'

        return (
            <Comp ref={ref as any} onClick={handleClick} {...props}>
                {children}
            </Comp>
        )
    }
)

TrackButton.displayName = 'TrackButton'

