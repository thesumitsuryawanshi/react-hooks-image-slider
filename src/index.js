import React from 'react'
import ReactDOM from 'react-dom'
import Slider from './components/slider'
import images from './images'

ReactDOM.render(<Slider images={images} />, document.querySelector('.main'))
