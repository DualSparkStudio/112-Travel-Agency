'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
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

// Fallback destinations data matching the IDs from destinations page
const fallbackDestinations: { [key: string]: any } = {
  '1': {
    _id: '1',
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1920',
    description: 'Tropical paradise with stunning beaches and rich culture. Experience the perfect blend of relaxation and adventure in this Indonesian island paradise.',
    price: 899,
    duration: '7 Days',
    location: { city: 'Bali', country: 'Indonesia' },
    images: [
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1920',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1920',
    ],
    highlights: [
      'Pristine beaches with crystal-clear waters',
      'Ancient temples and cultural sites',
      'Vibrant nightlife and local markets',
      'Luxury resorts and spa experiences',
      'Water sports and adventure activities',
    ],
  },
  '2': {
    _id: '2',
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1920',
    description: 'Breathtaking sunsets and white architecture. Discover the iconic Greek island known for its stunning views, beautiful beaches, and romantic atmosphere.',
    price: 1299,
    duration: '5 Days',
    location: { city: 'Santorini', country: 'Greece' },
    images: [
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1920',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920',
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920',
    ],
    highlights: [
      'World-famous sunsets in Oia',
      'White-washed buildings and blue domes',
      'Volcanic beaches with unique colors',
      'Wine tasting and local cuisine',
      'Luxury cliffside accommodations',
    ],
  },
  '3': {
    _id: '3',
    name: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920',
    description: 'Modern metropolis meets traditional culture. Experience the perfect fusion of cutting-edge technology and ancient traditions in Japan\'s vibrant capital.',
    price: 1199,
    duration: '6 Days',
    location: { city: 'Tokyo', country: 'Japan' },
    images: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920',
      'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1920',
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920',
    ],
    highlights: [
      'Historic temples and shrines',
      'Modern skyscrapers and technology',
      'World-class cuisine and sushi',
      'Cherry blossoms and gardens',
      'Shopping districts and entertainment',
    ],
  },
  '4': {
    _id: '4',
    name: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920',
    description: 'The city of lights and romance. Explore iconic landmarks, world-class museums, and indulge in French cuisine and culture.',
    price: 1099,
    duration: '5 Days',
    location: { city: 'Paris', country: 'France' },
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920',
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920',
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920',
    ],
    highlights: [
      'Eiffel Tower and iconic landmarks',
      'Louvre Museum and art galleries',
      'Champs-Élysées shopping',
      'French cuisine and wine',
      'Romantic Seine River cruises',
    ],
  },
  '5': {
    _id: '5',
    name: 'Maldives',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
    description: 'Crystal clear waters and luxury resorts. Experience ultimate relaxation in overwater bungalows surrounded by pristine beaches and coral reefs.',
    price: 1599,
    duration: '7 Days',
    location: { country: 'Maldives' },
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1920',
      'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1920',
    ],
    highlights: [
      'Overwater bungalows',
      'Crystal-clear turquoise waters',
      'World-class diving and snorkeling',
      'Luxury spa and wellness',
      'Private beach experiences',
    ],
  },
  '6': {
    _id: '6',
    name: 'Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920',
    description: 'Ultra-modern city in the desert. Discover luxury shopping, stunning architecture, and unique desert experiences in this Middle Eastern gem.',
    price: 1399,
    duration: '5 Days',
    location: { city: 'Dubai', country: 'UAE' },
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920',
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920',
    ],
    highlights: [
      'Burj Khalifa and modern architecture',
      'Luxury shopping malls',
      'Desert safari adventures',
      'Palm Jumeirah and islands',
      'World-class dining and entertainment',
    ],
  },
}

export default function DestinationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const destinationId = params.id as string
  const [destinationData, setDestinationData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        setLoading(true)
        
        // Try to fetch from API
        const res = await fetch(`${API_URL}/api/destinations/${destinationId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (res.ok) {
          const data = await res.json()
          if (data.success && data.data) {
            setDestinationData(data.data)
          } else {
            // Use fallback if API returns no data
            setDestinationData(fallbackDestinations[destinationId] || fallbackDestinations['1'])
          }
        } else {
          // Use fallback if API fails
          setDestinationData(fallbackDestinations[destinationId] || fallbackDestinations['1'])
        }
      } catch (err) {
        console.error('Error fetching destination:', err)
        // Use fallback if API fails
        setDestinationData(fallbackDestinations[destinationId] || fallbackDestinations['1'])
      } finally {
        setLoading(false)
      }
    }

    if (destinationId) {
      fetchDestination()
    }
  }, [destinationId])

  useEffect(() => {
    if (destinationData && galleryRef.current) {
      const ctx = gsap.context(() => {
        gsap.from('.gallery-item', {
          scale: 0.9,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          stagger: 0.1,
        })
      }, galleryRef)

      return () => ctx.revert()
    }
  }, [destinationData])

  const handleBookNow = () => {
    if (destinationData) {
      router.push(`/book?destination=${destinationData._id || destinationData.id || destinationId}`)
    }
  }

  const images = destinationData?.images || (destinationData?.image ? [destinationData.image] : [])

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-32 pb-24 bg-off-white">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <BackButton />
              <div className="skeleton h-96 rounded-2xl mb-8" />
              <div className="skeleton h-64 rounded-2xl" />
            </div>
          </div>
        </section>
        <Footer />
        <WhatsAppButton />
      </main>
    )
  }

  if (!destinationData) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-32 pb-24 bg-off-white">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <BackButton />
              <div className="text-center py-12">
                <p className="text-xl text-charcoal/70">Destination not found.</p>
                <Link href="/destinations" className="premium-btn inline-block mt-4">
                  Browse Destinations
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Footer />
        <WhatsAppButton />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-24 bg-off-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <BackButton />
            
            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
              <div className="relative h-96 w-full overflow-hidden">
                {images.length > 0 ? (
                  <Image
                    src={images[currentImageIndex] || images[0]}
                    alt={destinationData.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="h-full bg-gradient-to-br from-teal-blue via-sky-blue-dark to-teal-blue" />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-transparent to-charcoal/70" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <h1 className="text-5xl md:text-7xl font-black mb-4">
                      {destinationData.name}
                    </h1>
                    {destinationData.location && (
                      <p className="text-xl opacity-90">
                        {destinationData.location.city && `${destinationData.location.city}, `}
                        {destinationData.location.country}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-gold font-semibold uppercase tracking-wider">
                        {destinationData.duration}
                      </span>
                      <span className="text-charcoal/60">•</span>
                      <span className="text-charcoal/70">
                        {destinationData.location?.city && `${destinationData.location.city}, `}
                        {destinationData.location?.country}
                      </span>
                    </div>
                    <p className="text-charcoal/70 text-lg leading-relaxed">
                      {destinationData.description}
                    </p>
                  </div>
                  <div className="mt-6 md:mt-0 md:ml-8">
                    <p className="text-5xl font-black text-teal-blue">
                      From ${typeof destinationData.price === 'number' ? destinationData.price.toLocaleString() : destinationData.price}
                    </p>
                    <p className="text-charcoal/60">per person</p>
                  </div>
                </div>

                {/* Image Gallery */}
                {images.length > 1 && (
                  <div ref={galleryRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {images.slice(0, 4).map((img: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`gallery-item relative h-32 rounded-lg overflow-hidden border-2 transition-all ${
                          currentImageIndex === index
                            ? 'border-teal-blue scale-105'
                            : 'border-transparent hover:border-teal-blue/50'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${destinationData.name} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Highlights */}
                {destinationData.highlights && destinationData.highlights.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-4">Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {destinationData.highlights.map((highlight: string, index: number) => (
                        <div key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-gold mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-charcoal/80">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button onClick={handleBookNow} className="w-full premium-btn text-lg py-4">
                  Book This Destination
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Best Time to Visit</h3>
                <p className="text-charcoal/70 mb-4">
                  The ideal time to visit {destinationData.name} depends on your preferences. Generally, the weather is pleasant year-round, with peak season offering the best conditions for outdoor activities.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">Peak Season:</span>
                    <span className="text-charcoal/70">March - October</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Shoulder Season:</span>
                    <span className="text-charcoal/70">November - February</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Travel Tips</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-teal-blue mr-2">•</span>
                    <span className="text-charcoal/70">Book accommodations in advance during peak season</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-blue mr-2">•</span>
                    <span className="text-charcoal/70">Pack appropriate clothing for the climate</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-blue mr-2">•</span>
                    <span className="text-charcoal/70">Learn basic local phrases for better communication</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-blue mr-2">•</span>
                    <span className="text-charcoal/70">Respect local customs and traditions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}

