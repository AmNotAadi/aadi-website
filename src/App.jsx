import { useEffect, useState } from 'react'
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
import TargetCursor from './components/TargetCursor'
import MinecraftCursor from './components/MCCursor'
import Connect from './components/Connect'

gsap.registerPlugin(ScrollTrigger)

function Home({ onNavigate }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <VaultGrid />
      <MinecraftCursor skinUrl="https://minotar.net/skin/Eystreem" />
      <Services onNavigate={onNavigate} />
      <StatsMarquee />
      <ClientCards />
      <Footer onNavigate={onNavigate} />
    </>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');

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
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
      />
      {currentPage === 'home' ? (
        <Home onNavigate={setCurrentPage} />
      ) : (
        <Connect onNavigate={setCurrentPage} />
      )}
    </Layout>
  )
}

export default App
