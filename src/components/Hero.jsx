import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Tilt from 'react-parallax-tilt'
import JsBarcode from 'jsbarcode'
import sampleVideo from '../assets/sample videp.mp4'
import portraitImg from '../assets/blog04.jpg'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const PORTFOLIO_URL = 'https://www.youtube.com/watch?v=xnFvhn-1wHY'

/* ============================================================
   ░░ RESPONSIVE CONFIG — CHANGE SIZES HERE, NOWHERE ELSE ░░
   ============================================================
   All font sizes, video dimensions, and positions live here.
   sm  = 640px+   (large phone / small tablet)
   md  = 768px+   (tablet)
   lg  = 1024px+  (small laptop)
   xl  = 1280px+  (desktop)
   2xl = 1536px+  (large desktop)
   ============================================================ */
const CONFIG = {
  heading: {
    // Font size for each breakpoint (Tailwind class string — edit freely)
    fontSize: 'text-[2rem] sm:text-[3rem] md:text-[3.8rem] lg:text-[5.5rem] xl:text-[7rem] 2xl:text-[9rem]',
  },
  video: {
    // Initial video size per breakpoint — GSAP owns these, not Tailwind
    // Values used inside gsap.matchMedia breakpoints below
    desktop: { width: 380, height: 230 },   // md+  initial size (bottom-right corner)
    mobile:  { width: '88%' },              // <md  initial size (bottom-center)
    // Where the video sits initially
    desktop_pos: { right: 32, bottom: 32 },
    mobile_pos:  { bottom: '4%' },
    // Where it expands TO on scroll
    scroll_end: { right: '5%', bottom: '5%', width: '90%', height: '90%' },
    scroll_end_mobile: { width: '96%', bottom: '8%' },
  },
  idCard: {
    // Desktop: bottom-left corner
    desktop_pos: { bottom: 32, left: 40 },
    // Mobile: centered in viewport
    mobile_pos:  { top: '47%', left: '50%' },
    // Card is always 420px wide — scaled down on small screens via GSAP scale
    fixedWidth: 420,
  },
  tagline: {
    // Tagline sits above the video at the bottom-center
    bottom: '20%',
    width: '300px',
  },
  heading_top: {
    desktop: '14%',
    mobile:  '10%',
  },
}

/* ============================================================
   BARCODE — renders a CODE128 barcode as inline SVG
   ============================================================ */
function BarcodeEl({ value }) {
  const svgRef = useRef(null)

  useEffect(() => {
    if (svgRef.current) {
      JsBarcode(svgRef.current, value, {
        format: 'CODE128',
        width: 1.6,
        height: 40,
        displayValue: false,
        background: 'transparent',
        lineColor: '#1a1a1a',
        margin: 0,
      })
    }
  }, [value])

  return <svg ref={svgRef} style={{ width: '100%' }} />
}

/* ============================================================
   ORNAMENT — decorative SVG wave used in the heading
   Pass `flip` to mirror it for the right side
   ============================================================ */
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

/* ============================================================
   ID CARD — the physical-style identity card
   Fixed at 420px wide. On small screens GSAP scales it down
   so it always fits within the viewport.
   ============================================================ */
function HeroIDCard() {
  return (
    <Tilt
      tiltMaxAngleX={12} tiltMaxAngleY={12}
      perspective={1100}
      glareEnable glareMaxOpacity={0.22} glareColor="#ddd0ff"
      scale={1.03} transitionSpeed={600} gyroscope
    >
      {/* Glow border wrapper */}
      <div className="rounded-2xl p-[2px] id-card-glow-border" style={{ width: 420 }}>

        {/* Card background */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#D4C4A8', width: 420 }}>

          {/* Shimmer overlay */}
          <div className="absolute inset-0 id-card-shimmer pointer-events-none z-20 rounded-2xl" />

          {/* ── Header row ── */}
          <div className="flex justify-between items-center px-4 py-1 border-b border-black/10">
            <div>
              <p className="font-mono" style={{ fontSize: 8, letterSpacing: '0.1em', fontWeight: 700, color: 'rgba(0,0,0,0.6)', textTransform: 'uppercase' }}>
                Identification Card
              </p>
              <p className="font-mono" style={{ fontSize: 8, color: 'rgba(0,0,0,0.35)' }}>
                No.2345687981798
              </p>
            </div>
            <div className="font-decipher id-hologram-text text-2xl graffiti-highlight font-semibold">
              license for chaos
            </div>
          </div>

          {/* ── Body: photo + info ── */}
          <div className="relative flex flex-row gap-4 px-4 pt-3 pb-3">

            {/* Photo */}
            <div className="shrink-0">
              <div style={{ width: 88, height: 120, border: '2px solid rgba(0,0,0,0.2)', overflow: 'hidden', borderRadius: 2 }}>
                <img src={portraitImg} alt="aadi2005" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

            {/* Info fields */}
            <div className="flex-1 flex flex-col font-mono" style={{ fontSize: 10, fontWeight: 700, color: '#000', gap: 2 }}>
              <div className="flex justify-between">
                <span>[Name] aadi2005</span>
                <span>[DOB] 09/12/2005</span>
              </div>
              <div className="flex justify-between">
                <span>[gender] male</span>
                <span>[location] internet</span>
              </div>

              {/* Creativity score */}
              <div className="border-t border-black/10 pt-1">
                <p className="font-mono" style={{ fontSize: 9, color: 'rgba(0,0,0,0.45)', fontWeight: 400, marginBottom: 1 }}>
                  [creativity score]
                </p>
                <div className="font-decipher id-graffiti-score" style={{ fontSize: 30, fontWeight: 700, lineHeight: 1 }}>
                  tends to infinity
                </div>
              </div>

              {/* Availability / Experience / Dates */}
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

          {/* Big name stamp */}
          <div className="font-brunson-rough dame text-brutal-red" style={{ fontSize: '2.4rem' }}>AADI</div>

          {/* ── Barcode strip ── */}
          <div className="flex items-center gap-3 border-t border-black/15 px-4 py-1">
            <div className="flex flex-col font-mono shrink-0" style={{ fontSize: 7, color: 'rgba(0,0,0,0.4)', lineHeight: 0.8, width: 48 }}>
              <span style={{ fontWeight: 700, color: 'rgba(0,0,0,0.6)' }}>aadi2005</span>
              <span>portfolio</span>
              <span style={{ fontSize: 6 }}>2345687</span>
            </div>
            <div className="flex-1 overflow-hidden flex items-center">
              <BarcodeEl value={PORTFOLIO_URL} />
            </div>
            <a
              href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer"
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

/* ============================================================
   HERO SECTION — main export
   ============================================================
   Layout structure (all inside a sticky viewport):
     • Ghost graffiti BG        z-0   (desktop only, decorative)
     • Graffiti text overlays   z-1   (desktop only, decorative)
     • Main heading             z-10  (animated in + fades on scroll)
     • Video                    z-10  (grows to fill screen on scroll)
     • ID Card                  z-20  (slides in + fades on scroll)
     • Tagline                  z-20  (fades on scroll)
     • Navbar                   z-50  (always on top)
     • Grain overlay            z-[5] (subtle texture, always visible)
   ============================================================ */
export default function Hero() {
  const sectionRef  = useRef(null) // full-height scroll container
  const videoRef    = useRef(null) // the video element wrapper
  const headingRef  = useRef(null) // "Helping our partners..." text block
  const idCardRef   = useRef(null) // ID card wrapper
  const taglineRef  = useRef(null) // tagline + "scroll down" text

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      /* ──────────────────────────────────────────
         DESKTOP (768px and above)
         ────────────────────────────────────────── */
      mm.add('(min-width: 768px)', () => {

        // ── Set initial positions ──
        gsap.set(headingRef.current, { top: CONFIG.heading_top.desktop })

        gsap.set(idCardRef.current, {
          ...CONFIG.idCard.desktop_pos,   // bottom: 32, left: 40
          top: 'auto',
          xPercent: 0,
          yPercent: 0,
          x: 0,
          y: 40,         // starts 40px lower, animates up to y:0
          opacity: 0,
        })

        gsap.set(videoRef.current, {
          ...CONFIG.video.desktop_pos,    // right: 32, bottom: 32
          ...CONFIG.video.desktop,        // width: 380, height: 230
          left: 'auto',
          xPercent: 0,
          x: 0,
        })

        // ── Entry animations (play once on load) ──
        gsap.from('.hero-line', {
          y: '115%', duration: 1.6, stagger: 0.13, ease: 'expo.out', delay: 0.2,
        })
        gsap.from(taglineRef.current, {
          y: 28, opacity: 0, duration: 1.3, ease: 'power4.out', delay: 0.7,
        })
        gsap.to(idCardRef.current, {
          y: 0, opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.5,
        })

        // ── Scroll timeline (scrubbed, tied to scroll position) ──
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          },
        })

        // Video expands to fill viewport
        tl.to(videoRef.current, { ...CONFIG.video.scroll_end, borderRadius: 6, ease: 'power2.inOut' }, 0)
        // Heading fades and shrinks slightly
        tl.to(headingRef.current, { opacity: 0.08, y: -24, scale: 0.97, ease: 'power2.out' }, 0)
        // ID card slides left and fades
        tl.to(idCardRef.current, { opacity: 0, x: -60, ease: 'power2.out' }, 0)
        // Tagline fades down
        tl.to(taglineRef.current, { opacity: 0, y: 12, ease: 'power2.out' }, 0)
      })

      /* ──────────────────────────────────────────
         MOBILE (below 768px)
         ────────────────────────────────────────── */
      mm.add('(max-width: 767px)', () => {

        // Scale card to fit screen width (card is 420px fixed)
        // e.g. on a 375px screen: scale = (375 - 32) / 420 ≈ 0.817
        const scaleCard = () => {
          gsap.set(idCardRef.current, {
            scale: Math.min(1, (window.innerWidth - 32) / CONFIG.idCard.fixedWidth),
          })
        }

        // ── Set initial positions ──
        gsap.set(headingRef.current, { top: CONFIG.heading_top.mobile })

        gsap.set(idCardRef.current, {
          ...CONFIG.idCard.mobile_pos,    // top: '47%', left: '50%'
          xPercent: -50,
          yPercent: -50,
          bottom: 'auto',
          width: CONFIG.idCard.fixedWidth,
          y: 40,         // starts 40px lower, animates up to y:0
          opacity: 0,
          transformOrigin: 'center center',
        })
        scaleCard()
        window.addEventListener('resize', scaleCard)

        gsap.set(videoRef.current, {
          ...CONFIG.video.mobile_pos,     // bottom: '4%'
          left: '50%',
          xPercent: -50,
          width: CONFIG.video.mobile.width,  // '88%'
          right: 'auto',
          height: 'auto',
        })

        // ── Entry animations ──
        gsap.from('.hero-line', {
          y: '115%', duration: 1.6, stagger: 0.1, ease: 'expo.out', delay: 0.2,
        })
        gsap.from(taglineRef.current, {
          y: 20, opacity: 0, duration: 1.3, ease: 'power4.out', delay: 0.7,
        })
        gsap.to(idCardRef.current, {
          y: 0, opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.5,
        })

        // ── Scroll timeline ──
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          },
        })

        tl.to(headingRef.current, { opacity: 0.1, y: -20, ease: 'power2.out' }, 0)
        tl.to(idCardRef.current, { opacity: 0, y: -40, ease: 'power2.out' }, 0)
        tl.to(taglineRef.current, { opacity: 0, ease: 'power2.out' }, 0)
        tl.to(videoRef.current, { ...CONFIG.video.scroll_end_mobile, ease: 'power2.inOut' }, 0)

        // Cleanup: remove resize listener when matchMedia context is reverted
        return () => window.removeEventListener('resize', scaleCard)
      })

      return () => mm.revert()
    },
    { scope: sectionRef },
  )

  return (
    /* Full-height scroll container — 210vh gives the scrub animation room */
    <section ref={sectionRef} className="relative bg-ink" style={{ minHeight: '210vh' }}>

      {/* Sticky viewport — everything inside stays fixed while you scroll */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ════════════════════════════════════════
            GHOST GRAFFITI BACKGROUND
            Purely decorative, hidden on mobile.
            Safe to edit text / positions freely.
            ════════════════════════════════════════ */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 hidden md:block">

          {/* Giant ghost "A" top-left */}
          <span className="font-aerosoldier absolute" style={{
            fontSize: '26rem', color: 'rgba(200,255,0,0.022)',
            top: '-60px', left: '-40px', lineHeight: 1, transform: 'rotate(-5deg)',
          }}>A</span>

          {/* "chaos" tag bottom-center */}
          <span className="font-street-wars absolute" style={{
            fontSize: '8rem', color: 'rgba(230,59,46,0.035)',
            bottom: '110px', right: '540px', lineHeight: 1, transform: 'rotate(5deg)',
          }}>chaos</span>

          {/* "make em stay" top-right */}
          <span className="font-decipher absolute" style={{
            fontSize: '2.2rem', color: 'rgba(200,255,0,0.1)',
            top: '116px', right: '52px', transform: 'rotate(-8deg)',
          }}>~make em stay~</span>

          {/* "content hits diff" mid-screen */}
          <span className="font-don-graffiti absolute" style={{
            fontSize: '1.4rem', color: 'rgba(245,230,211,0.045)',
            top: '60%', left: '44%', transform: 'rotate(3deg)',
          }}>content hits diff</span>

          {/* Accent dots */}
          <div style={{ position: 'absolute', top: 180, left: '38%', width: 6, height: 6, borderRadius: '50%', background: 'rgba(200,255,0,0.15)' }} />
          <div style={{ position: 'absolute', top: 240, left: '38.5%', width: 4, height: 4, borderRadius: '50%', background: 'rgba(230,59,46,0.2)' }} />
        </div>

        {/* ════════════════════════════════════════
            NAVBAR
            ════════════════════════════════════════ */}
        <nav className="absolute top-5 left-5 right-5 flex items-center justify-between z-50">

          {/* Left nav links — desktop only */}
          <div className="hidden md:flex flex-col gap-0.5">
            {['Work', 'Services', 'Agency'].map(l => (
              <a key={l} href="#"
                className="text-sm font-lemon-milk text-neutral-500 hover:text-bone transition-colors"
              >{l}</a>
            ))}
          </div>

          {/* Logo — centered on mobile, left-aligned on desktop */}
          <div className="font-don-graffiti text-3xl md:text-4xl font-extrabold text-cream tracking-tight mx-auto md:mx-0">
            aadi2005
          </div>

          {/* CTA button — desktop only */}
          <button className="hidden md:block font-lemon-milk text-sm text-white bg-brutal-red px-5 py-2 rounded hover:opacity-90 transition-opacity">
            Let&apos;s Connect
          </button>
        </nav>

        {/* ════════════════════════════════════════
            MAIN HEADING
            Font size controlled via CONFIG.heading.fontSize
            GSAP sets top position, text clips for reveal animation
            ════════════════════════════════════════ */}
        <div
          ref={headingRef}
          className="absolute inset-x-0 flex flex-col items-center justify-center z-10 px-4"
          style={{ top: CONFIG.heading_top.desktop }} // default; GSAP overrides per breakpoint
        >
          {/* Lines 1 and 2 — plain text */}
          {['Helping our partners', 'build original brands'].map(line => (
            <div key={line} className="overflow-hidden">
              <h1 className={`hero-line font-magazine text-bone leading-none tracking-tight text-center ${CONFIG.heading.fontSize}`}>
                {line}
              </h1>
            </div>
          ))}

          {/* Line 3 — text with ornaments either side */}
          <div className="overflow-hidden">
            <h1 className={`hero-line font-magazine text-bone leading-none tracking-tight text-center flex items-center justify-center gap-4 sm:gap-6 ${CONFIG.heading.fontSize}`}>
              <Ornament /> that shine. <Ornament flip />
            </h1>
          </div>
        </div>

        {/* ════════════════════════════════════════
            ID CARD
            Positioned and sized entirely by GSAP.
            Do not add position/size Tailwind classes here.
            ════════════════════════════════════════ */}
        <div ref={idCardRef} className="absolute z-20">
          <HeroIDCard />
        </div>

        {/* ════════════════════════════════════════
            TAGLINE
            Hidden on xs screens (too cluttered).
            Position from CONFIG.tagline
            ════════════════════════════════════════ */}
        <div
          ref={taglineRef}
          className="absolute z-20 hidden sm:block"
          style={{
            bottom: CONFIG.tagline.bottom,
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            pointerEvents: 'none',
            width: CONFIG.tagline.width,
          }}
        >
          <p className="font-extenda text-cream leading-relaxed" style={{ fontSize: '1.4rem' }}>
            A strategy-led studio laying down the awesome sauce{' '}
            <em className="italic text-bone/80">for</em>{' '}
            creators &amp; brands.
          </p>
          <span className="font-decipher" style={{
            fontSize: '1rem', color: '#C8FF00',
            display: 'block', marginTop: 4, transform: 'rotate(-1.5deg)',
          }}>~scroll down~</span>
        </div>

        {/* ════════════════════════════════════════
            GRAFFITI TEXT OVERLAYS — desktop only
            Decorative. Edit text / colors freely.
            ════════════════════════════════════════ */}

        {/* Left side — "i will help your imagination come true" */}
        <div className="absolute hidden md:block pointer-events-none z-[1]"
          style={{ top: 200, left: 30 }}>
          <div className="font-aerosoldier text-right" style={{
            fontSize: '3rem', color: '#b01a67',
            transform: 'rotate(-4deg)', lineHeight: 1.3,
          }}>
            <div>~i will help </div>
            <div>your imagination</div>
            <div>come true~</div>
          </div>
        </div>

        {/* Right side — "crafting the internet's most addictive content" */}
        <div className="absolute hidden md:block pointer-events-none z-[1]"
          style={{ bottom: 350, right: 30 }}>
          <div className="font-decipher text-right" style={{
            fontSize: '1.8rem', color: '#C8FF00',
            transform: 'rotate(-4deg)', lineHeight: 1.3,
          }}>
            <div>~crafting the internet&apos;s</div>
            <div>most addictive content~</div>
          </div>
        </div>

        {/* ════════════════════════════════════════
            VIDEO
            No size/position classes — GSAP owns all of that.
            Edit video src in the imports at the top.
            ════════════════════════════════════════ */}
        <div
          ref={videoRef}
          className="absolute z-10 overflow-hidden rounded-[12px]"
          // No width/height/position classes here — all set by GSAP
        >
          <video
            autoPlay muted loop playsInline
            className="w-full h-full object-cover block"
            src={sampleVideo}
          />

          {/* "~the work~" graffiti tag bottom-left of video */}
          <span className="font-decipher absolute" style={{
            bottom: 14, left: 16,
            fontSize: '1.15rem', color: 'rgba(200,255,0,0.75)',
            transform: 'rotate(-2deg)', pointerEvents: 'none', userSelect: 'none',
          }}>~the work~</span>

          {/* "01 / SHOWREEL" badge top-left of video */}
          <span className="font-mono absolute" style={{
            top: 12, left: 14, fontSize: 9, letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.5)', fontWeight: 700,
          }}>01 / SHOWREEL</span>
        </div>

        {/* ════════════════════════════════════════
            GRAIN OVERLAY — subtle film texture on top of everything
            ════════════════════════════════════════ */}
        <div
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
            opacity: 0.45,
          }}
        />

      </div>
    </section>
  )
}