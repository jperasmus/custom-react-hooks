import '@testing-library/jest-dom'
import { renderHook, act } from '@testing-library/react-hooks'
import { useWindowSize } from './window-size'
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

describe('useWindowSize', () => {
  test(`should return the device's inner width and height and update when screen resizes`, () => {
    const defaultWindowSize = {
      width: 200,
      height: 200,
    }

    const actualWindowSize = {
      width: 1200,
      height: 680,
    }

    window.resizeTo(actualWindowSize.width, actualWindowSize.height)

    const { result } = renderHook(() => useWindowSize({ defaultWindowSize }))

    expect(result.current).toEqual(actualWindowSize)

    const updatedWindowSize = {
      width: 1000,
      height: 680,
    }

    act(() => {
      window.resizeTo(updatedWindowSize.width, updatedWindowSize.height)
    })

    expect(result.current).toEqual(updatedWindowSize)
  })
})
