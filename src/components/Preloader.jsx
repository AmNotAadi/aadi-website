/**
 * Preloader.jsx
 * ─────────────────────────────────────────────────────────────────
 * USAGE — add to App.jsx or your root component:
 *
 *   import Preloader from './components/Preloader'
 *
 *   export default function App() {
 *     return (
 *       <>
 *         <Preloader />          ← add this ONE line
 *         {your existing app}
 *       </>
 *     )
 *   }
 *
 * HOW IT WORKS:
 *   1. On mount, the preloader covers the entire screen (z-index 99999)
 *   2. It preloads all images/videos defined in ASSETS
 *   3. Counter counts from 00 to 100 as assets load
 *   4. When everything is loaded → wipe-up exit animation
 *   5. Website becomes fully visible underneath
 *   6. Component unmounts itself after the exit animation
 *
 * TO ADD/REMOVE ASSETS TO PRELOAD:
 *   Edit the ASSETS array below.
 *   Only add critical above-the-fold assets — fonts, hero image, logo.
 *   Don't add every image — that defeats the purpose.
 * ─────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import * as THREE from 'three'

/* ================================================================
   SKIN HELPERS
   ================================================================ */
function cropToTexture(img, sx, sy, sw, sh) {
  const c = document.createElement('canvas')
  c.width = sw; c.height = sh
  c.getContext('2d').drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh)
  const tex = new THREE.CanvasTexture(c)
  tex.magFilter = THREE.NearestFilter
  tex.minFilter = THREE.NearestFilter
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function buildHeadMesh(img, scale = 1, isHat = false) {
  const O = isHat ? 32 : 0
  const mkMat = (tex, t = false) => new THREE.MeshLambertMaterial({ map: tex, transparent: t, alphaTest: t ? 0.1 : 0 })
  const materials = [
    mkMat(cropToTexture(img,  0 + O, 8, 8, 8), isHat),
    mkMat(cropToTexture(img, 16 + O, 8, 8, 8), isHat),
    mkMat(cropToTexture(img,  8 + O, 0, 8, 8), isHat),
    mkMat(cropToTexture(img, 16 + O, 0, 8, 8), isHat),
    mkMat(cropToTexture(img,  8 + O, 8, 8, 8), isHat),
    mkMat(cropToTexture(img, 24 + O, 8, 8, 8), isHat),
  ]
  return new THREE.Mesh(new THREE.BoxGeometry(8 * scale, 8 * scale, 8 * scale), materials)
}

/*
  Build a solid-color Minecraft-style head — no skin URL needed.
  Uses Eystreem's approximate color palette so it looks right even
  without the actual skin texture (CORS blocks canvas reads from
  external URLs in most browsers).

  Eystreem palette:
    Front/sides: dark navy  #0A1628
    Hair:        brown      #3D1F00
    Hat:         blue       #1A3A6B  (transparent outer layer)
*/
function buildFallbackHead(scale = 1, isHat = false) {
  const faceColors = isHat
    ? [0x1a3a6b, 0x1a3a6b, 0x1a3a6b, 0x1a3a6b, 0x1a3a6b, 0x1a3a6b]
    : [0x0a1628, 0x0a1628, 0x3d1f00, 0x3d1f00, 0x0a1628, 0x0a1628]

  const materials = faceColors.map(c => new THREE.MeshLambertMaterial({
    color: c,
    transparent: isHat,
    opacity: isHat ? 0.7 : 1,
  }))
  return new THREE.Mesh(new THREE.BoxGeometry(8 * scale, 8 * scale, 8 * scale), materials)
}

/* ================================================================
   MINECRAFT HEAD COMPONENT
   ================================================================ */
const HEAD_CONFIG = {
  skinUrl:     'https://minotar.net/skin/Eystreem',
  size:         110,    // display size px
  spinSpeed:    0.018,
  jumpSpeed:    0.0022,
  squishOnLand: true,
}

function MinecraftHead() {
  const canvasRef  = useRef(null)
  const headGrpRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const S = HEAD_CONFIG.size
    canvas.width  = S
    canvas.height = S

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(S, S, false)
    renderer.setPixelRatio(1)
    renderer.setClearColor(0x000000, 0)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 200)
    camera.position.set(0, 0, 30)
    camera.lookAt(0, 0, 0)

    scene.add(new THREE.AmbientLight(0xffffff, 0.85))
    const sun = new THREE.DirectionalLight(0xffffff, 1.0)
    sun.position.set(8, 20, 15)
    scene.add(sun)
    const fill = new THREE.DirectionalLight(0x6699ff, 0.25)
    fill.position.set(-10, -5, -10)
    scene.add(fill)

    const headGroup = new THREE.Group()
    scene.add(headGroup)
    headGrpRef.current = headGroup

    /* ── Immediate fallback so something ALWAYS shows ── */
    headGroup.add(buildFallbackHead(1,     false))
    headGroup.add(buildFallbackHead(1.125, true))

    /* ── Shadow ── */
    const shadowGeo  = new THREE.EllipseCurve(0, 0, 3.8, 1.4)
    const shadowPts  = new THREE.BufferGeometry().setFromPoints(shadowGeo.getPoints(32))
    const shadowMat  = new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.25 })
    const shadowMesh = new THREE.LineLoop(shadowPts, shadowMat)
    shadowMesh.position.set(0, -6, 0)
    shadowMesh.rotation.x = Math.PI / 2
    scene.add(shadowMesh)

    /* ── Try loading real skin in background ──
       If CORS allows it, the textured head replaces the fallback.
       If not, the solid-color fallback stays — either way user sees something. */
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        /* Test if we can actually read the canvas (CORS check) */
        const testCtx = document.createElement('canvas').getContext('2d')
        testCtx.drawImage(img, 0, 0)
        testCtx.getImageData(0, 0, 1, 1) // throws SecurityError if blocked

        /* CORS passed — swap in textured head */
        while (headGroup.children.length) headGroup.remove(headGroup.children[0])
        headGroup.add(buildHeadMesh(img, 1,     false))
        headGroup.add(buildHeadMesh(img, 1.125, true))
      } catch {
        /* CORS blocked — keep the fallback, nothing to do */
      }
    }
    /* No onerror needed — fallback already in scene */
    img.src = HEAD_CONFIG.skinUrl

    /* ── RAF loop ── */
    let rafId
    const tick = (now) => {
      rafId = requestAnimationFrame(tick)

      headGroup.rotation.y += HEAD_CONFIG.spinSpeed

      const absSin = Math.abs(Math.sin(now * HEAD_CONFIG.jumpSpeed))
      headGroup.position.y = absSin * 1.8 - 0.5

      if (HEAD_CONFIG.squishOnLand) {
        headGroup.scale.y = 0.85 + absSin * 0.20
        headGroup.scale.x = 1.05 - absSin * 0.05
        headGroup.scale.z = 1.05 - absSin * 0.05
      }

      const ss = 0.55 + (1 - absSin) * 0.5
      shadowMesh.scale.set(ss, ss, 1)
      shadowMat.opacity = 0.08 + (1 - absSin) * 0.22

      renderer.render(scene, camera)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width:          HEAD_CONFIG.size,
        height:         HEAD_CONFIG.size,
        display:        'block',
        imageRendering: 'pixelated',
        filter:         'drop-shadow(0 10px 24px rgba(0,0,0,0.6))',
      }}
    />
  )
}


/* ================================================================
   ASSETS TO PRELOAD
   Add paths to images/videos you want loaded before reveal.
   Leave empty [] to just show the animation with a fake count.
   ================================================================ */
const ASSETS = [
  // Add your hero image, logo, key above-fold images here
  // e.g. '/src/assets/idcard.png',
  // e.g. '/src/assets/main video.mp4',
]

/* ================================================================
   CONFIG — change the look here
   ================================================================ */
const CONFIG = {
  minDuration: 1800,
  exitDuration: 900,
  showCounter: true,
}

export default function Preloader() {
  const wrapperRef   = useRef(null)
  const counterRef   = useRef(null)
  const panel1Ref    = useRef(null)
  const panel2Ref    = useRef(null)
  const logoRef      = useRef(null)

  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Prevent scroll while loading
    document.body.style.overflow = 'hidden'

    let progress = 0
    const startTime = Date.now()

    // ── Animate counter number up ──
    const updateCounter = (val) => {
      if (!counterRef.current) return
      counterRef.current.textContent = String(Math.floor(val)).padStart(2, '0')
    }

    // ── Logo entrance — wait for fonts to load first so no FOUT ──
    document.fonts.ready.then(() => {
      gsap.from(logoRef.current, {
        y: 20, opacity: 0, duration: 0.7, ease: 'power3.out',
      })
    })

    // ── Run exit animation ──
    const runExit = () => {
      // Counter jumps to 100
      gsap.to({ val: progress }, {
        val: 100,
        duration: 0.3,
        ease: 'power2.out',
        onUpdate: function () { updateCounter(this.targets()[0].val) },
        onComplete: () => {
          // Short pause at 100 before wipe
          gsap.delayedCall(0.25, () => {
            // Two-panel wipe upward — left panel slightly before right
            const tl = gsap.timeline({
              onComplete: () => {
                document.body.style.overflow = ''
                setVisible(false)
              },
            })

            tl.to(panel1Ref.current, {
              yPercent: -100,
              duration: CONFIG.exitDuration / 1000,
              ease: 'power4.inOut',
            }, 0)

            tl.to(panel2Ref.current, {
              yPercent: -100,
              duration: CONFIG.exitDuration / 1000,
              ease: 'power4.inOut',
            }, 0.08) // slight stagger between panels
          })
        },
      })
    }

    // ── No assets — just fake a smooth count ──
    if (ASSETS.length === 0) {
      gsap.to({ val: 0 }, {
        val: 100,
        duration: CONFIG.minDuration / 1000,
        ease: 'power1.inOut',
        onUpdate: function () {
          progress = this.targets()[0].val
          updateCounter(progress)
        },
        onComplete: runExit,
      })
      return
    }

    // ── Load real assets ──
    let loaded = 0

    const onLoad = () => {
      loaded++
      const target = (loaded / ASSETS.length) * 100

      gsap.to({ val: progress }, {
        val: target,
        duration: 0.3,
        ease: 'power1.out',
        overwrite: true,
        onUpdate: function () {
          progress = this.targets()[0].val
          updateCounter(progress)
        },
        onComplete: () => {
          if (loaded >= ASSETS.length) {
            // Ensure minimum display time
            const elapsed = Date.now() - startTime
            const wait = Math.max(0, CONFIG.minDuration - elapsed)
            gsap.delayedCall(wait / 1000, runExit)
          }
        },
      })
    }

    ASSETS.forEach(src => {
      if (/\.(mp4|webm|mov)$/i.test(src)) {
        const v = document.createElement('video')
        v.oncanplaythrough = onLoad
        v.onerror = onLoad
        v.src = src
        v.preload = 'auto'
        v.load()
      } else {
        const img = new Image()
        img.onload  = onLoad
        img.onerror = onLoad
        img.src = src
      }
    })
  }, [])

  if (!visible) return null

  return (
    /*
      Two panels side by side, both covering 100vw.
      On exit, both wipe upward with a slight stagger.
      This creates a slick split wipe reveal.
    */
    <div
      ref={wrapperRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        pointerEvents: 'all',
      }}
    >
      {/* ── Panel 1 (left 50%) ── */}
      <div
        ref={panel1Ref}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '50%', height: '100%',
          background: '#0A0A0A',
          willChange: 'transform',
        }}
      />

      {/* ── Panel 2 (right 50%) — slightly delayed on exit ── */}
      <div
        ref={panel2Ref}
        style={{
          position: 'absolute',
          top: 0, right: 0,
          width: '50%', height: '100%',
          background: '#0d0d0d',  // very slightly lighter for a subtle seam
          willChange: 'transform',
        }}
      />

      {/* ── Content layer — sits above both panels ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        zIndex: 1,
        pointerEvents: 'none',
      }}>

        {/* Logo */}
        <div ref={logoRef} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>
          <p
            className="font-don-graffiti"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              color: '#EBD9C2',
              letterSpacing: '-0.01em',
              lineHeight: 1,
            }}
          >
            aadi2005
          </p>

          {/* Minecraft head — sits directly below the logo text */}
          <MinecraftHead />

          <p
            className="font-lemon-milk"
            style={{
              fontSize: '0.55rem',
              letterSpacing: '0.3em',
              color: 'rgba(235,217,194,0.3)',
              marginTop: '0.25rem',
              textTransform: 'uppercase',
            }}
          >
            Loading
          </p>
        </div>

        {/* Counter — no bar */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          {CONFIG.showCounter && (
            <>
              <span
                ref={counterRef}
                className="font-akira"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  color: '#EBD9C2',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                00
              </span>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.65rem',
                  color: 'rgba(235,217,194,0.3)',
                  letterSpacing: '0.1em',
                }}
              >
                %
              </span>
            </>
          )}
        </div>

      </div>
    </div>
  )
}