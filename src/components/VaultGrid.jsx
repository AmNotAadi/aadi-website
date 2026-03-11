import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Tilt from 'react-parallax-tilt'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// ── Placeholder data — swap src/thumb for real client reels ──────────────
const ROW1 = [
  {
    id: 'r1-1', title: 'BRAND SHOWREEL',
    thumb: 'https://images.unsplash.com/photo-1536240478700-b869ad10fbe2?w=600&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4',
  },
  {
    id: 'r1-2', title: 'CLASSDOJO 2024',
    thumb: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-1089-large.mp4',
  },
  {
    id: 'r1-3', title: 'RETENTION CUT',
    thumb: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-laptop-on-a-wooden-table-23609-large.mp4',
  },
  {
    id: 'r1-4', title: 'BUCH MEDIA',
    thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-working-with-a-laptop-at-a-coffee-shop-2518-large.mp4',
  },
  {
    id: 'r1-5', title: 'YOUTUBE SERIES',
    thumb: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-a-video-call-at-home-43832-large.mp4',
  },
  {
    id: 'r1-6', title: 'SOCIAL PACK',
    thumb: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-a-girl-blowing-a-dandelion-51-large.mp4',
  },
  {
    id: 'r1-7', title: 'TIKTOK VIRAL',
    thumb: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4',
  },
]

const ROW2 = [
  {
    id: 'r2-1', title: 'EMILY BLACK ASMR',
    thumb: 'https://images.unsplash.com/photo-1542435503-956c469947f6?w=600&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-1089-large.mp4',
  },
  {
    id: 'r2-2', title: 'BRAND IDENTITY',
    thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-laptop-on-a-wooden-table-23609-large.mp4',
  },
  {
    id: 'r2-3', title: 'AD CREATIVE',
    thumb: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-working-with-a-laptop-at-a-coffee-shop-2518-large.mp4',
  },
  {
    id: 'r2-4', title: 'MOTION DESIGN',
    thumb: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4',
  },
  {
    id: 'r2-5', title: 'HOOK STRATEGY',
    thumb: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-a-video-call-at-home-43832-large.mp4',
  },
  {
    id: 'r2-6', title: 'DOCUMENTARY',
    thumb: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-1089-large.mp4',
  },
  {
    id: 'r2-7', title: '1M VIEW CUT',
    thumb: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-a-girl-blowing-a-dandelion-51-large.mp4',
  },
]

// ── Single video card ─────────────────────────────────────────────────────
function VideoCard({ title, thumb, video, onHoverStart, onHoverEnd }) {
  const outerRef = useRef(null) // GSAP target for scale
  const videoRef = useRef(null)
  const thumbRef = useRef(null)

  const handleEnter = () => {
    onHoverStart()
    videoRef.current?.play().catch(() => {})
    gsap.to(thumbRef.current, { opacity: 0, duration: 0.35, ease: 'power2.out' })
    gsap.to(outerRef.current, { scale: 1.05, duration: 0.45, ease: 'power2.out' })
  }

  const handleLeave = () => {
    onHoverEnd()
    gsap.to(thumbRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(outerRef.current, { scale: 1, duration: 0.4, ease: 'power2.out' })
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    // outerRef for GSAP scale — separate from Tilt so transforms don't fight
    <div
      ref={outerRef}
      className="flex-shrink-0 will-change-transform"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      data-cursor="view"
    >
      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.28}
        glareColor="#ffffff"
        glarePosition="all"
        tiltMaxAngleX={7}
        tiltMaxAngleY={7}
        transitionSpeed={500}
      >
        <div className="relative w-[300px] h-[185px] overflow-hidden border border-bone/10">

          {/* Thumbnail — fades out when video plays */}
          <img
            ref={thumbRef}
            src={thumb}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />

          {/* Video — always mounted, plays on hover */}
          <video
            ref={videoRef}
            src={video}
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Ink vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />

          {/* Title */}
          <div className="absolute bottom-0 left-0 right-0 px-3 py-2 pointer-events-none">
            <p className="text-meta text-xs text-bone/80 tracking-wider">
              {title}
            </p>
          </div>

          {/* Top-right project mark */}
          <div className="absolute top-2 right-2 pointer-events-none">
            <div className="w-1.5 h-1.5 rounded-full bg-brutal-red opacity-80" />
          </div>
        </div>
      </Tilt>
    </div>
  )
}

// ── Marquee row — renders 2 copies of items for seamless loop ─────────────
function MarqueeRow({ items, trackRef, onHoverStart, onHoverEnd }) {
  const Strip = () => (
    <div className="flex gap-4 flex-shrink-0" aria-hidden="true">
      {items.map((item) => (
        <VideoCard
          key={item.id}
          {...item}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
        />
      ))}
    </div>
  )

  return (
    <div className="w-full overflow-hidden">
      <div ref={trackRef} className="flex gap-4 w-max">
        <Strip />
        <Strip />
      </div>
    </div>
  )
}

// ── "VIEW ALL WORK" button ─────────────────────────────────────────────────
function ViewAllButton() {
  const lineRef = useRef(null)

  const handleEnter = () => {
    gsap.fromTo(lineRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.45, ease: 'power4.out' }
    )
  }

  const handleLeave = () => {
    gsap.to(lineRef.current, {
      scaleX: 0,
      transformOrigin: 'right center',
      duration: 0.3,
      ease: 'power3.in',
    })
  }

  return (
    <div className="flex justify-center mt-14">
      <a
        href="#"
        data-cursor="view"
        className="relative inline-block"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <span className="heading-brutal text-xl tracking-wider">
          VIEW ALL WORK
        </span>
        {/* Animated underline */}
        <span
          ref={lineRef}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-brutal-red scale-x-0 origin-left"
        />
      </a>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────
export default function VaultGrid() {
  const sectionRef  = useRef(null)
  const row1Ref     = useRef(null) // GSAP animation target
  const row2Ref     = useRef(null)
  const tween1      = useRef(null)
  const tween2      = useRef(null)
  const hoveredCount = useRef(0)   // prevent flicker between adjacent cards

  // ── Pause / resume helpers ───────────────────────────────────────────
  const onHoverStart = () => {
    if (hoveredCount.current === 0) {
      tween1.current?.pause()
      tween2.current?.pause()
    }
    hoveredCount.current++
  }

  const onHoverEnd = () => {
    hoveredCount.current = Math.max(0, hoveredCount.current - 1)
    if (hoveredCount.current === 0) {
      tween1.current?.resume()
      tween2.current?.resume()
    }
  }

  useGSAP(
    () => {
      // ── Row 1: scrolls LEFT  (x: 0 → -50%) ─────────────────────────
      tween1.current = gsap.to(row1Ref.current, {
        x: '-50%',
        duration: 32,
        ease: 'none',
        repeat: -1,
      })

      // ── Row 2: scrolls RIGHT (x: -50% → 0%) ────────────────────────
      gsap.set(row2Ref.current, { x: '-50%' })
      tween2.current = gsap.to(row2Ref.current, {
        x: '0%',
        duration: 38,
        ease: 'none',
        repeat: -1,
      })

      // ── Scroll entrance ─────────────────────────────────────────────
      gsap.from('.vault-row', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 60,
        opacity: 0,
        duration: 1.0,
        stagger: 0.2,
        ease: 'expo.out',
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="w-full bg-ink py-20 overflow-hidden">

      {/* Section header */}
      <div className="flex items-end justify-between px-8 md:px-14 mb-10">
        <div>
          <p className="text-meta text-xs tracking-widest text-bone/40 mb-2">
            ◆&nbsp;&nbsp;THE VAULT
          </p>
          <h2 className="heading-brutal text-bone text-6xl leading-none">
            SELECTED<br />
            <span className="text-brutal-red">WORK</span>
          </h2>
        </div>
        <p className="text-meta text-xs tracking-wider text-bone/40 hidden md:block">
          HOVER TO PREVIEW
        </p>
      </div>

      {/* Row 1 — left scroll */}
      <div className="vault-row mb-4">
        <MarqueeRow
          items={ROW1}
          trackRef={row1Ref}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
        />
      </div>

      {/* Row 2 — right scroll */}
      <div className="vault-row">
        <MarqueeRow
          items={ROW2}
          trackRef={row2Ref}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
        />
      </div>

      {/* CTA */}
      <ViewAllButton />

    </section>
  )
}
