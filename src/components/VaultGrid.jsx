import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Shuffle from './Shuffle'
import PixelCard from './PixelCard'
import IDCard from './IDCard'
import setupImage2 from '../assets/setup2.jpg'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ================================================================
   ░░ CONFIG — CHANGE ALL SIZES HERE, NOWHERE ELSE ░░
   ================================================================
   Everything visual is controlled from here.
   Breakpoints: mobile < 768 | tablet 768–1023 | desktop 1024–1535 | wide 1536+
   ================================================================ */
const CONFIG = {

  /* ── Outer page padding (space around the card) ── */
  page: {
    paddingX: { mobile: '1rem', tablet: '2rem', desktop: '4rem', wide: '6rem' },
    paddingY: { mobile: '1.5rem', tablet: '2.5rem', desktop: '4rem', wide: '12rem' },
    gap: { mobile: '1.5rem', tablet: '2rem', desktop: '3rem', wide: '5rem' },
  },

  /* ── Card inner padding ── */
  card: {
    paddingX: { mobile: '1.25rem', tablet: '2rem', desktop: '1.5rem', wide: '2.5rem' },
    paddingY: { mobile: '1.5rem', tablet: '2.5rem', desktop: '2.5rem', wide: '4rem' },
    borderRadius: { mobile: 16, tablet: 28, desktop: 32, wide: 40 },
    gap: { mobile: '1.25rem', tablet: '2rem', desktop: '2.5rem', wide: '3.5rem' },
  },

  /* ── Title font size ── */
  title: {
    fontSize: { mobile: '1.7rem', tablet: '2.4rem', desktop: '3rem', wide: '4rem' },
  },

  /* ── Index number (big accent number, top-right corner) ── */
  indexNum: {
    fontSize: { mobile: '4rem', tablet: '6rem', desktop: '8rem', wide: '10rem' },
  },

  /* ── Tagline ── */
  tagline: {
    fontSize: { mobile: '0.82rem', tablet: '0.9rem', desktop: '1rem', wide: '1.1rem' },
  },

  /* ── Description typewriter ── */
  desc: {
    fontSize: { mobile: '0.82rem', tablet: '0.88rem', desktop: '0.92rem', wide: '1rem' },
    lineHeight: 1.75,
    speed: 16, // ms per char — lower = faster typing
  },

  /* ── Media height inside the card ── */
  media: {
    // On mobile, media is a horizontal strip. On tablet+, right side of card.
    height: {
      mobile: '200px',
      tablet: '100%',   // fills right column height
      desktop: '100%',
      wide: '100%',
    },
    borderRadius: 12,
  },

  /* ── Animated element scale per breakpoint ── */
  element: {
    scale: { mobile: 0.7, tablet: 0.85, desktop: 1, wide: 1.3 },
  },
}

/* ================================================================
   PROJECTS DATA
   desc: string OR string[] — joined into one typewriter string
   element: 'orbit' | 'timeline' | 'waveform' | 'floatingicons' | 'stats'
   ================================================================ */
const PROJECTS = [
  {
    id: 1,
    title: 'THE EDITOR',
    tagline: 'Cinematic Vision',
    desc: [
      "I'm Aadi, a Video Editor focused on turning raw footage into engaging, story-driven content. With 7+ years of experience, I care deeply about pacing, clarity, and creating edits that keep viewers watching."
    ],
    type: 'video',
    thumb: 'https://images.unsplash.com/photo-1536240478700-b869ad10fbe2?w=800&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4',
    accent: '#C8FF00',
    element: 'orbit',
  },
  {
    id: 2,
    title: 'THE SETUP',
    tagline: 'Social Excellence',
    desc: [
      'Powered by a a Ryzen 7 Series CPU, RTX 50 Series GPU and 32 Gigabytes of RAM, my workstation is capable of handling large projects, high-resolution footage, and fast turnaround times.',

    ],
    type: 'image',
    thumb: setupImage2,
    src: setupImage2,
    accent: '#FF6B6B',
    element: 'timeline',
  },
  {
    id: 3,
    title: 'TREASURE HUNTING',
    tagline: 'Long-Form Mastery',
    desc: [
      'I’m capable of scanning through long recordings to uncover the most engaging moments. The clips that capture attention, spark curiosity, and keep viewers watching. By identifying these “hidden gems”, I turn hours of raw footage into concise, compelling highlights.',

    ],
    type: 'video',
    thumb: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-laptop-on-a-wooden-table-23609-large.mp4',
    accent: '#FFD700',
    element: 'waveform',
  },
  {
    id: 4,
    title: 'NEVER LET GO',
    tagline: 'Full Brand Suite',
    desc: [
      'Every cut, subtitle, and pacing decision is made to maintain attention. I focus on storytelling, rhythm, and visual clarity so viewers stay engaged from start to finish.',

    ],
    type: 'video',
    thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-woman-working-with-a-laptop-at-a-coffee-shop-2518-large.mp4',
    accent: '#FF00FF',
    element: 'floatingicons',
  },
  {
    id: 5,
    title: 'FLOWSTATE',
    tagline: 'Consistent Excellence',
    desc: [
      'Efficient Process',
      'Clear Communication',
      'Structured Workflow',
    ],
    type: 'video',
    thumb: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-a-video-call-at-home-43832-large.mp4',
    accent: '#00D9FF',
    element: 'stats',
  },
]

/* ================================================================
   RESPONSIVE HOOK
   ================================================================ */
function useBreakpoint() {
  const get = () => {
    if (typeof window === 'undefined') return 'desktop'
    const w = window.innerWidth
    if (w < 768) return 'mobile'
    if (w < 1024) return 'tablet'
    if (w < 1536) return 'desktop'
    return 'wide'
  }
  const [bp, setBp] = useState(get)
  useEffect(() => {
    const fn = () => setBp(get())
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return bp
}

/* ================================================================
   TYPEWRITER
   ================================================================ */
function Typewriter({ text, bp, delay = 0 }) {
  const ref = useRef(null)
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const st = ScrollTrigger.create({
      trigger: ref.current, start: 'top 90%', once: true,
      onEnter: () => {
        if (delay > 0) {
          setTimeout(() => setStarted(true), delay)
        } else {
          setStarted(true)
        }
      },
    })
    return () => st.kill()
  }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0; setDisplayed(''); setDone(false)
    const iv = setInterval(() => {
      i++; setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(iv); setDone(true) }
    }, CONFIG.desc.speed)
    return () => clearInterval(iv)
  }, [started, text])

  return (
    <div ref={ref} className="font-mono flex items-start gap-3" style={{
      fontSize: CONFIG.desc.fontSize[bp],
      color: 'rgba(235,217,194,0.7)',
      lineHeight: CONFIG.desc.lineHeight,
      letterSpacing: '0.01em',
    }}>
      {/* Bullet - only if needed, logic handled in ProjectCard */}
      <span className="typewriter-content">
        {displayed}
        <span style={{
          display: 'inline-block', width: 2, height: '1em',
          background: 'rgba(235,217,194,0.5)', marginLeft: 3,
          verticalAlign: 'text-bottom',
          animation: done ? 'tw-blink 1.1s step-end infinite' : 'none',
          opacity: done ? undefined : 1,
        }} />
      </span>
      <style>{`@keyframes tw-blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </div>
  )
}

/* ================================================================
   ANIMATED ELEMENTS
   ================================================================ */
function OrbitElement() {
  const nodes = ['aadi2005', 'smooth af', 'one upload', 'crazier', 'results']
  const S = 290, R = 110, C = 145
  return (
    <div className="relative select-none" style={{ width: S, height: S }}>
      <div className="absolute font-lemon-milk uppercase text-center flex items-center justify-center"
        style={{ width: 80, height: 80, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.04)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em', lineHeight: 1.3, padding: '0 6px' }}>
        THE<br />PROCESS
      </div>
      <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${S} ${S}`} style={{ animation: 'orbit-spin 14s linear infinite' }}>
        <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="7 5" />
        <polygon points={`${C},${C - R} ${C + 6},${C - R + 13} ${C - 6},${C - R + 13}`} fill="rgba(255,255,255,0.3)" />
      </svg>
      {nodes.map((label, i) => {
        const a = (i / nodes.length) * 2 * Math.PI - Math.PI / 2
        return (
          <div key={i} className="absolute font-mono" style={{ left: C + R * Math.cos(a), top: C + R * Math.sin(a), transform: 'translate(-50%,-50%)', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 20, padding: '4px 10px', fontSize: 10, color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap', letterSpacing: '0.04em' }}>{label}</div>
        )
      })}
      <style>{`@keyframes orbit-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

function TimelineElement() {
  const steps = ['BRIEF', 'CONCEPT', 'EDIT', 'DELIVER']
  return (
    <div className="flex flex-col gap-4" style={{ width: 360 }}>
      <p className="font-lemon-milk uppercase tracking-widest" style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>Project Flow</p>
      <div className="flex items-center">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: i === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: i === 0 ? '#000' : 'rgba(255,255,255,0.45)', fontFamily: 'monospace' }}>{String(i + 1).padStart(2, '0')}</div>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', fontFamily: 'var(--font-lemon-milk)' }}>{s}</span>
            </div>
            {i < steps.length - 1 && <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.12)', margin: '0 5px', marginBottom: 22 }} />}
          </div>
        ))}
      </div>
    </div>
  )
}

function WaveformElement() {
  const bars = Array.from({ length: 40 })
  return (
    <div style={{ width: 340 }}>
      <p className="font-lemon-milk uppercase tracking-widest mb-3" style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>Audio Sync</p>
      <div className="flex items-end gap-[3px]" style={{ height: 80 }}>
        {bars.map((_, i) => (
          <div key={i} style={{ flex: 1, height: `${24 + Math.sin(i * 0.7) * 20 + Math.cos(i * 0.4) * 12}px`, background: `rgba(255,255,255,${0.2 + Math.sin(i * 0.5) * 0.15})`, borderRadius: 2, animation: `wave-bar ${0.6 + (i % 5) * 0.14}s ease-in-out infinite alternate`, animationDelay: `${i * 0.04}s` }} />
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3">
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.7)', boxShadow: '0 0 10px rgba(255,255,255,0.5)' }} />
        <span className="font-mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>AUDIO SYNC ACTIVE</span>
      </div>
      <style>{`@keyframes wave-bar{from{transform:scaleY(0.35)}to{transform:scaleY(1)}}`}</style>
    </div>
  )
}

function FloatingIconsElement() {
  const platforms = [
    { label: 'YT', delay: '0s', x: 10, y: 0 },
    { label: 'IG', delay: '0.35s', x: 110, y: 12 },
    { label: 'TK', delay: '0.7s', x: 210, y: 0 },
    { label: 'TW', delay: '0.4s', x: 58, y: 72 },
    { label: 'LI', delay: '0.9s', x: 158, y: 65 },
  ]
  return (
    <div className="relative" style={{ width: 310, height: 140 }}>
      <p className="font-lemon-milk uppercase tracking-widest" style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', position: 'absolute', top: 0 }}>Multi-Platform</p>
      {platforms.map((p, i) => (
        <div key={i} className="absolute font-akira font-black flex items-center justify-center"
          style={{ left: p.x, top: p.y + 24, width: 58, height: 58, borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.6)', fontSize: 14, animation: 'float-icon 3s ease-in-out infinite alternate', animationDelay: p.delay }}>{p.label}</div>
      ))}
      <style>{`@keyframes float-icon{from{transform:translateY(0)}to{transform:translateY(-9px)}}`}</style>
    </div>
  )
}

function StatsElement() {
  const metrics = [{ value: '4.2M', label: 'Views' }, { value: '94%', label: 'Retention' }, { value: '52+', label: 'Episodes' }]
  return (
    <div className="flex gap-10">
      {metrics.map((m, i) => (
        <div key={i} className="flex flex-col gap-2">
          <span className="font-akira font-black" style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: 'rgba(255,255,255,0.9)', lineHeight: 1 }}>{m.value}</span>
          <span className="font-lemon-milk uppercase tracking-widest" style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', lineHeight: 1.3 }}>{m.label}</span>
        </div>
      ))}
    </div>
  )
}

function ProjectElement({ type }) {
  switch (type) {
    case 'orbit': return <OrbitElement />
    case 'timeline': return <TimelineElement />
    case 'waveform': return <WaveformElement />
    case 'floatingicons': return <FloatingIconsElement />
    case 'stats': return <StatsElement />
    default: return null
  }
}

/* ================================================================
   PROJECT CARD
   ─────────────────────────────────────────────────────────────────
   The card IS the sticky element — rounded dark tile with padding.
   Everything (title, desc, image, animation) lives INSIDE the card.

   MOBILE layout (single col inside card):
     Title row (index top-right) → Media → Desc → Animation

   TABLET+ layout (two col inside card):
     LEFT: title + desc + animation
     RIGHT: media (fills card height)
   ================================================================ */
function ProjectCard({ project, index, total }) {
  const cardRef = useRef(null)
  const bp = useBreakpoint()
  const isMobile = bp === 'mobile'

  /* ── Project Description Rendering ── */
  const renderDescription = () => {
    if (Array.isArray(project.desc)) {
      return (
        <div className="flex flex-col gap-3">
          {project.desc.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.accent, opacity: 0.6 }} />
              <Typewriter text={item} bp={bp} delay={i * 800} />
            </div>
          ))}
        </div>
      )
    }
    return <Typewriter text={project.desc} bp={bp} />
  }

  const px = CONFIG.card.paddingX[bp]
  const py = CONFIG.card.paddingY[bp]
  const br = CONFIG.card.borderRadius[bp]
  const gap = CONFIG.card.gap[bp]

  useGSAP(() => {
    gsap.from(cardRef.current.querySelectorAll('.ca'), {
      y: 18, opacity: 0, duration: 0.55, stagger: 0.07, ease: 'power3.out',
      scrollTrigger: { trigger: cardRef.current, start: 'top 82%', toggleActions: 'play none none none' },
    })
  }, { scope: cardRef })

  return (
    /*
      Sticky wrapper — this is what does the stacking.
      It has no visual styling — just a transparent scroll container.
    */
    <div style={{ position: 'sticky', top: 0, zIndex: index + 10 }}>

      {/* ── Page-level padding around the card ── */}
      <div style={{
        padding: `${CONFIG.page.paddingY[bp]} ${CONFIG.page.paddingX[bp]}`,
        // First card has no top padding (sits right below intro)
        paddingTop: index === 0 ? CONFIG.page.paddingY[bp] : 0,
      }}>

        {/* ══════════════════════════════════
            THE CARD — dark rounded tile
            This is the sorateq-style card.
            Everything lives inside here.
            ══════════════════════════════════ */}
        <div
          ref={cardRef}
          className="relative"
          style={{
            background: 'linear-gradient(150deg, #0e0e0e 0%, #121212 100%)',
            borderRadius: br,
            // Stacking shadow — makes each card lift above the previous
            boxShadow: index > 0
              ? '0 -8px 32px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)'
              : '0 0 0 1px rgba(255,255,255,0.06)',
          }}
        >
          {/* Subtle accent glow top-right */}
          <div className="absolute pointer-events-none" style={{
            top: 0, right: 0,
            width: 'clamp(120px,25vw,320px)', height: 'clamp(120px,25vw,320px)',
            background: `radial-gradient(circle at top right,${project.accent}0c 0%,transparent 65%)`,
            filter: 'blur(40px)',
          }} />

          {/* ════════════════════════
              MOBILE — single column
              ════════════════════════ */}
          {isMobile && (
            <div style={{ padding: `${py} ${px}`, display: 'flex', flexDirection: 'column', gap }}>

              {/* Title row: index number floats top-right */}
              <div className="ca relative flex flex-col gap-1.5">
                {/* Index — absolutely positioned top-right of this row */}
                <div className="absolute top-0 right-0 font-akira font-black leading-none cursor-target" style={{
                  fontSize: CONFIG.indexNum.fontSize[bp],
                  color: project.accent,
                  lineHeight: 0.85,
                  textShadow: `0 0 30px ${project.accent}50`,
                }}>
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Tagline */}
                <span className="font-decipher cursor-target" style={{ fontSize: CONFIG.tagline.fontSize[bp], color: `${project.accent}90`, transform: 'rotate(-1.5deg)', display: 'inline-block' }}>
                  {project.tagline}
                </span>

                {/* Title */}
                <Shuffle text={project.title} tag="h2"
                  shuffleDirection="right" duration={0.4} animationMode="evenodd"
                  shuffleTimes={1} ease="power3.out" stagger={0.025}
                  threshold={0.1} triggerOnce triggerOnHover respectReducedMotion loop={false}
                  className="font-magazine text-bone tracking-tight cursor-target"
                  style={{ fontSize: CONFIG.title.fontSize[bp], lineHeight: 1.05, letterSpacing: '-0.01em', display: 'block', textAlign: 'left', paddingRight: '3.5rem' }}
                />

                {/* Rule */}
                <div style={{ width: 36, height: 1.5, background: `linear-gradient(90deg,${project.accent},transparent)`, borderRadius: 2 }} />
              </div>

              <div className="ca relative cursor-target" style={{
                height: index === 0 ? 'auto' : CONFIG.media.height[bp],
                minHeight: index === 0 ? '220px' : 'auto',
                borderRadius: CONFIG.media.borderRadius,
              }}>
                {index === 0 ? (
                  <div className="relative w-full h-full" style={{ borderRadius: CONFIG.media.borderRadius, border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <IDCard isInline />
                    </div>
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,transparent 60%,rgba(0,0,0,0.4))' }} />
                    <div className="absolute top-2.5 right-2.5 font-mono font-bold px-2 py-0.5 rounded-full" style={{ fontSize: '0.55rem', background: 'rgba(0,0,0,0.7)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', letterSpacing: '0.1em' }}>
                      {String(index + 1).padStart(2, '0')} / {total}
                    </div>
                    <div className="absolute bottom-2.5 left-3 font-decipher pointer-events-none" style={{ fontSize: '0.78rem', color: `${project.accent}75`, transform: 'rotate(-1.5deg)' }}>
                      ~{project.tagline.toLowerCase()}~
                    </div>
                  </div>
                ) : (
                  <PixelCard
                    className="w-full h-full"
                    colors={`${project.accent},#ffffff,${project.accent}80`}
                    gap={6}
                    speed={30}
                  >
                    <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: CONFIG.media.borderRadius, border: '1px solid rgba(255,255,255,0.07)' }}>
                      {project.type === 'video' ? (
                        <video src={project.src} poster={project.thumb} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <img src={project.src} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                      )}
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,transparent 60%,rgba(0,0,0,0.4))' }} />
                      <div className="absolute top-2.5 right-2.5 font-mono font-bold px-2 py-0.5 rounded-full" style={{ fontSize: '0.55rem', background: 'rgba(0,0,0,0.7)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', letterSpacing: '0.1em' }}>
                        {String(index + 1).padStart(2, '0')} / {total}
                      </div>
                      <div className="absolute bottom-2.5 left-3 font-decipher pointer-events-none" style={{ fontSize: '0.78rem', color: `${project.accent}75`, transform: 'rotate(-1.5deg)' }}>
                        ~{project.tagline.toLowerCase()}~
                      </div>
                    </div>
                  </PixelCard>
                )}
                {/* Overlay Index Number */}
                <div className="absolute font-akira font-black pointer-events-none select-none cursor-target" style={{
                  top: '-10%', right: '-4%',
                  fontSize: CONFIG.indexNum.fontSize[bp],
                  color: project.accent,
                  lineHeight: 0.85,
                  textShadow: `0 0 50px ${project.accent}80`,
                  opacity: 1,
                  zIndex: 100
                }}>
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Description */}
              <div className="ca">
                {renderDescription()}
              </div>

              {/* Animated element */}
              <div className="ca overflow-x-auto" style={{
                transform: `scale(${CONFIG.element.scale[bp]})`,
                transformOrigin: 'left center',
                paddingBottom: '0.5rem',
              }}>
                <ProjectElement type={project.element} />
              </div>

            </div>
          )}

          {/* ════════════════════════════
              TABLET+ — two columns
              LEFT: content | RIGHT: media
              ════════════════════════════ */}
          {!isMobile && (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)', minHeight: 'clamp(450px, 45vw, 850px)' }}>

              {/* LEFT: title + desc + element */}
              <div style={{
                padding: `${py} ${px}`,
                display: 'flex', flexDirection: 'column', gap,
                borderRight: '1px solid rgba(255,255,255,0.05)',
              }}>

                {/* Title row */}
                <div className="ca flex flex-col gap-2">
                  <span className="font-aerosoldier cursor-target" style={{ fontSize: CONFIG.tagline.fontSize[bp], color: `${project.accent}90`, transform: 'rotate(-1.5deg)', display: 'inline-block' }}>
                    {project.tagline}
                  </span>
                  <Shuffle text={project.title} tag="h2"
                    shuffleDirection="right" duration={0.4} animationMode="evenodd"
                    shuffleTimes={1} ease="power3.out" stagger={0.025}
                    threshold={0.1} triggerOnce triggerOnHover respectReducedMotion loop={false}
                    className="font-akira text-bone tracking-tight cursor-target"
                    style={{ fontSize: CONFIG.title.fontSize[bp], lineHeight: 1.02, letterSpacing: '-0.01em', display: 'block', textAlign: 'left' }}
                  />
                  <div style={{ width: 'clamp(36px,4vw,52px)', height: 1.5, background: `linear-gradient(90deg,${project.accent},transparent)`, borderRadius: 2 }} />
                </div>

                {/* Description */}
                <div className="ca">
                  {renderDescription()}
                </div>

                {/* Animated element — pushes to bottom */}
                <div className="ca mt-auto overflow-hidden" style={{
                  transform: `scale(${CONFIG.element.scale[bp]})`,
                  transformOrigin: 'left bottom',
                }}>
                  <ProjectElement type={project.element} />
                </div>

              </div>

              {/* RIGHT: media — fills full card height */}
              <div style={{ padding: `${py} ${px} ${py} 0`, display: 'flex', alignItems: 'stretch' }}>
                <div className="ca relative w-full cursor-target" style={{
                  borderRadius: CONFIG.media.borderRadius,
                  minHeight: 'clamp(320px, 35vw, 750px)',
                }}>
                  {index === 0 ? (
                    <div className="relative w-full h-full" style={{ borderRadius: CONFIG.media.borderRadius, border: '1px solid rgba(255,255,255,0.07)' }}>
                      <div className="w-full h-full flex items-center justify-center">
                        <IDCard isInline />
                      </div>
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,transparent 55%,rgba(0,0,0,0.5))' }} />
                      <div className="absolute top-3 left-3 font-mono font-bold px-2 py-0.5 rounded-full" style={{ fontSize: '0.6rem', background: 'rgba(0,0,0,0.65)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', letterSpacing: '0.1em' }}>
                        {String(index + 1).padStart(2, '0')} / {total}
                      </div>
                      <div className="absolute bottom-3 left-4 font-decipher pointer-events-none" style={{ fontSize: 'clamp(0.78rem,1.1vw,0.92rem)', color: `${project.accent}80`, transform: 'rotate(-1.5deg)' }}>
                        ~{project.tagline.toLowerCase()}~
                      </div>
                    </div>
                  ) : (
                    <PixelCard
                      className="w-full h-full"
                      colors={`${project.accent},#ffffff,${project.accent}80`}
                      gap={6}
                      speed={30}
                    >
                      <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: CONFIG.media.borderRadius, border: '1px solid rgba(255,255,255,0.07)' }}>
                        {project.type === 'video' ? (
                          <video src={project.src} poster={project.thumb} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
                        ) : (
                          <img src={project.src} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                        )}
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,transparent 55%,rgba(0,0,0,0.5))' }} />
                        <div className="absolute top-3 left-3 font-mono font-bold px-2 py-0.5 rounded-full" style={{ fontSize: '0.6rem', background: 'rgba(0,0,0,0.65)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', letterSpacing: '0.1em' }}>
                          {String(index + 1).padStart(2, '0')} / {total}
                        </div>
                        <div className="absolute bottom-3 left-4 font-decipher pointer-events-none" style={{ fontSize: 'clamp(0.78rem,1.1vw,0.92rem)', color: `${project.accent}80`, transform: 'rotate(-1.5deg)' }}>
                          ~{project.tagline.toLowerCase()}~
                        </div>
                      </div>
                    </PixelCard>
                  )}
                  {/* Overlay Index Number */}
                  <div className="absolute font-mono font-black pointer-events-none select-none cursor-target" style={{
                    top: '-12%', right: '-6%',
                    fontSize: CONFIG.indexNum.fontSize[bp],
                    color: project.accent,
                    lineHeight: 0.85,
                    textShadow: `0 0 70px ${project.accent}90`,
                    opacity: 1,
                    zIndex: 100
                  }}>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
              </div>
          </div>
          )}

        </div>
        {/* end card */}
      </div>
      {/* end page padding */}

    </div>
  )
}

/* ================================================================
   VAULT GRID — main export
   ================================================================ */
export default function VaultGrid() {
  const introRef = useRef(null)
  const bp = useBreakpoint()

  useGSAP(() => {
    gsap.from('.vi', { y: 22, opacity: 0, duration: 0.7, stagger: 0.09, ease: 'power3.out' })
  }, { scope: introRef })

  return (
    <div id="vault-section" className="relative bg-ink">

      {/* ── INTRO ── */}
      <section ref={introRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: 'absolute', top: '15%', right: '8%', width: 'clamp(200px,35vw,420px)', height: 'clamp(200px,35vw,420px)', background: 'radial-gradient(circle,rgba(200,255,0,0.055) 0%,transparent 70%)', filter: 'blur(80px)' }} />
        </div>
        <div className="absolute font-akira font-black pointer-events-none select-none cursor-target" style={{ fontSize: 'clamp(7rem,22vw,18rem)', color: 'rgba(255,255,255,0.022)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', lineHeight: 1, letterSpacing: '-0.04em', whiteSpace: 'nowrap' }}>VAULT</div>

        <div className="relative z-10 text-center max-w-3xl w-full flex flex-col items-center gap-4">
          <p className="vi font-decipher inline-block cursor-target" style={{ fontSize: 'clamp(0.9rem,2vw,1.1rem)', color: '#C8FF00', transform: 'rotate(-1.5deg)', textShadow: '0 0 18px rgba(200,255,0,0.35)' }}>
            ~The best work I&apos;ve crafted~
          </p>
          <div className="vi">
            <Shuffle text="THE VAULT" tag="h1" shuffleDirection="right" duration={0.45} animationMode="evenodd" shuffleTimes={1} ease="expo.out" stagger={0.03} threshold={0.05} triggerOnce triggerOnHover respectReducedMotion loop={false}
              className="font-akira text-bone cursor-target"
              style={{ fontSize: 'clamp(3.5rem,10vw,8rem)', lineHeight: 1, letterSpacing: '-0.02em', display: 'block', textAlign: 'center' }}
            />
          </div>
          {/* <div className="vi flex items-center gap-4">
            <div style={{ width: 44, height: 1, background: 'linear-gradient(90deg,transparent,rgba(200,255,0,0.5))' }} />
            <span className="font-lemon-milk uppercase tracking-widest text-bone/35" style={{ fontSize: 'clamp(0.52rem,1vw,0.65rem)' }}>{PROJECTS.length} projects · scroll to explore</span>
            <div style={{ width: 44, height: 1, background: 'linear-gradient(90deg,rgba(200,255,0,0.5),transparent)' }} />
          </div> */}
          {/* <div className="vi flex flex-col gap-2 w-full max-w-xs">
            {PROJECTS.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 font-lemon-milk uppercase tracking-widest" style={{ fontSize: 'clamp(0.52rem,0.9vw,0.62rem)' }}>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>{String(i + 1).padStart(2, '0')}</span>
                <div className="flex-1" style={{ height: 1, background: `linear-gradient(90deg,transparent,${p.accent}30,transparent)` }} />
                <span style={{ color: `${p.accent}65` }}>{p.title}</span>
              </div>
            ))}
          </div> */}
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
          <span className="font-mono uppercase tracking-widest" style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.2)' }}>scroll</span>
          <div className="animate-bounce">
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" style={{ color: 'rgba(255,255,255,0.2)' }} strokeWidth="1.5"><path d="M10 4v10M6 12l4 4 4-4" /></svg>
          </div>
        </div>
      </section>

      {/* ── STACKING CARDS ── */}
      <div style={{ paddingBottom: CONFIG.page.paddingY[bp] }}>
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} total={PROJECTS.length} />
        ))}
      </div>

    </div>
  )
}

