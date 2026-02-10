import React, { useState } from 'react'
import Heart from './components/Heart'
import ValentineQuestion from './components/ValentineQuestion'
import './styles/global.css'

// 🔧 IMPORT IMAGE FROM SRC
import valentineImg from './assets/gugiwowval.jpg'

export const IMAGE_SRC = valentineImg

export const IMAGE_OFFSET_X = -13
export const IMAGE_OFFSET_Y = 25
export const IMAGE_SCALE = 0.3

export default function App() {
  const [accepted, setAccepted] = useState(false)

  return (
    <div className={'app' + (accepted ? ' accepted' : '')}>
      <div className="scene">
        <Heart
          active={accepted}
          imageHref={IMAGE_SRC}
          imageOffsetX={IMAGE_OFFSET_X}
          imageOffsetY={IMAGE_OFFSET_Y}
          imageScale={IMAGE_SCALE}
        />

        <ValentineQuestion
          accepted={accepted}
          onAccept={() => setAccepted(true)}
        />
      </div>
    </div>
  )
}
