import * as React from 'react'

export const useMediaQuery = (query: string, defaultMatch = false): boolean => {
  const [matchQuery, setMatchQuery] = React.useState(defaultMatch)

  const handleQueryChange = React.useCallback(
    event => setMatchQuery(event.matches),
    []
  )

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(query)
    setMatchQuery(mediaQueryList.matches)

    if (typeof mediaQueryList.addEventListener === 'function') {
      mediaQueryList.addEventListener('change', handleQueryChange)
    } else if (typeof mediaQueryList.addListener === 'function') {
      mediaQueryList.addListener(handleQueryChange)
    }

    return () => {
      if (typeof mediaQueryList.removeEventListener === 'function') {
        mediaQueryList.removeEventListener('change', handleQueryChange)
      } else if (typeof mediaQueryList.removeListener === 'function') {
        mediaQueryList.removeListener(handleQueryChange)
      }
    }
  }, [handleQueryChange, query])

  return matchQuery
}
