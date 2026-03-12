import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Layout from './components/Layout'
import Hero from './components/Hero'
import StatsMarquee from './components/StatsMarquee'
import Services from './components/Services'
import VaultGrid from './components/VaultGrid'
import ClientCards from './components/ClientCards'
import Footer from './components/Footer'
import IDCard from './components/IDCard'

gsap.registerPlugin(ScrollTrigger)

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.07 })

    lenis.on('scroll', ScrollTrigger.update)

    const tickerFn = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tickerFn)
    }
  }, [])

  return (
    <Layout>
      <Hero />
      {/* <IDCard/> */}
      <VaultGrid />
      <Services />
      <StatsMarquee />
      <ClientCards />
      <Footer />
    </Layout>
  )
}

export default App
