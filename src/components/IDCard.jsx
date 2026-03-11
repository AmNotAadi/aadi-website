import { useEffect, useRef } from 'react';
import Tilt from 'react-parallax-tilt';
import JsBarcode from 'jsbarcode';
import TargetCursor from './TargetCursor';

const PORTFOLIO_URL = 'https://www.youtube.com/watch?v=xnFvhn-1wHY&list=RDxnFvhn-1wHY&start_radio=1';

// Barcode under photo (small decorative one)
const PHOTO_BAR_HEIGHTS = [80, 45, 100, 65, 90, 35, 75, 55, 95, 70, 85, 40, 100, 60, 80, 50, 90, 65, 75, 55];

function Barcode({ value, lineColor = '#000000' }) {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      JsBarcode(svgRef.current, value, {
        format: 'CODE128',
        width: 2.2,
        height: 80,
        displayValue: false,
        background: 'transparent',
        lineColor,
        margin: 0,
      });
    }
  }, [value, lineColor]);

  return <svg ref={svgRef} />;
}

export default function IDCard() {
  return (
    <section className="relative w-full flex justify-center items-center overflow-hidden bg-black font-mono py-14">
      <TargetCursor targetSelector=".cursor-target" spinDuration={2} hoverDuration={0.2} parallaxOn={true} />

      {/* ── Animated background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="id-orb id-orb-1" />
        <div className="id-orb id-orb-2" />
        <div className="id-orb id-orb-3" />
        <div className="absolute inset-0 id-dot-grid" />
      </div>

      {/* ── 3D Tilt Card ── */}
      <Tilt
        tiltMaxAngleX={16}
        tiltMaxAngleY={16}
        perspective={1100}
        glareEnable={true}
        glareMaxOpacity={0.28}
        glareColor="#ddd0ff"
        glarePosition="all"
        scale={1.05}
        transitionSpeed={600}
        gyroscope={true}
        className="z-10 cursor-target"
      >
        {/* Animated gradient border */}
        <div className="rounded-2xl p-[2px] id-card-glow-border">
          <div className="relative bg-[#D4C4A8] w-[490px] rounded-2xl overflow-hidden">

            {/* Holographic shimmer overlay */}
            <div className="absolute inset-0 id-card-shimmer pointer-events-none z-20 rounded-2xl" />

            {/* ── Header ── */}
            <div className="flex justify-between items-center px-4 pt-1 pb-1 border-b border-black/10">
              <div className="flex flex-col">
                <p className="text-[9px] tracking-widest uppercase text-black/60 font-bold">Identification Card</p>
                <p className="text-[9px] text-black/35 font-mono">No.2345687981798</p>
              </div>
              <div className="font-decipher font-semibold text-3xl id-hologram-text">
                creative license
              </div>
            </div>

            {/* ── Body ── */}
            <div className="relative flex flex-row px-4 pt-3 pb-3 gap-4">

              {/* Photo + barcode decoration */}
              <div className="flex-shrink-0 flex flex-col gap-2">
                <div className="w-[100px] h-[130px] border-2 border-black/20 overflow-hidden rounded-sm shadow-inner cursor-target">
                  <img
                    src="/src/assets/blog04.jpg"
                    alt="aadi2005"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* <div className="flex gap-[1.5px] h-6 items-end px-[2px]">
                  {PHOTO_BAR_HEIGHTS.map((h, i) => (
                    <div key={i} className="bg-black/50 flex-1" style={{ height: `${h}%` }} />
                  ))}
                </div> */}
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col gap-[2px] text-black text-[10px] font-bold">
                <div className="flex justify-between">
                  <span>[Name] aadi2005</span>
                  <span>[DOB] 25/0X/2005</span>
                </div>
                <div className="flex justify-between">
                  <span>[gender] male</span>
                  <span>[location] cosmos</span>
                </div>

                <div className="border-t border-black/10 pt-1">
                  <p className="text-[9px] text-black/45 font-normal mb-[1px]">[creativity score]</p>
                  <div className="text-[35px] font-bold font-decipher leading-tight id-graffiti-score cursor-target">
                    tends to infinity
                  </div>
                </div>

                <div className="border-t border-black/10 pt-1">
                  <div className="flex justify-between items-end gap-2">
                    <div>
                      <p className="text-[9px] text-black/45 font-normal">[availability]</p>
                      <p>always</p>
                    </div>
                    <div className="text-right">
                      <p className="font-lemon-milk text-[8px] text-black/45">Issue Date</p>
                      <p>never mind</p>
                    </div>
                    <div className="text-right">
                      <p className="font-lemon-milk text-[8px] text-black/45">Expiry Date</p>
                      <p>till die</p>
                    </div>
                  </div>
                </div>

                {/* Graffiti marker scrawl — absolutely overlaid on the card body */}
              </div>
            </div>

            {/* ── Graffiti marker scrawl over the card ── */}
            <div className="id-graffiti-overlay font-aerosoldier cursor-target" aria-hidden="true">
              always stay awesome
            </div>

            <div className="font-brunson-rough text-5xl dame text-brutal-red cursor-target">DAME</div>

            {/* ── Horizontal JsBarcode strip — clickable & scannable ── */}
            <a
              href={PORTFOLIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block group cursor-target"
            >
              <div className="flex items-center bg-transparent border-t border-black/15 px-4 py-2 gap-3 transition-colors group-hover:bg-black/5">

                {/* Left label */}
                <div className="flex flex-col justify-center text-[8px] text-black/40 uppercase tracking-widest leading-snug shrink-0 w-14">
                  <span className="font-bold text-black/60">aadi2005</span>
                  <span>portfolio</span>
                  <span className="text-[7px]">2345687</span>
                </div>

                {/* Real CODE128 barcode — transparent bg, stretches full width */}
                <div className="flex-1 flex items-center justify-center overflow-hidden">
                  <Barcode value={PORTFOLIO_URL} lineColor="#1a1a1a" />
                </div>

                {/* Right label */}
                <div className="flex flex-col justify-center items-end text-[8px] text-black/40 uppercase tracking-widest leading-snug shrink-0 w-20">
                  <span className="font-bold text-black/60 group-hover:text-brutal-red transition-colors">↗ visit</span>
                  <span className="text-[7px] normal-case text-black/30 truncate max-w-full">aadi2005.com</span>
                </div>
              </div>
            </a>

          </div>
        </div>
      </Tilt>
    </section>
  );
}



