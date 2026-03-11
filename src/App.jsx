import Layout from './components/Layout'
import Hero from './components/Hero'
import StatsMarquee from './components/StatsMarquee'
import Services from './components/Services'
import VaultGrid from './components/VaultGrid'
import ClientCards from './components/ClientCards'
import Footer from './components/Footer'
import IDCard from './components/IDCard'

function App() {
  return (
    <Layout>
      <Hero />
      <IDCard/>
      <VaultGrid />
      <Services />
      <StatsMarquee />
      <ClientCards />
      <Footer />
    </Layout>
  )
}

export default App
