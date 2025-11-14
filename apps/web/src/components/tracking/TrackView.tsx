"use client"
import { usePostHog } from 'posthog-js/react'
import { Slot } from '@radix-ui/react-slot'
import { forwardRef, useRef, useEffect, useState } from 'react'

/**
 *
 * @returns: En TrackView-komponent der sporer når et element kommer i brugerens viewport og sender data til PostHog.
 * @example: 
 *  <TrackView trackEvent="custom_event" trackProperties={{ foo: 'bar' }}>
 *      <div>Content to track</div>
 *  </TrackView>
 * @alias: TrackView
 * @summary: Denne komponent bruges til at spore når et element kommer i brugerens viewport.
 * @version: 1.0.0
 * @property: [asChild, children, trackEvent, trackProperties, threshold, rootMargin, triggerOnce, minViewTime]
 * @author: Kasper Buchholtz
 *
**/

type TrackViewProps = {
    asChild?: boolean
    children: React.ReactNode
    trackEvent?: string
    trackProperties?: Record<string, any>
    threshold?: number | number[] // 0.0 to 1.0, how much of element must be visible
    rootMargin?: string // Margin around root (e.g., "10px 0px")
    triggerOnce?: boolean // Only track the first time it comes into view
    minViewTime?: number // Minimum time in view before tracking (in ms)
}

export const TrackView = forwardRef<HTMLElement, TrackViewProps>(
    ({
        asChild = false,
        children,
        trackEvent,
        trackProperties,
        threshold = 0.5, // 50% visible by default
        rootMargin = '0px',
        triggerOnce = true,
        minViewTime = 1000, // 1 second by default
        ...props
    }, ref) => {
        const posthog = usePostHog()
        const elementRef = useRef<HTMLElement>(null)
        const [hasTracked, setHasTracked] = useState(false)
        const [viewStartTime, setViewStartTime] = useState<number | null>(null)
        const timeoutRef = useRef<NodeJS.Timeout>()

        // Extract text content for auto-generated event name
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

        const getElementText = () => {
            if (children) {
                return extractText(children)
            }
            return ''
        }

        const trackViewEvent = () => {
            if (hasTracked && triggerOnce) return

            const elementText = getElementText()
            const eventName = trackEvent || `view:${elementText.toLowerCase().replace(/\s+/g, '_')}_viewed`

            posthog?.capture(eventName, {
                element_text: elementText,
                component: 'TrackView',
                threshold,
                min_view_time: minViewTime,
                view_duration: viewStartTime ? Date.now() - viewStartTime : 0,
                ...trackProperties,
            })

            setHasTracked(true)
        }

        useEffect(() => {
            const currentElement = elementRef.current
            if (!currentElement) return

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            // Element came into view
                            setViewStartTime(Date.now())

                            // Set timeout to track after minimum view time
                            timeoutRef.current = setTimeout(() => {
                                trackViewEvent()
                            }, minViewTime)
                        } else {
                            // Element left view
                            setViewStartTime(null)

                            // Clear timeout if element leaves view before minimum time
                            if (timeoutRef.current) {
                                clearTimeout(timeoutRef.current)
                            }
                        }
                    })
                },
                {
                    threshold,
                    rootMargin,
                }
            )

            observer.observe(currentElement)

            return () => {
                observer.disconnect()
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current)
                }
            }
        }, [threshold, rootMargin, minViewTime, hasTracked, triggerOnce])

        // Merge refs
        const mergedRef = (element: HTMLElement) => {
            elementRef.current = element
            if (typeof ref === 'function') {
                ref(element)
            } else if (ref) {
                ref.current = element
            }
        }

        const Comp = asChild ? Slot : 'div'

        return (
            <Comp ref={mergedRef} {...props}>
                {children}
            </Comp>
        )
    }
)

TrackView.displayName = 'TrackView'
