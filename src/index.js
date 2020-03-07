import React, { useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import Slider from './components/slider'
import images from './images'

/**
 * @function App
 */
const App = () => {
  const [autoPlay, setAutoPlay] = useState(3)

  const stopAutoPlay = useCallback(() => {
    setAutoPlay(0)
  }, [])

  return (
    <Slider slides={images} autoPlay={autoPlay} stopAutoPlay={stopAutoPlay} />
  )
}

ReactDOM.render(<App />, document.querySelector('.main'))
