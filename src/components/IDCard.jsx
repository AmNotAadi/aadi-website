import { useRef, useEffect } from 'react'
import Tilt from 'react-parallax-tilt'
import JsBarcode from 'jsbarcode'
import portraitImg from '../assets/idcard.png'

const PORTFOLIO_URL = 'https://www.youtube.com/watch?v=xnFvhn-1wHY'

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

export default function IDCard({ isInline = false }) {
  const cardContent = (
    <Tilt 
      tiltMaxAngleX={12} 
      tiltMaxAngleY={12} 
      perspective={1100} 
      glareEnable 
      glareMaxOpacity={0.22} 
      glareColor="#ddd0ff" 
      scale={1.03} 
      transitionSpeed={600} 
      gyroscope
      style={{ transformStyle: 'preserve-3d', display: 'block' }}
    >
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
  )

  if (isInline) {
    return (
      <div className="w-full flex justify-center items-center py-4">
        <div className="id-scale-wrapper" style={{ width: 420, flexShrink: 0 }}>
          {cardContent}
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          .id-scale-wrapper {
            transform-origin: center center;
            transition: transform 0.3s ease;
          }
          @media (max-width: 600px) {
            .id-scale-wrapper { transform: scale(0.85); }
          }
          @media (max-width: 500px) {
            .id-scale-wrapper { transform: scale(0.7); }
          }
          @media (max-width: 400px) {
            .id-scale-wrapper { transform: scale(0.6); }
          }
          @media (max-width: 350px) {
            .id-scale-wrapper { transform: scale(0.5); }
          }
        `}} />
      </div>
    )
  }

  return (
    <section className="relative w-full flex justify-center items-center bg-black font-mono py-14">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="id-orb id-orb-1" />
        <div className="id-orb id-orb-2" />
        <div className="id-orb id-orb-3" />
        <div className="absolute inset-0 id-dot-grid" />
      </div>
      {cardContent}
    </section>
  )
}
