import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Instagram, Twitter, Youtube, ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const SOCIALS = [
  {
    label: 'INSTAGRAM',
    href: 'https://instagram.com',
    Icon: Instagram,
  },
  {
    label: 'X / TWITTER',
    href: 'https://x.com',
    Icon: Twitter,
  },
  {
    label: 'YOUTUBE',
    href: 'https://youtube.com',
    Icon: Youtube,
  },
]

export default function Footer() {
  const sectionRef  = useRef(null)
  const fillTextRef = useRef(null) // the solid-red clone, clip-animated

  useGSAP(
    () => {
      /*
        Two text layers stacked with position: absolute.
          - Ghost layer (always visible):  black stroke, transparent fill
          - Fill layer  (fillTextRef):     solid brutal-red, initially
            clipped to inset(100% 0 0 0) so nothing shows.

        ScrollTrigger scrubs the clip from 100% → 0% as the page
        reaches its bottom edge, revealing the red fill growing upward.
      */
      gsap.fromTo(
        fillTextRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',   // when footer enters viewport from below
            end: 'bottom bottom',  // by the time the very bottom is at the viewport bottom
            scrub: 1.2,
          },
        },
      )

      // Entrance: social links + label slide in
      gsap.from('.footer-link', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'expo.out',
      })
    },
    { scope: sectionRef },
  )

  return (
    <footer ref={sectionRef} className="w-full bg-dark-surface border-t border-bone/10">

      {/* ── Top strip ───────────────────────────────────────────────── */}
      <div className="px-8 md:px-14 pt-16 pb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-12">

        {/* Left — label + contact CTA */}
        <div>
          <p className="footer-link text-meta text-[9px] tracking-[0.45em] text-bone/40 mb-4">
            ◆&nbsp;&nbsp;LET'S BUILD SOMETHING
          </p>
          <a
            href="mailto:contact@aaddi.com"
            data-cursor="view"
            className="footer-link group relative inline-flex items-center gap-3"
          >
            <span className="heading-brutal text-bone text-[clamp(1.6rem,3.5vw,2.6rem)] leading-none group-hover:text-brutal-red transition-colors duration-300">
              LET'S CONNECT
            </span>
            <ArrowUpRight
              size={28}
              strokeWidth={2.5}
              className="text-brutal-red flex-shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
            />
          </a>
          <p className="footer-link text-meta text-[9px] mt-3 tracking-[0.2em] text-bone/40">
            contact@aaddi.com
          </p>
        </div>

        {/* Right — social links as circles */}
        <nav className="flex gap-4" aria-label="Social links">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="view"
              className="footer-link group flex items-center justify-center w-12 h-12 rounded-full border border-bone/15 hover:border-brutal-red hover:bg-brutal-red transition-all duration-300"
              aria-label={label}
            >
              <Icon
                size={18}
                strokeWidth={2}
                className="text-bone/60 group-hover:text-bone transition-colors duration-300"
              />
            </a>
          ))}
        </nav>
      </div>

      {/* ── Divider ─────────────────────────────────────────────────── */}
      <div className="mx-8 md:mx-14 h-[1px] bg-bone/10" />

      {/* ── Massive AADDI text ──────────────────────────────────────── */}
      {/*
        Wrapper is relative + overflow-hidden so the text never
        causes a horizontal scrollbar at any size.
        Two identical <span>s are stacked; the fill clone is absolute.
      */}
      <div className="relative w-full overflow-hidden leading-none select-none">

        {/* Ghost — black stroke, transparent fill (always visible) */}
        <span
          aria-label="AADDI"
          className="
            block w-full text-center
            heading-brutal text-[23vw] leading-[0.82]
            text-stroke
            px-2 pb-[0.04em]
          "
        >
          AADDI
        </span>

        {/* Fill clone — solid brutal-red, clip-revealed by GSAP */}
        <span
          ref={fillTextRef}
          aria-hidden="true"
          className="
            absolute inset-0
            block w-full text-center
            heading-brutal text-[23vw] leading-[0.82]
            text-stroke-fill
            px-2 pb-[0.04em]
          "
          style={{ clipPath: 'inset(100% 0 0 0)' }}
        >
          AADDI
        </span>
      </div>

      {/* ── Bottom meta bar ─────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-8 md:px-14 pb-6 pt-4">
        <p className="text-meta text-[8px] tracking-[0.2em] text-bone/30">
          © 2026 AADDI MEDIA. ALL RIGHTS RESERVED.
        </p>
        <p className="text-meta text-[8px] tracking-[0.2em] text-bone/30">
          MADE WITH PRECISION.
        </p>
      </div>

    </footer>
  )
}
