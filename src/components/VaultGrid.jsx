import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Shuffle from './Shuffle'
import IDCard from './IDCard'
import setupImage2 from '../assets/setup2.jpg'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ================================================================
   CONFIG
   ================================================================ */
const CONFIG = {
  page: {
    paddingX: { mobile: '1rem', tablet: '2rem', desktop: '4rem', wide: '6rem' },
    paddingY: { mobile: '1.5rem', tablet: '2.5rem', desktop: '4rem', wide: '12rem' },
    gap: { mobile: '1.5rem', tablet: '2rem', desktop: '3rem', wide: '5rem' },
  },
  card: {
    paddingX: { mobile: '1.25rem', tablet: '2rem', desktop: '1.5rem', wide: '2.5rem' },
    paddingY: { mobile: '1.5rem', tablet: '2.5rem', desktop: '2.5rem', wide: '4rem' },
    borderRadius: { mobile: 16, tablet: 28, desktop: 32, wide: 40 },
    gap: { mobile: '1.25rem', tablet: '2rem', desktop: '2.5rem', wide: '3.5rem' },
  },
  title: {
    fontSize: { mobile: '1.7rem', tablet: '2.4rem', desktop: '3rem', wide: '4rem' },
  },
  indexNum: {
    fontSize: { mobile: '4rem', tablet: '6rem', desktop: '8rem', wide: '10rem' },
  },
  tagline: {
    fontSize: { mobile: '0.82rem', tablet: '0.9rem', desktop: '1rem', wide: '1.1rem' },
  },
  desc: {
    fontSize: { mobile: '0.82rem', tablet: '0.88rem', desktop: '0.92rem', wide: '1rem' },
    lineHeight: 1.75,
    speed: 16,
  },
  media: {
    height: { mobile: '200px', tablet: '100%', desktop: '100%', wide: '100%' },
    borderRadius: 12,
  },
  element: {
    scale: { mobile: 0.7, tablet: 0.85, desktop: 1, wide: 1.3 },
  },
}

/* ================================================================
   PROJECTS DATA
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
    element: 'none',
  },
  {
    id: 2,
    title: 'THE SETUP',
    tagline: 'Social Excellence',
    desc: [
      'Powered by a Ryzen 7 Series CPU, RTX 50 Series GPU and 32 Gigabytes of RAM, my workstation is capable of handling large projects, high-resolution footage, and fast turnaround times.',
    ],
    type: 'image',
    thumb: setupImage2,
    src: setupImage2,
    accent: '#FF6B6B',
    element: 'techlogos',
  },
  {
    id: 3,
    title: 'TREASURE HUNTING',
    tagline: 'Long-Form Mastery',
    desc: [
      "I'm capable of scanning through long recordings to uncover the most engaging moments. The clips that capture attention, spark curiosity, and keep viewers watching. By identifying these \"hidden gems\", I turn hours of raw footage into concise, compelling highlights.",
    ],
    type: 'video',
    thumb: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-laptop-on-a-wooden-table-23609-large.mp4',
    accent: '#FFD700',
    element: 'waveform',
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
    element: 'projectflow',
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
        if (delay > 0) setTimeout(() => setStarted(true), delay)
        else setStarted(true)
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

/* ── OrbitElement (small, used in element slot) ── */
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

/* ══════════════════════════════════════════════════════════════
   LargeOrbitElement — full circle ring, 5 static oval labels,
   3 red triangle arrows travel around the circle continuously
   Labels are outside the ring, connected by short lines
   The ring does NOT connect to the center circle
   ══════════════════════════════════════════════════════════════ */
function LargeOrbitElement({ accent = '#00D9FF' }) {
  const S = 560      // viewBox square
  const C = 280      // center
  const R = 185      // orbit ring radius — labels sit ON this ring
  const LABEL_R = 230 // label centers pushed further out from ring

  const nodes = [
    { label: 'YOU SEND',   sub: 'footage',  angle: -90  },
    { label: 'I EDIT',     sub: 'the cut',  angle: -10  },
    { label: 'I DELIVER',  sub: 'on time',  angle: 70   },
    { label: 'YOU UPLOAD', sub: 'it live',  angle: 160  },
    { label: 'YOU GET',    sub: 'results',  angle: -170 },
  ]

  // Full circle path for animateMotion arrows (clockwise)
  // SVG arc: two half-circles to form full circle
  const circlePath = `M ${C} ${C - R} A ${R} ${R} 0 1 1 ${C - 0.01} ${C - R} Z`

  // Arrow stagger: 3 arrows evenly spaced (120° apart = 0, 1/3, 2/3 of duration)
  const arrowDur = 5  // seconds per full revolution
  const arrows = [0, 1/3, 2/3]

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(circle at 50% 50%, ${accent}0d 0%, transparent 65%)`,
        pointerEvents: 'none',
      }}/>

      <svg
        viewBox={`0 0 ${S} ${S}`}
        style={{ width: 'clamp(300px,46vw,520px)', height: 'clamp(300px,46vw,520px)', overflow: 'visible' }}
      >
        <defs>
          {/* The circle path used by animateMotion */}
          <path id="orbit-circle" d={circlePath} />
        </defs>

        {/* ── Center circle — standalone, NOT connected to orbit ring ── */}
        {/* Outer glow ring */}
        <circle cx={C} cy={C} r={75} fill="none" stroke={`${accent}14`} strokeWidth="26"/>
        {/* Circle border */}
        <circle cx={C} cy={C} r={75}
          fill="rgba(4,4,10,0.95)"
          stroke={`${accent}40`}
          strokeWidth="1.5"
        />
        <text x={C} y={C - 8} textAnchor="middle"
          fontFamily="'Moon Get','Helvetica Neue',sans-serif"
          fontSize="17" fontWeight="900" letterSpacing="1"
          fill="rgba(245,230,211,0.92)"
        >SMOOTH</text>
        <text x={C} y={C + 14} textAnchor="middle"
          fontFamily="'Moon Get','Helvetica Neue',sans-serif"
          fontSize="17" fontWeight="900" letterSpacing="1"
          fill={accent}
        >AF</text>

        {/* ── Full orbit ring (circle, does NOT touch center) ── */}
        <circle cx={C} cy={C} r={R}
          fill="none"
          stroke={`${accent}28`}
          strokeWidth="1.5"
        />

        {/* ── Short connector lines: from ring edge to oval label ── */}
        {nodes.map((node, i) => {
          const a = (node.angle * Math.PI) / 180
          // Ring edge point
          const rx = C + R * Math.cos(a)
          const ry = C + R * Math.sin(a)
          // Label center
          const lx = C + LABEL_R * Math.cos(a)
          const ly = C + LABEL_R * Math.sin(a)
          return (
            <line key={`line-${i}`}
              x1={rx} y1={ry} x2={lx} y2={ly}
              stroke={`${accent}35`} strokeWidth="1"
            />
          )
        })}

        {/* ── Static oval pill labels ── */}
        {nodes.map((node, i) => {
          const a = (node.angle * Math.PI) / 180
          const lx = C + LABEL_R * Math.cos(a)
          const ly = C + LABEL_R * Math.sin(a)
          const W = 116, H = 44
          return (
            <g key={`node-${i}`}>
              {/* Oval glow */}
              <rect x={lx - W/2} y={ly - H/2} width={W} height={H} rx={H/2}
                fill="none" stroke={`${accent}18`} strokeWidth="14"/>
              {/* Oval background */}
              <rect x={lx - W/2} y={ly - H/2} width={W} height={H} rx={H/2}
                fill="rgba(4,4,12,0.92)" stroke={`${accent}55`} strokeWidth="1.5"/>
              {/* Main label */}
              <text x={lx} y={ly - 4} textAnchor="middle"
                fontFamily="'Lemon Milk',monospace"
                fontSize="11" fontWeight="700" letterSpacing="0.5"
                fill="rgba(245,230,211,0.92)"
              >{node.label}</text>
              {/* Sub */}
              <text x={lx} y={ly + 10} textAnchor="middle"
                fontFamily="monospace" fontSize="9" letterSpacing="0.3"
                fill={`${accent}bb`}
              >{node.sub}</text>
            </g>
          )
        })}

        {/* ── 3 RED TRIANGLE ARROWS travelling the full circle ── */}
        {arrows.map((offset, i) => (
          <g key={`arrow-${i}`}>
            <animateMotion
              dur={`${arrowDur}s`}
              repeatCount="indefinite"
              begin={`${-offset * arrowDur}s`}
              rotate="auto"
              calcMode="linear"
            >
              <mpath href="#orbit-circle"/>
            </animateMotion>
            {/* Triangle pointing in direction of travel */}
            <polygon
              points="-6,-5 8,0 -6,5"
              fill="#E63B2E"
              opacity="0.92"
              style={{ filter: 'drop-shadow(0 0 5px #E63B2E88)' }}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}


/* ── Tech Logos ── */
function TechLogosElement() {
  return (
    <div className="flex flex-col gap-4" style={{ width: 360 }}>
      <p className="font-lemon-milk uppercase tracking-widest" style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>
        Powered By
      </p>
      <div className="flex flex-col gap-3">
        {/* AMD */}
        <div className="flex items-center gap-3" style={{ padding: '10px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <svg width="40" height="24" viewBox="0 0 120 60" fill="none"><path d="M28.5 4L4 56h14.5l4.8-11h21.4l4.8 11H64L39.5 4H28.5zm-1.2 30l6.7-15.5L40.7 34H27.3z" fill="#ED1C24"/><path d="M68 4v52h14V24l16 32h10l16-32v32h14V4h-19L104 34 88.5 4H68z" fill="#ED1C24"/></svg>
          <div className="flex flex-col">
            <span className="font-lemon-milk uppercase" style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.08em', fontWeight: 700 }}>Ryzen™ 7 Series</span>
            <span className="font-mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>CPU · 8-Core Processor</span>
          </div>
          <div className="ml-auto" style={{ fontSize: 9, fontFamily: 'monospace', color: '#ED1C24', letterSpacing: '0.1em', background: 'rgba(237,28,36,0.08)', padding: '3px 8px', borderRadius: 4, border: '1px solid rgba(237,28,36,0.2)' }}>ACTIVE</div>
        </div>
        {/* NVIDIA */}
        <div className="flex items-center gap-3" style={{ padding: '10px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <svg width="36" height="28" viewBox="0 0 90 70" fill="none"><path d="M38 14v-4C26 11 16 20 16 33c0 5 2 10 5 14L38 14z" fill="#76B900"/><path d="M38 10V6C20 7 6 20 6 37c0 9 4 18 11 24l6-6c-5-5-9-12-9-18 0-14 11-25 24-27z" fill="#76B900"/><path d="M38 43V18L22 47c4 5 10 8 16 9v-4c-4-1-8-4-10-8l10-1z" fill="#76B900"/><path d="M44 14v4c12 2 22 12 22 25 0 6-2 12-6 17l6 5c5-6 8-14 8-22 0-17-13-29-30-29z" fill="#76B900"/><path d="M44 47v5c7-1 13-5 17-10l-6-5c-3 5-7 9-11 10z" fill="#76B900"/><path d="M44 18v25l10 1c-2 4-6 7-10 8v4c6-1 12-4 16-9L44 18z" fill="#76B900"/></svg>
          <div className="flex flex-col">
            <span className="font-lemon-milk uppercase" style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.08em', fontWeight: 700 }}>RTX 50 Series</span>
            <span className="font-mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>GPU · DLSS 4 · 12GB VRAM</span>
          </div>
          <div className="ml-auto" style={{ fontSize: 9, fontFamily: 'monospace', color: '#76B900', letterSpacing: '0.1em', background: 'rgba(118,185,0,0.08)', padding: '3px 8px', borderRadius: 4, border: '1px solid rgba(118,185,0,0.2)' }}>ACTIVE</div>
        </div>
        {/* RAM */}
        <div className="flex items-center gap-3" style={{ padding: '10px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <svg width="36" height="24" viewBox="0 0 90 60" fill="none"><rect x="4" y="16" width="82" height="28" rx="4" stroke="rgba(255,255,255,0.5)" strokeWidth="3" fill="none"/><rect x="4" y="36" width="82" height="8" rx="2" fill="rgba(255,255,255,0.08)"/>{[14,24,34,44,54,64,74].map(x=><rect key={x} x={x} y="8" width="6" height="10" rx="1" fill="rgba(255,255,255,0.3)"/>)}{[14,24,34,44,54,64,74].map(x=><rect key={x+'b'} x={x} y="42" width="6" height="10" rx="1" fill="rgba(255,255,255,0.3)"/>)}</svg>
          <div className="flex flex-col">
            <span className="font-lemon-milk uppercase" style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.08em', fontWeight: 700 }}>32 GB DDR5</span>
            <span className="font-mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>RAM · 6000MHz · Dual Channel</span>
          </div>
          <div className="ml-auto" style={{ fontSize: 9, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', background: 'rgba(255,255,255,0.05)', padding: '3px 8px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)' }}>ACTIVE</div>
        </div>
      </div>
    </div>
  )
}

/* ── Waveform ── */
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

/* ── Project Flow ── */
function ProjectFlowElement() {
  const steps = [
    { id: '01', label: 'BRIEF',   desc: 'Understand goals' },
    { id: '02', label: 'CONCEPT', desc: 'Plan the edit' },
    { id: '03', label: 'EDIT',    desc: 'Craft the cut' },
    { id: '04', label: 'DELIVER', desc: 'Ship it fast' },
  ]
  const [activeStep, setActiveStep] = useState(0)
  useEffect(() => {
    const iv = setInterval(() => setActiveStep(s => (s + 1) % steps.length), 1800)
    return () => clearInterval(iv)
  }, [])
  return (
    <div style={{ width: 'clamp(300px, 36vw, 420px)' }}>
      <p className="font-lemon-milk uppercase tracking-widest mb-5" style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>Project Flow</p>
      <div className="flex items-center">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-2" style={{ minWidth: 52 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: i === activeStep ? 'rgba(255,255,255,0.92)' : i < activeStep ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.05)', border: i === activeStep ? 'none' : '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, fontFamily: 'monospace', color: i === activeStep ? '#000' : 'rgba(255,255,255,0.4)', transition: 'all 0.4s ease', boxShadow: i === activeStep ? '0 0 22px rgba(255,255,255,0.35)' : 'none' }}>
                {i < activeStep ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> : s.id}
              </div>
              <span style={{ fontSize: 9, color: i === activeStep ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.28)', letterSpacing: '0.06em', fontFamily: 'var(--font-lemon-milk, monospace)', textTransform: 'uppercase', transition: 'color 0.4s ease', whiteSpace: 'nowrap' }}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ position: 'relative', width: 36, height: 2, background: 'rgba(255,255,255,0.08)', margin: '0 4px', marginBottom: 20, borderRadius: 1, overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: i < activeStep ? '100%' : '0%', background: 'rgba(255,255,255,0.5)', borderRadius: 1, transition: 'width 0.5s ease' }}/>
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, padding: '8px 14px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', minHeight: 36, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.7)', boxShadow: '0 0 8px rgba(255,255,255,0.5)', flexShrink: 0 }}/>
        <span className="font-mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.04em' }}>{steps[activeStep].desc}</span>
      </div>
    </div>
  )
}

function ProjectElement({ type }) {
  switch (type) {
    case 'orbit':         return <OrbitElement />
    case 'techlogos':     return <TechLogosElement />
    case 'waveform':      return <WaveformElement />
    case 'projectflow':   return <ProjectFlowElement />
    default:              return null
  }
}

/* ================================================================
   PROJECT CARD
   ================================================================ */
function ProjectCard({ project, index, total }) {
  const cardRef = useRef(null)
  const bp = useBreakpoint()
  const isMobile = bp === 'mobile'

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
  const STACK_OFFSET = 0
  const stickyTop = index * STACK_OFFSET

  useGSAP(() => {
    gsap.from(cardRef.current.querySelectorAll('.ca'), {
      y: 18, opacity: 0, duration: 0.55, stagger: 0.07, ease: 'power3.out',
      scrollTrigger: { trigger: cardRef.current, start: 'top 82%', toggleActions: 'play none none none' },
    })
  }, { scope: cardRef })

  // Media panel renderer — shared between mobile & tablet
  const renderMedia = (isMobileLayout) => {
    const radius = CONFIG.media.borderRadius
    const counterLabel = isMobileLayout
      ? <div className="absolute top-2.5 right-2.5 font-mono font-bold px-2 py-0.5 rounded-full" style={{ fontSize: '0.55rem', background: 'rgba(0,0,0,0.7)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', letterSpacing: '0.1em' }}>{String(index + 1).padStart(2, '0')} / {total}</div>
      : <div className="absolute top-3 left-3 font-mono font-bold px-2 py-0.5 rounded-full" style={{ fontSize: '0.6rem', background: 'rgba(0,0,0,0.65)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', letterSpacing: '0.1em' }}>{String(index + 1).padStart(2, '0')} / {total}</div>

    const taglineEl = <div className={`absolute ${isMobileLayout ? 'bottom-2.5 left-3' : 'bottom-3 left-4'} font-decipher pointer-events-none`} style={{ fontSize: isMobileLayout ? '0.78rem' : 'clamp(0.78rem,1.1vw,0.92rem)', color: `${project.accent}75`, transform: 'rotate(-1.5deg)' }}>~{project.tagline.toLowerCase()}~</div>

    if (index === 0) {
      return (
        <div className="relative w-full h-full" style={{ borderRadius: radius, border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="w-full h-full flex items-center justify-center"><IDCard isInline /></div>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,transparent 60%,rgba(0,0,0,0.4))' }} />
          {counterLabel}{taglineEl}
        </div>
      )
    }

    if (index === 3) {
      // Card 4 (FLOWSTATE) — large orbit animation
      return (
        <div style={{
          width: '100%', height: isMobileLayout ? '300px' : '100%',
          minHeight: isMobileLayout ? 'auto' : 'clamp(320px, 35vw, 750px)',
          borderRadius: radius,
          border: `1px solid ${project.accent}22`,
          background: 'rgba(4,4,8,0.9)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <LargeOrbitElement accent={project.accent} />
          {counterLabel}
        </div>
      )
    }

    // Default: video or image
    return (
      <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: radius, border: '1px solid rgba(255,255,255,0.07)' }}>
        {project.type === 'video'
          ? <video src={project.src} poster={project.thumb} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
          : <img src={project.src} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
        }
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,transparent 55%,rgba(0,0,0,0.5))' }} />
        {counterLabel}{taglineEl}
      </div>
    )
  }

  return (
    <div style={{
      position: 'sticky', top: stickyTop, zIndex: index + 10,
      height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: `0 ${CONFIG.page.paddingX[bp]}`,
    }}>
      <div ref={cardRef} className="relative" style={{
        background: 'linear-gradient(150deg, #0e0e0e 0%, #121212 100%)',
        borderRadius: br,
        height: `calc(100vh - ${CONFIG.page.paddingX[bp]} * 2)`,
        maxHeight: '90vh',
        overflow: 'hidden',
        boxShadow: index > 0 ? '0 -8px 32px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06)' : '0 0 0 1px rgba(255,255,255,0.06)',
      }}>
        {/* Accent glow */}
        <div className="absolute pointer-events-none" style={{ top: 0, right: 0, width: 'clamp(120px,25vw,320px)', height: 'clamp(120px,25vw,320px)', background: `radial-gradient(circle at top right,${project.accent}0c 0%,transparent 65%)`, filter: 'blur(40px)' }} />

        {/* MOBILE */}
        {isMobile && (
          <div style={{ padding: `${py} ${px}`, display: 'flex', flexDirection: 'column', gap }}>
            <div className="ca relative flex flex-col gap-1.5">
              <div className="absolute top-0 right-0 font-akira font-black leading-none cursor-target" style={{ fontSize: CONFIG.indexNum.fontSize[bp], color: project.accent, lineHeight: 0.85, textShadow: `0 0 30px ${project.accent}50` }}>
                {String(index + 1).padStart(2, '0')}
              </div>
              <span className="font-decipher cursor-target" style={{ fontSize: CONFIG.tagline.fontSize[bp], color: `${project.accent}90`, transform: 'rotate(-1.5deg)', display: 'inline-block' }}>{project.tagline}</span>
              <Shuffle text={project.title} tag="h2" shuffleDirection="right" duration={0.4} animationMode="evenodd" shuffleTimes={1} ease="power3.out" stagger={0.025} threshold={0.1} triggerOnce triggerOnHover respectReducedMotion loop={false} className="font-magazine text-bone tracking-tight cursor-target" style={{ fontSize: CONFIG.title.fontSize[bp], lineHeight: 1.05, letterSpacing: '-0.01em', display: 'block', textAlign: 'left', paddingRight: '3.5rem' }} />
              <div style={{ width: 36, height: 1.5, background: `linear-gradient(90deg,${project.accent},transparent)`, borderRadius: 2 }} />
            </div>
            <div className="ca relative cursor-target" style={{ height: index === 0 ? 'auto' : index === 3 ? 'auto' : CONFIG.media.height[bp], minHeight: index === 0 ? '220px' : 'auto', borderRadius: CONFIG.media.borderRadius }}>
              {renderMedia(true)}
              <div className="absolute font-akira font-black pointer-events-none select-none" style={{ top: '-10%', right: '-4%', fontSize: CONFIG.indexNum.fontSize[bp], color: project.accent, lineHeight: 0.85, textShadow: `0 0 50px ${project.accent}80`, zIndex: 100 }}>
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
            <div className="ca">{renderDescription()}</div>
            <div className="ca overflow-x-auto" style={{ transform: `scale(${CONFIG.element.scale[bp]})`, transformOrigin: 'left center', paddingBottom: '0.5rem' }}>
              <ProjectElement type={project.element} />
            </div>
          </div>
        )}

        {/* TABLET+ */}
        {!isMobile && (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)', height: '100%' }}>
            {/* LEFT */}
            <div style={{
              padding: `${py} ${px}`,
              display: 'flex', flexDirection: 'column', gap,
              borderRight: '1px solid rgba(255,255,255,0.05)',
              // Card 1 only: center content vertically on xl/2xl
              justifyContent: (index === 0 && (bp === 'desktop' || bp === 'wide')) ? 'center' : 'flex-start',
            }}>
              <div className="ca flex flex-col gap-2">
                <span className="font-aerosoldier cursor-target" style={{ fontSize: CONFIG.tagline.fontSize[bp], color: `${project.accent}90`, transform: 'rotate(-1.5deg)', display: 'inline-block' }}>{project.tagline}</span>
                <Shuffle text={project.title} tag="h2" shuffleDirection="right" duration={0.4} animationMode="evenodd" shuffleTimes={1} ease="power3.out" stagger={0.025} threshold={0.1} triggerOnce triggerOnHover respectReducedMotion loop={false} className="font-akira text-bone tracking-tight cursor-target" style={{ fontSize: CONFIG.title.fontSize[bp], lineHeight: 1.02, letterSpacing: '-0.01em', display: 'block', textAlign: 'left' }} />
                <div style={{ width: 'clamp(36px,4vw,52px)', height: 1.5, background: `linear-gradient(90deg,${project.accent},transparent)`, borderRadius: 2 }} />
              </div>
              <div className="ca">{renderDescription()}</div>
              <div className="ca overflow-hidden" style={{ transform: `scale(${CONFIG.element.scale[bp]})`, transformOrigin: 'left bottom', marginTop: (index === 0 && (bp === 'desktop' || bp === 'wide')) ? 0 : 'auto' }}>
                <ProjectElement type={project.element} />
              </div>
            </div>
            {/* RIGHT */}
            <div style={{ padding: `${py} ${px} ${py} 0`, display: 'flex', alignItems: 'stretch' }}>
              <div className="ca relative w-full cursor-target" style={{ borderRadius: CONFIG.media.borderRadius, minHeight: 'clamp(320px, 35vw, 750px)' }}>
                {renderMedia(false)}
                <div className="absolute font-mono font-black pointer-events-none select-none cursor-target" style={{ top: '-12%', right: '-6%', fontSize: CONFIG.indexNum.fontSize[bp], color: project.accent, lineHeight: 0.85, textShadow: `0 0 70px ${project.accent}90`, zIndex: 100 }}>
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
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
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
          <span className="font-mono uppercase tracking-widest" style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.2)' }}>scroll</span>
          <div className="animate-bounce">
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" style={{ color: 'rgba(255,255,255,0.2)' }} strokeWidth="1.5"><path d="M10 4v10M6 12l4 4 4-4" /></svg>
          </div>
        </div>
      </section>

      <div style={{ paddingBottom: 0 }}>
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} total={PROJECTS.length} />
        ))}
      </div>
    </div>
  )
}