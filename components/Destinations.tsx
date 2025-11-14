'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const destinations = [
  {
    id: 1,
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800',
    description: 'Tropical paradise with stunning beaches',
    price: '$899',
  },
  {
    id: 2,
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
    description: 'Breathtaking sunsets and white architecture',
    price: '$1,299',
  },
  {
    id: 3,
    name: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    description: 'Modern metropolis meets traditional culture',
    price: '$1,199',
  },
  {
    id: 4,
    name: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    description: 'The city of lights and romance',
    price: '$1,099',
  },
  {
    id: 5,
    name: 'Maldives',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    description: 'Crystal clear waters and luxury resorts',
    price: '$1,599',
  },
  {
    id: 6,
    name: 'Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    description: 'Ultra-modern city in the desert',
    price: '$1,399',
  },
]

export default function Destinations() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards on scroll
      gsap.utils.toArray<HTMLElement>('.destination-card').forEach((card, index) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.1,
        })
      })

      // Parallax images
      gsap.utils.toArray<HTMLElement>('.destination-image').forEach((img) => {
        gsap.to(img, {
          y: -50,
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-off-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black text-charcoal mb-4">
            Popular
            <span className="block bg-gradient-to-r from-teal-blue to-sky-blue-dark bg-clip-text text-transparent">
              Destinations
            </span>
          </h2>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
            Explore the world's most beautiful places with our curated selection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Link
              key={destination.id}
              href={`/destinations/${destination.id}`}
              className="destination-card premium-card group relative overflow-hidden rounded-2xl bg-white"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="destination-image object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                  <p className="text-sm opacity-90">{destination.description}</p>
                  <p className="text-xl font-bold text-gold mt-2">From {destination.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/destinations" className="premium-btn inline-block">
            View All Destinations
          </Link>
        </div>
      </div>
    </section>
  )
}

