'use client'

import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Destinations from '@/components/Destinations'
import Packages from '@/components/Packages'
import Features from '@/components/Features'
import Reviews from '@/components/Reviews'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function Home() {
  useEffect(() => {
    // Initialize GSAP animations
    if (typeof window !== 'undefined') {
      import('gsap').then(({ gsap }) => {
        gsap.registerPlugin(require('gsap/ScrollTrigger').ScrollTrigger)
      })
    }
  }, [])

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Destinations />
      <Packages />
      <Features />
      <Reviews />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}

