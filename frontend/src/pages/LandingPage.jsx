import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import {
  CallToAction,
  Categories,
  Hero,
  HowItWorks,
  Roles,
  Stats,
  Testimonials,
} from '../features/landing/index.js'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <Categories />
        <Roles />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}
