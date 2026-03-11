import { ReactLenis } from 'lenis/react'

// Exponential ease-out — matches the "Griflan physics" feel
const lenisEasing = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

export default function Layout({ children }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.4,
        easing: lenisEasing,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}
