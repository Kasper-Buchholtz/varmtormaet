'use client'

import { usePostHog } from 'posthog-js/react'
import { Slot } from '@radix-ui/react-slot'
import React, {
    forwardRef,
    useRef,
    useEffect,
    useState,
    useCallback,
    ReactNode,
} from 'react'

/**
 *
 * @returns: En TrackForm-komponent der sporer interaktioner med formularer og sender data til PostHog.
 * @example: 
 *  <TrackForm formName="contact_form" trackProperties={{ foo: 'bar' }} onSubmit={handleSubmit} asChild>
 *      <form onSubmit={handleSubmit}>
 *          <input type="text" name="email" />
 *          <button type="submit">Submit</button>
 *      </form>
 *  </TrackForm>
 * @alias: TrackForm
 * @summary: Denne komponent bruges til at spore brugerinteraktioner med formularer.
 * @version: 1.0.0
 * @property: [asChild, children, formName, trackProperties, abandonmentTimeout, trackFieldInteractions, successEvent, failureEvent, abandonmentEvent]
 * @author: Kasper Buchholtz
 *
**/

type TrackFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
    asChild?: boolean;
    children: ReactNode;
    formName: string;
    trackProperties?: Record<string, any>;
    abandonmentTimeout?: number;
    trackFieldInteractions?: boolean;
    successEvent?: string;
    failureEvent?: string;
    abandonmentEvent?: string;
};

export const TrackForm = forwardRef<HTMLFormElement, TrackFormProps>(
    (
        {
            asChild = false,
            children,
            formName,
            trackProperties = {},
            abandonmentTimeout = 30000,
            trackFieldInteractions = true,
            successEvent,
            failureEvent,
            abandonmentEvent,
            onSubmit,
            ...props
        },
        forwardedRef
    ) => {
        const posthog = usePostHog()
        const innerRef = useRef<HTMLFormElement | null>(null)
        const submittedRef = useRef(false) // prevents duplicate fires in odd edge cases
        const [startTime, setStartTime] = useState<number>(() => Date.now())

        // Build event names once
        const baseEventName = `form:${formName.toLowerCase().replace(/\s+/g, '_')}`
        const events = {
            success: successEvent || `${baseEventName}_submitted`,
            failure: failureEvent || `${baseEventName}_failed`,
            abandonment: abandonmentEvent || `${baseEventName}_abandoned`,
        }

        const trackEvent = useCallback(
            (eventName: string, additionalProps: Record<string, any> = {}) => {
                const commonProps = {
                    form_name: formName,
                    component: 'TrackForm',
                    time_on_form: Date.now() - startTime,
                    ...trackProperties,
                    ...additionalProps,
                }
                posthog?.capture(eventName, commonProps)
            },
            [posthog, formName, startTime, trackProperties]
        )

        const handleSubmit = useCallback(
            (e: React.FormEvent<HTMLFormElement>) => {
                // If a parent onSubmit wants to prevent default, honor it but still allow tracking
                // (You can move tracking after preventDefault check if you only want to track real submissions.)
                if (submittedRef.current) return
                submittedRef.current = true
                // Clear latch on next tick to allow another submit after navigation/validation cycle
                setTimeout(() => (submittedRef.current = false), 0)

                const form = e.currentTarget
                const formData = new FormData(form)
                const filledFields = Array.from(formData.entries()).filter(
                    ([, value]) => value !== '' && value !== null && value !== undefined
                ).length

                trackEvent(events.success, {
                    filled_fields_count: filledFields,
                    total_fields_count: form.elements.length,
                    submission_method: 'form_submit',
                })

                // Call any user-supplied onSubmit
                onSubmit?.(e)
            },
            [events.success, onSubmit, trackEvent]
        )

        // Optional: expose an error hook directly on the form element
        const handleFormError = useCallback(
            (error: string | Error) => {
                trackEvent(events.failure, {
                    error_message: typeof error === 'string' ? error : error.message,
                })
            },
            [events.failure, trackEvent]
        )

        useEffect(() => {
            if (innerRef.current) {
                ; (innerRef.current as any)._trackFormError = handleFormError
            }
        }, [handleFormError])

        // Merge refs (keep a stable element ref)
        const setRefs = useCallback(
            (el: HTMLFormElement | null) => {
                innerRef.current = el
                if (typeof forwardedRef === 'function') {
                    forwardedRef(el)
                } else if (forwardedRef) {
                    ; (forwardedRef as React.MutableRefObject<HTMLFormElement | null>).current = el
                }
            },
            [forwardedRef]
        )

        // (Optional) time_on_form start on first interaction instead of mount
        useEffect(() => {
            if (!innerRef.current) return
            const onFirstInteraction = () => {
                setStartTime((prev) => prev || Date.now())
                innerRef.current?.removeEventListener('focusin', onFirstInteraction)
                innerRef.current?.removeEventListener('input', onFirstInteraction)
            }
            innerRef.current.addEventListener('focusin', onFirstInteraction, { once: true })
            innerRef.current.addEventListener('input', onFirstInteraction, { once: true })
            return () => {
                innerRef.current?.removeEventListener('focusin', onFirstInteraction)
                innerRef.current?.removeEventListener('input', onFirstInteraction)
            }
        }, [])

        const Comp: any = asChild ? Slot : 'form'

        return (
            <Comp ref={setRefs} onSubmit={handleSubmit} {...props}>
                {children}
            </Comp>
        )
    }
)

TrackForm.displayName = 'TrackForm'