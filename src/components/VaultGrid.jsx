import { useRef, useMemo, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// ════════════════════════════════════════════════════════════════════════
//  ADD YOUR MEDIA HERE — works with ANY format (landscape, portrait,
//  square, vertical, horizontal). object-cover handles all aspect ratios.
//
//  type  : 'video' | 'image'
//  src   : direct URL (.mp4 for video, or .jpg/.png/.webp for image)
//  thumb : thumbnail URL shown before video plays (skip for images)
//  title : small label in the bottom-left corner
// ════════════════════════════════════════════════════════════════════════
const MEDIA = [
  {
    type: 'video', title: 'BRAND SHOWREEL',
    thumb: 'https://images.unsplash.com/photo-1536240478700-b869ad10fbe2?w=800&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4',
    desc: 'A cinematic brand showreel cut to communicate vision, energy and identity in under 90 seconds.',
    tags: ['COLOR GRADING.', 'SOUND DESIGN.', 'MOTION TITLES.'],
  },
  {
    type: 'video', title: 'CLASSDOJO 2024',
    thumb: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-1089-large.mp4',
    desc: 'Social-first content series for ClassDojo — short, punchy, designed to stop the scroll.',
    tags: ['SOCIAL CONTENT.', 'PLATFORM EDIT.', 'RETENTION HOOKS.'],
  },
  {
    type: 'video', title: 'RETENTION CUT',
    thumb: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-laptop-on-a-wooden-table-23609-large.mp4',
    desc: 'Long-form YouTube edit engineered for maximum audience retention from second one.',
    tags: ['PACING.', 'HOOK STRUCTURE.', 'B-ROLL LAYERING.'],
  },
  {
    type: 'video', title: 'BUCH MEDIA',
    thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-woman-working-with-a-laptop-at-a-coffee-shop-2518-large.mp4',
    desc: 'Full brand video package for Buch Media — identity, promo and social cuts delivered together.',
    tags: ['BRAND PACKAGE.', 'MULTI-FORMAT.', 'DELIVERY SUITE.'],
  },
  {
    type: 'video', title: 'YOUTUBE SERIES',
    thumb: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-a-video-call-at-home-43832-large.mp4',
    desc: 'Ongoing weekly series — consistent visual language, thumbnail design and episode editing.',
    tags: ['SERIES EDITING.', 'THUMBNAIL SYNC.', 'WEEKLY CADENCE.'],
  },
  {
    type: 'video', title: 'SOCIAL PACK',
    thumb: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-a-girl-blowing-a-dandelion-51-large.mp4',
    desc: 'Reels, TikToks and Shorts adapted from one master cut into 6 platform-native formats.',
    tags: ['REELS.', 'TIKTOK.', 'SHORTS.'],
  },
  {
    type: 'video', title: 'EMILY ASMR',
    thumb: 'https://images.unsplash.com/photo-1542435503-956c469947f6?w=600&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-a-video-call-at-home-43832-large.mp4',
    desc: 'Long-form ASMR edited for atmosphere — precise audio mixing, slow cuts, immersive color.',
    tags: ['AUDIO MIXING.', 'ATMOSPHERE.', 'LONG-FORM.'],
  },
  {
    type: 'video', title: 'AD CREATIVE',
    thumb: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-laptop-on-a-wooden-table-23609-large.mp4',
    desc: 'Paid-ad creative built for conversion — punchy opening, clear CTA, tested hook variants.',
    tags: ['PAID ADS.', 'CTA DESIGN.', 'HOOK TESTING.'],
  },
]
// ════════════════════════════════════════════════════════════════════════

// Layout constants — tweak to resize the whole grid
const ROW_H          = 185                         // px — one grid row height
const COL_W          = 160                         // px — one grid column width
const CELL_G         = 5                           // px — gap between cells
const BLOCK_W        = COL_W * 4 + CELL_G * 3     // = 655px per bento block width
const BLOCK_H        = ROW_H * 3 + CELL_G * 2     // = 565px per bento block height
const BLOCKS_PER_SET = 4                           // unique blocks before repeating
// Precise loop distance: each block occupies (BLOCK_W + CELL_G) in the flex row
const LOOP_DIST      = BLOCKS_PER_SET * (BLOCK_W + CELL_G)

// ── HoverCard ─────────────────────────────────────────────────────────────
// Fixed overlay that appears when hovering any bento cell.
// Matches the reference: orange-tinted image top, dark info panel bottom.
function HoverCard({ data, anchorRect, visible }) {
  const cardRef = useRef(null)

  // Position: centred on the hovered cell, floating above the bento strip
  const style = (() => {
    if (!anchorRect) return { opacity: 0, pointerEvents: 'none' }
    const W = 280
    const H = 380
    // Centre card horizontally over anchor, clamp to viewport
    let left = anchorRect.left + anchorRect.width / 2 - W / 2
    left = Math.max(12, Math.min(left, window.innerWidth - W - 12))
    // Float the card above the cell; if not enough room, show below
    let top = anchorRect.top - H - 16
    if (top < 12) top = anchorRect.bottom + 16
    return { left, top, width: W, height: H }
  })()

  return (
    <div
      ref={cardRef}
      className="fixed z-9999 pointer-events-none rounded-2xl overflow-hidden"
      style={{
        ...style,
        transition: 'opacity 0.22s ease, transform 0.22s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.97)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
      }}
    >
      {/* Top — orange-tinted image */}
      <div className="relative" style={{ height: '55%', background: '#1a1a1a' }}>
        {data?.thumb && (
          <img
            src={data.thumb}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.85 }}
          />
        )}
        {/* Strong orange duotone overlay — matching the reference image */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(230,59,46,0.72) 0%, rgba(255,140,0,0.55) 60%, rgba(255,200,0,0.3) 100%)',
            mixBlendMode: 'multiply',
          }}
        />
        {/* Noise/grain texture feel */}
        <div
          className="absolute inset-0"
          style={{ background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 3px)', opacity: 0.6 }}
        />
      </div>

      {/* Bottom — dark info panel */}
      <div
        className="absolute bottom-0 left-0 right-0 flex flex-col justify-between p-4"
        style={{ height: '48%', background: '#111111' }}
      >
        {/* Title */}
        <div>
          <p
            className="font-mono font-bold uppercase leading-tight mb-2"
            style={{ fontSize: '11px', letterSpacing: '0.06em', color: '#ffffff' }}
          >
            {data?.title ?? '—'}
          </p>
          {/* Description */}
          <p
            className="font-mono uppercase leading-snug"
            style={{ fontSize: '8.5px', letterSpacing: '0.04em', color: 'rgba(255,255,255,0.45)' }}
          >
            {data?.desc ?? ''}
          </p>
        </div>

        {/* Tags — pill style matching the reference */}
        <div className="flex flex-col gap-1 mt-2">
          {(data?.tags ?? []).map((tag, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="font-mono" style={{ fontSize: '8px', color: 'rgba(255,255,255,0.4)' }}>{'>'}</span>
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: '8px',
                  letterSpacing: '0.08em',
                  color: '#ffffff',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  padding: '2px 7px',
                  borderRadius: '3px',
                }}
              >
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── MediaCell ────────────────────────────────────────────────────────────
// Handles video + image. Any aspect ratio auto-fills via object-cover.
function MediaCell({ item, className = '', onHover, onLeave }) {
  const cellRef  = useRef(null)
  const vidRef   = useRef(null)
  const thumbRef = useRef(null)

  const enter = (e) => {
    if (item?.type === 'video') {
      vidRef.current?.play().catch(() => {})
      gsap.to(thumbRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' })
    }
    gsap.to(cellRef.current, { scale: 1.03, duration: 0.3, ease: 'power2.out' })
    onHover?.(item, e.currentTarget.getBoundingClientRect())
  }
  const leave = () => {
    if (item?.type === 'video') {
      gsap.to(thumbRef.current, { opacity: 1, duration: 0.25, ease: 'power2.out' })
      if (vidRef.current) { vidRef.current.pause(); vidRef.current.currentTime = 0 }
    }
    gsap.to(cellRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' })
    onLeave?.()
  }

  if (!item) return <div className={`rounded-2xl bg-dark-surface ${className}`} />

  return (
    <div
      ref={cellRef}
      onMouseEnter={enter}
      onMouseLeave={leave}
      className={`relative overflow-hidden rounded-2xl will-change-transform cursor-target ${className}`}
    >
      <img
        ref={thumbRef}
        src={item.thumb ?? item.src}
        alt={item.title ?? ''}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {item.type === 'video' && (
        <video
          ref={vidRef}
          src={item.src}
          muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {/* vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)' }}
      />
      {item.title && (
        <p className="absolute bottom-2.5 left-3 pointer-events-none font-mono text-[9px] font-bold text-white/85 tracking-[0.2em] uppercase">
          {item.title}
        </p>
      )}
      <div
        className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full pointer-events-none"
        style={{ background: '#E63B2E' }}
      />
    </div>
  )
}

// ── BentoBlock ───────────────────────────────────────────────────────────
// One repeating bento panel — 4 cols × 3 rows, 4 media slots (m0–m3).
//
//  row 1: [m0: wide col1-2]  [red-stat col3]  [m1: tall col4 rows1-2]
//  row 2: [m2: square col1]  [graffiti col2]  [lime-stat col3] [m1 cont]
//  row 3: [dark-svc col1-2]                   [m3: wide col3-4]
//
function BentoBlock({ items, onHover, onLeave }) {
  const [m0, m1, m2, m3] = items

  // Decorative-cell hover data
  const statRedData   = { title: 'PROJECTS DELIVERED', thumb: null, desc: '50+ client projects shipped across brand, social, YouTube and ad formats worldwide.', tags: ['BRAND VIDEO.', 'SOCIAL CONTENT.', 'AD CREATIVE.'] }
  const graffitiData  = { title: 'ALWAYS CREATING.', thumb: null, desc: 'Constantly pushing output — ideas become reels, reels become brands, brands become movements.', tags: ['IDEATION.', 'RAPID OUTPUT.', 'CRAFT.'] }
  const limeStatData  = { title: '3M+ VIEWS', thumb: null, desc: 'Videos edited for this channel have collectively driven over 3 million organic views.', tags: ['ORGANIC REACH.', 'RETENTION.', 'GROWTH.'] }
  const servicesData  = { title: 'WHAT I DO', thumb: null, desc: 'Video editing, brand motion and social content — from raw footage to final-cut delivery.', tags: ['VIDEO.', 'BRAND.', 'MOTION.'] }

  const decorHover = (data, e) => onHover?.(data, e.currentTarget.getBoundingClientRect())

  return (
    <div
      className="grid shrink-0"
      style={{
        gap: `${CELL_G}px`,
        gridTemplateColumns: `repeat(4, ${COL_W}px)`,
        gridTemplateRows: `${ROW_H}px ${ROW_H}px ${ROW_H}px`,
        width: `${BLOCK_W}px`,
      }}
    >
      {/* m0 — wide landscape */}
      <MediaCell item={m0} className="col-span-2" onHover={onHover} onLeave={onLeave} />

      {/* red stat */}
      <div
        className="relative rounded-2xl flex flex-col justify-between p-5 overflow-hidden cursor-target"
        style={{ background: '#E63B2E' }}
        onMouseEnter={(e) => decorHover(statRedData, e)}
        onMouseLeave={onLeave}
      >
        <p className="font-mono text-[9px] tracking-widest uppercase text-black/55 font-bold">Projects</p>
        <div>
          <p className="font-akira leading-none text-white" style={{ fontSize: '50px', letterSpacing: '-0.03em' }}>
            50<span style={{ fontSize: '28px' }}>+</span>
          </p>
          <p className="font-mono text-[9px] uppercase tracking-widest text-black/55 font-bold mt-1">Delivered</p>
        </div>
        <span
          className="absolute bottom-3 right-4 font-decipher select-none pointer-events-none"
          style={{ fontSize: '44px', color: 'rgba(0,0,0,0.1)', transform: 'rotate(12deg)', display: 'block' }}
        >†</span>
      </div>

      {/* m1 — tall portrait (row-span-2) */}
      <MediaCell item={m1} className="row-span-2" onHover={onHover} onLeave={onLeave} />

      {/* m2 — small square */}
      <MediaCell item={m2} onHover={onHover} onLeave={onLeave} />

      {/* graffiti text tile */}
      <div
        className="relative rounded-2xl flex flex-col justify-end p-4 overflow-hidden cursor-target"
        style={{ background: '#D4C4A8' }}
        onMouseEnter={(e) => decorHover(graffitiData, e)}
        onMouseLeave={onLeave}
      >
        <span
          className="absolute top-2 right-3 font-another-tag select-none pointer-events-none"
          style={{ fontSize: '1.9rem', color: 'rgba(0,0,0,0.18)', transform: 'rotate(-8deg)' }}
        >aadi</span>
        <p className="font-mono text-[9px] tracking-widest uppercase mb-1" style={{ color: 'rgba(0,0,0,0.4)' }}>always</p>
        <p
          className="font-aerosoldier leading-[0.92]"
          style={{ fontSize: '2.2rem', color: '#1a0a00', WebkitTextStroke: '0.5px #1a0000', textShadow: '3px 3px 0 #5a0010' }}
        >creating.</p>
      </div>

      {/* lime stat */}
      <div
        className="relative rounded-2xl flex flex-col justify-between p-5 overflow-hidden cursor-target"
        style={{ background: '#C8FF00' }}
        onMouseEnter={(e) => decorHover(limeStatData, e)}
        onMouseLeave={onLeave}
      >
        <p className="font-mono text-[9px] tracking-widest uppercase text-black/55 font-bold">Reach</p>
        <div>
          <p className="font-akira leading-none text-black" style={{ fontSize: '50px', letterSpacing: '-0.03em' }}>
            3M<span style={{ fontSize: '28px' }}>+</span>
          </p>
          <p className="font-mono text-[9px] uppercase tracking-widest text-black/55 font-bold mt-1">Views</p>
        </div>
        <span
          className="absolute bottom-3 right-4 font-decipher select-none pointer-events-none"
          style={{ fontSize: '38px', color: 'rgba(0,0,0,0.12)' }}
        >★</span>
      </div>

      {/* dark services — col 1-2 */}
      <div
        className="col-span-2 relative rounded-2xl flex flex-col justify-between p-5 overflow-hidden cursor-target"
        style={{ background: '#1D2440' }}
        onMouseEnter={(e) => decorHover(servicesData, e)}
        onMouseLeave={onLeave}
      >
        <p className="font-mono text-[9px] tracking-widest uppercase font-bold" style={{ color: 'rgba(245,230,211,0.35)' }}>What I do</p>
        <p
          className="font-akira leading-[1.05]"
          style={{ fontSize: '1.75rem', color: '#F5E6D3', letterSpacing: '-0.02em' }}
        >VIDEO<br />BRAND<br />MOTION</p>
        <span
          className="absolute bottom-4 right-5 font-street-wars select-none pointer-events-none"
          style={{ fontSize: '56px', color: 'rgba(245,230,211,0.06)' }}
        >✦</span>
      </div>

      {/* m3 — wide landscape */}
      <MediaCell item={m3} className="col-span-2" onHover={onHover} onLeave={onLeave} />
    </div>
  )
}

// ── VaultGrid ─────────────────────────────────────────────────────────────
export default function VaultGrid() {
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)
  const tweenRef   = useRef(null)
  const isHovering = useRef(false)

  const [hoverData,   setHoverData]   = useState(null)
  const [hoverRect,   setHoverRect]   = useState(null)
  const [cardVisible, setCardVisible] = useState(false)

  const handleHover = useCallback((data, rect) => {
    setHoverData(data)
    setHoverRect(rect)
    setCardVisible(true)
  }, [])
  const handleLeave = useCallback(() => {
    setCardVisible(false)
  }, [])

  // Map MEDIA items into blocks of 4 slots each (cycling with modulo)
  const blocks = useMemo(() =>
    Array.from({ length: BLOCKS_PER_SET }, (_, bi) =>
      [0, 1, 2, 3].map(si => MEDIA[(bi * 4 + si) % MEDIA.length])
    ), [])

  const pauseScroll  = () => { if (!isHovering.current) { isHovering.current = true;  tweenRef.current?.pause()  } }
  const resumeScroll = () => {                             isHovering.current = false; tweenRef.current?.resume() }

  useGSAP(
    () => {
      // Scroll entrance
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'expo.out',
      })

      // Seamless infinite horizontal scroll:
      // Animate exactly LOOP_DIST px (= 4 blocks), then repeat.
      // Set B is identical to Set A, so the snap-back at repeat is invisible.
      tweenRef.current = gsap.to(trackRef.current, {
        x: -LOOP_DIST,
        duration: 28,
        ease: 'none',
        repeat: -1,
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="w-full bg-ink py-20 overflow-hidden">

      {/* Header */}
      <div className="px-6 md:px-14 flex items-end justify-between mb-6">
        <div>
          <p className="font-mono text-[10px] tracking-widest text-bone/40 uppercase mb-2">◆ &nbsp; THE VAULT</p>
          <h2 className="heading-brutal text-bone text-6xl leading-none">
            SELECTED<br /><span className="text-brutal-red">WORK</span>
          </h2>
        </div>
        <p className="font-mono text-[10px] tracking-wider text-bone/35 hidden md:block uppercase">
          hover to preview · auto-scrolling
        </p>
      </div>

      {/* Scrolling bento window — full width, clips horizontally */}
      <div
        className="overflow-hidden"
        style={{ height: `${BLOCK_H}px` }}
        onMouseEnter={pauseScroll}
        onMouseLeave={resumeScroll}
      >
        {/* trackRef: Set A + Set B side by side. GSAP scrolls left; Set B loops seamlessly */}
        <div ref={trackRef} className="flex flex-row h-full" style={{ gap: `${CELL_G}px` }}>
          {blocks.map((items, i) => <BentoBlock key={`a-${i}`} items={items} onHover={handleHover} onLeave={handleLeave} />)}
          {blocks.map((items, i) => <BentoBlock key={`b-${i}`} items={items} onHover={handleHover} onLeave={handleLeave} />)}
        </div>
      </div>

      {/* HoverCard — rendered at section level, floats fixed above cells */}
      <HoverCard data={hoverData} anchorRect={hoverRect} visible={cardVisible} />

      {/* CTA */}
      <div className="px-6 md:px-14 flex justify-center mt-12">
        <a href="#" className="group relative inline-block cursor-target">
          <span className="heading-brutal text-xl tracking-wider text-bone">VIEW ALL WORK</span>
          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brutal-red origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
        </a>
      </div>

    </section>
  )
}

