import React from 'react'
import '../styles/heart.css'

export default function Heart({
  active,
  imageHref = '/assets/gugiwowval.jpg',
  imageOffsetX = 0,
  imageOffsetY = 0,
  imageScale = 1
}){
  const src = imageHref

  return (
    <div className={'heart-wrap' + (active ? ' active' : '')} aria-hidden>
      <svg
        className="heart"
        viewBox="0 0 200 180"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="heart"
      >
        <defs>
          {/* IMAGE PATTERN — THIS IS WHERE ZOOM ACTUALLY HAPPENS */}
          <pattern
            id="imgPattern"
            patternUnits="userSpaceOnUse"
            width={200}
            height={180}
            patternTransform={`translate(${imageOffsetX}, ${imageOffsetY}) scale(${imageScale})`}
          >
            <image
              href={src}
              x="0"
              y="0"
              width="200"
              height="180"
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>

          {/* gradient for outline */}
          <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffd1df"/>
            <stop offset="100%" stopColor="#ff7aa6"/>
          </linearGradient>
        </defs>

        <g>
          {/* FILLED HEART (PHOTO) */}
          <path
            className="heart-fill"
            d="M100 30
               C100 30 120 10 145 30
               C170 50 170 85 125 120
               L100 145
               L75 120
               C30 85 30 50 55 30
               C80 10 100 30 100 30 Z"
            fill="url(#imgPattern)"
          />

          {/* OUTLINE */}
          <path
            className="heart-shape"
            d="M100 30
               C100 30 120 10 145 30
               C170 50 170 85 125 120
               L100 145
               L75 120
               C30 85 30 50 55 30
               C80 10 100 30 100 30 Z"
          />
        </g>
      </svg>
    </div>
  )
}
