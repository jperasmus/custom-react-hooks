import * as React from 'react'

type WindowSize = {
  width: number
  height: number
}

// Default to minimum size
const DEFAULT_WINDOW_SIZE: WindowSize = {
  width: 320,
  height: 320,
}

export const useWindowSize = ({
  defaultWindowSize = DEFAULT_WINDOW_SIZE,
} = {}): WindowSize => {
  const [state, setState] = React.useState<WindowSize>(defaultWindowSize)

  const getDeviceInfo = React.useCallback(() => {
    setState({
      width: window.innerWidth || DEFAULT_WINDOW_SIZE.width,
      height: window.innerHeight || DEFAULT_WINDOW_SIZE.height,
    })
  }, [])

  React.useEffect(() => {
    getDeviceInfo()

    window.addEventListener('resize', getDeviceInfo)

    return () => {
      window.removeEventListener('resize', getDeviceInfo)
    }
  }, [getDeviceInfo])

  return state
}
