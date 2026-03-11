import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import sampleVideo from '../assets/sample videp.mp4'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ─── small inline SVG ornament (red wing/chevron accent) ─── */
function Ornament({ flip = false }) {
  return (
    <span className={`inline-block align-middle w-10 h-5 mb-1 ${flip ? '-scale-x-100' : ''}`}>
      <svg viewBox="0 0 56 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M4 24 C10 4, 20 4, 28 14 C36 4, 46 4, 52 24"
          stroke="#E63B2E"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 14 C10 2, 20 2, 28 10 C36 2, 46 2, 52 14"
          stroke="#E63B2E"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.5"
        />
      </svg>
    </span>
  )
}

export default function Hero() {
  const sectionRef      = useRef(null)
  const videoWrapperRef = useRef(null)
  const leftPanelRef    = useRef(null)
  const headingRef      = useRef(null)

  useGSAP(
    () => {
      /* ── Entry animations ── */
      gsap.from('.hero-line', {
        y: '115%',
        duration: 1.6,
        stagger: 0.13,
        ease: 'expo.out',
        delay: 0.2,
      })

      gsap.from('.hero-fade', {
        y: 28,
        opacity: 0,
        duration: 1.3,
        stagger: 0.09,
        ease: 'power4.out',
        delay: 0.55,
      })

      /* ── Scroll: video card expands from bottom-right to full screen ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.4,
        },
      })

      tl.to(
        videoWrapperRef.current,
        {
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '0px',
          ease: 'power2.inOut',
        },
        0,
      )

      tl.to(
        leftPanelRef.current,
        {
          opacity: 0,
          y: -18,
          ease: 'power2.out',
        },
        0,
      )

      tl.to(
        headingRef.current,
        {
          opacity: 0.25,
          ease: 'power2.out',
        },
        0,
      )
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="relative bg-ink hero-section">

      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ═══ NAVBAR ═══ */}

        <nav className='absolute top-5 left-5 flex justify-between right-5'>
          <div className="flex flex-col">
            <div className='text-sm text-neutral-500 font-lemon-milk'><a href="">Work</a></div>
            <div className='text-sm text-neutral-500 font-lemon-milk'><a href="">Services</a></div>
            <div className='text-sm text-neutral-500 font-lemon-milk'><a href="">Agency</a></div>
          </div>

          <div className='text-4xl text-cream font-extrabold font-don-graffiti'> aadi2005 </div>

          <button className='h-10 w-30 p-2 bg-brutal-red rounded text-sm font-lemon-milk text-white '>Let's Connect</button>



        </nav>
 

        {/* ═══ MAIN HEADING ═══ */}
        <div ref={headingRef} className="relative top-20 inset-0 flex items-center flex-col justify-center px-12 pt-10 pb-40">
          <div className="overflow-hidden">
            <h1 className="hero-line font-magazine font-normal text-bone text-7xl leading-none tracking-tight">
              Helping our partners
            </h1>
          </div>

          <div className="overflow-hidden">
            <h1 className="hero-line font-magazine font-normal text-bone text-7xl leading-none tracking-tight">
              build original brands
            </h1>
          </div>

          <div className="overflow-hidden">
            <h1 className="hero-line font-magazine font-normal text-bone text-7xl leading-none tracking-tight flex items-center gap-6">
              <Ornament />
              that shine.
              <Ornament flip />
            </h1>
          </div>
        </div>

        {/* ═══ BOTTOM-LEFT PANEL ═══ */}
        <div ref={leftPanelRef} className="absolute z-10 bottom-1 left-12 max-w-sm">
          <p className="hero-fade font-sakire text-cream text-2xl leading-relaxed">
            A strategy-led design 
            studio specializing in laying down the awesome sauce{' '}
            <em className="font-sakire text-xl italic text-bone/80">for</em>{' '}
            Technology brands.
          </p>
        </div>

        {/* ═══ VIDEO PANEL — starts bottom-right, expands to full on scroll ═══ */}
        <div ref={videoWrapperRef} className="absolute h-full overflow-hidden hero-video-card">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            src={sampleVideo}
          />

          {/* Thin gradient bleed on left edge for seamless merge */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-ink to-transparent pointer-events-none" />
        </div>

      </div>
    </section>
  )
}
