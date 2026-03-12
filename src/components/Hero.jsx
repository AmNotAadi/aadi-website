import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Tilt from 'react-parallax-tilt'
import JsBarcode from 'jsbarcode'
import sampleVideo from '../assets/sample videp.mp4'
import portraitImg from '../assets/blog04.jpg'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const PORTFOLIO_URL = 'https://www.youtube.com/watch?v=xnFvhn-1wHY&list=RDxnFvhn-1wHY&start_radio=1'

/* ─── Barcode ─────────────────────────────────────────────── */
function BarcodeEl({ value }) {
  const svgRef = useRef(null)
  useEffect(() => {
    if (svgRef.current) {
      JsBarcode(svgRef.current, value, {
        format: 'CODE128', width: 1.6, height: 40,
        displayValue: false, background: 'transparent',
        lineColor: '#1a1a1a', margin: 0,
      })
    }
  }, [value])
  return <svg ref={svgRef} style={{ width: '100%' }} />
}

/* ─── Inline ID Card (no section/orbs wrapper) ────────────── */
function HeroIDCard() {
  return (
    <Tilt
      tiltMaxAngleX={12} tiltMaxAngleY={12}
      perspective={1100} glareEnable glareMaxOpacity={0.22}
      glareColor="#ddd0ff" scale={1.03} transitionSpeed={600} gyroscope
    >
      <div className="rounded-2xl p-[2px] id-card-glow-border" style={{ maxWidth: 420 }}>
        <div className="relative rounded-2xl overflow-hidden" style={{ background: '#D4C4A8', width: 420 }}>

          {/* Shimmer */}
          <div className="absolute inset-0 id-card-shimmer pointer-events-none z-20 rounded-2xl" />

          {/* Header */}
          <div className="flex justify-between items-center px-4 py-1 border-b border-black/10">
            <div>
              <p className="font-mono" style={{ fontSize: 8, letterSpacing: '0.1em', fontWeight: 700, color: 'rgba(0,0,0,0.6)', textTransform: 'uppercase' }}>Identification Card</p>
              <p className="font-mono" style={{ fontSize: 8, color: 'rgba(0,0,0,0.35)' }}>No.2345687981798</p>
            </div>
            <div className="font-decipher id-hologram-text text-2xl graffiti-highlight font-semibold">license for chaos</div>
          </div>

          {/* Body */}
          <div className="relative flex flex-row gap-4 px-4 pt-3 pb-3">
            <div className="shrink-0">
              <div style={{ width: 88, height: 120, border: '2px solid rgba(0,0,0,0.2)', overflow: 'hidden', borderRadius: 2 }}>
                <img src={portraitImg} alt="aadi2005" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
            <div className="flex-1 flex flex-col font-mono" style={{ fontSize: 10, fontWeight: 700, color: '#000', gap: 2 }}>
              <div className="flex justify-between">
                <span>[Name] aadi2005</span><span>[DOB] 09/12/2005</span>
              </div>
              <div className="flex justify-between">
                <span>[gender] male</span><span>[location] internet</span>
              </div>
              <div className="border-t border-black/10 pt-1">
                <p className="font-mono" style={{ fontSize: 9, color: 'rgba(0,0,0,0.45)', fontWeight: 400, marginBottom: 1 }}>[creativity score]</p>
                <div className="font-decipher id-graffiti-score" style={{ fontSize: 30, fontWeight: 700, lineHeight: 1 }}>tends to infinity</div>
              </div>
              <div className="border-t border-black/10 pt-1">
                <div className="flex justify-between items-end gap-2">
                  <div>
                    <p style={{ fontSize: 9, color: 'rgba(0,0,0,0.45)', fontWeight: 400 }}>[availability]</p>
                    <p>always</p>
                    <p style={{ fontSize: 9, color: 'rgba(0,0,0,0.45)', fontWeight: 400 }}>[experience]</p>
                    <p>7+ years</p>
                  </div>
                  <div className="text-right">
                    <p className="font-lemon-milk" style={{ fontSize: 8, color: 'rgba(0,0,0,0.45)' }}>Issue Date</p>
                    <p>never mind</p>
                  </div>
                  <div className="text-right">
                    <p className="font-lemon-milk" style={{ fontSize: 8, color: 'rgba(0,0,0,0.45)' }}>Expiry Date</p>
                    <p>till die</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="font-brunson-rough dame text-brutal-red" style={{ fontSize: '2.4rem' }}>AADI</div>

          {/* Barcode strip */}
          <div className="flex items-center gap-3 border-t border-black/15 px-4 py-1">
            <div className="flex flex-col font-mono shrink-0" style={{ fontSize: 7, color: 'rgba(0,0,0,0.4)', lineHeight: 0.8, width: 48 }}>
              <span style={{ fontWeight: 700, color: 'rgba(0,0,0,0.6)' }}>aadi2005</span>
              <span>portfolio</span>
              <span style={{ fontSize: 6 }}>2345687</span>
            </div>
            <div className="flex-1 overflow-hidden flex items-center">
              <BarcodeEl value={PORTFOLIO_URL} />
            </div>
            <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-end font-mono shrink-0"
              style={{ fontSize: 7, color: 'rgba(0,0,0,0.4)', lineHeight: 1, width: 56, textDecoration: 'none' }}
            >
              <span style={{ fontWeight: 700, color: 'rgba(0,0,0,0.6)' }}>↗ visit</span>
              <span style={{ fontSize: 6 }}>aadi2005.com</span>
            </a>
          </div>

        </div>
      </div>
    </Tilt>
  )
}

/* ─── Ornament ────────────────────────────────────────────── */
function Ornament({ flip = false }) {
  return (
    <span className={`inline-block align-middle w-10 h-5 mb-1 ${flip ? '-scale-x-100' : ''}`}>
      <svg viewBox="0 0 56 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M4 24 C10 4, 20 4, 28 14 C36 4, 46 4, 52 24"
          stroke="#E63B2E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 14 C10 2, 20 2, 28 10 C36 2, 46 2, 52 14"
          stroke="#E63B2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      </svg>
    </span>
  )
}

/* ─── Hero ────────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef   = useRef(null)
  const videoRef     = useRef(null)
  const headingRef   = useRef(null)
  const idCardRef    = useRef(null)
  const taglineRef   = useRef(null)

  useGSAP(
    () => {
      /* ── Entry ── */
      gsap.from('.hero-line', {
        y: '115%', duration: 1.6, stagger: 0.13, ease: 'expo.out', delay: 0.2,
      })
      // Tagline fades in on entry
      gsap.from(taglineRef.current, {
        y: 28, opacity: 0, duration: 1.3, ease: 'power4.out', delay: 0.7,
      })
      // IDCard slides up from bottom on entry
      gsap.to(idCardRef.current, {
        y: 0, opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.5,
      })

      /* ── Scroll: video grows from small bottom-right card → 90% centered ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      })

      /* Video expands: anchored bottom-right → fills to 90%×90% (which is perfectly centered) */
      tl.to(videoRef.current, {
        right: '5%',
        bottom: '5%',
        width: '90%',
        height: '90%',
        borderRadius: 6,
        ease: 'power2.inOut',
      }, 0)

      /* Heading fades/dims behind the video */
      tl.to(headingRef.current, {
        opacity: 0.08,
        y: -24,
        scale: 0.97,
        ease: 'power2.out',
      }, 0)

      /* IDCard slides + fades left */
      tl.to(idCardRef.current, {
        opacity: 0,
        x: -60,
        ease: 'power2.out',
      }, 0)

      /* Tagline fades */
      tl.to(taglineRef.current, {
        opacity: 0,
        y: 12,
        ease: 'power2.out',
      }, 0)
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="relative bg-ink" style={{ minHeight: '210vh' }}>

      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ═══ Ghost graffiti BG layer ═══ */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
          {/* Giant ghost letter */}
          <span className="font-aerosoldier absolute" style={{
            fontSize: '26rem', color: 'rgba(200,255,0,0.022)',
            top: '-60px', left: '-40px', lineHeight: 1, transform: 'rotate(-5deg)',
          }}>A</span>
          {/* chaos tag */}
          <span className="font-street-wars absolute" style={{
            fontSize: '8rem', color: 'rgba(230,59,46,0.035)',
            bottom: '110px', right: '540px', lineHeight: 1, transform: 'rotate(5deg)',
          }}>chaos</span>
          {/* make em stay */}
          <span className="font-decipher absolute" style={{
            fontSize: '2.2rem', color: 'rgba(200,255,0,0.1)',
            top: '116px', right: '52px', transform: 'rotate(-8deg)',
          }}>~make em stay~</span>
          {/* content hits diff */}
          <span className="font-don-graffiti absolute" style={{
            fontSize: '1.4rem', color: 'rgba(245,230,211,0.045)',
            top: '60%', left: '44%', transform: 'rotate(3deg)',
          }}>content hits diff</span>
          {/* accent dots */}
          <div style={{ position: 'absolute', top: 180, left: '38%', width: 6, height: 6, borderRadius: '50%', background: 'rgba(200,255,0,0.15)' }} />
          <div style={{ position: 'absolute', top: 240, left: '38.5%', width: 4, height: 4, borderRadius: '50%', background: 'rgba(230,59,46,0.2)' }} />
        </div>

        {/* ═══ NAVBAR ═══ */}
        <nav className="absolute top-5 left-5 right-5 flex justify-between z-50">
          <div className="flex flex-col gap-0.5">
            {['Work', 'Services', 'Agency'].map(l => (
              <a key={l} href=""
                className="text-sm font-lemon-milk text-neutral-500 hover:text-bone transition-colors cursor-target"
              >{l}</a>
            ))}
          </div>
          <div className="font-don-graffiti text-4xl font-extrabold text-cream tracking-tight">aadi2005</div>
          <button className="font-lemon-milk text-sm text-white bg-brutal-red px-5 py-2 rounded hover:opacity-90 transition-opacity cursor-target h-fit">
            Let&apos;s Connect
          </button>
        </nav>

        {/* ═══ MAIN HEADING ═══ */}
        <div
          ref={headingRef}
          className="absolute inset-x-0 flex flex-col items-center justify-center z-10"
          style={{ top: '14%' }}
        >
          {[
            'Helping our partners',
            'build original brands',
          ].map(line => (
            <div key={line} className="overflow-hidden">
              <h1 className="hero-line font-magazine text-bone leading-none tracking-tight text-center"
                style={{ fontSize: 'clamp(2.8rem, 6vw, 6.2rem)' }}>
                {line}
              </h1>
            </div>
          ))}
          <div className="overflow-hidden">
            <h1
              className="hero-line font-magazine text-bone leading-none tracking-tight text-center flex items-center gap-6"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 6.2rem)' }}
            >
              <Ornament /> that shine. <Ornament flip />
            </h1>
          </div>
        </div>

        {/* ═══ BOTTOM-LEFT: IDCard ═══ */}
        <div
          ref={idCardRef}
          className="absolute z-20"
          style={{ bottom: 32, left: 40, opacity: 0, transform: 'translateY(40px)' }}
        >
          <HeroIDCard />
        </div>

        {/* ═══ BOTTOM-CENTER: tagline ═══ */}
        <div
          ref={taglineRef}
          className="absolute z-20"
          style={{
            bottom: 36, left: '50%', transform: 'translateX(-50%)',
            textAlign: 'center', pointerEvents: 'none', width: '240px',
          }}
        >
          <p className="font-extenda text-cream leading-relaxed" style={{ fontSize: '2rem' }}>
            A strategy-led studio laying down the awesome sauce{' '}
            <em className="italic text-bone/80">for</em>{' '}
            creators &amp; brands.
          </p>
          <span className="font-decipher" style={{
            fontSize: '1.1rem', color: '#C8FF00',
            display: 'block', marginTop: 6, transform: 'rotate(-1.5deg)',
          }}>~scroll down~</span>
        </div>

        {/* ═══ GRAFFITI above video ═══ */}
        <div className="absolute" style={{
          top:200, left: 30,
          pointerEvents: 'none',
          zIndex: 1,
        }}>
          <div className="font-aerosoldier text-right" style={{
            fontSize: '3rem',
            color: '#b01a67',
            transform: 'rotate(-4deg)',
            lineHeight: 1.3,
          }}>
            <div>~i will help </div>
            <div>your imagination</div>
            <div>come true~</div>
          </div>
        </div>

        <div className="absolute" style={{
          bottom:350, right: 30,
          pointerEvents: 'none',
          zIndex: 1,
        }}>
          <div className="font-decipher text-right" style={{
            fontSize: '1.8rem',
            color: '#C8FF00',
            transform: 'rotate(-4deg)',
            lineHeight: 1.3,
          }}>
            <div>~crafting the internet&apos;s</div>
            <div>most addictive content~</div>
          </div>
        </div>

        {/* ═══ VIDEO — starts bottom-right, expands to 90%×90% centered ═══ */}
        <div
          ref={videoRef}
          style={{
            position: 'absolute',
            right: 32,
            bottom: 20,
            width: 360,
            height: 220,
            borderRadius: 8,
            overflow: 'hidden',
            zIndex: 10,
            // boxShadow: '0 20px 60px rgba(0,0,0,0.65)',
          }}
        >
          <video
            autoPlay muted loop playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            src={sampleVideo}
          />
          {/* Left fade bleed so it merges with bg when small */}
          {/* <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: 80,
            background: 'linear-gradient(to right, rgba(13,13,13,0.8) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} /> */}
          {/* Graffiti tag on video */}
          <span className="font-decipher absolute" style={{
            bottom: 14, left: 16,
            fontSize: '1.15rem', color: 'rgba(200,255,0,0.75)',
            transform: 'rotate(-2deg)', pointerEvents: 'none', userSelect: 'none',
          }}>~the work~</span>
          {/* Tiny number badge */}
          <span className="font-mono absolute" style={{
            top: 12, left: 14, fontSize: 9, letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.5)', fontWeight: 700,
          }}>01 / SHOWREEL</span>
        </div>

        {/* Subtle grain overlay */}
        <div className="absolute inset-0 pointer-events-none z-5"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")', opacity: 0.45 }}
        />

      </div>
    </section>
  )
}


