import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* Discord icon SVG — Lucide doesn't have one, use inline SVG */
function DiscordIcon({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  )
}

export default function Footer({ onNavigate }) {
  const sectionRef = useRef(null)
  const fillTextRef = useRef(null)

  useGSAP(
    () => {
      gsap.fromTo(
        fillTextRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 1.2,
          },
        },
      )

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
      <div className="px-5 sm:px-8 md:px-14 pt-12 sm:pt-16 pb-10 sm:pb-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-12">

        {/* Left: label + contact links */}
        <div>
          <p className="footer-link text-meta text-[9px] tracking-[0.45em] text-bone/40 mb-4">
            ◆&nbsp;&nbsp;LET&apos;S BUILD SOMETHING
          </p>

          {/* Discord */}
          <a
            href="https://discord.com/users/aadi2005"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link group relative inline-flex items-center gap-3 cursor-target mb-3"
          >
            <DiscordIcon size={22} className="text-bone/50 group-hover:text-[#5865F2] transition-colors duration-300 flex-shrink-0" />
            <span className="heading-brutal text-bone text-[clamp(1.2rem,2.5vw,1.8rem)] leading-none group-hover:text-[#5865F2] transition-colors duration-300">
              Discord-aadi2005
            </span>
          </a>

          {/* Email */}
          <a
            href="mailto:edit@aadi2005.com"
            className="footer-link group relative flex items-center gap-3 cursor-target"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-bone/50 group-hover:text-brutal-red transition-colors duration-300 flex-shrink-0">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            <span className="heading-brutal text-bone text-[clamp(1.2rem,2.5vw,1.8rem)] leading-none group-hover:text-brutal-red transition-colors duration-300">
              edit@aadi2005.com
            </span>
          </a>
        </div>

        {/* Right: social icon buttons */}
        <nav className="flex gap-4" aria-label="Social links">
          {/* Discord */}
          <a
            href="https://discord.com/users/aadi2005"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link group flex items-center justify-center w-12 h-12 rounded-full border border-bone/15 hover:border-[#5865F2] hover:bg-[#5865F2] transition-all duration-300 cursor-target"
            aria-label="Discord"
          >
            <DiscordIcon size={18} className="text-bone/60 group-hover:text-white transition-colors duration-300" />
          </a>
          {/* Email */}
          <a
            href="mailto:edit@aadi2005.com"
            className="footer-link group flex items-center justify-center w-12 h-12 rounded-full border border-bone/15 hover:border-brutal-red hover:bg-brutal-red transition-all duration-300 cursor-target"
            aria-label="Email"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-bone/60 group-hover:text-bone transition-colors duration-300">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </a>
        </nav>
      </div>

      <div className="mx-5 sm:mx-8 md:mx-14 h-[1px] bg-bone/10" />

      {/* Big AADDI text */}
      <div className="relative w-full overflow-hidden leading-none select-none">
        <span
          aria-label="AADDI"
          className="block w-full text-center heading-brutal text-[23vw] leading-[0.82] text-stroke px-2 pb-[0.04em] cursor-target"
        >
          AADDI
        </span>
        <span
          ref={fillTextRef}
          aria-hidden="true"
          className="absolute inset-0 block w-full text-center heading-brutal text-[23vw] leading-[0.82] text-stroke-fill px-2 pb-[0.04em]"
          style={{ clipPath: 'inset(100% 0 0 0)' }}
        >
          AADDI
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between px-5 sm:px-8 md:px-14 pb-5 pt-3 gap-2 sm:gap-0">
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
