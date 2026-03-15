import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import client1 from '../assets/client1.jpeg'


gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ══════════════════════════════════════════════════════════════
   ██████╗ ██████╗ ███╗   ██╗███████╗██╗ ██████╗
  ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔════╝
  ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██║  ███╗
  ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██║   ██║
  ╚██████╗╚██████╔╝██║ ╚████║██║     ██║╚██████╔╝
   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝ ╚═════╝

  ALL CUSTOMISATION LIVES HERE — edit freely:
══════════════════════════════════════════════════════════════ */
const CONFIG = {

  /* ── Scroll behaviour ─────────────────────────────────── */
  scrubSpeed:    1.8,    // lower = laggier scrub, higher = snappier
  rotateDuration:0.65,   // seconds for wheel snap per step

  /* ── Ring / Circle geometry ───────────────────────────── */
  ring: {
    // Radius at each breakpoint (px). The circle is 2×radius wide/tall.
    // Half of it sits off-screen to the left.
    radiusMobile:  220,
    radiusTablet:  310,
    radiusDesktop: 420,
    radius2xl:     500,

    // How far from left edge the circle CENTER sits (% of viewport width).
    // 0.18 = 18% from left. Lower = more hidden, higher = more visible.
    centerXMobile:  0.38,
    centerXTablet:  0.28,
    centerXDesktop: 0.22,
    centerX2xl:     0.20,

    // Ring border colour & width
    borderColor:  'rgba(245,230,211,0.12)',
    borderWidth:  1.5,   // px

    // Inner ghost ring offset from edge (px)
    innerRingInset: 24,
  },

  /* ── Portrait (the image in the center of the circle) ─── */
  portrait: {
    // Portrait diameter = ring radius × this multiplier
    // 0.88 = portrait fills 88% of radius
    sizeFactor: 0.88,

    borderWidth:   3,    // px
    outerGlowSize: 12,   // px — first spread shadow
    outerGlowOpacity: 0.33,
    innerGlowBlur:    60, // px — outer blur glow
    innerGlowOpacity: 0.44,
  },

  /* ── Node dots on the ring ────────────────────────────── */
  node: {
    sizeInactive:  11,   // px diameter when not active
    scaleActive:   1.7,  // how much the active dot scales up
    opacityInactive: 0.35,
    tickHeight:    18,   // px — small tick line on ring per node
  },

  /* ── Name labels on the ring ──────────────────────────── */
  label: {
    // Distance from ring edge outward (as fraction of radius)
    outwardFactor:  0.18,
    fontSizeActive: '0.88rem',
    fontSizeInactive:'0.62rem',
    opacityInactive: 0.5,
  },

  /* ── Notch / arrow pointer ────────────────────────────── */
  notch: {
    triangleSize: 8,    // half-height of arrow triangle (px)
    lineWidth:    64,   // px — horizontal line after arrow
    lineOpacity:  0.6,
  },

  /* ── Info panel (right side) ──────────────────────────── */
  info: {
    // Gap between ring right edge and info panel (px)
    // Increase this to push the text further right away from the dial
    gapFromRing:   120,

    // Name font size clamp: [min, vw, max]
    nameFontClamp: ['2.2rem', '5.5vw', '6rem'],

    // Handle font size clamp
    handleFontClamp: ['1rem', '1.8vw', '1.7rem'],

    // Stats font size clamp
    statFontClamp: ['1.3rem', '2.2vw', '2.2rem'],

    // Divider colour & size
    dividerColor:  'rgba(245,230,211,0.1)',
    dividerWidth:  48,  // px

    // Ghost letter at bottom opacity
    ghostOpacity:  0.055,
  },

  /* ── Colours ─────────────────────────────────────────────
     Each client has its own accent. These are fallback colours.
  ── */
  colors: {
    bg:       '#0A0A0A',
    text:     '#F5E6D3',
    meta:     'rgba(245,230,211,0.28)',
    mutedMeta:'rgba(245,230,211,0.10)',
  },
}

/* ══════════════════════════════════════════════════════════════
   CLIENTS DATA  — edit names, handles, platforms, subs, accents
══════════════════════════════════════════════════════════════ */
const CLIENTS = [
  { id:1, name:' Emily Black ASMR',         handle:'@emilyblackasmr',       platforms:['youtube','instagram','tiktok'],          subs:{youtube:'1.2M',instagram:'800K',tiktok:'3.1M'},             accent:'#C8FF00', portrait: client1 },
  { id:2, name:'HACKING THE SYSTEM', handle:'@hackthesys',      platforms:['youtube','instagram','tiktok'], subs:{youtube:'2M',instagram:'600K',tiktok:'3.1M'}, accent:'#FFD700', portrait:'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=500&q=80' },
  { id:3, name:'BUCH MEDIA',         handle:'@buchmedia',        platforms:['youtube','instagram'],          subs:{youtube:'180K',instagram:'340K'},             accent:'#FF6600', portrait:'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80' },
  { id:4, name:'ARTEMIS SIM RACING', handle:'@artemissimracing', platforms:['youtube','tiktok'],             subs:{youtube:'1.1M',tiktok:'450K'},                accent:'#00D9FF', portrait:'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=500&q=80' },
  { id:5, name:'DEEPER REALMS',      handle:'@deeperrealms',     platforms:['youtube','instagram'],          subs:{youtube:'900K',instagram:'1.1M'},             accent:'#766dfa', portrait:'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&q=80' },
  { id:6, name:'BABY NOJAMIE',       handle:'@babynojamie',      platforms:['instagram','tiktok'],           subs:{instagram:'210K',tiktok:'90K'},               accent:'#FF3B3B', portrait:'https://images.unsplash.com/photo-1536240478700-b869ad10fbe2?w=500&q=80' },
]
const N = CLIENTS.length

/* ══════════════════════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════════════════════ */
const YTIcon = ({c,s=16})=><svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
const IGIcon = ({c,s=16})=><svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
const TTIcon = ({c,s=16})=><svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.16 8.16 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z"/></svg>
function PIcon({p,c,s=16}){
  if(p==='youtube')   return <YTIcon c={c} s={s}/>
  if(p==='instagram') return <IGIcon c={c} s={s}/>
  if(p==='tiktok')    return <TTIcon c={c} s={s}/>
  return null
}

/* ══════════════════════════════════════════════════════════════
   HOOK — responsive radius + centerX
══════════════════════════════════════════════════════════════ */
function useGeo(){
  const [geo, setGeo] = useState({ R:420, centerX:0.22 })
  useEffect(()=>{
    function calc(){
      const w = window.innerWidth
      let R, cx
      if(w < 480){       R=CONFIG.ring.radiusMobile;  cx=CONFIG.ring.centerXMobile  }
      else if(w < 768){  R=CONFIG.ring.radiusTablet;  cx=CONFIG.ring.centerXTablet  }
      else if(w < 1536){ R=CONFIG.ring.radiusDesktop; cx=CONFIG.ring.centerXDesktop }
      else{              R=CONFIG.ring.radius2xl;      cx=CONFIG.ring.centerX2xl     }
      setGeo({R, centerX:cx})
    }
    calc()
    window.addEventListener('resize', calc)
    return ()=>window.removeEventListener('resize', calc)
  },[])
  return geo
}

/* ══════════════════════════════════════════════════════════════
   GEOMETRY HELPERS
══════════════════════════════════════════════════════════════ */
function nodeDeg(i){ return (360/N)*i }
function ptOnRing(deg, r){
  const rad = (deg*Math.PI)/180
  return { x: r*Math.cos(rad), y: r*Math.sin(rad) }
}

/* ══════════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════════ */
export default function ClientCards(){
  const { R, centerX } = useGeo()

  const sectionRef  = useRef(null)
  const wheelRef    = useRef(null)
  const portraitRef = useRef(null)
  const portraitWrapRef = useRef(null)
  const notchTriRef = useRef(null)
  const notchLineRef= useRef(null)
  const infoRef     = useRef(null)

  const nodeRefs  = useRef([])
  const nameRefs  = useRef([])

  const [active, setActive] = useState(0)
  const activeRef = useRef(0)

  const D = R*2   // circle diameter

  /* Portrait size derived from config */
  const portraitD = R * CONFIG.portrait.sizeFactor

  /* Info panel left position = circle right edge + gap
     Circle center = centerX*100vw
     Circle right edge = centerX*100vw + R
     So panel starts at: centerX*100vw + R + gapFromRing              */
  const infoPanelLeft = `calc(${centerX*100}vw + ${R + CONFIG.info.gapFromRing}px)`

  useGSAP(()=>{
    // ── Entrance animations ────────────────────────────────
    gsap.from('.cc-title', {
      scrollTrigger:{ trigger:sectionRef.current, start:'top 76%', toggleActions:'play none none none' },
      y:60, opacity:0, duration:1.2, stagger:0.12, ease:'expo.out',
    })
    gsap.from('.cc-circle-wrap', {
      scrollTrigger:{ trigger:sectionRef.current, start:'top 73%', toggleActions:'play none none none' },
      opacity:0, x:-160, duration:1.5, ease:'expo.out',
    })
    gsap.from('.cc-info', {
      scrollTrigger:{ trigger:sectionRef.current, start:'top 71%', toggleActions:'play none none none' },
      opacity:0, x:100, duration:1.3, ease:'expo.out', delay:0.2,
    })

    // ── Scroll-driven wheel rotation ───────────────────────
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start:   'top top',
      end:     'bottom bottom',
      scrub:   CONFIG.scrubSpeed,
      onUpdate(self){
        const idx = Math.max(0, Math.min(N-1, Math.round(self.progress*(N-1))))

        // Rotate wheel
        gsap.to(wheelRef.current,{
          rotation: -nodeDeg(idx),
          duration: CONFIG.rotateDuration,
          ease:'power2.out',
          overwrite:true,
        })

        // Mutate nodes & labels directly (zero React re-renders)
        CLIENTS.forEach((_,i)=>{
          const nd  = nodeRefs.current[i]
          const nm  = nameRefs.current[i]
          const on  = i===idx
          if(nd) gsap.to(nd,{
            scale:      on ? CONFIG.node.scaleActive : 1,
            opacity:    on ? 1 : CONFIG.node.opacityInactive,
            background: on ? CLIENTS[i].accent : 'rgba(245,230,211,0.28)',
            boxShadow:  on
              ? `0 0 0 4px ${CLIENTS[i].accent}33, 0 0 14px ${CLIENTS[i].accent}66`
              : 'none',
            duration:0.4, ease:'power2.out', overwrite:true,
          })
          if(nm){
            gsap.to(nm,{
              opacity:  on ? 1 : CONFIG.label.opacityInactive,
              scale:    on ? 1.05 : 0.88,
              duration: 0.4, overwrite:true,
            })
            // direct style mutations for color & size (faster than gsap for these)
            nm.style.color      = on ? CLIENTS[i].accent : 'rgba(245,230,211,0.45)'
            nm.style.fontSize   = on ? CONFIG.label.fontSizeActive : CONFIG.label.fontSizeInactive
            nm.style.textShadow = on ? `0 0 20px ${CLIENTS[i].accent}88` : 'none'
          }
        })

        // Swap portrait
        const c = CLIENTS[idx]
        if(portraitRef.current){
          portraitRef.current.src = c.portrait
        }
        // portrait border/glow removed
        // Update notch colour
        if(notchTriRef.current)  notchTriRef.current.style.borderRightColor = c.accent
        if(notchLineRef.current) notchLineRef.current.style.background = c.accent

        // React state only on index change
        if(idx!==activeRef.current){
          activeRef.current=idx
          setActive(idx)
          gsap.fromTo(infoRef.current,
            {opacity:0, y:22},
            {opacity:1, y:0, duration:0.5, ease:'power3.out'}
          )
        }
      }
    })
  },{ scope:sectionRef, dependencies:[R, centerX] })

  const cl = CLIENTS[active]

  return(
    <section
      ref={sectionRef}
      className="relative"
      style={{ background:CONFIG.colors.bg, minHeight:`${N*130}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ── Grain overlay ───────────────────────────────── */}
        <div className="absolute inset-0 pointer-events-none z-[5]" style={{
          backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity:0.45,
        }}/>

        {/* ── Top bar ─────────────────────────────────────── */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-40">
          <p className="font-mono text-[9px] tracking-widest uppercase hidden sm:block"
            style={{color:CONFIG.colors.meta}}>
            ◆&nbsp;&nbsp;THEY TRUSTED THE CHAOS
          </p>
          <p className="font-mono text-[9px] tracking-widest uppercase"
            style={{color:CONFIG.colors.meta}}>
            {String(active+1).padStart(2,'0')} / {String(N).padStart(2,'0')}
          </p>
        </div>

        {/* ══════════════════════════════════════════════════
            CIRCLE + WHEEL
            Center sits at (centerX × 100vw, 50vh)
        ══════════════════════════════════════════════════ */}
        <div
          className="cc-circle-wrap absolute"
          style={{
            left:`calc(${centerX*100}vw - ${R}px)`,
            top:`calc(50vh - ${R}px)`,
            width:D, height:D,
            zIndex:20,
          }}
        >

          {/* ── Static portrait in center ─────────────────── */}
          <div
            ref={portraitWrapRef}
            style={{
              position:'absolute',
              left:'50%', top:'50%',
              transform:'translate(-50%,-50%)',
              width: portraitD,
              height: portraitD,
              borderRadius:'50%',
              overflow:'hidden',
              border:'none',
              boxShadow:'none',
              zIndex:25,
              background:'#111',
            }}
          >
            <img
              ref={portraitRef}
              src={CLIENTS[0].portrait}
              alt="client"
              style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
            />
          </div>

          {/* ── Rotating wheel ────────────────────────────── */}
          <div
            ref={wheelRef}
            style={{
              position:'absolute', inset:0,
              transformOrigin:'center center',
              transform:'rotate(0deg)',
              willChange:'transform',
            }}
          >
            {/* Ring border */}
            <div style={{
              position:'absolute', inset:0,
              borderRadius:'50%',
              border:`${CONFIG.ring.borderWidth}px solid ${CONFIG.ring.borderColor}`,
              pointerEvents:'none',
            }}/>
            {/* Inner ghost ring */}
            <div style={{
              position:'absolute',
              inset:CONFIG.ring.innerRingInset,
              borderRadius:'50%',
              border:'1px dashed rgba(245,230,211,0.04)',
              pointerEvents:'none',
            }}/>

            {/* ── Per-client nodes ────────────────────────── */}
            {CLIENTS.map((c,i)=>{
              const deg        = nodeDeg(i)
              const { x, y }   = ptOnRing(deg, R)
              const cx         = R + x
              const cy         = R + y
              const outwardPx  = R * CONFIG.label.outwardFactor

              return(
                <div
                  key={c.id}
                  style={{ position:'absolute', left:cx, top:cy, width:0, height:0 }}
                >
                  {/* Dot */}
                  <div
                    ref={el=>nodeRefs.current[i]=el}
                    style={{
                      position:'absolute',
                      width:  CONFIG.node.sizeInactive,
                      height: CONFIG.node.sizeInactive,
                      borderRadius:'50%',
                      background: i===0 ? c.accent : 'rgba(245,230,211,0.28)',
                      opacity:    i===0 ? 1 : CONFIG.node.opacityInactive,
                      boxShadow:  i===0
                        ? `0 0 0 4px ${c.accent}33, 0 0 14px ${c.accent}66`
                        : 'none',
                      transform: `translate(-50%,-50%) scale(${i===0?CONFIG.node.scaleActive:1})`,
                      zIndex:3,
                    }}
                  />

                  {/* Name labels removed */}

                  {/* Tick mark
                  <div style={{
                    position:'absolute',
                    width:1, height:CONFIG.node.tickHeight,
                    background:'rgba(245,230,211,0.12)',
                    transform:`translate(-50%,-50%) rotate(${deg}deg)`,
                    transformOrigin:'center top',
                    zIndex:2,
                  }}/> */}
                </div>
              )
            })}
          </div>

          {/* ── Static notch pointer (3-o'clock) ──────────── */}
          {/* <div style={{
            position:'absolute',
            top:'50%',
            left:D,
            transform:'translateY(-50%)',
            display:'flex',
            alignItems:'center',
            gap:0,
            pointerEvents:'none',
            zIndex:30,
          }}>
            <div
              ref={notchTriRef}
              style={{
                width:0, height:0,
                borderTop:`${CONFIG.notch.triangleSize}px solid transparent`,
                borderBottom:`${CONFIG.notch.triangleSize}px solid transparent`,
                borderRight:`${CONFIG.notch.triangleSize*1.6}px solid ${CLIENTS[0].accent}`,
                filter:`drop-shadow(0 0 8px ${CLIENTS[0].accent})`,
                flexShrink:0,
              }}
            />
            <div
              ref={notchLineRef}
              style={{
                width: CONFIG.notch.lineWidth,
                height:1.5,
                background:CLIENTS[0].accent,
                opacity:CONFIG.notch.lineOpacity,
              }}
            />
          </div> */}

        </div>{/* end circle wrap */}

        {/* ══════════════════════════════════════════════════
            INFO PANEL
            ── Positioned right of the circle edge ──────────
            On mobile it stacks at bottom half of screen.
        ══════════════════════════════════════════════════ */}
        <div
          ref={infoRef}
          className="cc-info absolute z-30"
          style={{
            /* Desktop: float right of the dial */
            left: infoPanelLeft,
            top:'50%',
            transform:'translateY(-50%)',
            maxWidth:'min(460px, 45vw)',
            /* Mobile override via inline media — handled by responsive classes below */
          }}
        >
          {/* Index counter */}
          <p className="font-mono uppercase mb-2"
            style={{fontSize:'clamp(8px,1vw,10px)',letterSpacing:'0.14em',color:CONFIG.colors.meta}}>
            CLIENT {String(active+1).padStart(2,'0')} / {String(N).padStart(2,'0')}
          </p>

          {/* Big name */}
          <h2
            className="font-akira font-black text-bone leading-none mb-3"
            style={{
              fontSize:`clamp(${CONFIG.info.nameFontClamp[0]},${CONFIG.info.nameFontClamp[1]},${CONFIG.info.nameFontClamp[2]})`,
              letterSpacing:'-0.04em',
              color: CONFIG.colors.text,
            }}
          >
            {cl.name}
          </h2>

          {/* Handle */}
          <p
            className="font-decipher mb-5"
            style={{
              fontSize:`clamp(${CONFIG.info.handleFontClamp[0]},${CONFIG.info.handleFontClamp[1]},${CONFIG.info.handleFontClamp[2]})`,
              color:cl.accent,
              transform:'rotate(-1.5deg)',
              display:'inline-block',
            }}
          >
            {cl.handle}
          </p>

          {/* Divider line */}
          <div style={{
            width:CONFIG.info.dividerWidth,
            height:1.5,
            background:CONFIG.info.dividerColor,
            marginBottom:24,
          }}/>

          {/* Platform stats */}
          <div className="flex flex-col" style={{gap:'clamp(12px,2vh,22px)'}}>
            {cl.platforms.map(p=>(
              <div key={p} className="flex items-center" style={{gap:'clamp(10px,1.2vw,18px)'}}>
                <div
                  className="flex items-center justify-center rounded-full flex-shrink-0"
                  style={{
                    width:'clamp(30px,3vw,40px)',
                    height:'clamp(30px,3vw,40px)',
                    background:'rgba(255,255,255,0.06)',
                    border:'1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <PIcon p={p} c={cl.accent} s={16}/>
                </div>
                <div>
                  <p className="font-mono uppercase"
                    style={{fontSize:'clamp(7px,0.8vw,9px)',letterSpacing:'0.1em',color:CONFIG.colors.meta,lineHeight:1,marginBottom:3}}>
                    {p}
                  </p>
                  <p className="font-lemon-milk font-bold"
                    style={{
                      fontSize:`clamp(${CONFIG.info.statFontClamp[0]},${CONFIG.info.statFontClamp[1]},${CONFIG.info.statFontClamp[2]})`,
                      lineHeight:1,
                      color:CONFIG.colors.text,
                    }}>
                    {cl.subs[p]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Ghost letter */}
          <div className="mt-6 select-none pointer-events-none">
            <span className="font-aerosoldier"
              style={{
                fontSize:'clamp(3rem,5vw,6rem)',
                color:cl.accent,
                opacity:CONFIG.info.ghostOpacity,
                lineHeight:1,
              }}>
              {cl.name.charAt(0)}
            </span>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-7 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
          style={{opacity:active<N-1?0.3:0,transition:'opacity 0.5s'}}
        >
          <div style={{width:1,height:24,background:'rgba(245,230,211,0.18)'}}/>
          <p className="font-mono uppercase" style={{fontSize:8,letterSpacing:'0.12em',color:'rgba(245,230,211,0.3)'}}>
            SCROLL
          </p>
        </div>

        {/* Ghost BG letter */}
        <span
          className="font-aerosoldier absolute pointer-events-none select-none hidden lg:block"
          style={{
            fontSize:'clamp(12rem,18vw,22rem)',
            color:'rgba(200,255,0,0.018)',
            bottom:'-4rem', right:'5%',
            lineHeight:1,
            transform:'rotate(8deg)',
            zIndex:1,
          }}
        >C</span>

      </div>

      {/* ── Responsive overrides for mobile info panel ──────── */}
      <style>{`
      @media (max-width: 640px) {
          .cc-info {
            left: 50% !important;
            top: auto !important;
            bottom: 28px !important;
            transform: translateX(-50%) !important;
            max-width: 88vw !important;
            text-align: center;
          }
          .cc-circle-wrap {
            top: calc(16vh - ${R}px) !important;
          }
        }
        @media (min-width: 641px) and (max-width: 1023px) {
          .cc-info {
            max-width: 38vw !important;
          }
        }
      `}</style>
    </section>
  )
}