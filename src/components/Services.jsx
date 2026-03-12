import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useCursor } from '../contexts/CursorContext'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// ── Service data — swap videos/thumbs for real client work ───────────────
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

// ── Marquee keyword row ───────────────────────────────────────────────────
function MarqueeRow({ keywords, reverse = false, outlined = false, accent }) {
  // Duplicate text for seamless infinite loop (translate -50% = one copy width)
  const chunk = keywords.join('  ◆  ') + '  ◆  '
  const full  = chunk + chunk
  return (
    <div style={{ overflow: 'hidden', lineHeight: 1 }}>
      <div
        className="font-akira"
        style={{
          display: 'inline-block',
          whiteSpace: 'nowrap',
          animation: `${reverse ? 'svc-marquee-r' : 'svc-marquee-l'} 20s linear infinite`,
          willChange: 'transform',
          fontSize: 'clamp(2rem, 4.2vw, 3.6rem)',
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

// ── ServiceRow ────────────────────────────────────────────────────────────
function ServiceRow({ service, isActive, onEnter, onLeave }) {
  const rowRef   = useRef(null)
  const panelRef = useRef(null)
  const innerRef = useRef(null)
  const vidRef   = useRef(null)
  const { setServiceVideo } = useCursor()

  useEffect(() => {
    if (isActive) {
      const h = innerRef.current?.scrollHeight ?? 320
      gsap.to(panelRef.current, { height: h, duration: 0.58, ease: 'expo.out' })
      gsap.to(rowRef.current,   { backgroundColor: '#000000', duration: 0.32, ease: 'power2.out' })
      setServiceVideo(service.video)
      vidRef.current?.play().catch(() => {})
    } else {
      gsap.to(panelRef.current, { height: 0, duration: 0.42, ease: 'expo.in' })
      gsap.to(rowRef.current,   { backgroundColor: 'transparent', duration: 0.28, ease: 'power2.out' })
      setServiceVideo(null)
      if (vidRef.current) { vidRef.current.pause(); vidRef.current.currentTime = 0 }
    }
  }, [isActive]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={rowRef}
      className="relative overflow-hidden cursor-target"
      style={{
        borderBottom: '1px solid rgba(245,230,211,0.1)',
        borderRadius: isActive ? '20px' : '0px',
        margin: isActive ? '6px 24px' : '0',
        transition: 'border-radius 0.35s ease, margin 0.35s ease',
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* ── Always-visible header row ── */}
      <div className="flex items-center gap-5 px-8 md:px-12 pr-8 md:pr-14 py-7 select-none">

        {/* Graffiti number */}
        <span
          className="font-another-tag shrink-0"
          style={{
            fontSize: '2.4rem',
            lineHeight: 1,
            color: isActive ? service.accent : 'rgba(245,230,211,0.18)',
            transform: 'rotate(-3deg)',
            display: 'inline-block',
            transition: 'color 0.3s ease',
            minWidth: '3rem',
          }}
        >
          {service.id}
        </span>

        {/* Service name */}
        <span
          className="flex-1 font-akira leading-none"
          style={{
            fontSize: 'clamp(1.8rem, 4.5vw, 4rem)',
            color: '#F5E6D3',
            transition: 'color 0.3s ease',
            letterSpacing: '-0.02em',
          }}
        >
          {service.name}
        </span>

        {/* Tagline — hidden on small */}
        <span
          className="hidden md:block font-mono text-right leading-relaxed shrink-0"
          style={{
            fontSize: '11px',
            letterSpacing: '0.06em',
            maxWidth: '190px',
            color: 'rgba(245,230,211,0.35)',
            transition: 'color 0.3s ease',
            textTransform: 'uppercase',
          }}
        >
          {service.tagline}
        </span>

        {/* Arrow */}
        <span
          style={{
            fontSize: '1.5rem',
            color: isActive ? service.accent : 'rgba(245,230,211,0.2)',
            transition: 'color 0.3s ease, transform 0.35s ease',
            transform: isActive ? 'rotate(45deg)' : 'rotate(0deg)',
            display: 'inline-block',
            flexShrink: 0,
          }}
        >→</span>
      </div>

      {/* ── Expanding detail panel ── */}
      <div ref={panelRef} style={{ height: 0, overflow: 'hidden' }}>
        <div
          ref={innerRef}
          style={{ position: 'relative', height: '320px' }}
        >

          {/* Ghost service number behind marquees */}
          <span
            className="font-akira"
            style={{
              position: 'absolute',
              top: '50%',
              left: '4%',
              transform: 'translateY(-50%)',
              fontSize: '16rem',
              lineHeight: 1,
              color: 'rgba(255,255,255,0.025)',
              pointerEvents: 'none',
              userSelect: 'none',
              zIndex: 0,
            }}
          >{service.id}</span>

          {/* Marquee rows — fill left 68% */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: '32%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              overflow: 'hidden',
              zIndex: 1,
            }}
          >
            <MarqueeRow keywords={service.keywords[0]} accent={service.accent} />
            <MarqueeRow keywords={service.keywords[1]} accent={service.accent} reverse outlined />
            <MarqueeRow keywords={service.keywords[2]} accent={service.accent} />
          </div>

          {/* Left fade mask */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, bottom: 0,
            width: '80px',
            background: 'linear-gradient(to right, #000000 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }} />

          {/* Right fade mask (before image) */}
          <div style={{
            position: 'absolute',
            top: 0, bottom: 0,
            right: '32%',
            width: '60px',
            background: 'linear-gradient(to left, #000000 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }} />

          {/* Image strip — absolute on right, 30% wide with padding */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              bottom: '16px',
              width: 'calc(30% - 16px)',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 12px 40px rgba(0,0,0,0.7)',
              zIndex: 3,
            }}
          >
            <img
              src={service.thumb}
              alt={service.name}
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            {/* Accent color bottom bar */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              height: '3px',
              background: service.accent,
              opacity: 0.85,
            }} />
          </div>

          {/* hidden video for cursor context */}
          <video
            ref={vidRef}
            src={service.video}
            muted loop playsInline
            style={{ display: 'none' }}
          />

        </div>
      </div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────
export default function Services() {
  const sectionRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(null)

  useGSAP(
    () => {
      gsap.from('.svc-row', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 65,
        opacity: 0,
        duration: 0.9,
        stagger: 0.13,
        ease: 'expo.out',
      })
      gsap.from('.svc-left', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        x: -40,
        opacity: 0,
        duration: 1.0,
        ease: 'expo.out',
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="w-full bg-ink">

      {/* ── Header bar ── */}
      <div
        className="flex items-end justify-between px-8 md:px-14 pt-20 pb-6"
        style={{ borderBottom: '1px solid rgba(245,230,211,0.1)' }}
      >
        <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'rgba(245,230,211,0.4)' }}>
          ◆&nbsp;&nbsp;WHAT I DO
        </p>
        <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'rgba(245,230,211,0.4)' }}>
          03 SERVICES
        </p>
      </div>

      {/* ── Two-column layout ── */}
      <div className="flex flex-col md:flex-row">

        {/* ── Left: sticky graffiti tagline ── */}
        <div
          className="svc-left relative md:w-[40%] md:sticky md:top-20 md:self-start
                     px-8 md:px-14 pt-14 pb-10 md:pb-24"
        >
          {/* Mixed-font graffiti stack */}
          <div className="flex flex-col mb-8" style={{ gap: '3px' }}>
            <span
              className="font-street-wars"
              style={{
                fontSize: 'clamp(2.8rem, 4.8vw, 4.2rem)',
                color: '#ff0000',
                lineHeight: 0.95,
                transform: 'rotate(-1.5deg)',
                display: 'inline-block',
              }}
            >i know</span>

            <span
              className="font-akira"
              style={{
                fontSize: 'clamp(2rem, 3.6vw, 3.2rem)',
                color: '#F5E6D3',
                lineHeight: 1,
                WebkitTextStroke: '0.8px #F5E6D3',
              }}
            >what i&apos;m</span>

            <span
              className="font-akira"
              style={{
                fontSize: 'clamp(2.6rem, 4.2vw, 3.8rem)',
                color: '#F5E6D3',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
              }}
            >good at</span>

            <span
              className="font-decipher"
              style={{
                fontSize: 'clamp(1.8rem, 3.2vw, 3rem)',
                color: '#C8FF00',
                lineHeight: 1,
                transform: 'rotate(-2deg)',
                display: 'inline-block',
                marginTop: '6px',
              }}
            >~everything~</span>
          </div>

          {/* Sub-label + marker underline */}
          <div>
            <p
              className="font-mono uppercase"
              style={{ fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(245,230,211,0.3)' }}
            >
              03 crafts / limitless passion
            </p>
            <div
              style={{
                height: '2px',
                width: '56px',
                marginTop: '7px',
                background: '#E63B2E',
                borderRadius: '2px',
                transform: 'rotate(-1deg)',
              }}
            />
          </div>

          {/* Ghost graffiti decoration */}
          <p
            className="font-aerosoldier select-none pointer-events-none absolute hidden md:block"
            style={{
              bottom: '50px',
              left: '40px',
              fontSize: '5.5rem',
              color: 'rgba(200,255,0,0.04)',
              transform: 'rotate(-12deg)',
              lineHeight: 1,
            }}
          >aadi</p>
        </div>

        {/* ── Right: services accordion ── */}
        <div
          className="md:flex-1 pt-6 md:pt-0 pr-0"
          style={{ borderLeft: '1px solid rgba(245,230,211,0.1)' }}
        >
          {SERVICES.map((s, i) => (
            <div key={s.id} className="svc-row">
              <ServiceRow
                service={s}
                isActive={activeIdx === i}
                onEnter={() => setActiveIdx(i)}
                onLeave={() => setActiveIdx(null)}
              />
            </div>
          ))}
        </div>

      </div>

      {/* ── Footer CTA ── */}
      <div
        className="px-8 md:px-14 py-10 flex items-center gap-6"
        style={{ borderTop: '1px solid rgba(245,230,211,0.1)' }}
      >
        <div className="h-0.5 w-10 bg-brutal-red shrink-0" />
        <a
          href="mailto:contact@aaddi.com"
          className="font-mono text-[10px] tracking-widest text-bone/50 hover:text-bone uppercase transition-colors duration-300 cursor-target"
        >
          GET IN TOUCH →
        </a>
      </div>

    </section>
  )
}
