import React from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export const useResizeObserver = (
  target: HTMLElement | null,
  callback: ResizeObserverCallback
): void => {
  const observer = React.useMemo(() => {
    if (typeof ResizeObserver === 'undefined') {
      console.warn('No ResizeObserver support')
      return
    }

    return new ResizeObserver(callback)
  }, [callback])

  React.useEffect(() => {
    if (!target || !observer) return

    observer.observe(target)

    return () => {
      if (target && observer) observer.unobserve(target)
    }
  }, [observer, target])
}
