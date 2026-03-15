import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Tilt from 'react-parallax-tilt'
import JsBarcode from 'jsbarcode'
import mainVideo from '../assets/Website Hero Video.webm'
import portraitImg from '../assets/idcard.png'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const PORTFOLIO_URL = 'https://www.youtube.com/watch?v=xnFvhn-1wHY'

const CONFIG = {
  heading: {
    fontSize: 'text-[clamp(1.6rem,5vw,2.2rem)] sm:text-[clamp(2rem,6vw,3rem)] md:text-[clamp(2.2rem,4.5vw,2.8rem)] lg:text-[clamp(3rem,5.5vw,5.5rem)] xl:text-[clamp(4rem,5.8vw,6.5rem)] 2xl:text-[clamp(5rem,6vw,8rem)]',
  },
  video: {
    desktop: { width: 380, height: 230 },
    desktop2xl: { width: 580, height: 345 },
    tablet: { width: '88%', height: 200 },
    mobile: { width: '88%' },
    desktop_pos: { right: 32, bottom: 32 },
    desktop2xl_pos: { right: 48, bottom: 48 },
    tablet_pos: { bottom: 24 },
    mobile_pos: { bottom: '4%' },
    scroll_end: { right: '5%', bottom: '5%', width: '90%', height: '90%' },
    scroll_end_tablet: { width: '96%', bottom: '5%', height: '55%' },
    scroll_end_mobile: { width: '96%', bottom: '8%' },
  },
  idCard: {
    desktop_pos: { bottom: '8%', left: '50%' },
    desktop2xl_pos: { bottom: '10%', left: '50%' },
    tablet_pos: { top: '54%', left: '50%' },
    mobile_pos: { top: '47%', left: '50%' },
    fixedWidth: 420,
    scale2xl: 1.45,
  },
  tagline: {
    bottom: '20%',
    width: '300px',
  },
  heading_top: {
    desktop: '14%',
    tablet: '8%',
    mobile: '10%',
    wide: '50%',    // 2xl: vertically centered
  },
  graffiti: {
    ghostA: { fontSize: 'clamp(12rem, 40vw, 30rem)', opacity: 0.04 },
    chaos: { fontSize: 'clamp(4rem, 10vw, 10rem)', opacity: 0.07 },
    makeEmStay: { fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)', opacity: 0.18 },
    contentHits: { fontSize: 'clamp(1rem, 1.5vw, 1.6rem)', opacity: 0.09 },
    leftTag: {
      mobile: { fontSize: 'clamp(0.85rem, 3.5vw, 1.1rem)', opacity: 0.7 },
      tablet: { fontSize: '1.4rem', opacity: 0.65 },
      desktop: { fontSize: 'clamp(2rem, 2.7vw, 3.5rem)', opacity: 1.0 },
      color: '#b01a67',
    },
    rightTag: {
      tablet: { fontSize: 'clamp(0.9rem, 2vw, 1.3rem)', opacity: 0.65 },
      desktop: { fontSize: 'clamp(1.2rem, 1.8vw, 2rem)', opacity: 1.0 },
      color: '#C8FF00',
    },
  },
}

function BarcodeEl({ value }) {
  const svgRef = useRef(null)
  useEffect(() => {
    if (svgRef.current) {
      JsBarcode(svgRef.current, value, {
        format: 'CODE128', width: 1.6, height: 40, displayValue: false, background: 'transparent', lineColor: '#1a1a1a', margin: 0,
      })
    }
  }, [value])
  return <svg ref={svgRef} style={{ width: '100%' }} />
}

function Ornament({ flip = false }) {
  return (
    <span className={`inline-block align-middle w-10 h-5 mb-1 ${flip ? '-scale-x-100' : ''}`}>
      <svg viewBox="0 0 56 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M4 24 C10 4, 20 4, 28 14 C36 4, 46 4, 52 24" stroke="#E63B2E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 14 C10 2, 20 2, 28 10 C36 2, 46 2, 52 14" stroke="#E63B2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      </svg>
    </span>
  )
}

function HeroIDCard() {
  return (
    <div className="hero-id-scale-wrapper">
      <Tilt tiltMaxAngleX={12} tiltMaxAngleY={12} perspective={1100} glareEnable glareMaxOpacity={0.22} glareColor="#ddd0ff" scale={1.03} transitionSpeed={600} gyroscope>
        <div className="rounded-2xl p-[2px] id-card-glow-border" style={{ width: 420 }}>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#D4C4A8', width: 420 }}>
            <div className="absolute inset-0 id-card-shimmer pointer-events-none z-20 rounded-2xl" />
            <div className="flex justify-between items-center px-4 py-1 border-b border-black/10">
              <div>
                <p className="font-mono" style={{ fontSize: 8, letterSpacing: '0.1em', fontWeight: 700, color: 'rgba(0,0,0,0.6)', textTransform: 'uppercase' }}>Identification Card</p>
                <p className="font-mono" style={{ fontSize: 8, color: 'rgba(0,0,0,0.35)' }}>No.2345687981798</p>
              </div>
              <div className="font-decipher id-hologram-text text-2xl graffiti-highlight font-semibold cursor-target">license for chaos</div>
            </div>
            <div className="relative flex flex-row gap-4 px-4 pt-3 pb-3">
              <div className="shrink-0 cursor-target">
                <div style={{ width: 88, height: 120, border: '2px solid rgba(0,0,0,0.2)', overflow: 'hidden', borderRadius: 2 }}>
                  <img src={portraitImg} alt="aadi2005" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
              <div className="flex-1 flex flex-col font-mono" style={{ fontSize: 10, fontWeight: 700, color: '#000', gap: 2 }}>
                <div className="flex justify-between"><span>[Name] aadi2005</span><span>[DOB] 09/12/2005</span></div>
                <div className="flex justify-between"><span>[gender] male</span><span>[location] internet</span></div>
                <div className="border-t border-black/10 pt-1">
                  <p className="font-mono" style={{ fontSize: 9, color: 'rgba(0,0,0,0.45)', fontWeight: 400, marginBottom: 1 }}>[creativity score]</p>
                  <div className="font-decipher id-graffiti-score cursor-target" style={{ fontSize: 30, fontWeight: 700, lineHeight: 1 }}>tends to infinity</div>
                </div>
                <div className="border-t border-black/10 pt-1">
                  <div className="flex justify-between items-end gap-2">
                    <div>
                      <p style={{ fontSize: 9, color: 'rgba(0,0,0,0.45)', fontWeight: 400 }}>[availability]</p><p>always</p>
                      <p style={{ fontSize: 9, color: 'rgba(0,0,0,0.45)', fontWeight: 400 }}>[experience]</p><p>7+ years</p>
                    </div>
                    <div className="text-right"><p style={{ fontSize: 8, color: 'rgba(0,0,0,0.45)' }}>Issue Date</p><p>never mind</p></div>
                    <div className="text-right"><p style={{ fontSize: 8, color: 'rgba(0,0,0,0.45)' }}>Expiry Date</p><p>till die</p></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="font-aerosoldier dame text-brutal-red cursor-target" style={{ fontSize: '2.4rem' }}>AADI</div>
            <div className="font-aerosoldier id-graffiti-overlay cursor-target" style={{ fontSize: '2.4rem' }}>awesome</div>
            <div className="flex items-center gap-3 border-t border-black/15 px-4 py-1 relative z-30">
              <div className="flex flex-col font-mono shrink-0" style={{ fontSize: 7, color: 'rgba(0,0,0,0.4)', lineHeight: 0.8, width: 48 }}>
                <span style={{ fontWeight: 700, color: 'rgba(0,0,0,0.6)' }}>aadi2005</span><span>portfolio</span><span style={{ fontSize: 6 }}>2345687</span>
              </div>
              <a href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center gap-3 cursor-target group relative z-40" style={{ textDecoration: 'none' }}>
                <div className="flex-1 overflow-hidden flex items-center opacity-85 group-hover:opacity-100 transition-opacity"><BarcodeEl value={PORTFOLIO_URL} /></div>
                <div className="flex flex-col items-end font-mono shrink-0" style={{ fontSize: 7, color: 'rgba(0,0,0,0.4)', lineHeight: 1, width: 56 }}>
                  <span style={{ fontWeight: 700, color: 'rgba(0,0,0,0.6)' }} className="group-hover:text-brutal-red transition-colors">↗ visit</span><span style={{ fontSize: 6 }}>aadi2005.com</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </Tilt>
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-id-scale-wrapper {
          transform-origin: center center;
          transition: transform 0.3s ease;
        }
        @media (max-width: 500px) {
          .hero-id-scale-wrapper { transform: scale(0.85); }
        }
        @media (max-width: 440px) {
          .hero-id-scale-wrapper { transform: scale(0.75); }
        }
        @media (max-width: 380px) {
          .hero-id-scale-wrapper { transform: scale(0.65); }
        }
      `}} />
    </div>
  )
}

function Hero({ onNavigate }) {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const headingRef = useRef(null)
  const idCardRef = useRef(null)
  const taglineRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1536px)', () => {
      gsap.set(headingRef.current, { top: '50%', yPercent: -50 })
      gsap.set(idCardRef.current, { ...CONFIG.idCard.desktop2xl_pos, xPercent: -50, top: 'auto', scale: CONFIG.idCard.scale2xl, opacity: 0, y: 40, transformOrigin: 'bottom center' })
      gsap.set(videoRef.current, { ...CONFIG.video.desktop2xl_pos, ...CONFIG.video.desktop2xl })
      gsap.from('.hero-line', { y: '115%', duration: 1.6, stagger: 0.13, ease: 'expo.out', delay: 0.2 })
      gsap.to(idCardRef.current, { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.5 })
      const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: 1 } })
      tl.to(videoRef.current, { ...CONFIG.video.scroll_end, borderRadius: 6, ease: 'power2.inOut' }, 0)
      tl.to(headingRef.current, { opacity: 0.08, y: -24, scale: 0.97 }, 0)
      tl.to(idCardRef.current, { opacity: 0, y: 100 }, 0)
    })
    mm.add('(min-width: 1024px) and (max-width: 1535px)', () => {
      gsap.set(headingRef.current, { top: CONFIG.heading_top.desktop })
      gsap.set(idCardRef.current, { ...CONFIG.idCard.desktop_pos, xPercent: -50, top: 'auto', opacity: 0, y: 40, transformOrigin: 'bottom center' })
      gsap.set(videoRef.current, { ...CONFIG.video.desktop_pos, ...CONFIG.video.desktop })
      gsap.from('.hero-line', { y: '115%', duration: 1.6, stagger: 0.13, ease: 'expo.out', delay: 0.2 })
      gsap.to(idCardRef.current, { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.5 })
      const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: 1 } })
      tl.to(videoRef.current, { ...CONFIG.video.scroll_end, borderRadius: 6, ease: 'power2.inOut' }, 0)
      tl.to(headingRef.current, { opacity: 0.08, y: -24, scale: 0.97 }, 0)
      tl.to(idCardRef.current, { opacity: 0, y: 100 }, 0)
    })
    mm.add('(min-width: 768px) and (max-width: 1023px)', () => {
      gsap.set(headingRef.current, { top: CONFIG.heading_top.tablet })
      gsap.set(idCardRef.current, { ...CONFIG.idCard.tablet_pos, xPercent: -50, yPercent: -50, opacity: 0, y: 40 })
      gsap.set(videoRef.current, { ...CONFIG.video.tablet_pos, left: '50%', xPercent: -50, width: CONFIG.video.tablet.width, height: CONFIG.video.tablet.height })
      gsap.from('.hero-line', { y: '115%', duration: 1.6, stagger: 0.1, ease: 'expo.out', delay: 0.2 })
      gsap.to(idCardRef.current, { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.5 })
      const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: 1 } })
      tl.to(videoRef.current, { ...CONFIG.video.scroll_end_tablet, borderRadius: 6, ease: 'power2.inOut' }, 0)
    })
    mm.add('(max-width: 767px)', () => {
      gsap.set(headingRef.current, { top: CONFIG.heading_top.mobile })
      gsap.set(idCardRef.current, { ...CONFIG.idCard.mobile_pos, xPercent: -50, yPercent: -50, opacity: 0, y: 40 })
      gsap.set(videoRef.current, { ...CONFIG.video.mobile_pos, left: '50%', xPercent: -50, width: CONFIG.video.mobile.width })
      gsap.from('.hero-line', { y: '115%', duration: 1.6, stagger: 0.1, ease: 'expo.out', delay: 0.2 })
      gsap.to(idCardRef.current, { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.5 })
      const tl = gsap.timeline({ scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: 1 } })
      tl.to(videoRef.current, { ...CONFIG.video.scroll_end_mobile, ease: 'power2.inOut' }, 0)
    })
    return () => mm.revert()
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative bg-ink" style={{ minHeight: '210vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
          <span className="font-aerosoldier absolute" style={{ fontSize: CONFIG.graffiti.ghostA.fontSize, color: `rgba(200,255,0,${CONFIG.graffiti.ghostA.opacity})`, top: '-20px', left: '-10px', lineHeight: 1, transform: 'rotate(-5deg)' }}>A</span>
          <span className="font-street-wars absolute hidden md:block" style={{ fontSize: CONFIG.graffiti.chaos.fontSize, color: `rgba(230,59,46,${CONFIG.graffiti.chaos.opacity})`, bottom: '140px', left: '32%', lineHeight: 1, transform: 'rotate(4deg)' }}>chaos</span>
          <span className="font-don-graffiti absolute hidden lg:block" style={{ fontSize: CONFIG.graffiti.contentHits.fontSize, color: `rgba(245,230,211,${CONFIG.graffiti.contentHits.opacity})`, top: '56%', left: '40%', transform: 'rotate(3deg)' }}>content hits diff</span>
        </div>
        <div className="absolute hidden md:block pointer-events-none z-[1]" style={{ top: '9%', right: '2%' }}>
          <span className="font-decipher" style={{ fontSize: CONFIG.graffiti.makeEmStay.fontSize, color: `rgba(200,255,0,${CONFIG.graffiti.makeEmStay.opacity})`, display: 'block', transform: 'rotate(-7deg)', textShadow: '0 0 14px rgba(200,255,0,0.25)', pointerEvents: 'auto' }}>~make em stay~</span>
        </div>
        <div className="absolute hidden md:block pointer-events-none z-[1]" style={{ top: '38%', left: '1.5%' }}>
          <div className="font-aerosoldier block cursor-target" style={{ fontSize: CONFIG.graffiti.leftTag.desktop.fontSize, color: CONFIG.graffiti.leftTag.color, opacity: CONFIG.graffiti.leftTag.desktop.opacity, transform: 'rotate(-4deg)', lineHeight: 1.3, pointerEvents: 'auto' }}>
            <div>~i will make</div><div>your imagination</div><div>come true~</div>
          </div>
        </div>
        <div className="absolute hidden md:block pointer-events-none z-[1]" style={{ bottom: '32%', right: '1.5%' }}>
          <div className="font-decipher block cursor-target" style={{ fontSize: CONFIG.graffiti.rightTag.desktop.fontSize, color: CONFIG.graffiti.rightTag.color, opacity: CONFIG.graffiti.rightTag.desktop.opacity, transform: 'rotate(-4deg)', lineHeight: 1.3, textAlign: 'right', pointerEvents: 'auto' }}>
            <div>~crafting the internet&apos;s</div><div>most addictive content~</div>
          </div>
        </div>
        <div ref={taglineRef} className="absolute" style={{ bottom: '20%', left: '50%', opacity: 0 }} />

        {/* ── NAV: aadi2005 center, Discord + email left, NO connect button ── */}
        <nav className="absolute top-5 left-5 right-5 flex items-center justify-between z-50">
          <div className="hidden md:flex flex-col gap-0.5">
            <a
              href="https://discord.com/users/aadi2005"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-lemon-milk text-neutral-500 hover:text-bone transition-colors cursor-target"
            >
              Discord-aadi2005
            </a>
            <a
              href="mailto:edit@aadi2005.com"
              className="text-sm font-lemon-milk text-neutral-500 hover:text-bone transition-colors cursor-target"
            >
              edit@aadi2005.com
            </a>
          </div>
          {/* Brand — center on desktop, full width on mobile */}
          <div className="font-don-graffiti text-3xl md:text-4xl cursor-target font-extrabold text-cream tracking-tight mx-auto md:mx-0">
            aadi2005
          </div>
          {/* Right side — empty spacer so brand stays centered on desktop */}
          <div className="hidden md:block" style={{ width: 120 }} />
        </nav>

        <div ref={headingRef} className="absolute inset-x-0 flex flex-col items-center justify-center z-10 px-4" style={{ top: CONFIG.heading_top.desktop }}>
          <div className="overflow-hidden">
            <h1 className={`hero-line font-magazine text-bone leading-none tracking-tight text-center ${CONFIG.heading.fontSize}`}>
              TURNING CHAOS
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className={`hero-line font-magazine text-bone leading-none tracking-tight text-center flex items-center justify-center gap-3 sm:gap-4 ${CONFIG.heading.fontSize}`}>
              INTO <span className="font-rosie-serif text-brutal-red inline-block transform ml-4 pt-2">stories</span>
            </h1>
          </div>
        </div>
        <div ref={idCardRef} className="absolute z-20 cursor-target"><HeroIDCard /></div>
        <div ref={videoRef} className="absolute z-10 overflow-hidden rounded-[12px] cursor-target">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover block" src={mainVideo} />
          <span className="font-decipher absolute" style={{ bottom: 14, left: 16, fontSize: '1.15rem', color: 'rgba(229, 255, 0, 0.75)', transform: 'rotate(-2deg)', pointerEvents: 'none' }}>~show that hits different~</span>
          <span className="font-mono absolute" style={{ top: 12, left: 14, fontSize: 9, color: 'rgba(255,255,255,0.5)', fontWeight: 700 }}>01 / SHOWREEL</span>
        </div>
        <div className="absolute inset-0 pointer-events-none z-[5]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`, opacity: 0.45 }} />
      </div>
    </section>
  )
}

export default Hero