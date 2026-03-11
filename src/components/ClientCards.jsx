import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Tilt from 'react-parallax-tilt'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const CLIENTS = [
  {
    name: 'CLASSDOJO',
    role: 'Video Production & Editing',
    thumb: 'https://images.unsplash.com/photo-1536240478700-b869ad10fbe2?w=600&q=80',
    href: 'https://classdojo.com',
    stat: '2M+ Views',
  },
  {
    name: 'EMILY BLACK ASMR',
    role: 'YouTube Editing & Retention',
    thumb: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80',
    href: 'https://youtube.com',
    stat: '500K+ Subs',
  },
  {
    name: 'BUCH MEDIA',
    role: 'Branding & Content Strategy',
    thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80',
    href: 'https://buchmedia.com',
    stat: '100+ Videos',
  },
]

function ClientCard({ name, role, thumb, href, stat, index }) {
  const overlayRef = useRef(null)

  const handleEnter = () => {
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' })
  }

  const handleLeave = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' })
  }

  return (
    <Tilt
      glareEnable
      glareMaxOpacity={0.15}
      glareColor="#F5E6D3"
      glarePosition="all"
      tiltMaxAngleX={6}
      tiltMaxAngleY={6}
      transitionSpeed={500}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="view"
        className="client-card group relative block overflow-hidden border border-bone/10"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{ aspectRatio: '4 / 5' }}
      >
        {/* Background image */}
        <img
          src={thumb}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4] saturate-[0.6] group-hover:brightness-[0.55] group-hover:scale-105 transition-all duration-700"
          loading="lazy"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

        {/* Hover overlay with arrow */}
        <div
          ref={overlayRef}
          className="absolute inset-0 flex items-center justify-center bg-brutal-red/20 opacity-0"
        >
          <div className="w-16 h-16 rounded-full border-2 border-bone/60 flex items-center justify-center">
            <ArrowUpRight size={24} strokeWidth={2} className="text-bone" />
          </div>
        </div>

        {/* Top-right tag */}
        <div className="absolute top-4 right-4 z-10">
          <span className="text-meta text-[8px] tracking-[0.3em] text-bone/50 bg-ink/50 px-2 py-1">
            {stat}
          </span>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <p className="text-meta text-[8px] tracking-[0.35em] text-brutal-red mb-1">
            0{index + 1}
          </p>
          <h3 className="heading-brutal text-bone text-[clamp(1.2rem,2.5vw,1.8rem)] leading-none mb-1.5">
            {name}
          </h3>
          <p className="text-meta text-[9px] tracking-[0.2em] text-bone/50">
            {role}
          </p>
        </div>
      </a>
    </Tilt>
  )
}

export default function ClientCards() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      gsap.from('.client-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
        y: 60,
        opacity: 0,
        duration: 1.0,
        stagger: 0.15,
        ease: 'expo.out',
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="w-full bg-ink py-20">
      {/* Section header */}
      <div className="flex items-end justify-between px-8 md:px-14 mb-12">
        <div>
          <p className="text-meta text-[10px] tracking-[0.45em] text-bone/40 mb-2">
            ◆&nbsp;&nbsp;CLIENTS
          </p>
          <h2 className="heading-brutal text-bone text-[clamp(2rem,4vw,3.5rem)] leading-none">
            TRUSTED<br />
            <span className="text-brutal-red">BY</span>
          </h2>
        </div>
        <p className="text-meta text-[10px] tracking-[0.2em] text-bone/40 hidden md:block">
          SELECT PARTNERS
        </p>
      </div>

      {/* Cards grid */}
      <div className="px-8 md:px-14 grid grid-cols-1 md:grid-cols-3 gap-5">
        {CLIENTS.map((client, i) => (
          <ClientCard key={client.name} {...client} index={i} />
        ))}
      </div>
    </section>
  )
}
