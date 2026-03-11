import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

const ITEMS = [
  '7+ YEARS EXP',
  '//',
  '100K+ OWN SUBS',
  '//',
  '1M+ CLIENT SUBS',
  '//',
  '40M+ TOTAL VIEWS',
  '//',
  'CLASSDOJO',
  '//',
  'BUCH MEDIA',
  '//',
  'YOUTUBE',
  '//',
  'TIKTOK',
  '//',
]

function Strip() {
  return (
    <div className="flex items-center flex-shrink-0" aria-hidden="true">
      {ITEMS.map((item, i) => (
        <span
          key={i}
          className={`
            whitespace-nowrap uppercase select-none
            text-[clamp(2.8rem,6vw,5rem)] font-black leading-none tracking-tight
            ${item === '//'
              ? 'px-6 text-brutal-red'
              : 'px-8 text-bone'}
          `}
        >
          {item}
        </span>
      ))}
    </div>
  )
}

export default function StatsMarquee() {
  const trackRef = useRef(null)

  useGSAP(
    () => {
      /*
        Render two identical Strip copies.
        Animate x from 0 → -50% so the seam between copy 1 and copy 2
        is perfectly invisible, then modWrap repeats forever.
      */
      gsap.to(trackRef.current, {
        x: '-50%',
        duration: 28,
        ease: 'none',
        repeat: -1,
      })
    },
    { scope: trackRef },
  )

  return (
    <section className="w-full overflow-hidden bg-ink border-y-2 border-bone/10 py-5">
      {/* Outer mask */}
      <div className="w-full overflow-hidden">
        {/* Track — twice as wide so the seam is invisible */}
        <div ref={trackRef} className="flex w-max will-change-transform">
          <Strip />
          {/* Duplicate for seamless loop */}
          <Strip />
        </div>
      </div>
    </section>
  )
}
