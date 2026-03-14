import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const PROJECTS = [
  {
    id: 1,
    title: 'BRAND SHOWREEL',
    tagline: 'Cinematic Vision',
    desc: 'A cohesive brand showreel cut to communicate vision, energy and identity in under 90 seconds — crafted for agencies looking to make a lasting statement.',
    type: 'video',
    thumb: 'https://images.unsplash.com/photo-1536240478700-b869ad10fbe2?w=800&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4',
    tags: ['COLOR GRADING', 'SOUND DESIGN', 'MOTION TITLES'],
    accent: '#C8FF00',
  },
  {
    id: 2,
    title: 'CLASSDOJO 2024',
    tagline: 'Social Excellence',
    desc: 'Short, punchy social-first content designed to stop the scroll — perfect for educational platforms reaching millions of students and educators.',
    type: 'video',
    thumb: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-1089-large.mp4',
    tags: ['SOCIAL CONTENT', 'PLATFORM EDIT', 'RETENTION HOOKS'],
    accent: '#FF6B6B',
  },
  {
    id: 3,
    title: 'RETENTION CUT',
    tagline: 'Long-Form Mastery',
    desc: 'YouTube edit engineered for retention — every cut, transition and graphic placed with precision to keep viewers engaged from start to finish.',
    type: 'video',
    thumb: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-laptop-on-a-wooden-table-23609-large.mp4',
    tags: ['PACING', 'HOOK STRUCTURE', 'B-ROLL LAYERING'],
    accent: '#FFD700',
  },
  {
    id: 4,
    title: 'BUCH MEDIA',
    tagline: 'Full Brand Suite',
    desc: 'Complete video package delivering brand identity, promotional assets, and social-native cuts for seamless multi-platform presence.',
    type: 'video',
    thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-woman-working-with-a-laptop-at-a-coffee-shop-2518-large.mp4',
    tags: ['BRAND PACKAGE', 'MULTI-FORMAT', 'DELIVERY SUITE'],
    accent: '#FF00FF',
  },
  {
    id: 5,
    title: 'YOUTUBE SERIES',
    tagline: 'Consistent Excellence',
    desc: 'Ongoing weekly series with unified visual language and synchronized thumbnail design — professional delivery every single week.',
    type: 'video',
    thumb: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
    src: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-talking-on-a-video-call-at-home-43832-large.mp4',
    tags: ['SERIES EDITING', 'THUMBNAIL SYNC', 'WEEKLY CADENCE'],
    accent: '#00D9FF',
  },
]

function ProjectPage({ project, index }) {
  const pageRef = useRef(null)
  const mediaRef = useRef(null)
  const videoRef = useRef(null)
  const contentRef = useRef(null)

  useGSAP(
    () => {
      gsap.from(contentRef.current, {
        y: 70,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: pageRef.current,
          start: 'top 8%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.from(mediaRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.12,
        scrollTrigger: {
          trigger: pageRef.current,
          start: 'top 8%',
          toggleActions: 'play none none reverse',
        },
      })
    },
    { scope: pageRef }
  )

  const isVideo = project.type === 'video'

  return (
    <section
      ref={pageRef}
      className="w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: index + 2,
        background: 'linear-gradient(145deg, #0c0c0c 0%, #141414 100%)',
        borderRadius: index > 0 ? '24px 24px 0 0' : 0,
        boxShadow: index > 0 ? '0 -20px 60px rgba(0,0,0,0.8)' : 'none',
        padding: 'clamp(1.5rem, 4vw, 2.5rem) clamp(1rem, 4vw, 2rem)',
      }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-16 right-16 w-80 h-80 rounded-full"
          style={{
            background: `radial-gradient(circle, ${project.accent}12 0%, transparent 70%)`,
            filter: 'blur(60px)',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-16 left-16 w-64 h-64 rounded-full"
          style={{
            background: `radial-gradient(circle, ${project.accent}18 0%, transparent 70%)`,
            filter: 'blur(80px)',
            animation: 'float 6s ease-in-out infinite reverse',
          }}
        />
      </div>

      {index > 0 && (
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${project.accent}60, transparent)` }}
        />
      )}

      {/* Layout — single col on mobile, 2-col on md+ */}
      <div className="relative z-10 max-w-7xl w-full flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-center">

        {/* Content */}
        <div ref={contentRef} className="flex flex-col gap-5 md:gap-7">
          <div className="flex items-baseline gap-3 md:gap-4">
            <span
              className="font-akira font-black"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: project.accent, lineHeight: 1 }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className="font-decipher"
              style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.15rem)', color: project.accent, transform: 'rotate(-2deg)', display: 'inline-block' }}
            >
              {project.tagline}
            </span>
          </div>

          <h2
            className="font-magazine text-bone leading-tight tracking-tight"
            style={{ fontSize: 'clamp(1.8rem, 5.5vw, 4rem)' }}
          >
            {project.title}
          </h2>

          <p className="font-sakire text-cream/80 leading-relaxed" style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.125rem)' }}>
            {project.desc}
          </p>

          <div className="flex flex-col gap-2 md:gap-3">
            {project.tags.map((tag, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.accent }} />
                <span className="font-lemon-milk uppercase text-bone/65 tracking-widest" style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.75rem)' }}>{tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Media */}
        <div
          ref={mediaRef}
          className="relative rounded-2xl overflow-hidden w-full"
          style={{
            height: 'clamp(220px, 45vw, 580px)',
            boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 40px ${project.accent}18`,
            border: `1.5px solid ${project.accent}25`,
          }}
        >
          {isVideo ? (
            <video
              ref={videoRef}
              src={project.src}
              poster={project.thumb}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <img
              src={project.src}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${project.accent}08 0%, transparent 50%, rgba(0,0,0,0.3) 100%)`,
            }}
          />

          <div
            className="absolute top-3 right-3 md:top-5 md:right-5 z-20 font-mono font-bold px-2.5 py-1 rounded-full"
            style={{
              fontSize: 'clamp(0.55rem, 1.2vw, 0.75rem)',
              background: `${project.accent}18`,
              color: project.accent,
              border: `1px solid ${project.accent}45`,
              backdropFilter: 'blur(12px)',
              letterSpacing: '0.08em',
            }}
          >
            {String(index + 1).padStart(2, '0')} / {PROJECTS.length}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function VaultGrid() {
  return (
    <div className="relative">
      {/* Intro section */}
      <section
        className="relative min-h-screen w-full flex flex-col items-center justify-center bg-ink px-6 sm:px-8"
        style={{ zIndex: 1 }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-1/3 right-6 md:right-24 w-64 md:w-96 h-64 md:h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(200,255,0,0.08) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
        </div>

        <div className="relative z-10 text-center max-w-3xl px-4">
          <p
            className="font-decipher mb-4 md:mb-6"
            style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', color: '#C8FF00', transform: 'rotate(-1deg)', display: 'inline-block' }}
          >
            ~The best work I&apos;ve crafted~
          </p>
          <h1
            className="font-magazine text-bone leading-tight tracking-tight mb-5 md:mb-8"
            style={{ fontSize: 'clamp(3rem, 10vw, 6.5rem)' }}
          >
            THE VAULT
          </h1>
          <p className="font-sakire text-cream/75 leading-relaxed mb-3" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)' }}>
            A collection of recent projects — each one a commitment to excellence, creativity and craft.
          </p>
          <p className="font-lemon-milk uppercase text-bone/40 tracking-widest" style={{ fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)' }}>
            {PROJECTS.length} projects &middot; scroll to explore
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono uppercase text-bone/30 tracking-widest" style={{ fontSize: '10px' }}>scroll</span>
          <div className="animate-bounce">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" className="text-bone/30" strokeWidth="1.5">
              <path d="M10 4v10M6 12l4 4 4-4" />
            </svg>
          </div>
        </div>
      </section>

      {PROJECTS.map((project, index) => (
        <ProjectPage key={project.id} project={project} index={index} />
      ))}

      {/* End CTA */}
      <section
        className="relative min-h-screen w-full flex flex-col items-center justify-center bg-ink px-6 sm:px-8 overflow-hidden"
        style={{ zIndex: PROJECTS.length + 3 }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-20 left-6 md:left-24 w-64 md:w-96 h-64 md:h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(230,59,46,0.12) 0%, transparent 70%)',
              filter: 'blur(100px)',
            }}
          />
          <div
            className="absolute bottom-20 right-6 md:right-24 w-56 md:w-72 h-56 md:h-72 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(200,255,0,0.08) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
        </div>

        <div className="relative z-10 text-center max-w-2xl px-4">
          <p
            className="font-akira font-black text-bone/15 mb-6 md:mb-10"
            style={{ fontSize: 'clamp(2rem, 8vw, 6rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
          >
            THANKS FOR
            <br />
            SCROLLING
          </p>
          <h2 className="font-magazine text-bone mb-6 md:mb-8" style={{ fontSize: 'clamp(1.3rem, 4vw, 1.875rem)' }}>
            Ready to create something amazing?
          </h2>
          <button
            className="font-lemon-milk uppercase tracking-widest px-8 py-3 md:px-10 md:py-4 rounded text-ink font-bold transition-all hover:scale-105"
            style={{ background: '#C8FF00', fontSize: 'clamp(0.7rem, 1.5vw, 0.875rem)' }}
          >
            Let&apos;s Work Together
          </button>
        </div>
      </section>
    </div>
  )
}
