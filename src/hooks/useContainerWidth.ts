import { type RefObject, useLayoutEffect, useRef } from 'react'
import invariant from 'tiny-invariant'

type ResizeCallback = (width: number) => void

/**
 * Triggers a callback when an element's width changes.
 *
 * @param onResize Called when the element's width changes
 * @returns ref: A ref to be attached to the element
 */
export default function useContainerWidth(
  onResize: ResizeCallback,
): RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!ref.current) {
      return
    }

    const observer = new ResizeObserver((entries) => {
      invariant(entries[0], 'ResizeObserver should have at least one entry')
      onResize(entries[0].contentRect.width)
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
