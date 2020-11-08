import '@testing-library/jest-dom'
import { renderHook, act } from '@testing-library/react-hooks'
import { useMediaQuery } from './media-queries'
import matchMediaPolyfill from 'mq-polyfill'

beforeAll(() => {
  matchMediaPolyfill(window)
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event('resize'))
  }
})

describe('useMediaQuery', () => {
  // Not needed to test if the browser's `matchMedia` functionality works - testing if we're integrating correctly
  test(`should match basic media queries`, () => {
    const actualWindowSize = {
      width: 1200,
      height: 680,
    }

    window.resizeTo(actualWindowSize.width, actualWindowSize.height)

    const { result } = renderHook(() => useMediaQuery(`(min-width: 1080px)`))

    expect(result.current).toEqual(true)

    const updatedWindowSize = {
      width: 1000,
      height: 680,
    }

    act(() => {
      window.resizeTo(updatedWindowSize.width, updatedWindowSize.height)
    })

    expect(result.current).toEqual(false)
  })

  // TODO: Expand on tests if better matchMedia polyfill can be found that supports matching things like aspect-ratio, color-mode, etc
})
