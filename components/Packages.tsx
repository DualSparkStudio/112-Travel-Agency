'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

// Fallback packages if API fails
const fallbackPackages = [
  {
    id: 1,
    title: 'European Adventure',
    duration: '10 Days',
    price: 2499,
    features: ['Flights Included', '4-Star Hotels', 'Daily Breakfast', 'City Tours'],
    type: 'tour',
  },
  {
    id: 2,
    title: 'Asian Discovery',
    duration: '14 Days',
    price: 3299,
    features: ['Multi-City Flights', 'Luxury Resorts', 'All Meals', 'Cultural Experiences'],
    type: 'tour',
  },
  {
    id: 3,
    title: 'Tropical Paradise',
    duration: '7 Days',
    price: 1899,
    features: ['Beachfront Resort', 'Water Sports', 'Spa Access', 'Sunset Cruises'],
    type: 'tour',
  },
]

export default function Packages() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [packages, setPackages] = useState<any[]>(fallbackPackages)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${API_URL}/api/packages?type=tour`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (res.ok) {
          const data = await res.json()
          if (data.success && data.data && data.data.length > 0) {
            // Take first 3 packages
            setPackages(data.data.slice(0, 3))
          } else {
            // Use fallback if API returns no data
            setPackages(fallbackPackages)
          }
        } else {
          // Use fallback if API fails
          setPackages(fallbackPackages)
        }
      } catch (err) {
        console.error('Error fetching packages:', err)
        // Use fallback if API fails
        setPackages(fallbackPackages)
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()
  }, [])

  useEffect(() => {
    if (packages.length > 0 && sectionRef.current) {
      const ctx = gsap.context(() => {
        // Set initial state
        gsap.set('.package-card', { opacity: 1, scale: 1 })
        
        // Animate on scroll
        gsap.fromTo('.package-card',
          {
            scale: 0.8,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            stagger: 0.2,
          }
        )
      }, sectionRef)

      return () => ctx.revert()
    }
  }, [packages])

  const getTypeLabel = (type: string) => {
    const typeMap: { [key: string]: string } = {
      tour: 'Tour Package',
      flight: 'Flight',
      train: 'Train',
      bus: 'Bus',
    }
    return typeMap[type] || type
  }

  // Color themes for different packages
  const getCardTheme = (index: number) => {
    const themes = [
      { bg: 'bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500', text: 'text-white' },
      { bg: 'bg-gradient-to-br from-orange-500 via-red-500 to-pink-500', text: 'text-white' },
      { bg: 'bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500', text: 'text-white' },
      { bg: 'bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-500', text: 'text-white' },
      { bg: 'bg-gradient-to-br from-amber-500 via-orange-500 to-red-500', text: 'text-white' },
      { bg: 'bg-gradient-to-br from-teal-blue via-sky-blue-dark to-teal-blue', text: 'text-white' },
    ]
    return themes[index % themes.length]
  }

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black mb-4 text-charcoal">
            Premium
            <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
              Packages
            </span>
          </h2>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
            All-inclusive travel packages designed for unforgettable experiences
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-96 rounded-2xl bg-white/10" />
            ))}
          </div>
        ) : packages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => {
              const theme = getCardTheme(index)
              return (
              <div
                key={pkg._id || pkg.id}
                className={`package-card premium-card ${theme.bg} ${theme.text} rounded-2xl overflow-hidden shadow-xl`}
              >
                {pkg.images && pkg.images.length > 0 && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={pkg.images[0]}
                      alt={pkg.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-8">
                  <div className="mb-4">
                    <span className="text-sm font-semibold text-gold uppercase tracking-wider">
                      {getTypeLabel(pkg.type)}
                    </span>
                    <h3 className="text-3xl font-bold mt-2 mb-2">{pkg.title}</h3>
                    <p className="opacity-90">{pkg.duration}</p>
                  </div>

                  {pkg.features && pkg.features.length > 0 && (
                    <ul className="space-y-3 mb-8">
                      {pkg.features.slice(0, 4).map((feature: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <svg className="w-5 h-5 text-yellow-300 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm opacity-95">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-black">
                      ${typeof pkg.price === 'number' ? pkg.price.toLocaleString() : pkg.price}
                    </span>
                    <span className="text-sm opacity-80">per person</span>
                  </div>

                  <Link
                    href={`/packages/${pkg._id || pkg.id}`}
                    className="block w-full premium-btn text-center bg-white text-charcoal hover:bg-off-white font-semibold"
                  >
                    View Details
                  </Link>
                </div>
              </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-charcoal/70 text-xl">No packages available at the moment.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/packages" className="premium-btn bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 inline-block border-none">
            Explore All Packages
          </Link>
        </div>
      </div>
    </section>
  )
}

