import { type RefObject, useLayoutEffect, useRef } from 'react'

type ResizeCallback = (width: number) => void

/**
 * Triggers a callback when an element's width changes.
 *
 * @param onResize Called when the element's width changes
 * @returns ref: A ref to be attached to the element
 */
export default function useContainerWidth(
  onResize: ResizeCallback,
): RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!ref.current) {
      return
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      onResize(entry.contentRect.width)
    })
    observer.observe(ref.current)
    // Initial call
    onResize(ref.current.getBoundingClientRect().width)

    return () => {
      observer.disconnect()
    }
  }, [onResize])

  return ref
}
