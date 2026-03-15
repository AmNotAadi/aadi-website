/**
 * MinecraftCursor — Pure Three.js Minecraft Head
 * ────────────────────────────────────────────────
 * INSTALL:   npm install three
 *
 * USAGE in App.jsx:
 *   import MinecraftCursor from './components/MinecraftCursor'
 *   <MinecraftCursor skinUrl="https://minotar.net/skin/Eystreem" />
 */

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/* ================================================================
   CONFIG
   ================================================================ */
const CONFIG = {
  size:       80,    // head size on screen (px)
  resolution: 160,   // internal render resolution
  stiffness:  0.10,  // spring: 0.05 floaty → 0.2 snappy
  damping:    0.68,  // spring: 0.5 bouncy  → 0.9 stiff
  mass:       1.0,
  offsetX:   -40,    // centers head on cursor
  offsetY:   -40,
  idleRotation: 0.013, // spin speed (rad/frame)
  tiltAmount:   0.35,
  bobAmount:    1.8,
  bobSpeed:     0.0018,
  clickBounce:  true,
}

/* ================================================================
   CROP SKIN REGION → canvas texture
   ─────────────────────────────────────────────────────────────────
   Instead of fiddling with UV coordinates (which flip/rotate
   differently per Three.js face), we simply crop the exact pixel
   region from the skin image onto a small canvas, then use THAT
   canvas as the texture for each face.
   This is 100% reliable — no UV math needed.

   Minecraft skin layout (all coords on 64×64 skin):
   ┌──────────────────────────────────────────────────────┐
   │  HEAD INNER LAYER                                    │
   │  Top    : x= 8, y= 0, w=8, h=8                      │
   │  Bottom : x=16, y= 0, w=8, h=8                      │
   │  Right  : x= 0, y= 8, w=8, h=8                      │
   │  Front  : x= 8, y= 8, w=8, h=8                      │
   │  Left   : x=16, y= 8, w=8, h=8                      │
   │  Back   : x=24, y= 8, w=8, h=8                      │
   │                                                      │
   │  HAT OUTER LAYER                                     │
   │  Top    : x=40, y= 0, w=8, h=8                      │
   │  Bottom : x=48, y= 0, w=8, h=8                      │
   │  Right  : x=32, y= 8, w=8, h=8                      │
   │  Front  : x=40, y= 8, w=8, h=8                      │
   │  Left   : x=48, y= 8, w=8, h=8                      │
   │  Back   : x=56, y= 8, w=8, h=8                      │
   └──────────────────────────────────────────────────────┘
   ================================================================ */
function cropToTexture(img, sx, sy, sw, sh) {
  const c = document.createElement('canvas')
  c.width  = sw
  c.height = sh
  c.getContext('2d').drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh)
  const tex = new THREE.CanvasTexture(c)
  tex.magFilter = THREE.NearestFilter
  tex.minFilter = THREE.NearestFilter
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/* ================================================================
   BUILD HEAD MESH — 6 separate materials, one per face
   Three.js BoxGeometry face order: +x, -x, +y, -y, +z, -z
   Which maps to:                    R,  L,  T,  Bo, F,  Ba
   ================================================================ */
function buildHeadMesh(img, scale = 1, isHat = false) {
  const O = isHat ? 32 : 0  // hat faces are offset 32px right on the skin

  // Crop each face from the correct skin region
  const texRight  = cropToTexture(img,  0 + O,  8, 8, 8)
  const texFront  = cropToTexture(img,  8 + O,  8, 8, 8)
  const texLeft   = cropToTexture(img, 16 + O,  8, 8, 8)
  const texBack   = cropToTexture(img, 24 + O,  8, 8, 8)
  const texTop    = cropToTexture(img,  8 + O,  0, 8, 8)
  const texBottom = cropToTexture(img, 16 + O,  0, 8, 8)

  const mkMat = (tex, transparent = false) => new THREE.MeshLambertMaterial({
    map: tex,
    transparent,
    alphaTest: transparent ? 0.1 : 0,
  })

  const t = isHat

  // BoxGeometry face order: [+x=Right, -x=Left, +y=Top, -y=Bottom, +z=Front, -z=Back]
  const materials = [
    mkMat(texRight,  t),
    mkMat(texLeft,   t),
    mkMat(texTop,    t),
    mkMat(texBottom, t),
    mkMat(texFront,  t),
    mkMat(texBack,   t),
  ]

  const size = 8 * scale
  const geo  = new THREE.BoxGeometry(size, size, size)
  return new THREE.Mesh(geo, materials)
}

/* ================================================================
   COMPONENT
   ================================================================ */
export default function MinecraftCursor({
  skinUrl = 'https://minotar.net/skin/Eystreem',
}) {
  const canvasRef = useRef(null)

  // Spring physics refs
  const pos       = useRef({ x: -500, y: -500 })
  const vel       = useRef({ x: 0, y: 0 })
  const mTarget   = useRef({ x: -500, y: -500 })
  const mVel      = useRef({ x: 0, y: 0 })
  const prevM     = useRef({ x: -500, y: -500 })
  const clickSc   = useRef(1)
  const clickDir  = useRef(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isVisible) return

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(CONFIG.resolution, CONFIG.resolution)
    renderer.setPixelRatio(1)
    renderer.setClearColor(0x000000, 0)

    /* ── Scene ── */
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 200)
    camera.position.set(0, 0, 30)
    camera.lookAt(0, 0, 0)

    /* ── Lighting ── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.75))
    const sun = new THREE.DirectionalLight(0xffffff, 0.85)
    sun.position.set(8, 16, 12)
    scene.add(sun)
    const fill = new THREE.DirectionalLight(0xffffff, 0.25)
    fill.position.set(-8, -6, -8)
    scene.add(fill)

    /* ── Head group (filled once skin loads) ── */
    const headGroup = new THREE.Group()
    scene.add(headGroup)

    /* ── Load skin using an <img> element so we can cropToTexture ── */
    const img = new Image()
    img.crossOrigin = 'anonymous'

    img.onload = () => {
      // Inner head layer
      const head = buildHeadMesh(img, 1, false)
      headGroup.add(head)

      // Outer hat layer (slightly bigger, transparent)
      const hat = buildHeadMesh(img, 1.125, true)
      headGroup.add(hat)
    }

    img.onerror = () => {
      console.warn('MinecraftCursor: could not load skin from', skinUrl)
      // Fallback cube so cursor still works
      const fallback = new THREE.Mesh(
        new THREE.BoxGeometry(8, 8, 8),
        new THREE.MeshLambertMaterial({ color: 0x1565c0 })
      )
      headGroup.add(fallback)
    }

    img.src = skinUrl

    /* ── Hide system cursor ── */
    if (!document.getElementById('mc-cursor-hide')) {
      const style = document.createElement('style')
      style.id = 'mc-cursor-hide'
      style.textContent = `*, *::before, *::after { cursor: none !important; }`
      document.head.appendChild(style)
    }

    /* ── Mouse events ── */
    const onMove = (e) => {
      prevM.current   = { ...mTarget.current }
      mTarget.current = { x: e.clientX, y: e.clientY }
      mVel.current    = { x: e.clientX - prevM.current.x, y: e.clientY - prevM.current.y }
    }
    const onDown = () => {
      if (!CONFIG.clickBounce) return
      clickSc.current = 0.72; clickDir.current = 1
    }
    const onUp = () => {
      if (!CONFIG.clickBounce) return
      clickSc.current = 1.28; clickDir.current = -1
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)

    /* ── RAF loop ── */
    let rafId
    const tick = (now) => {
      rafId = requestAnimationFrame(tick)

      /* Spring physics */
      const dx = mTarget.current.x - pos.current.x
      const dy = mTarget.current.y - pos.current.y
      vel.current.x = vel.current.x * CONFIG.damping + (dx * CONFIG.stiffness) / CONFIG.mass
      vel.current.y = vel.current.y * CONFIG.damping + (dy * CONFIG.stiffness) / CONFIG.mass
      pos.current.x += vel.current.x
      pos.current.y += vel.current.y

      /* Mouse velocity decay */
      mVel.current.x *= 0.75
      mVel.current.y *= 0.75
      const speed = Math.hypot(mVel.current.x, mVel.current.y)

      /* Spin — faster when moving */
      const t = Math.min(speed / 15, 1)
      headGroup.rotation.y += CONFIG.idleRotation * (0.4 + t * 1.4)

      /* Tilt toward movement (uses spring vel so it tracks actual head motion) */
      const tx = -vel.current.y * CONFIG.tiltAmount * 0.04
      const tz =  vel.current.x * CONFIG.tiltAmount * 0.04
      headGroup.rotation.x += (tx - headGroup.rotation.x) * 0.12
      headGroup.rotation.z += (tz - headGroup.rotation.z) * 0.12

      /* Click bounce */
      if (CONFIG.clickBounce && clickDir.current !== 0) {
        if (clickDir.current === 1) {
          clickSc.current += (1.28 - clickSc.current) * 0.22
          if (clickSc.current > 1.26) { clickSc.current = 1.28; clickDir.current = -1 }
        } else {
          clickSc.current += (1 - clickSc.current) * 0.18
          if (Math.abs(clickSc.current - 1) < 0.008) { clickSc.current = 1; clickDir.current = 0 }
        }
      }
      headGroup.scale.setScalar(clickSc.current)

      /* Bob */
      const bob = Math.sin(now * CONFIG.bobSpeed) * CONFIG.bobAmount

      /* Move the wrapper div */
      const x = pos.current.x + CONFIG.offsetX
      const y = pos.current.y + CONFIG.offsetY + bob
      if (canvas.parentElement) {
        canvas.parentElement.style.transform = `translate(${x}px, ${y}px)`
      }

      renderer.render(scene, camera)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      document.getElementById('mc-cursor-hide')?.remove()
      renderer.dispose()
    }
  }, [skinUrl, isVisible])

  useEffect(() => {
    const updateVisibility = () => {
      const vault = document.getElementById('vault-section')
      if (vault) {
        const rect = vault.getBoundingClientRect()
        setIsVisible(rect.bottom <= 0)
      }
    }
    window.addEventListener('scroll', updateVisibility, { passive: true })
    updateVisibility()
    return () => window.removeEventListener('scroll', updateVisibility)
  }, [])

  if (!isVisible) {
    const style = document.getElementById('mc-cursor-hide')
    if (style) style.remove()
    return null
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width:  CONFIG.size,
        height: CONFIG.size,
        pointerEvents: 'none',
        zIndex: 999999,
        willChange: 'transform',
        filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.6))',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width:  CONFIG.size,
          height: CONFIG.size,
          display: 'block',
          imageRendering: 'pixelated',
        }}
      />
    </div>
  )
}