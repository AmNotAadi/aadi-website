import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useCursor } from '../contexts/CursorContext'

gsap.registerPlugin(useGSAP)

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const labelRef = useRef(null)
  const videoRef  = useRef(null)
  const [label, setLabel] = useState(null) // null | 'PLAY' | 'VIEW'
  const { serviceVideo } = useCursor()

  // ── Position tracking via quickTo ────────────────────────────────────────
  useGSAP(() => {
    const el = cursorRef.current

    // Center the dot on the hotspot rather than top-left corner
    gsap.set(el, { xPercent: -50, yPercent: -50 })

    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power4.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power4.out' })

    const onMove = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // ── Service video mode (highest priority) ──────────────────────────────
  useEffect(() => {
    const el     = cursorRef.current
    const textEl = labelRef.current
    const vid    = videoRef.current

    if (serviceVideo) {
      vid.src = serviceVideo
      vid.play().catch(() => {})
      gsap.to(textEl, { opacity: 0, duration: 0.12 })
      gsap.to(el,  { width: 180, height: 180, duration: 0.55, ease: 'expo.out' })
      gsap.to(vid, { opacity: 1, duration: 0.3,  delay: 0.25, ease: 'power2.out' })
    } else {
      gsap.to(vid, { opacity: 0, duration: 0.15 })
      vid.pause()
      // hand back control to the label state
      if (label) {
        gsap.to(el,     { width: 80, height: 80, duration: 0.4, ease: 'expo.out' })
        gsap.to(textEl, { opacity: 1, duration: 0.2, delay: 0.15 })
      } else {
        gsap.to(el, { width: 12, height: 12, duration: 0.35, ease: 'expo.out' })
      }
    }
  }, [serviceVideo]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Expand / contract when label changes ─────────────────────────────────
  useEffect(() => {
    if (serviceVideo) return  // video mode takes precedence
    const el     = cursorRef.current
    const textEl = labelRef.current

    if (label) {
      gsap.to(el, { width: 80, height: 80, duration: 0.45, ease: 'expo.out' })
      gsap.to(textEl, { opacity: 1, duration: 0.2, delay: 0.18, ease: 'power2.out' })
    } else {
      gsap.to(textEl, { opacity: 0, duration: 0.1 })
      gsap.to(el, { width: 12, height: 12, duration: 0.35, ease: 'expo.out' })
    }
  }, [label, serviceVideo])

  // ── Hover detection via event delegation ─────────────────────────────────
  useEffect(() => {
    const onOver = (e) => {
      if (e.target.closest('video, [data-cursor="play"]')) {
        setLabel('PLAY')
      } else if (e.target.closest('a, button, [data-cursor="view"]')) {
        setLabel('VIEW')
      } else {
        setLabel(null)
      }
    }

    document.addEventListener('mouseover', onOver)
    return () => document.removeEventListener('mouseover', onOver)
  }, [])

  return (
    <div
      ref={cursorRef}
      // z-[10000] keeps the cursor above the z-[9999] CSS noise overlay
      className="fixed top-0 left-0 rounded-full bg-ink pointer-events-none z-[10000] flex items-center justify-center overflow-hidden"
      style={{ width: 12, height: 12 }}
    >
      {/* Service video — fills the circle when active */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-0"
      />
      {/* VIEW / PLAY label */}
      <span
        ref={labelRef}
        className="relative z-10 opacity-0 font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-bone whitespace-nowrap select-none"
      >
        {label}
      </span>
    </div>
  )
}
