import React, { useRef, useEffect, useState } from 'react'
import '../styles/question.css'

export default function ValentineQuestion({ accepted, onAccept }){
  const noBtnRef = useRef(null)
  const wrapperRef = useRef(null)
  const yesBtnRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })
  const velRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: -9999, y: -9999 })
  const animRef = useRef(null)

  useEffect(() => {
    // track pointer (mouse or touch)
    const handleMove = (e) => {
      const x = e.clientX ?? (e.touches && e.touches[0].clientX)
      const y = e.clientY ?? (e.touches && e.touches[0].clientY)
      if (typeof x === 'number' && typeof y === 'number') targetRef.current = { x, y }
    }
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('touchstart', handleMove, { passive: true })
    window.addEventListener('touchmove', handleMove, { passive: true })

    const loop = () => {
      const btn = noBtnRef.current
      if (!btn) { animRef.current = requestAnimationFrame(loop); return }

      const rect = btn.getBoundingClientRect()
      const bx = rect.left + rect.width/2
      const by = rect.top + rect.height/2

      const dx = bx - targetRef.current.x
      const dy = by - targetRef.current.y
      const dist = Math.hypot(dx, dy)

      // smaller threshold so pointer must get closer before No flees
      const threshold = Math.max(60, Math.min(140, window.innerWidth * 0.12))
      let fx = 0, fy = 0

      if (dist < threshold && dist > 0) {
        const strength = (threshold - dist) / threshold // 0..1
        // direction away from pointer, non-linear strength
        const push = 0.4 + 4.2 * strength
        fx = (dx / dist) * push
        fy = (dy / dist) * (push * 0.6 + 0.8)
      }

      // apply to velocity (springy)
      velRef.current.x += fx
      velRef.current.y += fy

      // if tab is hidden, damp velocities and skip random drift to avoid jitter
      if (typeof document !== 'undefined' && document.hidden) {
        velRef.current.x *= 0.6
        velRef.current.y *= 0.6
        let nx = posRef.current.x + velRef.current.x
        let ny = posRef.current.y + velRef.current.y
        nx = Math.max(pad, Math.min(vw - rect.width - pad, nx))
        ny = Math.max(pad, Math.min(vh - rect.height - pad, ny))
        posRef.current.x = nx
        posRef.current.y = ny
        btn.style.transform = `translate3d(${nx}px, ${ny}px, 0)`
        animRef.current = requestAnimationFrame(loop)
        return
      }

      // subtle random drifting only when pointer is near so No feels alive,
      // but avoids slow wandering when user isn't interacting
      if (dist < threshold * 0.7) {
        velRef.current.x += (Math.random() - 0.5) * 0.12
        velRef.current.y += (Math.random() - 0.5) * 0.09
      }

      // damping
      velRef.current.x *= 0.88
      velRef.current.y *= 0.88

      // integrate position
      const pad = 12
      const vw = window.innerWidth
      const vh = window.innerHeight
      let nx = posRef.current.x + velRef.current.x
      let ny = posRef.current.y + velRef.current.y

      // clamp
      nx = Math.max(pad, Math.min(vw - rect.width - pad, nx))
      ny = Math.max(pad, Math.min(vh - rect.height - pad, ny))

      posRef.current.x = nx
      posRef.current.y = ny
      btn.style.transform = `translate3d(${nx}px, ${ny}px, 0)`

      // bounce on edges: if hitting bounds reverse and damp velocity
      const leftBound = pad
      const rightBound = vw - rect.width - pad
      const topBound = pad
      const bottomBound = vh - rect.height - pad
      if (nx <= leftBound || nx >= rightBound) {
        velRef.current.x *= -0.6
        nx = Math.max(leftBound, Math.min(rightBound, nx))
      }
      if (ny <= topBound || ny >= bottomBound) {
        velRef.current.y *= -0.6
        ny = Math.max(topBound, Math.min(bottomBound, ny))
      }

      animRef.current = requestAnimationFrame(loop)
    }

    animRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('touchstart', handleMove)
      window.removeEventListener('touchmove', handleMove)
    }
  }, [])

  // init button starting position just below the Yes button
  useEffect(() => {
    const btn = noBtnRef.current
    const yes = yesBtnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()

    // make the No button fixed so transforms map to viewport pixels
    btn.style.position = 'fixed'

    let startX = Math.round((window.innerWidth - rect.width) / 2 + 80)
    let startY = Math.round(window.innerHeight / 2 + 130)
    if (yes) {
      const yrect = yes.getBoundingClientRect()
      startX = Math.round(yrect.left + (yrect.width - rect.width) / 2)
      startY = Math.round(yrect.bottom + 10)
    }

    // keep inside viewport
    const pad = 12
    startX = Math.max(pad, Math.min(window.innerWidth - rect.width - pad, startX))
    startY = Math.max(pad, Math.min(window.innerHeight - rect.height - pad, startY))

    posRef.current = { x: startX, y: startY }
    btn.style.transform = `translate3d(${startX}px, ${startY}px, 0)`
    // reveal after we've placed it so it doesn't flash at top-left
    requestAnimationFrame(() => { btn.style.opacity = '1' })
  }, [])

  return (
    <div className="question-wrap" ref={wrapperRef}>
      <div className="question-text"> Gugiwow stinkybutt, <br /> Will you be my Valentine?</div>
      <div className="buttons">
        <button ref={yesBtnRef} className="btn yes" onClick={onAccept} onKeyDown={(e)=>{ if(e.key==='Enter' || e.key===' ') onAccept()}} aria-pressed={accepted}>
          {accepted ? 'Yay!!! 💘' : 'Yes'}
        </button>

        <button ref={noBtnRef} className="btn no" aria-hidden={true} tabIndex={0}>
          No
        </button>
      </div>

      {accepted && <FloatingHearts />}
    </div>
  )
}

function FloatingHearts(){
  const [hearts] = useState(Array.from({length:12}, (_,i)=>i))
  return (
    <div className="floating-hearts" aria-hidden>
      {hearts.map(i=> (
        <div key={i} className="fheart" style={{left: Math.random()*100 + '%', animationDelay: Math.random()*1+'s'}}>
          ❤️
        </div>
      ))}
    </div>
  )
}
