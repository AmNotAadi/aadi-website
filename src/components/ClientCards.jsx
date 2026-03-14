import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// ── Artist data ───────────────────────────────────────────────────────────
const ARTISTS = [
  {
    name: 'CLASS DOJO',
    desc: 'K-12 education platform driving viral classroom moments worldwide.',
    thumb: 'https://images.unsplash.com/photo-1536240478700-b869ad10fbe2?w=700&q=80',
    ig: '1.2M',
    yt: '2.4M',
    href: 'https://classdojo.com',
    tag: 'EDUCATION',
    accent: '#C8FF00',
  },
  {
    name: 'EMILY BLACK',
    desc: 'ASMR & lifestyle creator with a cult following across platforms.',
    thumb: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=700&q=80',
    ig: '820K',
    yt: '500K',
    href: 'https://youtube.com',
    tag: 'ASMR / LIFESTYLE',
    accent: '#E63B2E',
  },
  {
    name: 'BUCH MEDIA',
    desc: 'Full-service branding & motion content studio for modern brands.',
    thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&q=80',
    ig: '340K',
    yt: '180K',
    href: 'https://buchmedia.com',
    tag: 'BRANDING',
    accent: '#F5E6D3',
  },
  {
    name: 'XSANDTOR',
    desc: 'Ambient lo-fi producer blending hip-hop, soul, and raw energy.',
    thumb: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=700&q=80',
    ig: '670K',
    yt: '1.1M',
    href: 'https://youtube.com',
    tag: 'MUSIC / BEATS',
    accent: '#C8FF00',
  },
  {
    name: 'SOCIAL LAB',
    desc: 'Reels & TikTok short-form content lab consistently pushing trends.',
    thumb: 'https://images.unsplash.com/photo-1542435503-956c469947f6?w=700&q=80',
    ig: '3.2M',
    yt: '890K',
    href: '#',
    tag: 'SHORT-FORM',
    accent: '#E63B2E',
  },
  {
    name: 'AD FACTORY',
    desc: 'Paid ad creatives & hook testing built for D2C performance.',
    thumb: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=700&q=80',
    ig: '210K',
    yt: '420K',
    href: '#',
    tag: 'PAID ADS',
    accent: '#C8FF00',
  },
]

// ── Inline platform icons ─────────────────────────────────────────────────
function IgIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function YtIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  )
}

// ── Single grid card ──────────────────────────────────────────────────────
function ArtistCard({ artist }) {
  return (
    <a
      href={artist.href}
      target="_blank"
      rel="noopener noreferrer"
      className="client-card cursor-target"
      style={{
        display: 'block',
        position: 'relative',
        width: '100%',
        aspectRatio: '1 / 1.05',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        textDecoration: 'none',
        transition: 'transform 0.4s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.4s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)'
        e.currentTarget.style.boxShadow = '0 24px 64px rgba(0,0,0,0.7)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)'
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.5)'
      }}
    >
      {/* Full-bleed image */}
      <img
        src={artist.thumb}
        alt={artist.name}
        loading="lazy"
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* Dark gradient from bottom */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.88) 100%)',
      }} />

      {/* Tag — top left */}
      <span
        className="font-mono uppercase"
        style={{
          position: 'absolute',
          top: '14px', left: '14px',
          fontSize: '7px',
          letterSpacing: '0.15em',
          background: artist.accent,
          color: '#0a0a0a',
          padding: '4px 9px',
          borderRadius: '3px',
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {artist.tag}
      </span>

      {/* Arrow — top right */}
      <div style={{
        position: 'absolute',
        top: '12px', right: '12px',
        width: '28px', height: '28px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ color: '#fff', fontSize: '13px', lineHeight: 1 }}>↗</span>
      </div>

      {/* Bottom text */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        padding: '0 16px 16px',
      }}>
        <h3
          className="font-akira leading-none"
          style={{
            fontSize: 'clamp(0.9rem, 2.2vw, 1.6rem)',
            color: '#fff',
            letterSpacing: '-0.01em',
            marginBottom: '8px',
            textShadow: '0 1px 8px rgba(0,0,0,0.5)',
          }}
        >
          {artist.name}
        </h3>

        {/* Stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: 'rgba(255,255,255,0.55)' }}><IgIcon /></span>
            <span className="font-mono" style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.05em', color: '#fff' }}>
              {artist.ig}
            </span>
          </div>
          <div style={{ width: '1px', height: '9px', background: 'rgba(255,255,255,0.2)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: 'rgba(255,255,255,0.55)' }}><YtIcon /></span>
            <span className="font-mono" style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.05em', color: '#fff' }}>
              {artist.yt}
            </span>
          </div>
          <div style={{ marginLeft: 'auto', width: '5px', height: '5px', borderRadius: '50%', background: artist.accent }} />
        </div>
      </div>

      {/* Accent bottom bar */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '2.5px',
        background: artist.accent,
      }} />
    </a>
  )
}

// ── Main section ──────────────────────────────────────────────────────────
export default function ClientCards() {
  const sectionRef = useRef(null)

  const colA = ARTISTS.filter((_, i) => i % 2 === 0)  // left col: 0, 2, 4
  const colB = ARTISTS.filter((_, i) => i % 2 !== 0)  // right col: 1, 3, 5 (shifted down)

  useGSAP(
    () => {
      gsap.from('.client-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 60,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'expo.out',
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="w-full bg-ink"
      style={{ position: 'relative' }}
    >
      {/* Top label */}
      <div
        className="px-5 sm:px-8 md:px-14 pt-14 sm:pt-16 pb-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(245,230,211,0.08)' }}
      >
        <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'rgba(245,230,211,0.35)' }}>
          ◆&nbsp;&nbsp;WORKED WITH
        </p>
        <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'rgba(245,230,211,0.35)' }}>
          0{ARTISTS.length} CLIENTS
        </p>
      </div>

      {/* ── Two-panel layout (stacks on mobile) ── */}
      <div className="flex flex-col md:flex-row" style={{ alignItems: 'flex-start' }}>

        {/* ── LEFT: info panel — full-width on mobile, sticky on md+ ── */}
        <div
          className="w-full md:w-[45%] lg:w-[40%] md:sticky md:top-0 md:h-screen
                     flex flex-col justify-center
                     px-5 sm:px-8 md:px-10 lg:px-14
                     py-10 md:py-0
                     border-b md:border-b-0 md:border-r border-bone/[0.08]
                     overflow-hidden"
        >
          {/* Ghost decoration - only visible md+ */}
          <p
            className="font-aerosoldier pointer-events-none select-none absolute hidden md:block"
            style={{
              bottom: '40px', left: '40px',
              fontSize: '6rem',
              color: 'rgba(200,255,0,0.035)',
              transform: 'rotate(-8deg)',
              lineHeight: 1,
            }}
          >aadi</p>

          {/* Label */}
          <p
            className="font-mono uppercase"
            style={{
              fontSize: '8px',
              letterSpacing: '0.18em',
              color: 'rgba(245,230,211,0.3)',
              marginBottom: '20px',
            }}
          >
            ◆ &nbsp;MY RECENT CLIENTS
          </p>

          {/* Big graffiti title */}
          <div style={{ marginBottom: '20px' }}>
            <div
              className="font-street-wars"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                color: '#cfe240',
                lineHeight: 0.9,
                transform: 'rotate(-1.5deg)',
                display: 'inline-block',
                marginBottom: '4px',
              }}
            >The artists </div>
            <br />
            <div
              className="font-moon-get"
              style={{
                fontSize: 'clamp(1.7rem, 4vw, 3.5rem)',
                color: '#F5E6D3',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
              }}
            >I HAVE </div>
            <br />
            <div
              className="font-moon-get"
              style={{
                fontSize: 'clamp(1.7rem, 4vw, 3.5rem)',
                color: '#F5E6D3',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
              }}
            >WORKED WITH  </div>
            <br />
            <div
              className="font-decipher"
              style={{
                fontSize: 'clamp(1.3rem, 3vw, 2.6rem)',
                color: '#8b2255',
                lineHeight: 1,
                transform: 'rotate(-2deg)',
                display: 'inline-block',
                marginTop: '6px',
              }}
            >worked with best~</div>
          </div>

          {/* Paragraph */}
          <p
            className="font-mono uppercase leading-relaxed"
            style={{
              fontSize: '8.5px',
              letterSpacing: '0.05em',
              color: 'rgba(245,230,211,0.45)',
              maxWidth: '320px',
              marginBottom: '24px',
            }}
          >
            Every creator here trusted me to make their content hit different.
            From hooks to full edits, I&apos;ve built their audience, their brand, and their identity.
          </p>

          {/* What I delivered list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['Long-form editing', 'Brand identity', 'Reels & short-form', 'Retention strategy', 'Hook engineering'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#C8FF00', flexShrink: 0 }} />
                <span
                  className="font-mono uppercase"
                  style={{ fontSize: '8px', letterSpacing: '0.1em', color: 'rgba(245,230,211,0.45)' }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Red accent line */}
          <div style={{
            marginTop: '32px',
            height: '2px', width: '48px',
            background: '#E63B2E',
            borderRadius: '2px',
            transform: 'rotate(-1deg)',
          }} />
        </div>

        {/* ── RIGHT: staggered 2-col grid ── */}
        <div
          className="flex-1 px-5 sm:px-8 md:px-10"
          style={{
            padding: 'clamp(32px, 5vw, 60px) clamp(16px, 4vw, 40px) clamp(40px, 6vw, 80px)',
            display: 'flex',
            gap: 'clamp(8px, 2vw, 14px)',
            alignItems: 'flex-start',
          }}
        >
          {/* Column A — starts at top */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 2vw, 14px)' }}>
            {colA.map(a => <ArtistCard key={a.name} artist={a} />)}
          </div>

          {/* Column B — offset down for stagger effect */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'clamp(8px, 2vw, 14px)', marginTop: 'clamp(36px, 6vw, 72px)' }}>
            {colB.map(a => <ArtistCard key={a.name} artist={a} />)}
          </div>
        </div>

      </div>

      {/* Footer CTA */}
      <div
        className="px-5 sm:px-8 md:px-14 py-8 flex items-center gap-6"
        style={{ borderTop: '1px solid rgba(245,230,211,0.08)' }}
      >
        <div className="h-0.5 w-10 bg-brutal-red shrink-0" />
        <a
          href="mailto:contact@aaddi.com"
          className="font-mono text-[10px] tracking-widest text-bone/50 hover:text-bone uppercase transition-colors duration-300 cursor-target"
        >
          WANT RESULTS LIKE THESE? LET&apos;S TALK →
        </a>
      </div>

    </section>
  )
}
