'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const heroImages = [
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
  'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1920&q=80',
]

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate background images with parallax and fade
      imageRefs.current.forEach((ref, index) => {
        if (ref) {
          // Initial animation for images
          gsap.from(ref, {
            scale: 1.2,
            opacity: 0,
            duration: 2,
            ease: 'power2.out',
            delay: index * 0.3,
          })

          // Parallax effect on scroll
          gsap.to(ref, {
            y: 100,
            scale: 1.1,
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        }
      })

      // Animate heading
      gsap.from('.hero-heading', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.5,
      })

      // Animate subtitle
      gsap.from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8,
      })

      // Animate buttons
      gsap.from('.hero-buttons', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.1,
      })

      // Floating animation for images
      imageRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.to(ref, {
            y: '+=20',
            duration: 3 + index,
            ease: 'power1.inOut',
            repeat: -1,
            yoyo: true,
          })
        }
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Magnetic button effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Main Background Image */}
      <div 
        ref={(el) => { imageRefs.current[0] = el }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={heroImages[0]}
          alt="Hero background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/70" />
        <div className="absolute inset-0 noise-overlay" />
      </div>

      {/* Animated Overlay Images */}
      <div 
        ref={(el) => { imageRefs.current[1] = el }}
        className="absolute top-20 right-10 w-64 h-64 md:w-96 md:h-96 z-10 rounded-2xl overflow-hidden shadow-2xl opacity-80"
      >
        <Image
          src={heroImages[1]}
          alt="Travel destination"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 256px, 384px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
      </div>

      <div 
        ref={(el) => { imageRefs.current[2] = el }}
        className="absolute bottom-20 left-10 w-56 h-56 md:w-80 md:h-80 z-10 rounded-2xl overflow-hidden shadow-2xl opacity-80"
      >
        <Image
          src={heroImages[2]}
          alt="Travel experience"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 224px, 320px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent" />
      </div>

      {/* Animated Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="blob bg-sky-blue w-96 h-96 top-20 left-20 opacity-30" />
        <div className="blob bg-teal-blue w-80 h-80 bottom-20 right-20 opacity-30" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white container-custom px-4">
        <h1 ref={headingRef} className="hero-heading mb-6">
          Discover
          <br />
          <span className="bg-gradient-to-r from-sky-blue to-gold bg-clip-text text-transparent">
            Extraordinary
          </span>
          <br />
          Journeys
        </h1>
        <p className="hero-subtitle text-xl md:text-2xl mb-12 max-w-2xl mx-auto opacity-90">
          Experience luxury travel with our curated destinations and premium packages
        </p>
        <div className="hero-buttons flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            href="/packages"
            className="magnetic-btn premium-btn"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            Explore Tours
          </Link>
          <Link
            href="/book"
            className="magnetic-btn premium-btn bg-transparent border-2 border-white hover:bg-white hover:text-charcoal"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            Book Tickets
          </Link>
        </div>
      </div>


      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

