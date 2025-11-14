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

// Fallback packages if API fails
const fallbackPackages = [
  {
    _id: '1',
    title: 'European Adventure',
    duration: '10 Days',
    price: 2499,
    type: 'tour',
    description: 'Experience the best of Europe with this comprehensive tour package.',
    features: ['Flights Included', '4-Star Hotels', 'Daily Breakfast', 'City Tours', 'Travel Insurance'],
    images: ['https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800'],
  },
  {
    _id: '2',
    title: 'Asian Discovery',
    duration: '14 Days',
    price: 3299,
    type: 'tour',
    description: 'Explore the vibrant cultures and stunning landscapes of Asia.',
    features: ['Multi-City Flights', 'Luxury Resorts', 'All Meals', 'Cultural Experiences', 'Guided Tours'],
    images: ['https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800'],
  },
  {
    _id: '3',
    title: 'Tropical Paradise',
    duration: '7 Days',
    price: 1899,
    type: 'tour',
    description: 'Relax and unwind in beautiful tropical destinations.',
    features: ['Beachfront Resort', 'Water Sports', 'Spa Access', 'Sunset Cruises', 'All-Inclusive'],
    images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'],
  },
  {
    _id: '4',
    title: 'Mountain Escape',
    duration: '8 Days',
    price: 2199,
    type: 'tour',
    description: 'Adventure in the mountains with breathtaking views.',
    features: ['Mountain Lodges', 'Hiking Tours', 'Scenic Views', 'Adventure Activities', 'Equipment Included'],
    images: ['https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800'],
  },
]

export default function PackagesPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [packages, setPackages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Try to fetch from API
        const res = await fetch(`${API_URL}/api/packages`, {
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
          setPackages(data.data)
        } else if (data.success && (!data.data || data.data.length === 0)) {
          // API returned success but no data - use fallback
          setPackages(fallbackPackages)
        } else {
          throw new Error(data.message || 'Failed to load packages')
        }
      } catch (err: any) {
        console.error('Error fetching packages:', err)
        // If API fails, use fallback data
        setPackages(fallbackPackages)
        setError(null) // Don't show error, just use fallback
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()
  }, [])

  useEffect(() => {
    if (packages.length > 0 && sectionRef.current) {
      const ctx = gsap.context(() => {
        // Set initial state to visible
        gsap.set('.package-item', { opacity: 1, scale: 1 })
        
        // Animate on scroll
        gsap.fromTo('.package-item',
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
      { border: 'border-purple-500/30', hover: 'hover:border-purple-500', accent: 'text-purple-600', button: 'bg-gradient-to-r from-purple-600 to-purple-500' },
      { border: 'border-orange-500/30', hover: 'hover:border-orange-500', accent: 'text-orange-600', button: 'bg-gradient-to-r from-orange-600 to-orange-500' },
      { border: 'border-emerald-500/30', hover: 'hover:border-emerald-500', accent: 'text-emerald-600', button: 'bg-gradient-to-r from-emerald-600 to-emerald-500' },
      { border: 'border-pink-500/30', hover: 'hover:border-pink-500', accent: 'text-pink-600', button: 'bg-gradient-to-r from-pink-600 to-pink-500' },
      { border: 'border-indigo-500/30', hover: 'hover:border-indigo-500', accent: 'text-indigo-600', button: 'bg-gradient-to-r from-indigo-600 to-indigo-500' },
      { border: 'border-teal-500/30', hover: 'hover:border-teal-500', accent: 'text-teal-600', button: 'bg-gradient-to-r from-teal-600 to-teal-500' },
    ]
    return themes[index % themes.length]
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <section ref={sectionRef} className="pt-32 pb-24 bg-off-white">
        <div className="container-custom">
          <BackButton />
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-black text-charcoal mb-4">
              All
              <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                Packages
              </span>
            </h1>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
              Choose from our curated selection of premium travel packages
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="skeleton h-96 rounded-2xl" />
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
          ) : packages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-charcoal/70">No packages available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, index) => {
                const theme = getCardTheme(index)
                return (
                <Link
                  key={pkg._id}
                  href={`/packages/${pkg._id}`}
                  className={`package-item premium-card bg-white rounded-2xl overflow-hidden border-2 ${theme.border} ${theme.hover} transition-all group opacity-100 shadow-lg hover:shadow-xl`}
                >
                  {pkg.images && pkg.images.length > 0 && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={pkg.images[0]}
                        alt={pkg.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="p-8">
                    <div className="mb-4">
                      <span className="text-sm font-semibold text-gold uppercase tracking-wider">
                        {getTypeLabel(pkg.type)}
                      </span>
                      <h3 className="text-3xl font-bold mt-2 mb-2 text-charcoal">{pkg.title}</h3>
                      <p className="text-charcoal/70">{pkg.duration}</p>
                    </div>

                    {pkg.description && (
                      <p className="text-charcoal/70 mb-4 line-clamp-2">{pkg.description}</p>
                    )}

                    {pkg.features && pkg.features.length > 0 && (
                      <ul className="space-y-3 mb-8">
                        {pkg.features.slice(0, 4).map((feature: string, index: number) => (
                          <li key={index} className="flex items-center text-charcoal/80">
                            <svg className="w-5 h-5 text-gold mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                        {pkg.features.length > 4 && (
                          <li className="text-sm text-charcoal/60">+ {pkg.features.length - 4} more features</li>
                        )}
                      </ul>
                    )}

                    <div className="flex items-center justify-between mb-6">
                      <span className={`text-4xl font-black ${theme.accent}`}>${pkg.price?.toLocaleString()}</span>
                      <span className="text-sm text-charcoal/60">per person</span>
                    </div>

                    <div className={`premium-btn text-center ${theme.button} text-white border-none hover:opacity-90`}>
                      View Details
                    </div>
                  </div>
                </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}

