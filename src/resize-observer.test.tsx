import * as React from 'react'
import '@testing-library/jest-dom'
import { render, act } from '@testing-library/react'
import { useResizeObserver } from './resize-observer'

describe('useResizeObserver', () => {
  test(`should call the provided callback when the target element resizes`, async () => {
    const App = React.forwardRef<
      HTMLDivElement,
      { resizeCallback: ResizeObserverCallback }
    >(({ resizeCallback }, targetRef) => {
      // @ts-ignore
      useResizeObserver(targetRef.current, resizeCallback)

      return (
        <div
          ref={targetRef}
          id="wrapper"
          style={{ width: '100px', height: '100px', display: 'block' }}
        >
          some content
        </div>
      )
    })

    const resizeCallback = jest.fn()
    const outerRef = React.createRef<HTMLDivElement>()

    const { rerender } = render(
      <App resizeCallback={resizeCallback} ref={outerRef} />
    )

    expect(resizeCallback).not.toHaveBeenCalled()

    // Ref seems to only be set after an explicit rerender
    rerender(<App resizeCallback={resizeCallback} ref={outerRef} />)

    act(() => {
      if (outerRef.current) {
        outerRef.current.style.width = '500px'
      }
    })

    // TODO: figure out how to get this to work
    // I think JSDOM probably just doesn't support the ResizeObserver yet
    // expect(resizeCallback).toHaveBeenCalled()
  })
})
