/** @jsx jsx */
import React, { useState, useEffect, useRef } from 'react'
import { css, jsx } from '@emotion/core'
import SliderContent from './SliderContent'
import Slide from './Slide'
import Arrow from './Arrow'
import Dots from './Dots'

/**
 * @function Slider
 */
const Slider = props => {
  const getWidth = () => window.innerWidth
  const contentRef = useRef()

  const [state, setState] = useState({
    activeIndex: 0,
    translate: getWidth(),
    transition: 0.45,
    images: [
      props.images[props.images.length - 1],
      ...props.images,
      props.images[0]
    ]
  })

  const { activeIndex, translate, images, transition } = state

  /** smoothTransition */
  const smoothTransition = () => {
    if (activeIndex === 0 && translate > getWidth())
      return setState({ ...state, transition: 0, translate: getWidth() })

    if (activeIndex === 0 && translate === 0) {
      return setState({
        ...state,
        transition: 0,
        translate: getWidth() * props.images.length - 1
      })
    }
  }

  useEffect(() => {
    contentRef.current.addEventListener('transitionend', smoothTransition)
    return () =>
      contentRef.current.removeEventListener('transitionend', smoothTransition)
  }, [activeIndex])

  useEffect(() => {
    if (transition === 0) {
      setState({ ...state, transition: 0.45 })
    }
  }, [transition])

  /** nextSlide */
  const nextSlide = () => {
    const next = (activeIndex + 2) * getWidth()

    if (activeIndex === props.images.length - 1) {
      return setState({
        ...state,
        activeIndex: 0,
        translate: next
      })
    }

    setState({
      ...state,
      activeIndex: activeIndex + 1,
      translate: next
    })
  }

  /** prevSlide */
  const prevSlide = () => {
    const prev = activeIndex * getWidth()

    if (activeIndex === 0) {
      return setState({
        ...state,
        activeIndex: props.images.length - 1,
        translate: prev
      })
    }

    setState({
      ...state,
      activeIndex: activeIndex - 1,
      translate: prev
    })
  }

  return (
    <div
      css={css`
        position: relative;
        height: 100vh;
        width: 100vw;
        margin: 0 auto;
        overflow: hidden;
        white-space: nowrap;
        background: #333;
      `}
    >
      <SliderContent
        ref={contentRef}
        translate={translate}
        transition={transition}
      >
        {images.map((img, i) => (
          <Slide key={img + i} img={img} />
        ))}
      </SliderContent>

      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />

      <Dots images={props.images} />
    </div>
  )
}

export default Slider
