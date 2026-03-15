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
        <div>
          <p className="footer-link text-meta text-[9px] tracking-[0.45em] text-bone/40 mb-4">
            ◆&nbsp;&nbsp;LET'S BUILD SOMETHING
          </p>
          <button
            onClick={() => onNavigate('connect')}
            data-cursor="view"
            className="footer-link group relative inline-flex items-center gap-3 cursor-target text-left"
          >
            <span className="heading-brutal text-bone text-[clamp(1.6rem,3.5vw,2.6rem)] leading-none group-hover:text-brutal-red transition-colors duration-300">
              LET'S CONNECT
            </span>
            <ArrowUpRight
              size={28}
              strokeWidth={2.5}
              className="text-brutal-red flex-shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
            />
          </button>
          <p className="footer-link text-meta text-[9px] mt-3 tracking-[0.2em] text-bone/40">
            contact@aaddi.com
          </p>
        </div>

        <nav className="flex gap-4" aria-label="Social links">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="view"
              className="footer-link group flex items-center justify-center w-12 h-12 rounded-full border border-bone/15 hover:border-brutal-red hover:bg-brutal-red transition-all duration-300 cursor-target"
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

      <div className="mx-5 sm:mx-8 md:mx-14 h-[1px] bg-bone/10" />

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
