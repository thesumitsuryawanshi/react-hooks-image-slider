/** @jsx jsx */
import React, { memo } from 'react'
import { css, jsx } from '@emotion/core'

const Slide = ({ content, images, width }) => (
  <>
    {images ? (
      // <img
      //   src={content}
      //   css={css`
      //     height: 100%;
      //     width: 100%;
      //     object-fit: fill;
      //   `}
      // />
      <div
        css={css`
      height: 100%;
      width: ${width}px;
      background-image: url('${content}');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    `}
      ></div>
    ) : (
      <div
        css={css`
          height: 100%;
          width: 100%;
        `}
      >
        {content}
      </div>
    )}
  </>
)

const MemoSlide = memo(Slide)

export default MemoSlide
