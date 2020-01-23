/** @jsx jsx */
import React, { useState, useEffect } from 'react'
import { css, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import Arrow from './Arrow'
import Dot from './Dot'

const StyledSlider = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
`
const SliderContent = styled.div`
  transform: translateX(-${props => props.translate}px);
  transition: transform ease-out 0.45s;
  height: 100%;
  width: 100%;
  display: flex;
`

const Dots = styled.div`
  position: absolute;
  bottom: 25px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

/**
 * @function Slider
 */
const Slider = props => {
  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    slideWidth: window.innerWidth,
    imagesCache: props.images,
    images: props.images
  })
  const { activeIndex, translate, slideWidth, images, imagesCache } = state

  /**
   * @todo
   */
  // useEffect(() => {
  //   if (images.length < imagesCache.length) {
  //     setState({ ...state, images: imagesCache })
  //   }
  // }, [images])

  /** nextSlide */
  const nextSlide = () => {
    const { activeIndex, images } = state

    const nextIndex = activeIndex + 1
    const lastIndex = images.length - 1

    const newIndex = activeIndex === lastIndex ? 0 : nextIndex
    const newTranslate =
      activeIndex === lastIndex ? 0 : nextIndex * window.innerWidth

    setState({
      ...state,
      activeIndex: newIndex,
      translate: newTranslate
    })
  }

  /** prevSlide */
  const prevSlide = () => {
    const { activeIndex, images } = state
    const prevIndex = activeIndex - 1
    const lastIndex = images.length - 1

    const newIndex = activeIndex === 0 ? lastIndex : prevIndex
    const newTranslate =
      activeIndex === 0
        ? lastIndex * window.innerWidth
        : prevIndex * window.innerWidth

    setState({
      ...state,
      activeIndex: newIndex,
      translate: newTranslate
    })
  }

  /** handleLongTransition */
  // const handleLongTransition = () => {
  //   const { activeIndex, images } = state
  //   const lastIndex = images.length - 1

  //   const firstSlideToLastSlide = [images[0], images[lastIndex]]
  //   const lastSlideToFirstSlide = [images[lastIndex], images[0]]

  //   // Translate value here?
  //   setState({
  //     ...state,
  //     images: [],
  //     imagesCache: [...images]
  //     // activeIndex === lastIndex
  //     //   ? lastSlideToFirstSlide
  //     //   : firstSlideToLastSlide
  //   })
  // }

  /** handleDot */
  const handleDot = index => {
    setState({
      ...state,
      activeIndex: index,
      translate: index * window.innerWidth
    })
  }

  return (
    <StyledSlider>
      <SliderContent translate={translate} slideWidth={slideWidth}>
        {images.map(img => (
          <img
            key={img}
            src={img}
            css={css`
              height: 100%;
              width: 100%;
            `}
          />
        ))}
      </SliderContent>

      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />

      <Dots>
        {images.map((img, i) => (
          <Dot
            key={img}
            active={i === activeIndex}
            index={i}
            handleDot={handleDot}
          />
        ))}
      </Dots>
    </StyledSlider>
  )
}

export default Slider
