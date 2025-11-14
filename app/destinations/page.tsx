'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import BackButton from '@/components/BackButton'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

// Fallback destinations if API fails
const fallbackDestinations = [
  {
    _id: '1',
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800',
    description: 'Tropical paradise with stunning beaches and rich culture',
    price: 899,
    duration: '7 Days',
    location: { city: 'Bali', country: 'Indonesia' },
  },
  {
    _id: '2',
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
    description: 'Breathtaking sunsets and white architecture',
    price: 1299,
    duration: '5 Days',
    location: { city: 'Santorini', country: 'Greece' },
  },
  {
    _id: '3',
    name: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    description: 'Modern metropolis meets traditional culture',
    price: 1199,
    duration: '6 Days',
    location: { city: 'Tokyo', country: 'Japan' },
  },
  {
    _id: '4',
    name: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    description: 'The city of lights and romance',
    price: 1099,
    duration: '5 Days',
    location: { city: 'Paris', country: 'France' },
  },
  {
    _id: '5',
    name: 'Maldives',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    description: 'Crystal clear waters and luxury resorts',
    price: 1599,
    duration: '7 Days',
    location: { country: 'Maldives' },
  },
  {
    _id: '6',
    name: 'Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    description: 'Ultra-modern city in the desert',
    price: 1399,
    duration: '5 Days',
    location: { city: 'Dubai', country: 'UAE' },
  },
]

export default function DestinationsPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [destinations, setDestinations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Try to fetch from API
        const res = await fetch(`${API_URL}/api/destinations`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        
        const data = await res.json()
        
        if (data.success && data.data && data.data.length > 0) {
          setDestinations(data.data)
        } else if (data.success && (!data.data || data.data.length === 0)) {
          // API returned success but no data - use fallback
          setDestinations(fallbackDestinations)
        } else {
          throw new Error(data.message || 'Failed to load destinations')
        }
      } catch (err: any) {
        console.error('Error fetching destinations:', err)
        // If API fails, use fallback data
        setDestinations(fallbackDestinations)
        setError(null) // Don't show error, just use fallback
      } finally {
        setLoading(false)
      }
    }

    fetchDestinations()
  }, [])

  useEffect(() => {
    if (destinations.length > 0 && sectionRef.current) {
      const ctx = gsap.context(() => {
        // Set initial state to visible
        gsap.set('.destination-item', { opacity: 1, y: 0 })
        
        // Animate on scroll
        gsap.fromTo('.destination-item',
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            stagger: 0.1,
          }
        )
      }, sectionRef)

      return () => ctx.revert()
    }
  }, [destinations])

  return (
    <main className="min-h-screen">
      <Navbar />
      <section ref={sectionRef} className="pt-32 pb-24 bg-off-white">
        <div className="container-custom">
          <BackButton />
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-black text-charcoal mb-4">
              All
              <span className="block bg-gradient-to-r from-teal-blue to-sky-blue-dark bg-clip-text text-transparent">
                Destinations
              </span>
            </h1>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
              Discover amazing places around the world
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="skeleton h-80 rounded-2xl" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
              <div className="mb-6">
                <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-xl text-charcoal/70 mb-2 font-semibold">Connection Error</p>
              <p className="text-charcoal/60 mb-6 text-sm">{error}</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="premium-btn"
                >
                  Retry
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-6 py-3 border-2 border-teal-blue text-teal-blue rounded-lg hover:bg-teal-blue hover:text-white transition-colors"
                >
                  Go Home
                </button>
              </div>
            </div>
          ) : destinations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-charcoal/70">No destinations available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((destination) => (
                <Link
                  key={destination._id}
                  href={`/destinations/${destination._id}`}
                  className="destination-item premium-card group relative overflow-hidden rounded-2xl bg-white image-hover opacity-100"
                >
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={destination.image || destination.images?.[0] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800'}
                      alt={destination.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                      <p className="text-sm opacity-90 mb-2 line-clamp-2">{destination.description}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold text-gold">From ${destination.price?.toLocaleString()}</p>
                        <span className="text-sm">{destination.duration}</span>
                      </div>
                      {destination.location && (
                        <p className="text-xs opacity-75 mt-1">
                          {destination.location.city && `${destination.location.city}, `}
                          {destination.location.country}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}

