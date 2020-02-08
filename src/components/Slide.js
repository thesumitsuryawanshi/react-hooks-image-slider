/** @jsx jsx */
import React, { memo } from 'react'
import { css, jsx } from '@emotion/core'

const Slide = ({ img }) => (
  <>
    <img
      src={img}
      css={css`
        height: 100%;
        width: 100%;
      `}
    />
  </>
)

const MemoSlide = memo(Slide)

export default MemoSlide
