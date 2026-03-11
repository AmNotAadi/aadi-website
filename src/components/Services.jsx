import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useCursor } from '../contexts/CursorContext'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// ── Placeholder service videos — swap for real client reels ───────────────
const SERVICES = [
  {
    id: '01',
    name: 'BRANDING',
    desc: 'Visual identity & systems that command attention.',
    video:
      'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-laptop-on-a-wooden-table-23609-large.mp4',
  },
  {
    id: '02',
    name: 'DIGITAL EDITING',
    desc: 'Cut. Pace. Story. The edit that keeps eyes glued.',
    video:
      'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-1089-large.mp4',
  },
  {
    id: '03',
    name: 'RETENTION STRATEGY',
    desc: 'Hook, hold, grow. Engineered to keep them watching.',
    video:
      'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4',
  },
]

// ── Per-row component (owns its own hover refs) ───────────────────────────
function ServiceRow({ id, name, desc, video, index }) {
  const rowRef  = useRef(null)
  const bgRef   = useRef(null)
  const nameRef = useRef(null)
  const metaRef = useRef(null)
  const { setServiceVideo } = useCursor()

  const handleEnter = () => {
    setServiceVideo(video)
    gsap.to(bgRef.current,  { scaleX: 1, duration: 0.55, ease: 'power4.out', transformOrigin: 'left center' })
    gsap.to([nameRef.current, metaRef.current], {
      color: '#F5E6D3',
      duration: 0.25,
      stagger: 0.04,
      ease: 'power2.out',
    })
  }

  const handleLeave = () => {
    setServiceVideo(null)
    gsap.to(bgRef.current,  { scaleX: 0, duration: 0.4, ease: 'power4.in', transformOrigin: 'left center' })
    gsap.to([nameRef.current, metaRef.current], {
      color: '#F5E6D3',
      duration: 0.3,
      stagger: 0.03,
    })
  }

  return (
    <div
      ref={rowRef}
      className="service-row relative border-b border-bone/10 overflow-hidden"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Red fill — starts scaleX(0), expands on hover */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-brutal-red pointer-events-none scale-x-0"
      />

      {/* Row content */}
      <div className="relative z-10 flex items-center gap-8 px-8 md:px-14 py-7 md:py-8">

        {/* Counter */}
        <span
          ref={metaRef}
          className="text-meta text-xs tracking-widest w-8 flex-shrink-0 text-bone/40 transition-none"
        >
          {id}
        </span>

        {/* Service name — the hero text */}
        <span
          ref={nameRef}
          className="flex-1 heading-brutal text-7xl leading-none tracking-tighter"
        >
          {name}
        </span>

        {/* Descriptor — right-aligned, hidden on small screens */}
        <span className="hidden md:block text-meta text-xs tracking-wider text-bone/40 max-w-44 text-right leading-relaxed">
          {desc}
        </span>

        {/* Arrow indicator */}
        <span className="text-[1.5rem] text-bone/20 flex-shrink-0 font-light">→</span>
      </div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────
export default function Services() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      // Staggered scroll-entrance: each row slides up from a clip
      gsap.from('.service-row', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
        y: 80,
        opacity: 0,
        duration: 1.0,
        stagger: 0.12,
        ease: 'expo.out',
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="w-full bg-ink">

      {/* Section header */}
      <div className="flex items-end justify-between px-8 md:px-14 pt-20 pb-6 border-b border-bone/10">
        <p className="text-meta text-xs tracking-widest text-bone/40">
          ◆&nbsp;&nbsp;WHAT WE DO
        </p>
        <p className="text-meta text-xs tracking-widest text-bone/40">
          03 SERVICES
        </p>
      </div>

      {/* Service rows */}
      {SERVICES.map((s, i) => (
        <ServiceRow key={s.id} {...s} index={i} />
      ))}

      {/* Section footer CTA */}
      <div className="px-8 md:px-14 py-10 flex items-center gap-6">
        <div className="h-0.5 w-10 bg-brutal-red flex-shrink-0" />
        <a
          href="mailto:contact@aaddi.com"
          data-cursor="view"
          className="text-meta text-xs tracking-widest text-bone/50 hover:text-bone transition-opacity duration-300"
        >
          GET IN TOUCH →
        </a>
      </div>

    </section>
  )
}
