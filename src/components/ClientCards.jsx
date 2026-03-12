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

const CARD_W = 310
const CARD_GAP = 16

// ── Inline platform icons ────────────────────────────────────────────────
function IgIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function YtIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  )
}

// ── Single card ───────────────────────────────────────────────────────────
function ArtistCard({ artist }) {
  return (
    <div
      className="shrink-0 cursor-target"
      style={{
        width: `${CARD_W}px`,
        height: `${CARD_W + 20}px`,
        borderRadius: '10px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 8px 36px rgba(0,0,0,0.55)',
        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
        e.currentTarget.style.boxShadow = '0 28px 72px rgba(0,0,0,0.75)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)'
        e.currentTarget.style.boxShadow = '0 8px 36px rgba(0,0,0,0.55)'
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
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* Strong gradient — bottom two-thirds */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.92) 100%)',
      }} />

      {/* Tag pill — top left */}
      <span
        className="font-decipher uppercase"
        style={{
          position: 'absolute',
          top: '14px',
          left: '14px',
          fontSize: '15px',
          letterSpacing: '0.14em',
          // background: artist.accent,
          color: artist.accent,
          // padding: '4px 10px',
          // borderRadius: '4px',
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        {artist.tag}
      </span>

      {/* Arrow — top right */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.12)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.18)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{ color: '#fff', fontSize: '15px', lineHeight: 1 }}>↗</span>
      </div>

      {/* Text overlay — bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        padding: '0 18px 20px',
      }}>
        {/* Channel / brand name — big chunky */}
        <h3
          className="font-akira leading-none"
          style={{
            fontSize: '35px',
            color: '#ffffff',
            letterSpacing: '-0.02em',
            marginBottom: '8px',
            textShadow: '0 2px 12px rgba(0,0,0,0.6)',
          }}
        >
          {artist.name}
        </h3>

        {/* Audience stats row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}><IgIcon /></span>
            <span
              className="font-moon-get"
              style={{ fontSize: '30px', fontWeight: 700, letterSpacing: '0.06em', color: '#fff' }}
            >{artist.ig}</span>
          </div>
          <div style={{ width: '1px', height: '10px', background: 'rgba(255,255,255,0.25)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}><YtIcon /></span>
            <span
              className="font-moon-get"
              style={{ fontSize: '30px', fontWeight: 700, letterSpacing: '0.06em', color: '#fff' }}
            >{artist.yt}</span>
          </div>
          <div style={{ marginLeft: 'auto', width: '6px', height: '6px', borderRadius: '50%', background: artist.accent }} />
        </div>
      </div>

      {/* Accent color bottom border */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '3px',
        background: artist.accent,
        opacity: 0.9,
      }} />

    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────────────
export default function ClientCards() {
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)
  const tweenRef   = useRef(null)

  const allArtists = [...ARTISTS, ...ARTISTS]
  const LOOP_W     = ARTISTS.length * (CARD_W + CARD_GAP)

  useGSAP(
    () => {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 40,
        duration: 0.85,
        ease: 'expo.out',
      })

      // Start at -LOOP_W, animate to 0 → rightward scroll
      gsap.set(trackRef.current, { x: -LOOP_W })
      tweenRef.current = gsap.to(trackRef.current, {
        x: 0,
        duration: 24,
        ease: 'none',
        repeat: -1,
      })
    },
    { scope: sectionRef },
  )

  const pauseScroll  = () => tweenRef.current?.pause()
  const resumeScroll = () => tweenRef.current?.resume()

  return (
    <section
      ref={sectionRef}
      className="w-full bg-ink overflow-hidden"
      style={{ paddingTop: '80px', paddingBottom: '80px' }}
    >
      {/* ── Header ── */}
      <div className="px-8 md:px-14 mb-12">
        <p
          className="font-mono text-[10px] tracking-widest uppercase mb-3"
          style={{ color: 'rgba(245,230,211,0.35)' }}
        >
          {/* ◆&nbsp;&nbsp;ARTISTS I&apos;VE WORKED WITH */}
        </p>
        <div className="flex items-end gap-4 flex-wrap">
          <h2
            className="font-moon-get leading-none"
            style={{ fontSize: "60px", color: '#F5E6D3', letterSpacing: '-0.02em' }}
          >
            THE ARTISTS I HAVE WORKED WITH
          </h2>
          <span
            className="font-decipher mb-1"
            style={{ fontSize: '2.2rem', color: '#8b2255', transform: 'rotate(-2deg)', display: 'inline-block' }}
          >
            worked with best~
          </span>
        </div>
      </div>

      {/* ── Card track ── */}
      <div
        style={{ overflow: 'hidden', paddingLeft: '56px', paddingBottom: '8px' }}
        onMouseEnter={pauseScroll}
        onMouseLeave={resumeScroll}
      >
        <div
          ref={trackRef}
          className="flex"
          style={{ gap: `${CARD_GAP}px`, width: 'max-content' }}
        >
          {allArtists.map((a, i) => (
            <ArtistCard key={`${a.name}-${i}`} artist={a} />
          ))}
        </div>
      </div>
    </section>
  )
}


