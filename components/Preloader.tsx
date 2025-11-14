'use client'

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.to('.preloader-text', {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
    })
      .to('.preloader-text', {
        y: -100,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.in',
        delay: 1,
      })
      .to('.preloader', {
        y: '-100%',
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => setIsLoading(false),
      })

    return () => {
      tl.kill()
    }
  }, [])

  if (!isLoading) return null

  return (
    <div className="preloader fixed inset-0 z-[9999] bg-gradient-to-br from-teal-blue via-sky-blue-dark to-teal-blue flex items-center justify-center">
      <div className="text-center">
        <h1 className="preloader-text text-6xl md:text-8xl font-black text-white opacity-0 translate-y-20">
          TRAVEL
        </h1>
        <p className="preloader-text text-xl md:text-2xl text-white/80 mt-4 opacity-0 translate-y-20">
          Premium Experiences
        </p>
      </div>
    </div>
  )
}

