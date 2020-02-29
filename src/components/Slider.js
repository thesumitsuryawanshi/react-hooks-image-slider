/** @jsx jsx */
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { css, jsx } from '@emotion/core'
import SliderContent from './SliderContent'
import Slide from './Slide'
import Arrow from './Arrow'
import Dots from './Dots'

const getWidth = () => window.innerWidth

/**
 * @function Slider
 */
const Slider = props => {
  const { slides } = props
  const firstSlide = slides[0]
  const lastSlide = slides[slides.length - 1]

  const [state, setState] = useState({
    activeIndex: 0,
    translate: getWidth(),
    transition: 0.45,
    _slides: [lastSlide, ...slides, firstSlide]
  })

  const { activeIndex, translate, _slides, transition } = state
  const contentRef = useRef()
  const resizeRef = useRef()

  useEffect(() => {
    contentRef.current = smoothTransition
    resizeRef.current = handleResize
  })

  useEffect(() => {
    const smooth = () => {
      contentRef.current()
    }

    const resize = () => {
      resizeRef.current()
    }

    const transitionEnd = window.addEventListener('transitionend', smooth)
    const onResize = window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('transitionend', transitionEnd)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    if (transition === 0) setState({ ...state, transition: 0.45 })
  }, [transition])

  const handleResize = () => {
    const translate = (activeIndex + 1) * getWidth()
    setState({ ...state, translate, transition: 0 })
  }

  const smoothTransition = () => {
    if (activeIndex === 0 && translate > getWidth())
      return setState({ ...state, transition: 0, translate: getWidth() })

    if (activeIndex === slides.length - 1 && translate === 0) {
      return setState({
        ...state,
        transition: 0,
        translate: getWidth() * slides.length
      })
    }
  }

  const nextSlide = useCallback(() => {
    const next = (activeIndex + 2) * getWidth()
    const isLastSlide = activeIndex === slides.length - 1

    setState({
      ...state,
      activeIndex: isLastSlide ? 0 : activeIndex + 1,
      translate: next
    })
  }, [activeIndex])

  const prevSlide = useCallback(() => {
    const prev = activeIndex * getWidth()
    const isFirstSlide = activeIndex === 0

    setState({
      ...state,
      activeIndex: isFirstSlide ? slides.length - 1 : activeIndex - 1,
      translate: prev
    })
  }, [activeIndex])

  return (
    <div css={SliderCSS}>
      <SliderContent
        ref={contentRef}
        translate={translate}
        transition={transition}
        width={getWidth() * _slides.length}
      >
        {_slides.map((_slide, i) => (
          <Slide width={getWidth()} key={_slide + i} content={_slide} images />
        ))}
      </SliderContent>

      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />

      <Dots slides={slides} activeIndex={activeIndex} />
    </div>
  )
}

const SliderCSS = css`
  position: relative;
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
`

export default Slider
