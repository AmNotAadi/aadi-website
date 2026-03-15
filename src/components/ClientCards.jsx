import { useRef, useState, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// ── Portrait imports ──────────────────────────────────────────
import climg1 from '../assets/clientsname/A car a day.jpg'
import climg2 from '../assets/clientsname/Artemis.png'
import climg3 from '../assets/clientsname/ClassDojo.jpg'
import climg4 from '../assets/clientsname/Dainty Wilder.jpg'
import climg5 from '../assets/clientsname/DeeperRealms.jpg'
import climg6 from '../assets/clientsname/Emily.jpg'
import climg7 from '../assets/clientsname/HackingTheSystem.jpg'
import climg8 from '../assets/clientsname/Jubeeone.jpg'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ══════════════════════════════════════════════════════════════
   CONFIG — all tweakable values in one place
══════════════════════════════════════════════════════════════ */
const CFG = {
  scrubSpeed:     0.8,   // low = fast + smooth response
  rotateDuration: 0.4,  // fast snap

  // Ring radius per breakpoint (px)
  // The circle center is pushed left so only right half shows.
  // "peek" = how many px of the right arc are visible on screen.
  // circle center X = peek - R  (relative to left edge of viewport)
  // At 0° the notch sits right at the peek point.
  // peekVw = where the arc RIGHT EDGE sits as % of viewport width.
  // The circle center = peekVw*vw - R, so the full circle is visible
  // when peekVw*vw > R (i.e. center is on-screen).
  // We set peekVw so center lands at ~38-42% from left on every screen.
  radiusMobile:   180,   peekVwMobile:   0.68,   // center at ~58% → full circle + padding
  radiusTablet:   260,   peekVwTablet:   0.56,   // center at ~42%
  radiusDesktop:  360,   peekVwDesktop:  0.42,   // center at ~30%
  radius2xl:      440,   peekVw2xl:      0.38,   // center at ~28%

  // Portrait = this fraction of ring radius
  portraitFactor: 0.86,

  // Node dots
  nodeSizeOff:   10,
  nodeScaleOn:   1.8,
  nodeOpacityOff:0.3,

  // Tick mark
  tickH: 16,

  // Gap from arc right edge to info panel text (px)
  infoGap: 80,

  // Colors
  bg:   '#0A0A0A',
  text: '#F5E6D3',
  meta: 'rgba(245,230,211,0.28)',
}

/* ══════════════════════════════════════════════════════════════
   CLIENTS  ── add/edit here
══════════════════════════════════════════════════════════════ */
const CLIENTS = [
  { id:1, name:'EMILY BLACK ASMR',    handle:'@emilyblackasmr',     platforms:['youtube','instagram','tiktok'], link:'https://www.youtube.com/@EmilyBlackASMR',       accent:'#FF00FF', portrait:climg6 },
  { id:2, name:'CLASS DOJO INC',      handle:'@classdojo',           platforms:['youtube','tiktok'],             link:'https://www.youtube.com/@classdojo',             accent:'#C8FF00', portrait:climg3 },
  { id:3, name:'DAINTY WILDER ASMR',  handle:'@daintywilderasmr',    platforms:['youtube','instagram','tiktok'], link:'https://www.youtube.com/@DaintyWilderASMR',      accent:'#FF6600', portrait:climg4 },
  { id:4, name:'A CAR A DAY',         handle:'@acaraday.automotive',  platforms:['youtube'],                     link:'https://www.youtube.com/@acaraday.automotive',   accent:'#FF3B3B', portrait:climg1 },
  { id:5, name:'ARTEMIS SIM RACING',  handle:'@artemissimracing',    platforms:['youtube'],                     link:'https://www.youtube.com/@ArtemisSimRacing1',     accent:'#00D9FF', portrait:climg2 },
  { id:6, name:'JUBEEONE',            handle:'@jubeeone',            platforms:['twitch','youtube'],             link:'https://www.youtube.com/@jubeeone1/videos',      accent:'#9146FF', portrait:climg8 },
  { id:7, name:'HACKING THE SYSTEM',  handle:'@hackingthesystem',    platforms:['youtube'],                     link:'https://www.youtube.com/@HackingTheSystemmm',    accent:'#FFD700', portrait:climg7 },
  { id:8, name:'DEEPERREALMSTV',      handle:'@deeperrealmstv',      platforms:['youtube','instagram'],          link:'https://www.youtube.com/@DeeperRealms_TV',       accent:'#766dfa', portrait:climg5 },
]
const N = CLIENTS.length

/* ══════════════════════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════════════════════ */
const YTIcon  = ({c,s})=><svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
const IGIcon  = ({c,s})=><svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
const TTIcon  = ({c,s})=><svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.16 8.16 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z"/></svg>
const TWIcon  = ({c,s})=><svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0h1.714v5.143h-1.714zm-8.843 8.843L4.857 11.142h-1.714v10.286h4.572v2.857l2.857-2.857h3.429l6.285-6.286V2.428H3.143v13.143h4.286zM20.571 4.143v9.143l-3.428 3.428h-3.429l-2.857 2.857v-2.857H6.57V4.143h14.001z"/></svg>
function PIcon({p,c,s=16}){
  if(p==='youtube')   return <YTIcon c={c} s={s}/>
  if(p==='instagram') return <IGIcon c={c} s={s}/>
  if(p==='tiktok')    return <TTIcon c={c} s={s}/>
  if(p==='twitch')    return <TWIcon c={c} s={s}/>
  return null
}

/* ══════════════════════════════════════════════════════════════
   GEOMETRY — angle of node i on the wheel
══════════════════════════════════════════════════════════════ */
function nodeDeg(i){ return (360/N)*i }
function ptOnRing(deg, r){
  const rad=(deg*Math.PI)/180
  return { x:r*Math.cos(rad), y:r*Math.sin(rad) }
}

/* ══════════════════════════════════════════════════════════════
   RESPONSIVE GEO HOOK
   Returns { R, peek } based on current viewport width.
   Re-runs on resize.
══════════════════════════════════════════════════════════════ */
function useGeo(){
  const get = useCallback(()=>{
    const w = typeof window!=='undefined' ? window.innerWidth : 1440
    // peek (px) = peekVw * viewport width — so arc position scales with screen
    if(w < 480)  return { R:CFG.radiusMobile,  peek: Math.round(w * CFG.peekVwMobile)  }
    if(w < 768)  return { R:CFG.radiusTablet,  peek: Math.round(w * CFG.peekVwTablet)  }
    if(w < 1536) return { R:CFG.radiusDesktop, peek: Math.round(w * CFG.peekVwDesktop) }
    return             { R:CFG.radius2xl,      peek: Math.round(w * CFG.peekVw2xl)     }
  },[])

  const [geo, setGeo] = useState(()=>get())

  useEffect(()=>{
    const onResize = ()=> setGeo(get())
    window.addEventListener('resize', onResize)
    return ()=> window.removeEventListener('resize', onResize)
  },[get])

  return geo
}

/* ══════════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════════ */
export default function ClientCards(){
  const { R, peek } = useGeo()

  /* ── Derived measurements ── */
  const D          = R * 2
  const portraitD  = R * CFG.portraitFactor
  // Circle center X = peek - R
  // Circle div left edge = peek - 2R
  // Clamp to minimum 20px so circle never clips off-screen left
  const circleLeft = Math.max(20, peek - D)

  // Actual peek after clamping (circle right edge)
  const arcEdge    = circleLeft + D

  // Info panel starts at: arcEdge + infoGap
  const infoLeft   = arcEdge + CFG.infoGap

  /* ── Refs ── */
  const sectionRef      = useRef(null)
  const wheelRef        = useRef(null)
  const portraitRef     = useRef(null)
  const notchTriRef     = useRef(null)
  const notchLineRef    = useRef(null)
  const infoRef         = useRef(null)
  const nodeRefs        = useRef([])

  const [active, setActive] = useState(0)
  const activeRef = useRef(0)

  /* ── GSAP ── */
  useGSAP(()=>{
    // Entrance: circle slides in from left
    gsap.from('.cc-circle-wrap',{
      scrollTrigger:{ trigger:sectionRef.current, start:'top 74%', toggleActions:'play none none none' },
      opacity:0, x:-200, duration:1.5, ease:'expo.out',
    })
    // Entrance: info panel slides in from right
    gsap.from('.cc-info',{
      scrollTrigger:{ trigger:sectionRef.current, start:'top 72%', toggleActions:'play none none none' },
      opacity:0, x:120, duration:1.3, ease:'expo.out', delay:0.18,
    })

    // Scroll-driven wheel
    // scrub:true ties rotation DIRECTLY to scroll position — 1:1, no lag
    const stepDeg = 360 / N

    // Use a gsap tween scrubbed to scroll — most performant approach
    const totalRot = -(N - 1) * stepDeg
    gsap.to(wheelRef.current, {
      rotation: totalRot,
      ease: 'none',                        // linear = matches scroll exactly
      scrollTrigger: {
        trigger: sectionRef.current,
        start:   'top top',
        end:     'bottom bottom',
        scrub:   true,                     // true = instant 1:1 with scroll, no lag
      }
    })

    // Separate onUpdate for info panel + node highlights
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start:   'top top',
      end:     'bottom bottom',
      scrub:   true,
      onUpdate(self){
        const raw = self.progress * (N - 1)
        const idx = Math.max(0, Math.min(N-1, Math.round(raw)))

        // Mutate nodes directly — zero React
        CLIENTS.forEach((_,i)=>{
          const nd = nodeRefs.current[i]
          if(!nd) return
          const on = i === idx
          nd.style.opacity    = on ? '1' : String(CFG.nodeOpacityOff)
          nd.style.background = on ? CLIENTS[i].accent : 'rgba(245,230,211,0.3)'
          nd.style.transform  = `translate(-50%,-50%) scale(${on ? CFG.nodeScaleOn : 1})`
          nd.style.boxShadow  = on
            ? `0 0 0 4px ${CLIENTS[i].accent}33,0 0 16px ${CLIENTS[i].accent}77`
            : 'none'
        })

        // Swap portrait
        if(portraitRef.current) portraitRef.current.src = CLIENTS[idx].portrait

        // Update notch colour
        const acc = CLIENTS[idx].accent
        if(notchTriRef.current)  notchTriRef.current.style.borderRightColor = acc
        if(notchLineRef.current) notchLineRef.current.style.background = acc

        // React re-render only on index change (~8 times total)
        if(idx !== activeRef.current){
          activeRef.current = idx
          setActive(idx)
          gsap.fromTo(infoRef.current,
            { opacity:0, y:16 },
            { opacity:1, y:0, duration:0.35, ease:'power3.out' }
          )
        }
      }
    })
  },{ scope:sectionRef, dependencies:[R, peek] })

  const cl = CLIENTS[active]

  return(
    <section
      ref={sectionRef}
      style={{ background:CFG.bg, minHeight:`${N*150}vh`, position:'relative' }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* grain */}
        <div className="absolute inset-0 pointer-events-none z-[5]" style={{
          backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity:0.45,
        }}/>

        {/* top bar */}
        <div style={{
          position:'absolute', top:24, left:24, right:24,
          display:'flex', justifyContent:'space-between', alignItems:'center',
          zIndex:40,
        }}>
          <p style={{fontFamily:'monospace',fontSize:9,letterSpacing:'0.14em',textTransform:'uppercase',color:CFG.meta}}>
            ◆&nbsp;&nbsp;THEY TRUSTED THE CHAOS
          </p>
          <p style={{fontFamily:'monospace',fontSize:9,letterSpacing:'0.14em',textTransform:'uppercase',color:CFG.meta}}>
            {String(active+1).padStart(2,'0')} / {String(N).padStart(2,'0')}
          </p>
        </div>

        {/* ══════════════════════════════════════════════════
            CIRCLE WRAP
            Left edge at: peek - 2R
            So the circle's right edge (= peek) is where the notch sits.
        ══════════════════════════════════════════════════ */}
        <div
          className="cc-circle-wrap"
          style={{
            position:'absolute',
            left: circleLeft,
            top:  `calc(50vh - ${R}px)`,
            width: D, height: D,
            zIndex: 20,
          }}
        >
          {/* Portrait — static center, never rotates */}
          <div style={{
            position:'absolute', left:'50%', top:'50%',
            transform:'translate(-50%,-50%)',
            width:portraitD, height:portraitD,
            borderRadius:'50%', overflow:'hidden',
            background:'#111', zIndex:25,
          }}>
            <img
              ref={portraitRef}
              src={CLIENTS[0].portrait}
              alt="client portrait"
              style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
            />
          </div>

          {/* Rotating wheel */}
          <div
            ref={wheelRef}
            style={{
              position:'absolute', inset:0,
              transformOrigin:'center center',
              transform:'rotate(0deg)',
              willChange:'transform',
            }}
          >
            {/* Outer ring */}
            <div style={{
              position:'absolute', inset:0, borderRadius:'50%',
              border:'1.5px solid rgba(245,230,211,0.12)', pointerEvents:'none',
            }}/>
            {/* Inner ghost ring */}
            <div style={{
              position:'absolute', inset:20, borderRadius:'50%',
              border:'1px dashed rgba(245,230,211,0.04)', pointerEvents:'none',
            }}/>

            {/* Nodes */}
            {CLIENTS.map((c,i)=>{
              const deg    = nodeDeg(i)
              const {x,y}  = ptOnRing(deg, R)
              return(
                <div key={c.id} style={{
                  position:'absolute',
                  left: R+x, top: R+y,
                  width:0, height:0,
                }}>
                  {/* Dot */}
                  <div
                    ref={el=>nodeRefs.current[i]=el}
                    style={{
                      position:'absolute',
                      width:  CFG.nodeSizeOff,
                      height: CFG.nodeSizeOff,
                      borderRadius:'50%',
                      background: i===0 ? c.accent : 'rgba(245,230,211,0.3)',
                      opacity:    i===0 ? 1 : CFG.nodeOpacityOff,
                      boxShadow:  i===0 ? `0 0 0 4px ${c.accent}33,0 0 16px ${c.accent}77` : 'none',
                      transform:  `translate(-50%,-50%) scale(${i===0?CFG.nodeScaleOn:1})`,
                      zIndex:3,
                    }}
                  />
                  {/* Tick */}
                  <div style={{
                    position:'absolute',
                    width:1, height:CFG.tickH,
                    background:'rgba(245,230,211,0.1)',
                    transform:`translate(-50%,-50%) rotate(${deg}deg)`,
                    transformOrigin:'center top',
                    zIndex:2,
                  }}/>
                </div>
              )
            })}
          </div>

        </div>

        {/* ══════════════════════════════════════════════════
            INFO PANEL
            Anchored at: left = peek + infoGap (px from left)
            This keeps it always right of the arc on every screen.
        ══════════════════════════════════════════════════ */}
        <div
          ref={infoRef}
          className="cc-info"
          style={{
            position:'absolute',
            left: infoLeft,
            top:'50%',
            transform:'translateY(-50%)',
            zIndex:30,
            maxWidth: `calc(100vw - ${infoLeft + 32}px)`, minWidth: 'min(360px, 90vw)',
          }}
        >
          {/* Counter */}
          <p style={{
            fontFamily:'monospace', fontSize:9, letterSpacing:'0.14em',
            textTransform:'uppercase', color:CFG.meta,
            marginBottom:10,
          }}>
            CLIENT {String(active+1).padStart(2,'0')} / {String(N).padStart(2,'0')}
          </p>

          {/* Big name */}
          <h2 style={{
            fontFamily:"'lemon milk','Helvetica Neue',sans-serif",
            fontWeight:900,
            fontSize:'clamp(2rem,5vw,5.5rem)',
            letterSpacing:'-0.04em',
            lineHeight:0.92,
            color:CFG.text,
            marginBottom:12,
          }}>
            {cl.name}
          </h2>

          {/* Handle */}
          <p
            className="font-decipher"
            style={{
              fontSize:'clamp(1rem,1.6vw,1.5rem)',
              color:cl.accent,
              transform:'rotate(-1.5deg)',
              display:'inline-block',
              marginBottom:20,
            }}
          >
            {cl.handle}
          </p>

          {/* Divider */}
          <div style={{ width:44, height:1.5, background:'rgba(245,230,211,0.1)', marginBottom:22 }}/>

          {/* Platform icons + View pill */}
          <div style={{ display:'flex', alignItems:'center', flexWrap:'wrap', gap:'clamp(8px,1vw,12px)' }}>

            {/* Icon circles — display only */}
            {cl.platforms.map(p=>(
              <div key={p} style={{
                width:'clamp(36px,3.5vw,46px)',
                height:'clamp(36px,3.5vw,46px)',
                borderRadius:'50%',
                background:'rgba(255,255,255,0.06)',
                border:`1px solid ${cl.accent}44`,
                display:'flex', alignItems:'center', justifyContent:'center',
                flexShrink:0,
              }}>
                <PIcon p={p} c={cl.accent} s={16}/>
              </div>
            ))}

            {/* VIEW pill — only clickable element */}
            <a
              href={cl.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:'inline-flex', alignItems:'center', gap:8,
                paddingTop:0, paddingBottom:0, paddingLeft:'clamp(14px,1.4vw,20px)', paddingRight:'clamp(14px,1.4vw,20px)',
                height:'clamp(36px,3.5vw,46px)',
                borderRadius:999,
                border:`1px solid ${cl.accent}`,
                background:'transparent',
                textDecoration:'none',
                cursor:'pointer',
                flexShrink:0,
                transition:'background 0.26s ease, box-shadow 0.26s ease, transform 0.26s cubic-bezier(0.34,1.56,0.64,1)',
              }}
              onMouseEnter={e=>{
                e.currentTarget.style.background = cl.accent
                e.currentTarget.style.boxShadow  = `0 0 20px ${cl.accent}66`
                e.currentTarget.style.transform  = 'scale(1.06)'
                e.currentTarget.querySelectorAll('[data-swap]').forEach(el=>el.style.color='#0A0A0A')
                const arr = e.currentTarget.querySelector('[data-arrow]')
                if(arr) arr.style.transform='translate(2px,-2px)'
              }}
              onMouseLeave={e=>{
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.boxShadow  = 'none'
                e.currentTarget.style.transform  = 'scale(1)'
                e.currentTarget.querySelectorAll('[data-swap]').forEach(el=>el.style.color=cl.accent)
                const arr = e.currentTarget.querySelector('[data-arrow]')
                if(arr) arr.style.transform='translate(0,0)'
              }}
            >
              <span data-swap style={{
                fontFamily:"'Lemon Milk',system-ui,sans-serif",
                fontSize:'clamp(0.6rem,0.8vw,0.75rem)',
                fontWeight:700, letterSpacing:'0.12em',
                textTransform:'uppercase',
                color:cl.accent,
                whiteSpace:'nowrap',
                transition:'color 0.26s ease',
              }}>View</span>
              <svg data-arrow data-swap
                width="10" height="10" viewBox="0 0 10 10" fill="none"
                style={{ color:cl.accent, flexShrink:0, transition:'color 0.26s ease, transform 0.26s cubic-bezier(0.34,1.56,0.64,1)' }}
              >
                <line x1="1" y1="9" x2="9" y2="1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <polyline points="3.5,1 9,1 9,6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </a>
          </div>

          {/* Ghost letter */}
          <div style={{ marginTop:24, pointerEvents:'none', userSelect:'none' }}>
            <span className="font-aerosoldier" style={{
              fontSize:'clamp(3rem,5vw,6rem)',
              color:cl.accent, opacity:0.055, lineHeight:1,
            }}>{cl.name.charAt(0)}</span>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position:'absolute', bottom:28, left:'50%',
          transform:'translateX(-50%)',
          display:'flex', flexDirection:'column', alignItems:'center', gap:6,
          opacity: active<N-1 ? 0.3 : 0,
          transition:'opacity 0.5s',
          zIndex:40,
        }}>
          <div style={{ width:1, height:24, background:'rgba(245,230,211,0.2)' }}/>
          <p style={{ fontFamily:'monospace', fontSize:8, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(245,230,211,0.3)' }}>
            SCROLL
          </p>
        </div>

        {/* Ghost bg letter */}
        <span className="font-aerosoldier" style={{
          position:'absolute', bottom:'-4rem', right:'5%',
          fontSize:'clamp(10rem,16vw,20rem)',
          color:'rgba(200,255,0,0.018)',
          lineHeight:1, transform:'rotate(8deg)',
          pointerEvents:'none', userSelect:'none', zIndex:1,
        }}>C</span>

      </div>

      {/* Mobile: stack info below circle */}
      <style>{`
        @media (max-width: 600px) {
          .cc-info {
            left: 16px !important;
            top: auto !important;
            bottom: 20px !important;
            transform: none !important;
            max-width: calc(100vw - 32px) !important;
          }
          .cc-circle-wrap {
            top: calc(12vh - ${R}px) !important;
          }
        }
      `}</style>
    </section>
  )
}