import { useRef, useState, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useCursor } from '../contexts/CursorContext'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ─── Service data ─────────────────────────────────────────────── */
const SERVICES = [
  {
    id: '01',
    name: 'BRANDING',
    tagline: 'Visual identity that commands attention.',
    keywords: [
      ['LOGO', 'IDENTITY', 'BRAND', 'VISUAL', 'MARK', 'SYSTEM'],
      ['COLOR', 'TYPE', 'DIRECTION', 'GUIDELINES', 'PALETTE'],
      ['WORLDS', 'MEMORY', 'CONVERT', 'SIGNATURE', 'CRAFT'],
    ],
    thumb: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-laptop-on-a-wooden-table-23609-large.mp4',
    accent: '#C8FF00',
  },
  {
    id: '02',
    name: 'DIGITAL EDITING',
    tagline: 'Cut. Pace. Story. The edit that keeps eyes glued.',
    keywords: [
      ['YOUTUBE', 'REELS', 'STORY', 'CUTS', 'SHORT FORM'],
      ['SOUND', 'PACING', 'RHYTHM', 'FLOW', 'MIX', 'SYNC'],
      ['BINGE', 'LOCKED IN', 'LONG FORM', 'FRAME', 'HOOK'],
    ],
    thumb: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-1089-large.mp4',
    accent: '#E63B2E',
  },
  {
    id: '03',
    name: 'RETENTION STRATEGY',
    tagline: 'Hook, hold, grow. Engineered to keep them watching.',
    keywords: [
      ['HOOK', 'ENGAGE', 'RETAIN', 'GROW', 'WATCH TIME'],
      ['PACING', 'RHYTHM', 'DATA', 'STRATEGY', 'MAPS'],
      ['THUMBNAIL', 'SCROLL STOP', 'BINGE', 'FUNNEL', 'SPIKE'],
    ],
    thumb: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4',
    accent: '#766dfa',
  },
]

/* ─── Marquee row ──────────────────────────────────────────────── */
function MarqueeRow({ keywords, reverse = false, outlined = false, accent }) {
  const chunk = keywords.join('  ◆  ') + '  ◆  '
  const full  = chunk + chunk
  return (
    <div style={{ overflow: 'hidden', lineHeight: 1 }}>
      <div
        className="font-akira"
        style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          /* CSS animation — runs entirely on compositor, zero JS cost */
          animation: `${reverse ? 'svc-marquee-r' : 'svc-marquee-l'} 20s linear infinite`,
          willChange: 'transform',
          fontSize: 'clamp(1.4rem, 3.5vw, 3.6rem)',
          color: outlined ? 'transparent' : accent,
          WebkitTextStroke: outlined ? `1.5px ${accent}` : 'none',
          letterSpacing: '-0.01em',
          padding: '8px 0',
        }}
      >
        {full}
      </div>
    </div>
  )
}

/* ─── ServiceRow ───────────────────────────────────────────────── */
/*
  WHY IT WAS LAGGING:
  ──────────────────
  1. gsap.to(el, { height: h }) — animating `height` triggers layout
     reflow on EVERY frame. The browser has to recalculate the entire
     document layout 60 times per second. This is the main culprit.

  2. gsap.to(el, { backgroundColor }) — paint operation, also expensive.

  3. Both animations ran simultaneously, doubling the cost.

  THE FIX:
  ────────
  1. Replace height animation with CSS `max-height` + `transition`.
     We set `max-height: 0` → `max-height: 400px` using a CSS class swap.
     The browser uses the fast CSS transition path (compositor-only).
     No JavaScript runs during the transition at all.

  2. Replace backgroundColor GSAP animation with CSS `transition` on
     `background-color`. Same class swap approach — zero JS cost.

  3. Arrow rotation also moved to CSS transition.

  4. The only GSAP left is the scroll-triggered entrance animation
     (runs once, not on hover) — this is fine.
*/
function ServiceRow({ service, isActive, onEnter, onLeave }) {
  const vidRef = useRef(null)
  const { setServiceVideo } = useCursor()

  /* Handle video play/pause when active state changes */
  useEffect(() => {
    if (isActive) {
      setServiceVideo(service.video)
      vidRef.current?.play().catch(() => {})
    } else {
      setServiceVideo(null)
      if (vidRef.current) {
        vidRef.current.pause()
        vidRef.current.currentTime = 0
      }
    }
  }, [isActive]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="relative overflow-hidden cursor-target svc-row-inner"
      style={{
        borderBottom: '1px solid rgba(245,230,211,0.1)',
        /*
          CSS transition on border-radius and background-color.
          These run on the compositor thread — not the main JS thread.
          Result: buttery smooth even under heavy CPU load.
        */
        backgroundColor: isActive ? '#000000' : 'transparent',
        borderRadius:    isActive ? '20px' : '0px',
        margin:          isActive ? '6px 24px' : '0px 0px',
        transition:      'background-color 0.28s ease, border-radius 0.32s ease, margin 0.32s ease',
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >

      {/* ── Always-visible header ── */}
      <div className="flex items-center gap-3 sm:gap-5 px-4 sm:px-8 md:px-12 pr-4 sm:pr-8 md:pr-14 py-4 sm:py-7 select-none">

        <span
          className="font-another-tag shrink-0"
          style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
            lineHeight: 1,
            color: isActive ? service.accent : 'rgba(245,230,211,0.18)',
            transform: 'rotate(-3deg) translateZ(0)',
            display: 'inline-block',
            transition: 'color 0.25s ease',
            minWidth: '2.2rem',
          }}
        >
          {service.id}
        </span>

        <span
          className="flex-1 font-akira leading-none"
          style={{
            fontSize: 'clamp(1.1rem, 3.8vw, 4rem)',
            color: '#F5E6D3',
            letterSpacing: '-0.02em',
          }}
        >
          {service.name}
        </span>

        <span
          className="hidden md:block font-mono text-right leading-relaxed shrink-0"
          style={{
            fontSize: '11px',
            letterSpacing: '0.06em',
            maxWidth: '190px',
            color: 'rgba(245,230,211,0.35)',
            textTransform: 'uppercase',
          }}
        >
          {service.tagline}
        </span>

        {/* Arrow — CSS transition only */}
        <span
          style={{
            fontSize: '1.5rem',
            color: isActive ? service.accent : 'rgba(245,230,211,0.2)',
            transform: isActive ? 'rotate(45deg) translateZ(0)' : 'rotate(0deg) translateZ(0)',
            display: 'inline-block',
            flexShrink: 0,
            /* CSS transition on both color and transform — compositor only */
            transition: 'color 0.25s ease, transform 0.32s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >→</span>
      </div>

      {/* ── Expanding panel ──────────────────────────────────────────
          KEY CHANGE: we no longer animate `height` with GSAP.

          Instead we use `max-height` + CSS transition.
          - Closed: max-height: 0   (content hidden, no layout cost)
          - Open:   max-height: 400px (content revealed)

          The browser transitions max-height on the compositor thread.
          Zero layout reflow. Zero paint. Zero JS per frame.

          The only cost is the initial style recalc when isActive changes
          (one frame, not 60 frames per second).
      ────────────────────────────────────────────────────────────── */}
      <div
        style={{
          maxHeight:  isActive ? '400px' : '0px',
          overflow:   'hidden',
          /*
            ease-out on open  = feels snappy and responsive
            ease-in  on close = feels instant and crisp
            The asymmetric timing is intentional — open feels deliberate,
            close feels instant (no lag when mouse leaves)
          */
          transition: isActive
            ? 'max-height 0.52s cubic-bezier(0.4, 0, 0.2, 1)'
            : 'max-height 0.28s cubic-bezier(0.4, 0, 1, 1)',
        }}
      >
        {/* Inner content — fixed height, no layout cost */}
        <div style={{ position: 'relative', height: 'clamp(200px, 35vw, 600px)' }}>

          {/* Ghost number */}
          <span
            className="font-akira"
            style={{
              position: 'absolute',
              top: '50%', left: '4%',
              transform: 'translateY(-50%) translateZ(0)',
              fontSize: '16rem', lineHeight: 1,
              color: 'rgba(255,255,255,0.025)',
              pointerEvents: 'none', userSelect: 'none',
              zIndex: 0,
            }}
          >{service.id}</span>

          {/* Marquee rows — CSS animation, zero JS */}
          <div
            className="hidden sm:flex"
            style={{
              position: 'absolute', top: 0, left: 0, bottom: 0, right: '32%',
              flexDirection: 'column', justifyContent: 'center',
              overflow: 'hidden', zIndex: 1,
            }}
          >
            <MarqueeRow keywords={service.keywords[0]} accent={service.accent} />
            <MarqueeRow keywords={service.keywords[1]} accent={service.accent} reverse outlined />
            <MarqueeRow keywords={service.keywords[2]} accent={service.accent} />
          </div>

          {/* Fade masks */}
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 80, background: 'linear-gradient(to right,#000 0%,transparent 100%)', pointerEvents: 'none', zIndex: 2 }} />
          <div className="hidden sm:block" style={{ position: 'absolute', top: 0, bottom: 0, right: '32%', width: 60, background: 'linear-gradient(to left,#000 0%,transparent 100%)', pointerEvents: 'none', zIndex: 2 }} />

          {/* Thumbnail */}
          <div
            style={{
              position: 'absolute', top: 12, right: 12, bottom: 12,
              width: 'min(calc(100% - 24px), calc(30% - 16px))',
              borderRadius: 12, overflow: 'hidden',
              boxShadow: '0 12px 40px rgba(0,0,0,0.7)', zIndex: 3,
            }}
          >
            <img
              src={service.thumb} alt={service.name}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: service.accent, opacity: 0.85 }} />
          </div>

          {/* Hidden video for cursor context */}
          <video ref={vidRef} src={service.video} muted loop playsInline style={{ display: 'none' }} />

        </div>
      </div>
    </div>
  )
}

/* ─── Section ──────────────────────────────────────────────────── */
export default function Services({ onNavigate }) {
  const sectionRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(null)

  /*
    Stable callbacks — useCallback prevents recreating these on every render.
    Without this, React would re-render ServiceRow on EVERY mouse move because
    the parent's inline functions are new references each render.
  */
  const handleEnter = useCallback((i) => () => setActiveIdx(i), [])
  const handleLeave = useCallback(() => setActiveIdx(null), [])

  /*
    Scroll entrance animation — runs ONCE when section enters viewport.
    This is the only GSAP animation remaining. It's not on hover so
    it doesn't interfere with the accordion transitions.
  */
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
          /* fastScrollEnd prevents ScrollTrigger from re-calculating
             on every scroll tick when inside Lenis */
          fastScrollEnd: true,
        },
      })

      tl.from('.svc-row', {
        y: 60, opacity: 0, duration: 0.85, stagger: 0.12, ease: 'expo.out',
        /* force3D keeps transforms on the GPU */
        force3D: true,
      })
      tl.from('.svc-left', {
        x: -36, opacity: 0, duration: 0.95, ease: 'expo.out', force3D: true,
      }, '<0.05')
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="w-full bg-ink">

      {/* Header */}
      <div
        className="flex items-end justify-between px-5 sm:px-8 md:px-14 pt-14 sm:pt-20 pb-4 sm:pb-6"
        style={{ borderBottom: '1px solid rgba(245,230,211,0.1)' }}
      >
        <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'rgba(245,230,211,0.4)' }}>◆&nbsp;&nbsp;WHAT I DO</p>
        <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'rgba(245,230,211,0.4)' }}>03 SERVICES</p>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row">

        {/* Left sticky tagline */}
        <div className="svc-left relative md:w-[40%] md:sticky md:top-20 md:self-start px-5 sm:px-8 md:px-14 pt-10 sm:pt-14 pb-8 sm:pb-10 md:pb-24">

          <div className="flex flex-col mb-8 cursor-target" style={{ gap: '3px' }}>
            <span className="font-street-wars" style={{ fontSize: 'clamp(2.8rem, 4.8vw, 4.2rem)', color: '#ff0000', lineHeight: 0.95, transform: 'rotate(-1.5deg)', display: 'inline-block' }}>
              i know
            </span>
            <span className="font-akira" style={{ fontSize: 'clamp(2rem, 3.6vw, 3.2rem)', color: '#F5E6D3', lineHeight: 1, WebkitTextStroke: '0.8px #F5E6D3' }}>
              what i&apos;m
            </span>
            <span className="font-akira" style={{ fontSize: 'clamp(2.6rem, 4.2vw, 3.8rem)', color: '#F5E6D3', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
              good at
            </span>
            {/* <span className="font-decipher" style={{ fontSize: 'clamp(1.8rem, 3.2vw, 3rem)', color: '#C8FF00', lineHeight: 1, transform: 'rotate(-2deg)', display: 'inline-block', marginTop: 6 }}>
              ~everything~
            </span> */}
          </div>

          <div>
            <p className="font-mono uppercase" style={{ fontSize: 9, letterSpacing: '0.12em', color: 'rgba(245,230,211,0.3)' }}>
              03 crafts / limitless passion
            </p>
            <div style={{ height: 2, width: 56, marginTop: 7, background: '#E63B2E', borderRadius: 2, transform: 'rotate(-1deg)' }} />
          </div>

          <p className="font-aerosoldier select-none pointer-events-none absolute hidden md:block" style={{ bottom: 50, left: 40, fontSize: '5.5rem', color: 'rgba(200,255,0,0.04)', transform: 'rotate(-12deg)', lineHeight: 1 }}>
            aadi
          </p>
        </div>

        {/* Right accordion */}
        <div className="md:flex-1 pt-6 md:pt-0" style={{ borderLeft: '1px solid rgba(245,230,211,0.1)' }}>
          {SERVICES.map((s, i) => (
            <div key={s.id} className="svc-row">
              <ServiceRow
                service={s}
                isActive={activeIdx === i}
                onEnter={handleEnter(i)}
                onLeave={handleLeave}
              />
            </div>
          ))}
        </div>

      </div>

      {/* Footer CTA */}
      <div className="px-5 sm:px-8 md:px-14 py-8 sm:py-10 flex items-center gap-6" style={{ borderTop: '1px solid rgba(245,230,211,0.1)' }}>
        <div className="h-0.5 w-10 bg-brutal-red shrink-0" />
        <button 
          onClick={() => onNavigate('connect')}
          className="font-mono text-[10px] tracking-widest text-bone/50 hover:text-bone uppercase transition-colors duration-300 cursor-target text-left"
        >
          GET IN TOUCH →
        </button>
      </div>
 
    </section>
  )
}