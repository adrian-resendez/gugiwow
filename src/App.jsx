import React, { useState } from 'react'
import Heart from './components/Heart'
import ValentineQuestion from './components/ValentineQuestion'
import './styles/global.css'

// 🔧 IMAGE CONTROLS (THESE NOW WORK)
export const IMAGE_SRC = '/assets/gugiwowval.jpg'
export const IMAGE_OFFSET_X = -13     // move image left/right
export const IMAGE_OFFSET_Y = 25     // move image up/down
export const IMAGE_SCALE = .3     // <— zoom OUT (try 0.8–0.9)

export default function App(){
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
