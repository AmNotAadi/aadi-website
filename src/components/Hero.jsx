// import { useRef, useEffect } from 'react'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { useGSAP } from '@gsap/react'
// import Tilt from 'react-parallax-tilt'
// import JsBarcode from 'jsbarcode'
// import mainVideo from '../assets/main video.mp4'
// import portraitImg from '../assets/idcard.png'

// gsap.registerPlugin(ScrollTrigger, useGSAP)

// const PORTFOLIO_URL = 'https://www.youtube.com/watch?v=xnFvhn-1wHY'

// /* ============================================================
//    ░░ RESPONSIVE CONFIG — CHANGE SIZES HERE, NOWHERE ELSE ░░
//    ============================================================
//    All font sizes, video dimensions, and positions live here.
//    sm  = 640px+   (large phone / small tablet)
//    md  = 768px+   (tablet)
//    lg  = 1024px+  (small laptop)
//    xl  = 1280px+  (desktop)
//    2xl = 1536px+  (large desktop)
//    ============================================================ */
// const CONFIG = {
//   heading: {
//     // Font size for each breakpoint (Tailwind class string — edit freely)
//     fontSize: 'text-[2rem] sm:text-[3rem] md:text-[2.8rem] lg:text-[5.5rem] xl:text-[7rem] 2xl:text-[9rem]',
//   },
//   video: {
//     // Initial video size per breakpoint — GSAP owns these, not Tailwind
//     desktop:    { width: 380, height: 230 }, // lg–xl   bottom-right corner
//     desktop2xl: { width: 580, height: 345 }, // 2xl+    bigger for large screens
//     tablet:     { width: '88%', height: 200 },// md–lg  bottom-center
//     mobile:     { width: '88%' },             // <md    bottom-center
//     // Where video sits initially
//     desktop_pos:    { right: 32, bottom: 32 },
//     desktop2xl_pos: { right: 48, bottom: 48 }, // a bit more padding on huge screens
//     tablet_pos:     { bottom: 24 },
//     mobile_pos:     { bottom: '4%' },
//     // Where it expands TO on scroll
//     scroll_end:        { right: '5%', bottom: '5%', width: '90%', height: '90%' },
//     scroll_end_tablet: { width: '96%', bottom: '5%', height: '55%' },
//     scroll_end_mobile: { width: '96%', bottom: '8%' },
//   },
//   idCard: {
//     // lg–xl: bottom-left corner, card at native 420px (scale 1)
//     desktop_pos:    { bottom: 32, left: 40 },
//     // 2xl+: bottom-left with more padding
//     desktop2xl_pos: { bottom: 48, left: 48 },
//     // md–lg (tablet): centered between heading and video
//     tablet_pos:     { top: '54%', left: '50%' },
//     // <md (mobile): centered in viewport
//     mobile_pos:     { top: '47%', left: '50%' },
//     // The card HTML is always 420px wide internally.
//     // We use GSAP `scale` to resize it — this keeps every internal ratio
//     // (fonts, photo, barcode, spacing) perfectly intact with zero distortion.
//     fixedWidth: 420,
//     scale2xl: 1.45, // ← tweak this one number to resize card on 2xl screens
//   },
//   tagline: {
//     bottom: '20%',
//     width: '300px',
//   },
//   heading_top: {
//     desktop: '14%',
//     tablet:  '8%',
//     mobile:  '10%',
//   },

//   /* ============================================================
//      GRAFFITI CONFIG — all text sizes and opacities in one place
//      ─────────────────────────────────────────────────────────────
//      fontSize uses CSS clamp(min, vw-scale, max):
//        • min   = smallest it gets (tiny phone)
//        • vw    = scales with viewport width
//        • max   = biggest it gets (large desktop)

//      opacity: 0.0 = invisible  →  1.0 = fully solid
//      ~0.05–0.15 = ghost/texture feel
//      ~0.4–0.7   = visible design element
//      ~1.0       = fully solid

//      To make something bigger: raise the clamp numbers.
//      To make something more visible: raise the opacity.
//      ============================================================ */
//   graffiti: {

//     // ── GHOST "A" — top-left corner, pure atmosphere ──
//     ghostA: {
//       fontSize: 'clamp(12rem, 40vw, 30rem)', // raise all 3 numbers to make bigger
//       opacity:  0.04,                          // raise to make more visible
//     },

//     // ── "chaos" — bottom area, md+ only ──
//     chaos: {
//       fontSize: 'clamp(4rem, 10vw, 10rem)',
//       opacity:  0.07,
//     },

//     // ── "~make em stay~" — top-right, md+ only ──
//     makeEmStay: {
//       fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
//       opacity:  0.18,
//     },

//     // ── "content hits diff" — mid screen, lg+ only ──
//     contentHits: {
//       fontSize: 'clamp(1rem, 1.5vw, 1.6rem)',
//       opacity:  0.09,
//     },

//     // ── LEFT TAG: "~i will help your imagination come true~" ──
//     leftTag: {
//       mobile:  { fontSize: 'clamp(0.85rem, 3.5vw, 1.1rem)', opacity: 0.7  },
//       tablet:  { fontSize: '1.4rem',                          opacity: 0.65 },
//       desktop: { fontSize: 'clamp(2rem, 2.7vw, 3.5rem)',   opacity: 1.0  },
//       color:   '#b01a67',
//     },

//     // ── RIGHT TAG: "~crafting the internet's most addictive content~" ──
//     rightTag: {
//       tablet:  { fontSize: 'clamp(0.9rem, 2vw, 1.3rem)', opacity: 0.65 },
//       desktop: { fontSize: 'clamp(1.2rem, 1.8vw, 2rem)', opacity: 1.0  },
//       color:   '#C8FF00',
//     },
//   },
// }

// /* ============================================================
//    BARCODE — renders a CODE128 barcode as inline SVG
//    ============================================================ */
// function BarcodeEl({ value }) {
//   const svgRef = useRef(null)

//   useEffect(() => {
//     if (svgRef.current) {
//       JsBarcode(svgRef.current, value, {
//         format: 'CODE128',
//         width: 1.6,
//         height: 40,
//         displayValue: false,
//         background: 'transparent',
//         lineColor: '#1a1a1a',
//         margin: 0,
//       })
//     }
//   }, [value])

//   return <svg ref={svgRef} style={{ width: '100%' }} />
// }

// /* ============================================================
//    ORNAMENT — decorative SVG wave used in the heading
//    Pass `flip` to mirror it for the right side
//    ============================================================ */
// function Ornament({ flip = false }) {
//   return (
//     <span className={`inline-block align-middle w-10 h-5 mb-1 ${flip ? '-scale-x-100' : ''}`}>
//       <svg viewBox="0 0 56 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
//         <path d="M4 24 C10 4, 20 4, 28 14 C36 4, 46 4, 52 24"
//           stroke="#E63B2E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
//         <path d="M4 14 C10 2, 20 2, 28 10 C36 2, 46 2, 52 14"
//           stroke="#E63B2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
//       </svg>
//     </span>
//   )
// }

// /* ============================================================
//    ID CARD — the physical-style identity card
//    Fixed at 420px wide. On small screens GSAP scales it down
//    so it always fits within the viewport.
//    ============================================================ */
// function HeroIDCard() {
//   return (
//     <Tilt
//       tiltMaxAngleX={12} tiltMaxAngleY={12}
//       perspective={1100}
//       glareEnable glareMaxOpacity={0.22} glareColor="#ddd0ff"
//       scale={1.03} transitionSpeed={600} gyroscope
//     >
//       {/* Glow border wrapper */}
//       <div className="rounded-2xl p-[2px] id-card-glow-border" style={{ width: 420 }}>

//         {/* Card background */}
//         <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#D4C4A8', width: 420 }}>

//           {/* Shimmer overlay */}
//           <div className="absolute inset-0 id-card-shimmer pointer-events-none z-20 rounded-2xl" />

//           {/* ── Header row ── */}
//           <div className="flex justify-between items-center px-4 py-1 border-b border-black/10">
//             <div>
//               <p className="font-mono" style={{ fontSize: 8, letterSpacing: '0.1em', fontWeight: 700, color: 'rgba(0,0,0,0.6)', textTransform: 'uppercase' }}>
//                 Identification Card
//               </p>
//               <p className="font-mono" style={{ fontSize: 8, color: 'rgba(0,0,0,0.35)' }}>
//                 No.2345687981798
//               </p>
//             </div>
//             <div className="font-decipher id-hologram-text text-2xl graffiti-highlight font-semibold cursor-target">
//               license for chaos
//             </div>
//           </div>

//           {/* ── Body: photo + info ── */}
//           <div className="relative flex flex-row gap-4 px-4 pt-3 pb-3">

//             {/* Photo */}
//             <div className="shrink-0 cursor-target">
//               <div style={{ width: 88, height: 120, border: '2px solid rgba(0,0,0,0.2)', overflow: 'hidden', borderRadius: 2 }}>
//                 <img src={portraitImg} alt="aadi2005" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//               </div>
//             </div>

//             {/* Info fields */}
//             <div className="flex-1 flex flex-col font-mono" style={{ fontSize: 10, fontWeight: 700, color: '#000', gap: 2 }}>
//               <div className="flex justify-between">
//                 <span>[Name] aadi2005</span>
//                 <span>[DOB] 09/12/2005</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>[gender] male</span>
//                 <span>[location] internet</span>
//               </div>

//               {/* Creativity score */}
//               <div className="border-t border-black/10 pt-1">
//                 <p className="font-mono" style={{ fontSize: 9, color: 'rgba(0,0,0,0.45)', fontWeight: 400, marginBottom: 1 }}>
//                   [creativity score]
//                 </p>
//                 <div className="font-decipher id-graffiti-score cursor-target" style={{ fontSize: 30, fontWeight: 700, lineHeight: 1 }}>
//                   tends to infinity
//                 </div>
//               </div>

//               {/* Availability / Experience / Dates */}
//               <div className="border-t border-black/10 pt-1">
//                 <div className="flex justify-between items-end gap-2">
//                   <div>
//                     <p style={{ fontSize: 9, color: 'rgba(0,0,0,0.45)', fontWeight: 400 }}>[availability]</p>
//                     <p>always</p>
//                     <p style={{ fontSize: 9, color: 'rgba(0,0,0,0.45)', fontWeight: 400 }}>[experience]</p>
//                     <p>7+ years</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-lemon-milk" style={{ fontSize: 8, color: 'rgba(0,0,0,0.45)' }}>Issue Date</p>
//                     <p>never mind</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-lemon-milk" style={{ fontSize: 8, color: 'rgba(0,0,0,0.45)' }}>Expiry Date</p>
//                     <p>till die</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Big name stamp */}
//           <div className="font-brunson-rough dame text-brutal-red cursor-target" style={{ fontSize: '2.4rem' }}>AADI</div>

//           {/* ── Barcode strip ── */}
//           <div className="flex items-center gap-3 border-t border-black/15 px-4 py-1">
//             <div className="flex flex-col font-mono shrink-0" style={{ fontSize: 7, color: 'rgba(0,0,0,0.4)', lineHeight: 0.8, width: 48 }}>
//               <span style={{ fontWeight: 700, color: 'rgba(0,0,0,0.6)' }}>aadi2005</span>
//               <span>portfolio</span>
//               <span style={{ fontSize: 6 }}>2345687</span>
//             </div>
//             <div className="flex-1 overflow-hidden flex items-center">
//               <BarcodeEl value={PORTFOLIO_URL} />
//             </div>
//             <a
//               href={PORTFOLIO_URL} target="_blank" rel="noopener noreferrer"
//               className="flex flex-col items-end font-mono shrink-0 cursor-target"
//               style={{ fontSize: 7, color: 'rgba(0,0,0,0.4)', lineHeight: 1, width: 56, textDecoration: 'none' }}
//             >
//               <span style={{ fontWeight: 700, color: 'rgba(0,0,0,0.6)' }}>↗ visit</span>
//               <span style={{ fontSize: 6 }}>aadi2005.com</span>
//             </a>
//           </div>

//         </div>
//       </div>
//     </Tilt>
//   )
// }

// /* ============================================================
//    HERO SECTION — main export
//    ============================================================
//    Layout structure (all inside a sticky viewport):
//      • Ghost graffiti BG        z-0   (desktop only, decorative)
//      • Graffiti text overlays   z-1   (desktop only, decorative)
//      • Main heading             z-10  (animated in + fades on scroll)
//      • Video                    z-10  (grows to fill screen on scroll)
//      • ID Card                  z-20  (slides in + fades on scroll)
//      • Tagline                  z-20  (fades on scroll)
//      • Navbar                   z-50  (always on top)
//      • Grain overlay            z-[5] (subtle texture, always visible)
//    ============================================================ */
// export default function Hero() {
//   const sectionRef  = useRef(null) // full-height scroll container
//   const videoRef    = useRef(null) // the video element wrapper
//   const headingRef  = useRef(null) // "Helping our partners..." text block
//   const idCardRef   = useRef(null) // ID card wrapper
//   const taglineRef  = useRef(null) // tagline + "scroll down" text

//   useGSAP(
//     () => {
//       const mm = gsap.matchMedia()

//       /* ──────────────────────────────────────────
//          LARGE DESKTOP 2xl (1536px and above)
//          Same layout as desktop but card is scaled up (scale2xl)
//          and video is bigger. Everything else identical.
//          To adjust: change CONFIG.idCard.scale2xl and CONFIG.video.desktop2xl
//          ────────────────────────────────────────── */
//       mm.add('(min-width: 1536px)', () => {

//         gsap.set(headingRef.current, { top: CONFIG.heading_top.desktop })

//         gsap.set(idCardRef.current, {
//           ...CONFIG.idCard.desktop2xl_pos,  // bottom: 48, left: 48
//           top: 'auto',
//           xPercent: 0,
//           yPercent: 0,
//           x: 0,
//           y: 40,
//           opacity: 0,
//           scale: CONFIG.idCard.scale2xl,    // scales the whole card up uniformly
//           transformOrigin: 'bottom left',   // grows from bottom-left corner so it stays anchored
//         })

//         gsap.set(videoRef.current, {
//           ...CONFIG.video.desktop2xl_pos,   // right: 48, bottom: 48
//           ...CONFIG.video.desktop2xl,       // width: 580, height: 345
//           left: 'auto',
//           xPercent: 0,
//           x: 0,
//         })

//         // Entry animations (same as desktop)
//         gsap.from('.hero-line', { y: '115%', duration: 1.6, stagger: 0.13, ease: 'expo.out', delay: 0.2 })
//         gsap.from(taglineRef.current, { y: 28, opacity: 0, duration: 1.3, ease: 'power4.out', delay: 0.7 })
//         gsap.to(idCardRef.current, { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.5 })

//         // Scroll timeline
//         const tl = gsap.timeline({
//           scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: 1 },
//         })
//         tl.to(videoRef.current, { ...CONFIG.video.scroll_end, borderRadius: 6, ease: 'power2.inOut' }, 0)
//         tl.to(headingRef.current, { opacity: 0.08, y: -24, scale: 0.97, ease: 'power2.out' }, 0)
//         tl.to(idCardRef.current, { opacity: 0, x: -60, ease: 'power2.out' }, 0)
//         tl.to(taglineRef.current, { opacity: 0, y: 12, ease: 'power2.out' }, 0)
//       })

//       /* ──────────────────────────────────────────
//          DESKTOP lg–xl (1024px – 1535px)
//          Layout: heading top-center, ID card bottom-left, video bottom-right
//          ────────────────────────────────────────── */
//       mm.add('(min-width: 1024px) and (max-width: 1535px)', () => {

//         gsap.set(headingRef.current, { top: CONFIG.heading_top.desktop })

//         gsap.set(idCardRef.current, {
//           ...CONFIG.idCard.desktop_pos,   // bottom: 32, left: 40
//           top: 'auto',
//           xPercent: 0,
//           yPercent: 0,
//           x: 0,
//           y: 40,
//           opacity: 0,
//           scale: 1,
//           transformOrigin: 'bottom left',
//         })

//         gsap.set(videoRef.current, {
//           ...CONFIG.video.desktop_pos,    // right: 32, bottom: 32
//           ...CONFIG.video.desktop,        // width: 380, height: 230
//           left: 'auto',
//           xPercent: 0,
//           x: 0,
//         })

//         // Entry animations
//         gsap.from('.hero-line', { y: '115%', duration: 1.6, stagger: 0.13, ease: 'expo.out', delay: 0.2 })
//         gsap.from(taglineRef.current, { y: 28, opacity: 0, duration: 1.3, ease: 'power4.out', delay: 0.7 })
//         gsap.to(idCardRef.current, { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.5 })

//         // Scroll timeline
//         const tl = gsap.timeline({
//           scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: 1 },
//         })
//         tl.to(videoRef.current, { ...CONFIG.video.scroll_end, borderRadius: 6, ease: 'power2.inOut' }, 0)
//         tl.to(headingRef.current, { opacity: 0.08, y: -24, scale: 0.97, ease: 'power2.out' }, 0)
//         tl.to(idCardRef.current, { opacity: 0, x: -60, ease: 'power2.out' }, 0)
//         tl.to(taglineRef.current, { opacity: 0, y: 12, ease: 'power2.out' }, 0)
//       })

//       /* ──────────────────────────────────────────
//          TABLET (768px – 1023px) — iPad, iPad Mini, etc.
//          Layout: heading top-center, ID card center (between heading & video),
//                  video bottom-center (shorter so card doesn't overlap it)
//          Graffiti overlays are hidden entirely at this size.
//          ────────────────────────────────────────── */
//       mm.add('(min-width: 768px) and (max-width: 1023px)', () => {

//         // Scale card to fit tablet width
//         const scaleCard = () => {
//           gsap.set(idCardRef.current, {
//             scale: Math.min(1, (window.innerWidth - 64) / CONFIG.idCard.fixedWidth),
//           })
//         }

//         gsap.set(headingRef.current, { top: CONFIG.heading_top.tablet })

//         gsap.set(idCardRef.current, {
//           ...CONFIG.idCard.tablet_pos,    // top: '54%', left: '50%'
//           xPercent: -50,
//           yPercent: -50,
//           bottom: 'auto',
//           right: 'auto',
//           width: CONFIG.idCard.fixedWidth,
//           y: 40,
//           opacity: 0,
//           transformOrigin: 'center center',
//         })
//         scaleCard()
//         window.addEventListener('resize', scaleCard)

//         // Video: bottom-center, short height so card sits above it cleanly
//         gsap.set(videoRef.current, {
//           ...CONFIG.video.tablet_pos,     // bottom: 24
//           left: '50%',
//           xPercent: -50,
//           width: CONFIG.video.tablet.width,   // '88%'
//           height: CONFIG.video.tablet.height, // 200px
//           right: 'auto',
//         })

//         // Entry animations
//         gsap.from('.hero-line', { y: '115%', duration: 1.6, stagger: 0.1, ease: 'expo.out', delay: 0.2 })
//         gsap.from(taglineRef.current, { y: 20, opacity: 0, duration: 1.3, ease: 'power4.out', delay: 0.7 })
//         gsap.to(idCardRef.current, { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.5 })

//         // Scroll timeline
//         const tl = gsap.timeline({
//           scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: 1 },
//         })
//         tl.to(videoRef.current, { ...CONFIG.video.scroll_end_tablet, borderRadius: 6, ease: 'power2.inOut' }, 0)
//         tl.to(headingRef.current, { opacity: 0.1, y: -20, ease: 'power2.out' }, 0)
//         tl.to(idCardRef.current, { opacity: 0, y: -30, ease: 'power2.out' }, 0)
//         tl.to(taglineRef.current, { opacity: 0, ease: 'power2.out' }, 0)

//         return () => window.removeEventListener('resize', scaleCard)
//       })

//       /* ──────────────────────────────────────────
//          MOBILE (below 768px)
//          Layout: heading top-center, ID card center, video bottom-center
//          ────────────────────────────────────────── */
//       mm.add('(max-width: 767px)', () => {

//         const scaleCard = () => {
//           gsap.set(idCardRef.current, {
//             scale: Math.min(1, (window.innerWidth - 32) / CONFIG.idCard.fixedWidth),
//           })
//         }

//         gsap.set(headingRef.current, { top: CONFIG.heading_top.mobile })

//         gsap.set(idCardRef.current, {
//           ...CONFIG.idCard.mobile_pos,    // top: '47%', left: '50%'
//           xPercent: -50,
//           yPercent: -50,
//           bottom: 'auto',
//           right: 'auto',
//           width: CONFIG.idCard.fixedWidth,
//           y: 40,
//           opacity: 0,
//           transformOrigin: 'center center',
//         })
//         scaleCard()
//         window.addEventListener('resize', scaleCard)

//         gsap.set(videoRef.current, {
//           ...CONFIG.video.mobile_pos,     // bottom: '4%'
//           left: '50%',
//           xPercent: -50,
//           width: CONFIG.video.mobile.width,
//           right: 'auto',
//           height: 'auto',
//         })

//         // Entry animations
//         gsap.from('.hero-line', { y: '115%', duration: 1.6, stagger: 0.1, ease: 'expo.out', delay: 0.2 })
//         gsap.from(taglineRef.current, { y: 20, opacity: 0, duration: 1.3, ease: 'power4.out', delay: 0.7 })
//         gsap.to(idCardRef.current, { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.5 })

//         // Scroll timeline
//         const tl = gsap.timeline({
//           scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: 1 },
//         })
//         tl.to(headingRef.current, { opacity: 0.1, y: -20, ease: 'power2.out' }, 0)
//         tl.to(idCardRef.current, { opacity: 0, y: -40, ease: 'power2.out' }, 0)
//         tl.to(taglineRef.current, { opacity: 0, ease: 'power2.out' }, 0)
//         tl.to(videoRef.current, { ...CONFIG.video.scroll_end_mobile, ease: 'power2.inOut' }, 0)

//         return () => window.removeEventListener('resize', scaleCard)
//       })

//       return () => mm.revert()
//     },
//     { scope: sectionRef },
//   )

//   return (
//     /* Full-height scroll container — 210vh gives the scrub animation room */
//     <section ref={sectionRef} className="relative bg-ink" style={{ minHeight: '210vh' }}>

//       {/* Sticky viewport — everything inside stays fixed while you scroll */}
//       <div className="sticky top-0 h-screen overflow-hidden">

//         {/* ════════════════════════════════════════
//             GRAFFITI LAYER
//             ─────────────────────────────────────────
//             RULE: graffiti never overlaps the heading, card, or video.
//             • Ghost texts sit at z-0 (behind everything)
//             • Styled tags sit at z-[1] (behind heading/card/video)
//             • Positions are chosen to fill the EMPTY SPACE around the 3 main elements

//             BREAKPOINTS:
//             • Mobile (<768px)   — ghost A only (top-left corner, low opacity)
//             • Tablet (768–1023) — ghost A + "make em stay" (top-right) + left tag (very bottom-left)
//             • Desktop (1024px+) — full set

//             TO ADJUST VISIBILITY: change the last number in rgba() values.
//             0.05 = barely visible ghost, 0.5 = clearly visible
//             ════════════════════════════════════════ */}

//         {/* ── GHOST TEXTURE LAYER (z-0, behind everything) ── */}
//         <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">

//           {/* Giant ghost "A" — top-left corner, all screen sizes
//               It fills the empty space above/left of the heading on mobile */}
//           <span className="font-aerosoldier absolute cursor-target" style={{
//             fontSize: CONFIG.graffiti.ghostA.fontSize,
//             color: `rgba(200,255,0,${CONFIG.graffiti.ghostA.opacity})`,
//             top: '-20px', left: '-10px',
//             lineHeight: 1, transform: 'rotate(-5deg)',
//           }}>A</span>

//           {/* "chaos" — sits bottom-center in the empty mid-section gap
//               Only on md+ where there's horizontal space */}
//           <span className="font-street-wars absolute hidden md:block cursor-target" style={{
//             fontSize: CONFIG.graffiti.chaos.fontSize,
//             color: `rgba(230,59,46,${CONFIG.graffiti.chaos.opacity})`,
//             bottom: '140px', left: '32%',
//             lineHeight: 1, transform: 'rotate(4deg)',
//           }}>chaos</span>

//           {/* "content hits diff" — mid-screen gap, lg+ only */}
//           <span className="font-don-graffiti absolute hidden lg:block cursor-target" style={{
//             fontSize: CONFIG.graffiti.contentHits.fontSize,
//             color: `rgba(245,230,211,${CONFIG.graffiti.contentHits.opacity})`,
//             top: '56%', left: '40%',
//             transform: 'rotate(3deg)',
//           }}>content hits diff</span>
//         </div>

//         {/* ── STYLED GRAFFITI TAGS (z-[1], behind heading/card/video) ──
//             Each tag is placed in the DEAD SPACE that exists at each breakpoint.
//             On desktop: left dead space (between left edge and heading) = left tag
//                         right dead space (below "make em stay", above video) = right tag
//             On tablet:  only tags that fit without touching the 3 main elements
//             On mobile:  nothing — the screen is too narrow, ghost A is enough ── */}

//         {/* TOP-RIGHT TAG: "~make em stay~"
//             Lives in the top-right dead space (navbar area, right side)
//             Hidden on mobile — no room. Shown md+. */}
//         <div className="absolute hidden md:block pointer-events-none z-[1]" style={{
//           top: '9%', right: '2%',
//         }}>
//           <span className="font-decipher cursor-target" style={{
//             fontSize: CONFIG.graffiti.makeEmStay.fontSize,
//             color: `rgba(200,255,0,${CONFIG.graffiti.makeEmStay.opacity})`,
//             display: 'block', transform: 'rotate(-7deg)',
//             textShadow: '0 0 14px rgba(200,255,0,0.25)',
//             pointerEvents: 'auto'
//           }}>~make em stay~</span>
//         </div>

//         {/* LEFT TAG: "~i will help your imagination come true~"
//             On desktop: left side, vertically centered — fits in the gap
//                         between the left edge and the heading text
//             On tablet: same but smaller, pushed lower so it's below the heading
//             Mobile: hidden */}
//         <div className="absolute hidden md:block pointer-events-none z-[1]" style={{
//           top: '38%', left: '1.5%',
//         }}>
//           {/* Tablet — shorter text, smaller font, stays below heading */}
//           <div className="font-aerosoldier block lg:hidden cursor-target" style={{
//             fontSize: CONFIG.graffiti.leftTag.tablet.fontSize,
//             color: CONFIG.graffiti.leftTag.color,
//             opacity: CONFIG.graffiti.leftTag.tablet.opacity,
//             transform: 'rotate(-3deg)', lineHeight: 1.3,
//             pointerEvents: 'auto'
//           }}>
//             <div>~i will help</div>
//             <div>your imagination</div>
//             <div>come true~</div>
//           </div>
//           {/* Desktop — full size */}
//           <div className="font-aerosoldier hidden lg:block cursor-target" style={{
//             fontSize: CONFIG.graffiti.leftTag.desktop.fontSize,
//             color: CONFIG.graffiti.leftTag.color,
//             opacity: CONFIG.graffiti.leftTag.desktop.opacity,
//             transform: 'rotate(-4deg)', lineHeight: 1.3,
//             textShadow: '2px 2px 0 rgba(0,0,0,0.5)',
//             pointerEvents: 'auto'
//           }}>
//             <div>~i will help</div>
//             <div>your imagination</div>
//             <div>come true~</div>
//           </div>
//         </div>

//         {/* RIGHT TAG: "~crafting the internet's most addictive content~"
//             Sits in the right dead space, between the "make em stay" tag
//             and the video (which is bottom-right).
//             Tablet+: shown. Mobile: hidden. */}
//         <div className="absolute hidden md:block pointer-events-none z-[1]" style={{
//           bottom: '32%', right: '1.5%',
//         }}>
//           {/* Tablet — compact */}
//           <div className="font-decipher block lg:hidden cursor-target" style={{
//             fontSize: CONFIG.graffiti.rightTag.tablet.fontSize,
//             color: CONFIG.graffiti.rightTag.color,
//             opacity: CONFIG.graffiti.rightTag.tablet.opacity,
//             transform: 'rotate(-3deg)', lineHeight: 1.3, textAlign: 'right',
//             pointerEvents: 'auto'
//           }}>
//             <div>~crafting the internet&apos;s</div>
//             <div>most addictive content~</div>
//           </div>
//           {/* Desktop — full size */}
//           <div className="font-decipher hidden lg:block cursor-target" style={{
//             fontSize: CONFIG.graffiti.rightTag.desktop.fontSize,
//             color: CONFIG.graffiti.rightTag.color,
//             opacity: CONFIG.graffiti.rightTag.desktop.opacity,
//             transform: 'rotate(-4deg)', lineHeight: 1.3, textAlign: 'right',
//             textShadow: '0 0 18px rgba(200,255,0,0.3)',
//             pointerEvents: 'auto'
//           }}>
//             <div>~crafting the internet&apos;s</div>
//             <div>most addictive content~</div>
//           </div>
//         </div>

//         {/* taglineRef kept as empty div so GSAP scroll animation still works */}
//         <div ref={taglineRef} className="absolute" style={{ bottom: '20%', left: '50%', opacity: 0 }} />

//         {/* ════════════════════════════════════════
//             NAVBAR
//             ════════════════════════════════════════ */}
//         <nav className="absolute top-5 left-5 right-5 flex items-center justify-between z-50">

//           {/* Left nav links — desktop only */}
//           <div className="hidden md:flex flex-col gap-0.5">
//             {['Work', 'Services', 'Agency'].map(l => (
//               <a key={l} href="#"
//                 className="text-sm font-lemon-milk text-neutral-500 hover:text-bone transition-colors cursor-target"
//               >{l}</a>
//             ))}
//           </div>

//           {/* Logo — centered on mobile, left-aligned on desktop */}
//           <div className="font-don-graffiti text-3xl md:text-4xl font-extrabold text-cream tracking-tight mx-auto md:mx-0 cursor-target">
//             aadi2005
//           </div>

//           {/* CTA button — desktop only */}
//           <button className="hidden md:block font-lemon-milk text-sm text-white bg-brutal-red px-5 py-2 rounded hover:opacity-90 transition-opacity cursor-target">
//             Let&apos;s Connect
//           </button>
//         </nav>

//         {/* ════════════════════════════════════════
//             MAIN HEADING
//             Font size controlled via CONFIG.heading.fontSize
//             GSAP sets top position, text clips for reveal animation
//             ════════════════════════════════════════ */}
//         <div
//           ref={headingRef}
//           className="absolute inset-x-0 flex flex-col items-center justify-center z-10 px-4"
//           style={{ top: CONFIG.heading_top.desktop }}
//         >
//           {['Helping our partners', 'build original brands'].map(line => (
//             <div key={line} className="overflow-hidden">
//               <h1 className={`hero-line font-magazine text-bone leading-none tracking-tight text-center ${CONFIG.heading.fontSize}`}>
//                 {line}
//               </h1>
//             </div>
//           ))}
//           <div className="overflow-hidden">
//             <h1 className={`hero-line font-magazine text-bone leading-none tracking-tight text-center flex items-center justify-center gap-4 sm:gap-6 ${CONFIG.heading.fontSize}`}>
//               <Ornament /> that shine. <Ornament flip />
//             </h1>
//           </div>
//         </div>

//         {/* ════════════════════════════════════════
//             ID CARD
//             Positioned and sized entirely by GSAP.
//             Do not add position/size Tailwind classes here.
//             ════════════════════════════════════════ */}
//         <div ref={idCardRef} className="absolute z-20 cursor-target">
//           <HeroIDCard />
//         </div>


//         {/* ════════════════════════════════════════
//             VIDEO
//             No size/position classes — GSAP owns all of that.
//             Edit video src in the imports at the top.
//             ════════════════════════════════════════ */}
//         <div
//           ref={videoRef}
//           className="absolute z-10 overflow-hidden rounded-[12px] cursor-target"
//           // No width/height/position classes here — all set by GSAP
//         >
//           <video
//             autoPlay muted loop playsInline
//             className="w-full h-full object-cover block"
//             src={mainVideo}
//           />

//           {/* "~the work~" graffiti tag bottom-left of video */}
//           <span className="font-decipher absolute" style={{
//             bottom: 14, left: 16,
//             fontSize: '1.15rem', color: 'rgba(200,255,0,0.75)',
//             transform: 'rotate(-2deg)', pointerEvents: 'none', userSelect: 'none',
//           }}>~the work~</span>

//           {/* "01 / SHOWREEL" badge top-left of video */}
//           <span className="font-mono absolute" style={{
//             top: 12, left: 14, fontSize: 9, letterSpacing: '0.1em',
//             color: 'rgba(255,255,255,0.5)', fontWeight: 700,
//           }}>01 / SHOWREEL</span>
//         </div>

//         {/* ════════════════════════════════════════
//             GRAIN OVERLAY — subtle film texture on top of everything
//             ════════════════════════════════════════ */}
//         <div
//           className="absolute inset-0 pointer-events-none z-[5]"
//           style={{
//             backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
//             opacity: 0.45,
//           }}
//         />

//       </div>
//     </section>
//   )
// }



import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Tilt from 'react-parallax-tilt'
import JsBarcode from 'jsbarcode'
import mainVideo from '../assets/main video.mp4'
import portraitImg from '../assets/idcard.png'

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
    // Font size uses clamp() — scales with viewport width, never overflows
    // regardless of browser zoom level or display scaling (fixes Chrome vs Edge difference).
    // Format: clamp(min-size, vw-scale, max-size)
    // To make bigger everywhere: raise the middle vw number
    // To make smaller everywhere: lower the middle vw number
    fontSize: 'text-[clamp(1.6rem,5vw,2.2rem)] sm:text-[clamp(2rem,6vw,3rem)] md:text-[clamp(2.2rem,4.5vw,2.8rem)] lg:text-[clamp(3rem,5.5vw,5.5rem)] xl:text-[clamp(4rem,5.8vw,6.5rem)] 2xl:text-[clamp(5rem,6vw,8rem)]',
  },
  video: {
    // Initial video size per breakpoint — GSAP owns these, not Tailwind
    desktop:    { width: 380, height: 230 }, // lg–xl   bottom-right corner
    desktop2xl: { width: 580, height: 345 }, // 2xl+    bigger for large screens
    tablet:     { width: '88%', height: 200 },// md–lg  bottom-center
    mobile:     { width: '88%' },             // <md    bottom-center
    // Where video sits initially
    desktop_pos:    { right: 32, bottom: 32 },
    desktop2xl_pos: { right: 48, bottom: 48 },
    tablet_pos:     { bottom: 24 },
    mobile_pos:     { bottom: '4%' },
    // Where it expands TO on scroll
    scroll_end:        { right: '5%', bottom: '5%', width: '90%', height: '90%' },
    scroll_end_tablet: { width: '96%', bottom: '5%', height: '55%' },
    scroll_end_mobile: { width: '96%', bottom: '8%' },
  },
  idCard: {
    desktop_pos:    { bottom: 32, left: 40 },
    desktop2xl_pos: { bottom: 48, left: 48 },
    tablet_pos:     { top: '54%', left: '50%' },
    mobile_pos:     { top: '47%', left: '50%' },
    // Card HTML is always 420px wide — GSAP scale resizes without distortion
    fixedWidth: 420,
    scale2xl: 1.45,
  },
  tagline: {
    bottom: '20%',
    width: '300px',
  },
  heading_top: {
    desktop: '14%',
    tablet:  '8%',
    mobile:  '10%',
  },

  /* ============================================================
     GRAFFITI CONFIG — all text sizes and opacities in one place
     ─────────────────────────────────────────────────────────────
     fontSize uses CSS clamp(min, vw-scale, max):
       • min   = smallest it gets (tiny phone)
       • vw    = scales with viewport width
       • max   = biggest it gets (large desktop)

     opacity: 0.0 = invisible  →  1.0 = fully solid
     ~0.05–0.15 = ghost/texture feel
     ~0.4–0.7   = visible design element
     ~1.0       = fully solid

     To make something bigger: raise the clamp numbers.
     To make something more visible: raise the opacity.
     ============================================================ */
  graffiti: {

    // ── GHOST "A" — top-left corner, pure atmosphere ──
    ghostA: {
      fontSize: 'clamp(12rem, 40vw, 30rem)',
      opacity:  0.04,
    },

    // ── "chaos" — bottom area, md+ only ──
    chaos: {
      fontSize: 'clamp(4rem, 10vw, 10rem)',
      opacity:  0.07,
    },

    // ── "~make em stay~" — top-right, md+ only ──
    makeEmStay: {
      fontSize: 'clamp(1.5rem, 2.5vw, 2.5rem)',
      opacity:  0.18,
    },

    // ── "content hits diff" — mid screen, lg+ only ──
    contentHits: {
      fontSize: 'clamp(1rem, 1.5vw, 1.6rem)',
      opacity:  0.09,
    },

    // ── LEFT TAG: "~i will help your imagination come true~" ──
    leftTag: {
      mobile:  { fontSize: 'clamp(0.85rem, 3.5vw, 1.1rem)', opacity: 0.7  },
      tablet:  { fontSize: '1.4rem',                          opacity: 0.65 },
      desktop: { fontSize: 'clamp(2rem, 2.7vw, 3.5rem)',     opacity: 1.0  },
      color:   '#b01a67',
    },

    // ── RIGHT TAG: "~crafting the internet's most addictive content~" ──
    rightTag: {
      tablet:  { fontSize: 'clamp(0.9rem, 2vw, 1.3rem)', opacity: 0.65 },
      desktop: { fontSize: 'clamp(1.2rem, 1.8vw, 2rem)', opacity: 1.0  },
      color:   '#C8FF00',
    },
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
   ID CARD — fixed 420px wide, GSAP scale handles all sizing
   ============================================================ */
function HeroIDCard() {
  return (
    <Tilt
      tiltMaxAngleX={12} tiltMaxAngleY={12}
      perspective={1100}
      glareEnable glareMaxOpacity={0.22} glareColor="#ddd0ff"
      scale={1.03} transitionSpeed={600} gyroscope
    >
      <div className="rounded-2xl p-[2px] id-card-glow-border" style={{ width: 420 }}>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#D4C4A8', width: 420 }}>

          <div className="absolute inset-0 id-card-shimmer pointer-events-none z-20 rounded-2xl" />

          {/* Header */}
          <div className="flex justify-between items-center px-4 py-1 border-b border-black/10">
            <div>
              <p className="font-mono" style={{ fontSize: 8, letterSpacing: '0.1em', fontWeight: 700, color: 'rgba(0,0,0,0.6)', textTransform: 'uppercase' }}>
                Identification Card
              </p>
              <p className="font-mono" style={{ fontSize: 8, color: 'rgba(0,0,0,0.35)' }}>
                No.2345687981798
              </p>
            </div>
            <div className="font-decipher id-hologram-text text-2xl graffiti-highlight font-semibold cursor-target">
              license for chaos
            </div>
          </div>

          {/* Body */}
          <div className="relative flex flex-row gap-4 px-4 pt-3 pb-3">
            <div className="shrink-0 cursor-target">
              <div style={{ width: 88, height: 120, border: '2px solid rgba(0,0,0,0.2)', overflow: 'hidden', borderRadius: 2 }}>
                <img src={portraitImg} alt="aadi2005" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
            <div className="flex-1 flex flex-col font-mono" style={{ fontSize: 10, fontWeight: 700, color: '#000', gap: 2 }}>
              <div className="flex justify-between">
                <span>[Name] aadi2005</span>
                <span>[DOB] 09/12/2005</span>
              </div>
              <div className="flex justify-between">
                <span>[gender] male</span>
                <span>[location] internet</span>
              </div>
              <div className="border-t border-black/10 pt-1">
                <p className="font-mono" style={{ fontSize: 9, color: 'rgba(0,0,0,0.45)', fontWeight: 400, marginBottom: 1 }}>
                  [creativity score]
                </p>
                <div className="font-decipher id-graffiti-score cursor-target" style={{ fontSize: 30, fontWeight: 700, lineHeight: 1 }}>
                  tends to infinity
                </div>
              </div>
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

          <div className="font-aerosoldier  dame text-brutal-red cursor-target" style={{ fontSize: '2.4rem' }}>AADI</div>

          <div className="font-aerosoldier  id-graffiti-overlay cursor-target" style={{ fontSize: '2.4rem' }}>awesome</div>

          {/* Barcode strip */}
          {/* Barcode strip - Increased z-index and explicit relative positioning to ensure clickability */}
          <div className="flex items-center gap-3 border-t  border-black/15 px-4 py-1 relative z-30">
            <div className="flex flex-col font-mono shrink-0" style={{ fontSize: 7, color: 'rgba(0,0,0,0.4)', lineHeight: 0.8, width: 48 }}>
              <span style={{ fontWeight: 700, color: 'rgba(0,0,0,0.6)' }}>aadi2005</span>
              <span>portfolio</span>
              <span style={{ fontSize: 6 }}>2345687</span>
            </div>
            
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center gap-3 cursor-target group relative z-40"
              style={{ textDecoration: 'none' }}
            >
              <div className="flex-1 overflow-hidden flex items-center opacity-85 group-hover:opacity-100 transition-opacity">
                <BarcodeEl value={PORTFOLIO_URL} />
              </div>
              <div
                className="flex flex-col items-end font-mono shrink-0"
                style={{ fontSize: 7, color: 'rgba(0,0,0,0.4)', lineHeight: 1, width: 56 }}
              >
                <span style={{ fontWeight: 700, color: 'rgba(0,0,0,0.6)' }} className="group-hover:text-brutal-red transition-colors">↗ visit</span>
                <span style={{ fontSize: 6 }}>aadi2005.com</span>
              </div>
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
     • Ghost graffiti BG        z-0   (decorative)
     • Graffiti text overlays   z-[1] (decorative)
     • Main heading             z-10  (animated in + fades on scroll)
     • Video                    z-10  (grows to fill screen on scroll)
     • ID Card                  z-20  (slides in + fades on scroll)
     • Navbar                   z-50  (always on top)
     • Grain overlay            z-[5] (subtle texture)
   ============================================================ */
export default function Hero() {
  const sectionRef  = useRef(null)
  const videoRef    = useRef(null)
  const headingRef  = useRef(null)
  const idCardRef   = useRef(null)
  const taglineRef  = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      /* ─────────────────────────────────────────
         2XL DESKTOP (1536px+)
         ───────────────────────────────────────── */
      mm.add('(min-width: 1536px)', () => {
        gsap.set(headingRef.current, { top: CONFIG.heading_top.desktop })
        gsap.set(idCardRef.current, {
          ...CONFIG.idCard.desktop2xl_pos,
          top: 'auto', xPercent: 0, yPercent: 0,
          x: 0, y: 40, opacity: 0,
          scale: CONFIG.idCard.scale2xl,
          transformOrigin: 'bottom left',
        })
        gsap.set(videoRef.current, {
          ...CONFIG.video.desktop2xl_pos,
          ...CONFIG.video.desktop2xl,
          left: 'auto', xPercent: 0, x: 0,
        })
        gsap.from('.hero-line', { y: '115%', duration: 1.6, stagger: 0.13, ease: 'expo.out', delay: 0.2 })
        gsap.from(taglineRef.current, { y: 28, opacity: 0, duration: 1.3, ease: 'power4.out', delay: 0.7 })
        gsap.to(idCardRef.current, { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.5 })
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: 1 },
        })
        tl.to(videoRef.current, { ...CONFIG.video.scroll_end, borderRadius: 6, ease: 'power2.inOut' }, 0)
        tl.to(headingRef.current, { opacity: 0.08, y: -24, scale: 0.97, ease: 'power2.out' }, 0)
        tl.to(idCardRef.current, { opacity: 0, x: -60, ease: 'power2.out' }, 0)
        tl.to(taglineRef.current, { opacity: 0, y: 12, ease: 'power2.out' }, 0)
      })

      /* ─────────────────────────────────────────
         DESKTOP lg–xl (1024px – 1535px)
         ───────────────────────────────────────── */
      mm.add('(min-width: 1024px) and (max-width: 1535px)', () => {
        gsap.set(headingRef.current, { top: CONFIG.heading_top.desktop })
        gsap.set(idCardRef.current, {
          ...CONFIG.idCard.desktop_pos,
          top: 'auto', xPercent: 0, yPercent: 0,
          x: 0, y: 40, opacity: 0,
          scale: 1, transformOrigin: 'bottom left',
        })
        gsap.set(videoRef.current, {
          ...CONFIG.video.desktop_pos,
          ...CONFIG.video.desktop,
          left: 'auto', xPercent: 0, x: 0,
        })
        gsap.from('.hero-line', { y: '115%', duration: 1.6, stagger: 0.13, ease: 'expo.out', delay: 0.2 })
        gsap.from(taglineRef.current, { y: 28, opacity: 0, duration: 1.3, ease: 'power4.out', delay: 0.7 })
        gsap.to(idCardRef.current, { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.5 })
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: 1 },
        })
        tl.to(videoRef.current, { ...CONFIG.video.scroll_end, borderRadius: 6, ease: 'power2.inOut' }, 0)
        tl.to(headingRef.current, { opacity: 0.08, y: -24, scale: 0.97, ease: 'power2.out' }, 0)
        tl.to(idCardRef.current, { opacity: 0, x: -60, ease: 'power2.out' }, 0)
        tl.to(taglineRef.current, { opacity: 0, y: 12, ease: 'power2.out' }, 0)
      })

      /* ─────────────────────────────────────────
         TABLET (768px – 1023px)
         ───────────────────────────────────────── */
      mm.add('(min-width: 768px) and (max-width: 1023px)', () => {
        const scaleCard = () => {
          gsap.set(idCardRef.current, {
            scale: Math.min(1, (window.innerWidth - 64) / CONFIG.idCard.fixedWidth),
          })
        }
        gsap.set(headingRef.current, { top: CONFIG.heading_top.tablet })
        gsap.set(idCardRef.current, {
          ...CONFIG.idCard.tablet_pos,
          xPercent: -50, yPercent: -50,
          bottom: 'auto', right: 'auto',
          width: CONFIG.idCard.fixedWidth,
          y: 40, opacity: 0,
          transformOrigin: 'center center',
        })
        scaleCard()
        window.addEventListener('resize', scaleCard)
        gsap.set(videoRef.current, {
          ...CONFIG.video.tablet_pos,
          left: '50%', xPercent: -50,
          width: CONFIG.video.tablet.width,
          height: CONFIG.video.tablet.height,
          right: 'auto',
        })
        gsap.from('.hero-line', { y: '115%', duration: 1.6, stagger: 0.1, ease: 'expo.out', delay: 0.2 })
        gsap.from(taglineRef.current, { y: 20, opacity: 0, duration: 1.3, ease: 'power4.out', delay: 0.7 })
        gsap.to(idCardRef.current, { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.5 })
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: 1 },
        })
        tl.to(videoRef.current, { ...CONFIG.video.scroll_end_tablet, borderRadius: 6, ease: 'power2.inOut' }, 0)
        tl.to(headingRef.current, { opacity: 0.1, y: -20, ease: 'power2.out' }, 0)
        tl.to(idCardRef.current, { opacity: 0, y: -30, ease: 'power2.out' }, 0)
        tl.to(taglineRef.current, { opacity: 0, ease: 'power2.out' }, 0)
        return () => window.removeEventListener('resize', scaleCard)
      })

      /* ─────────────────────────────────────────
         MOBILE (below 768px)
         ───────────────────────────────────────── */
      mm.add('(max-width: 767px)', () => {
        const scaleCard = () => {
          gsap.set(idCardRef.current, {
            scale: Math.min(1, (window.innerWidth - 32) / CONFIG.idCard.fixedWidth),
          })
        }
        gsap.set(headingRef.current, { top: CONFIG.heading_top.mobile })
        gsap.set(idCardRef.current, {
          ...CONFIG.idCard.mobile_pos,
          xPercent: -50, yPercent: -50,
          bottom: 'auto', right: 'auto',
          width: CONFIG.idCard.fixedWidth,
          y: 40, opacity: 0,
          transformOrigin: 'center center',
        })
        scaleCard()
        window.addEventListener('resize', scaleCard)
        gsap.set(videoRef.current, {
          ...CONFIG.video.mobile_pos,
          left: '50%', xPercent: -50,
          width: CONFIG.video.mobile.width,
          right: 'auto', height: 'auto',
        })
        gsap.from('.hero-line', { y: '115%', duration: 1.6, stagger: 0.1, ease: 'expo.out', delay: 0.2 })
        gsap.from(taglineRef.current, { y: 20, opacity: 0, duration: 1.3, ease: 'power4.out', delay: 0.7 })
        gsap.to(idCardRef.current, { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out', delay: 0.5 })
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: 1 },
        })
        tl.to(headingRef.current, { opacity: 0.1, y: -20, ease: 'power2.out' }, 0)
        tl.to(idCardRef.current, { opacity: 0, y: -40, ease: 'power2.out' }, 0)
        tl.to(taglineRef.current, { opacity: 0, ease: 'power2.out' }, 0)
        tl.to(videoRef.current, { ...CONFIG.video.scroll_end_mobile, ease: 'power2.inOut' }, 0)
        return () => window.removeEventListener('resize', scaleCard)
      })

      return () => mm.revert()
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} className="relative bg-ink" style={{ minHeight: '210vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ════════════════════════════════════════
            GRAFFITI LAYER
            All sizes/opacities → CONFIG.graffiti at top of file
            z-0   = ghost texture (behind everything)
            z-[1] = styled tags (behind heading/card/video)
            ════════════════════════════════════════ */}

        {/* ── GHOST TEXTURE (z-0) ── */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">

          {/* Ghost "A" — all sizes. Edit → CONFIG.graffiti.ghostA */}
          <span className="font-aerosoldier absolute cursor-target" style={{
            fontSize: CONFIG.graffiti.ghostA.fontSize,
            color: `rgba(200,255,0,${CONFIG.graffiti.ghostA.opacity})`,
            top: '-20px', left: '-10px',
            lineHeight: 1, transform: 'rotate(-5deg)',
          }}>A</span>

          {/* "chaos" — md+ only. Edit → CONFIG.graffiti.chaos */}
          <span className="font-street-wars absolute hidden md:block cursor-target" style={{
            fontSize: CONFIG.graffiti.chaos.fontSize,
            color: `rgba(230,59,46,${CONFIG.graffiti.chaos.opacity})`,
            bottom: '140px', left: '32%',
            lineHeight: 1, transform: 'rotate(4deg)',
          }}>chaos</span>

          {/* "content hits diff" — lg+ only. Edit → CONFIG.graffiti.contentHits */}
          <span className="font-don-graffiti absolute hidden lg:block cursor-target" style={{
            fontSize: CONFIG.graffiti.contentHits.fontSize,
            color: `rgba(245,230,211,${CONFIG.graffiti.contentHits.opacity})`,
            top: '56%', left: '40%',
            transform: 'rotate(3deg)',
          }}>content hits diff</span>
        </div>

        {/* ── STYLED TAGS (z-[1]) ── */}

        {/* "~make em stay~" — top-right, md+. Edit → CONFIG.graffiti.makeEmStay */}
        <div className="absolute hidden md:block pointer-events-none z-[1]" style={{ top: '9%', right: '2%' }}>
          <span className="font-decipher cursor-target" style={{
            fontSize: CONFIG.graffiti.makeEmStay.fontSize,
            color: `rgba(200,255,0,${CONFIG.graffiti.makeEmStay.opacity})`,
            display: 'block', transform: 'rotate(-7deg)',
            textShadow: '0 0 14px rgba(200,255,0,0.25)',
            pointerEvents: 'auto',
          }}>~make em stay~</span>
        </div>

        {/* Left tag — md+. Edit → CONFIG.graffiti.leftTag */}
        <div className="absolute hidden md:block pointer-events-none z-[1]" style={{ top: '38%', left: '1.5%' }}>
          {/* Tablet */}
          <div className="font-aerosoldier block lg:hidden cursor-target" style={{
            fontSize: CONFIG.graffiti.leftTag.tablet.fontSize,
            color: CONFIG.graffiti.leftTag.color,
            opacity: CONFIG.graffiti.leftTag.tablet.opacity,
            transform: 'rotate(-3deg)', lineHeight: 1.3,
            pointerEvents: 'auto',
          }}>
            <div>~i will help</div>
            <div>your imagination</div>
            <div>come true~</div>
          </div>
          {/* Desktop */}
          <div className="font-aerosoldier hidden lg:block cursor-target" style={{
            fontSize: CONFIG.graffiti.leftTag.desktop.fontSize,
            color: CONFIG.graffiti.leftTag.color,
            opacity: CONFIG.graffiti.leftTag.desktop.opacity,
            transform: 'rotate(-4deg)', lineHeight: 1.3,
            textShadow: '2px 2px 0 rgba(0,0,0,0.5)',
            pointerEvents: 'auto',
          }}>
            <div>~i will help</div>
            <div>your imagination</div>
            <div>come true~</div>
          </div>
        </div>

        {/* Right tag — md+. Edit → CONFIG.graffiti.rightTag */}
        <div className="absolute hidden md:block pointer-events-none z-[1]" style={{ bottom: '32%', right: '1.5%' }}>
          {/* Tablet */}
          <div className="font-decipher block lg:hidden cursor-target" style={{
            fontSize: CONFIG.graffiti.rightTag.tablet.fontSize,
            color: CONFIG.graffiti.rightTag.color,
            opacity: CONFIG.graffiti.rightTag.tablet.opacity,
            transform: 'rotate(-3deg)', lineHeight: 1.3, textAlign: 'right',
            pointerEvents: 'auto',
          }}>
            <div>~crafting the internet&apos;s</div>
            <div>most addictive content~</div>
          </div>
          {/* Desktop */}
          <div className="font-decipher hidden lg:block cursor-target" style={{
            fontSize: CONFIG.graffiti.rightTag.desktop.fontSize,
            color: CONFIG.graffiti.rightTag.color,
            opacity: CONFIG.graffiti.rightTag.desktop.opacity,
            transform: 'rotate(-4deg)', lineHeight: 1.3, textAlign: 'right',
            textShadow: '0 0 18px rgba(200,255,0,0.3)',
            pointerEvents: 'auto',
          }}>
            <div>~crafting the internet&apos;s</div>
            <div>most addictive content~</div>
          </div>
        </div>

        {/* Empty div — taglineRef kept so GSAP scroll timeline doesn't error */}
        <div ref={taglineRef} className="absolute" style={{ bottom: '20%', left: '50%', opacity: 0 }} />

        {/* ════════════════════════════════════════
            NAVBAR
            ════════════════════════════════════════ */}
        <nav className="absolute top-5 left-5 right-5 flex items-center justify-between z-50">
          <div className="hidden md:flex flex-col gap-0.5">
            {['Work', 'Services', 'Agency'].map(l => (
              <a key={l} href="#"
                className="text-sm font-lemon-milk text-neutral-500 hover:text-bone transition-colors cursor-target"
              >{l}</a>
            ))}
          </div>
          <div className="font-don-graffiti text-3xl md:text-4xl font-extrabold text-cream tracking-tight mx-auto md:mx-0 cursor-target">
            aadi2005
          </div>
          <button className="hidden md:block font-lemon-milk text-sm text-white bg-brutal-red px-5 py-2 rounded hover:opacity-90 transition-opacity cursor-target">
            Let&apos;s Connect
          </button>
        </nav>

        {/* ════════════════════════════════════════
            MAIN HEADING
            Font size  → CONFIG.heading.fontSize
            Top offset → CONFIG.heading_top (set by GSAP)
            ════════════════════════════════════════ */}
        <div
          ref={headingRef}
          className="absolute inset-x-0 flex flex-col items-center justify-center z-10 px-4"
          style={{ top: CONFIG.heading_top.desktop }}
        >
          {['Helping our partners', 'build original brands'].map(line => (
            <div key={line} className="overflow-hidden">
              <h1 className={`hero-line font-magazine text-bone leading-none tracking-tight text-center ${CONFIG.heading.fontSize}`}>
                {line}
              </h1>
            </div>
          ))}
          <div className="overflow-hidden">
            <h1 className={`hero-line font-magazine text-bone leading-none tracking-tight text-center flex items-center justify-center gap-4 sm:gap-6 ${CONFIG.heading.fontSize}`}>
              <Ornament /> that shine. <Ornament flip />
            </h1>
          </div>
        </div>

        {/* ════════════════════════════════════════
            ID CARD
            No position/size classes — GSAP owns everything.
            ════════════════════════════════════════ */}
        <div ref={idCardRef} className="absolute z-20 cursor-target">
          <HeroIDCard />
        </div>

        {/* ════════════════════════════════════════
            VIDEO
            No position/size classes — GSAP owns everything.
            To change video: update the import at the top.
            ════════════════════════════════════════ */}
        <div ref={videoRef} className="absolute z-10 overflow-hidden rounded-[12px] cursor-target">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover block" src={mainVideo} />
          <span className="font-decipher absolute" style={{
            bottom: 14, left: 16, fontSize: '1.15rem',
            color: 'rgba(229, 255, 0, 0.75)',
            transform: 'rotate(-2deg)', pointerEvents: 'none', userSelect: 'none',
          }}>~show that hits different~</span>
          <span className="font-mono absolute" style={{
            top: 12, left: 14, fontSize: 9, letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.5)', fontWeight: 700,
          }}>01 / SHOWREEL</span>
        </div>

        {/* ════════════════════════════════════════
            GRAIN OVERLAY — film texture
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