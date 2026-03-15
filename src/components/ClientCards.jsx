import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ================================================================
   PROJECTS DATA
   ─────────────────────────────────────────────────────────────────
   aspect controls height of each card:
     'square'    → 1:1
     'portrait'  → 3:4 (taller)
     'landscape' → 4:3 (shorter)
   Mix these up within each column to get the staggered Pinterest look.
   ================================================================ */
const PROJECTS = [
  // Column 1
  {
    id: 1, col: 0,
    client: 'CLASS DOJO',
    category: 'VIDEO',
    stats: { ig: '1.2M', yt: '800K' },
    accent: '#C8FF00',
    aspect: 'portrait',
    thumb: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80',
    src:   'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4',
  },
  {
    id: 2, col: 0,
    client: 'HACKING THE SYSTEMMM',
    category: 'VIDEO',
    stats: { ig: '600K', yt: '2M' },
    accent: '#FFD700',
    aspect: 'landscape',
    thumb: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&q=80',
    src:   'https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-a-video-call-at-home-43832-large.mp4',
  },
  {
    id: 3, col: 0,
    client: 'BUCH MEDIA',
    category: 'BRANDING',
    stats: { ig: '340K', yt: '180K' },
    accent: '#C8FF00',
    aspect: 'portrait',
    thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80',
    src:   'https://assets.mixkit.co/videos/preview/mixkit-woman-working-with-a-laptop-at-a-coffee-shop-2518-large.mp4',
  },
  // Column 2
  {
    id: 4, col: 1,
    client: 'ACARADAY AUTOMOTIVE',
    category: 'VIDEO',
    stats: { ig: '820K', yt: '500K' },
    accent: '#FF3B3B',
    aspect: 'landscape',
    thumb: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80',
    src:   'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-1089-large.mp4',
  },
  {
    id: 5, col: 1,
    client: 'BABY NOJAMIE',
    category: 'MOTION',
    stats: { ig: '210K', yt: '90K' },
    accent: '#FF6600',
    aspect: 'portrait',
    thumb: 'https://images.unsplash.com/photo-1536240478700-b869ad10fbe2?w=600&q=80',
    src:   'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-laptop-on-a-wooden-table-23609-large.mp4',
  },
  {
    id: 6, col: 1,
    client: 'ARTEMIS SIM RACING ',
    category: 'DIGITAL',
    stats: { ig: '450K', yt: '1.1M' },
    accent: '#00D9FF',
    aspect: 'square',
    thumb: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
    src:   'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4',
  },
  // Column 3
  {
    id: 7, col: 2,
    client: 'DEEPER REALMS',
    category: 'DIGITAL',
    stats: { ig: '1.1M', yt: '900K' },
    accent: '#766dfa',
    aspect: 'square',
    thumb: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
    src:   'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-1089-large.mp4',
  },
  {
    id: 8, col: 2,
    client: 'AADI2005',
    category: 'BRANDING',
    stats: { ig: '200K', yt: '80K' },
    accent: '#FF3B3B',
    aspect: 'portrait',
    thumb: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&q=80',
    src:   'https://assets.mixkit.co/videos/preview/mixkit-woman-working-with-a-laptop-at-a-coffee-shop-2518-large.mp4',
  },
  {
    id: 9, col: 2,
    client: 'POVO FAADI',
    category: 'MOTION',
    stats: { ig: '310K', yt: '140K' },
    accent: '#C8FF00',
    aspect: 'landscape',
    thumb: 'https://images.unsplash.com/photo-1627163439134-7a8c47e08208?w=600&q=80',
    src:   'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-laptop-on-a-wooden-table-23609-large.mp4',
  },
]

/* Aspect ratio values */
const ASPECTS = {
  square:    '1 / 1',
  portrait:  '1 / 1',
  landscape: '1 / 1',
}

/* Category pill colors */
const PILL = {
  VIDEO:    { bg: 'rgba(0,0,0,0.55)',  text: '#fff'  },
  BRANDING: { bg: '#C8FF00',            text: '#000'  },
  MOTION:   { bg: '#FF6600',            text: '#fff'  },
  DIGITAL:  { bg: '#766dfa',            text: '#fff'  },
}

/* ================================================================
   SINGLE CARD
   ================================================================ */
function Card({ project, delay = 0 }) {
  const [hovered, setHovered] = useState(false)
  const mediaRef = useRef(null)
  const vidRef   = useRef(null)
  const cardRef  = useRef(null)

  const onEnter = () => {
    setHovered(true)
    vidRef.current?.play().catch(() => {})
    gsap.to(mediaRef.current, { scale: 1.06, duration: 0.55, ease: 'power2.out' })
  }
  const onLeave = () => {
    setHovered(false)
    if (vidRef.current) { vidRef.current.pause(); vidRef.current.currentTime = 0 }
    gsap.to(mediaRef.current, { scale: 1.0, duration: 0.55, ease: 'power2.out' })
  }

  const pill = PILL[project.category] || PILL.VIDEO

  return (
    <div
      ref={cardRef}
      className="vault-card relative overflow-hidden cursor-target"
      style={{
        aspectRatio: ASPECTS[project.aspect],
        borderRadius: 10,
        background: '#0e0e0e',
        /* No border, no outline — completely free */
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Full-bleed media */}
      <div ref={mediaRef} className="absolute inset-0" style={{ willChange: 'transform' }}>
        <img
          src={project.thumb} alt={project.client}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: hovered ? 0 : 1, transition: 'opacity 0.25s ease' }}
        />
        <video
          ref={vidRef} src={project.src} muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.25s ease' }}
        />
      </div>

      {/* Bottom gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, transparent 25%, rgba(0,0,0,0.82) 100%)',
      }} />

      {/* Top-left: category pill
      <div className="absolute top-3 left-3 z-10">
        <span className="font-lemon-milk uppercase" style={{
          fontSize: '0.56rem', letterSpacing: '0.1em', fontWeight: 700,
          background: pill.bg, color: pill.text,
          padding: '3px 9px', borderRadius: 20,
          backdropFilter: 'blur(6px)',
        }}>{project.category}</span>
      </div> */}

      {/* Top-right: arrow */}
      <div className="absolute top-3 right-3 z-10 flex items-center justify-center" style={{
        width: 28, height: 28, borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.15)',
        color: '#fff', fontSize: '0.75rem',
        transform: hovered ? 'rotate(45deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      }}>↗</div>

      {/* Bottom-right: accent dot */}
      {/* <div className="absolute bottom-3 right-3 z-10" style={{
        width: 7, height: 7, borderRadius: '50%',
        background: project.accent,
        boxShadow: `0 0 10px ${project.accent}`,
      }} /> */}

      {/* Bottom-left: client + stats */}
      <div className="absolute bottom-0 left-0 right-10 z-10 px-3 pb-3">
        <p className="font-highrise font-black text-white leading-none mb-1" style={{
          fontSize: 'clamp(2rem, 4vw, 6rem)',
          letterSpacing: '-0.01em',
          textShadow: '0 2px 10px rgba(0,0,0,0.7)',
        }}>{project.client}</p>
        <div className="flex items-center gap-2.5">
          {project.stats?.ig && (
            <span className="font-highrise" style={{ fontSize: '2rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>
              <span style={{ opacity: 0.4 }}>IG </span>{project.stats.ig}
            </span>
          )}
          {project.stats?.yt && (
            <span className="font-highrise" style={{ fontSize: '2rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>
              <span style={{ opacity: 0.4 }}>YT </span>{project.stats.yt}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

/* ================================================================
   VAULT GRID — main export
   ─────────────────────────────────────────────────────────────────
   Layout:
     Left side:  "I HAVE WORKED WITH" heading — free, no box
     Right side: TRUE masonry — 3 independent columns, each column
                 is a flex column. Cards in each column stack vertically.
                 Column 2 is offset down (margin-top) to create the
                 Pinterest stagger effect.

   No borders. No section boxes. Just floating content on dark bg.
   ================================================================ */
export default function VaultGrid() {
  const sectionRef = useRef(null)

  // Split projects into 3 columns
  const col0 = PROJECTS.filter(p => p.col === 0)
  const col1 = PROJECTS.filter(p => p.col === 1)
  const col2 = PROJECTS.filter(p => p.col === 2)

  // Refs for each column so we can target them for parallax
  const colRef0 = useRef(null)
  const colRef1 = useRef(null)
  const colRef2 = useRef(null)

  useGSAP(() => {
    // ── Entrance animations ──
    gsap.from('.vault-heading', {
      scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', toggleActions: 'play none none none', fastScrollEnd: true },
      y: 40, opacity: 0, duration: 1.0, ease: 'expo.out', force3D: true,
    })
    gsap.from('.col-0 .vault-card', {
      scrollTrigger: { trigger: '.vault-masonry', start: 'top 80%', toggleActions: 'play none none none', fastScrollEnd: true },
      y: 60, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'expo.out', force3D: true,
    })
    gsap.from('.col-1 .vault-card', {
      scrollTrigger: { trigger: '.vault-masonry', start: 'top 80%', toggleActions: 'play none none none', fastScrollEnd: true },
      y: 60, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'expo.out', force3D: true, delay: 0.12,
    })
    gsap.from('.col-2 .vault-card', {
      scrollTrigger: { trigger: '.vault-masonry', start: 'top 80%', toggleActions: 'play none none none', fastScrollEnd: true },
      y: 60, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'expo.out', force3D: true, delay: 0.24,
    })

    /*
      ── PARALLAX SCROLL SPEEDS ──
      Each column moves at a different Y speed as you scroll.
      Negative yPercent = column moves UP faster than scroll (feels faster)
      Positive yPercent = column moves UP slower than scroll (feels slower)

      col-0: fastest  (moves up most)  → -12%
      col-1: medium   (normal speed)   →  0% (no offset, baseline)
      col-2: slowest  (moves up least) → +12% (lags behind)

      scrub: true = tied to scroll position, perfectly smooth with Lenis.
      The start/end range covers the whole section so parallax runs
      from when the section enters to when it leaves.

      To change speeds: adjust the yPercent values.
        More negative = column scrolls faster
        More positive = column scrolls slower / drifts behind
    */
    gsap.to(colRef0.current, {
      yPercent: -10,   // ← col 1 speed: raise this number to go faster
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,    // scrub = how closely it follows scroll (lower = more lag)
      },
    })

    // col-1 intentionally has NO parallax — it's the baseline speed
    // (regular document flow, moves at normal scroll speed)

    gsap.to(colRef2.current, {
      yPercent: 10,    // ← col 3 speed: raise this to slow it down more
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2,
      },
    })

  }, { scope: sectionRef })

  return (
    /*
      NO outer borders. NO section box. The section just lives
      on the dark background — content floats freely.
    */
    <section ref={sectionRef} className="w-full bg-ink">

      {/* ── Thin top label bar — just text, no box ── */}
      <div className="flex items-center justify-between px-5 sm:px-10 md:px-16 pt-16 sm:pt-24 pb-10 sm:pb-14">
        <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'rgba(245,230,211,0.3)' }}>
          ◆&nbsp;&nbsp;WORKED WITH
        </p>
        <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'rgba(245,230,211,0.3)' }}>
          0{PROJECTS.length} CLIENTS
        </p>
      </div>

      {/* ── Main layout: heading left + masonry right ── */}
      <div className="flex flex-col md:flex-row gap-0 px-5 sm:px-10 md:px-16 pb-20 sm:pb-28">

        {/* ── LEFT: floating heading, no box ── */}
        <div className="vault-heading md:w-[40%] md:sticky md:top-20 md:self-start pr-0 md:pr-12 mb-12 md:mb-0">

          <h2 className="font-moon-get font-black text-bone leading-none mb-4" style={{
            fontSize: 'clamp(3rem, 5.5vw, 5.5rem)',
            letterSpacing: '-0.025em',
            lineHeight: 0.9,
          }}>
            I HAVE WORKED WITH          </h2>

          <p className="font-decipher mb-6" style={{
            fontSize: 'clamp(1.5rem, 2.8vw, 2.4rem)',
            color: '#b30f63ff',
            transform: 'rotate(-2deg)',
            display: 'inline-block',
            lineHeight: 1,
          }}>
            worked with best -
          </p>

          <p className="font-mono uppercase leading-loose mb-8" style={{
            fontSize: '9px', letterSpacing: '0.07em',
            color: 'rgba(245,230,211,0.35)',
            maxWidth: 260,
            display: 'block',
          }}>
            Every creator here trusted me to make their content hit different.
            From hooks to full edits, I&apos;ve built their audience, their brand,
            and their identity.
          </p>

          <ul className="flex flex-col gap-2.5">
            {['LONG-FORM EDITING', 'BRAND IDENTITY', 'REELS & SHORT-FORM', 'RETENTION STRATEGY'].map(s => (
              <li key={s} className="flex items-center gap-2.5 font-mono uppercase"
                style={{ fontSize: '9px', letterSpacing: '0.08em', color: 'rgba(245,230,211,0.45)' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#C8FF00', flexShrink: 0 }} />
                {s}
              </li>
            ))}
          </ul>

          {/* Ghost decoration behind text */}
          <p className="font-aerosoldier select-none pointer-events-none hidden md:block" style={{
            position: 'absolute',
            bottom: -40, left: 0,
            fontSize: '7rem',
            color: 'rgba(200, 255, 0, 0.1)',
            transform: 'rotate(-10deg)',
            lineHeight: 1,
          }}>work</p>
        </div>

        {/* ── RIGHT: true masonry — 3 independent flex columns ── */}
        <div
          className="vault-masonry md:flex-1 flex gap-3 items-start"
          style={{ gap: 'clamp(8px, 1vw, 12px)' }}
        >

          {/* Column 1 — fastest parallax (moves up more) */}
          <div ref={colRef0} className="col-0 flex-1 flex flex-col" style={{ gap: 'clamp(8px, 1vw, 12px)', willChange: 'transform' }}>
            {col0.map(p => <Card key={p.id} project={p} />)}
          </div>

          {/* Column 2 — baseline speed (no parallax offset) */}
          <div ref={colRef1} className="col-1 flex-1 flex flex-col" style={{
            gap: 'clamp(8px, 1vw, 12px)',
            marginTop: 'clamp(40px, 6vw, 80px)',
            willChange: 'transform',
          }}>
            {col1.map(p => <Card key={p.id} project={p} />)}
          </div>

          {/* Column 3 — slowest parallax (drifts behind) */}
          <div ref={colRef2} className="col-2 flex-1 flex flex-col" style={{
            gap: 'clamp(8px, 1vw, 12px)',
            marginTop: 'clamp(20px, 3vw, 40px)',
            willChange: 'transform',
          }}>
            {col2.map(p => <Card key={p.id} project={p} />)}
          </div>

        </div>
      </div>



    </section>
  )
}