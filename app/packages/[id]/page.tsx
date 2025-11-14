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

// Fallback packages data matching the IDs from packages page
const fallbackPackages: { [key: string]: any } = {
  '1': {
    _id: '1',
    title: 'European Adventure',
    duration: '10 Days',
    price: 2499,
    description: 'Experience the best of Europe with this comprehensive tour package. Visit iconic cities, explore historic landmarks, and immerse yourself in rich European culture.',
    features: ['Flights Included', '4-Star Hotels', 'Daily Breakfast', 'City Tours', 'Travel Insurance'],
    images: ['https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920'],
    itinerary: [
      { day: 1, title: 'Arrival in Paris', description: 'Arrive at Paris, hotel check-in, welcome dinner at a traditional French restaurant' },
      { day: 2, title: 'Paris City Tour', description: 'Explore Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral' },
      { day: 3, title: 'Travel to London', description: 'High-speed train to London, afternoon tea experience' },
      { day: 4, title: 'London Highlights', description: 'Visit Big Ben, Buckingham Palace, and Tower Bridge' },
      { day: 5, title: 'Amsterdam Discovery', description: 'Canal cruise, Anne Frank House, and Van Gogh Museum' },
      { day: 6, title: 'Berlin Exploration', description: 'Brandenburg Gate, Berlin Wall, and Museum Island' },
      { day: 7, title: 'Prague Adventure', description: 'Charles Bridge, Prague Castle, and Old Town Square' },
      { day: 8, title: 'Vienna Culture', description: 'Schönbrunn Palace, St. Stephen\'s Cathedral, and classical music concert' },
      { day: 9, title: 'Rome Experience', description: 'Colosseum, Vatican City, and Trevi Fountain' },
      { day: 10, title: 'Departure', description: 'Last minute shopping, airport transfer, departure' },
    ],
  },
  '2': {
    _id: '2',
    title: 'Asian Discovery',
    duration: '14 Days',
    price: 3299,
    description: 'Explore the vibrant cultures and stunning landscapes of Asia. From bustling cities to serene temples, experience the diversity of Asian heritage.',
    features: ['Multi-City Flights', 'Luxury Resorts', 'All Meals', 'Cultural Experiences', 'Guided Tours'],
    images: ['https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920'],
    itinerary: [
      { day: 1, title: 'Arrival in Tokyo', description: 'Arrive at Tokyo, hotel check-in, welcome dinner' },
      { day: 2, title: 'Tokyo Exploration', description: 'Shibuya Crossing, Senso-ji Temple, and Tsukiji Fish Market' },
      { day: 3, title: 'Kyoto Journey', description: 'Bullet train to Kyoto, Fushimi Inari Shrine, and traditional tea ceremony' },
      { day: 4, title: 'Kyoto Temples', description: 'Kinkaku-ji, Arashiyama Bamboo Grove, and Gion district' },
      { day: 5, title: 'Bangkok Arrival', description: 'Flight to Bangkok, Wat Pho, and floating markets' },
      { day: 6, title: 'Bangkok Culture', description: 'Grand Palace, Wat Arun, and Thai cooking class' },
      { day: 7, title: 'Singapore Discovery', description: 'Flight to Singapore, Marina Bay, and Gardens by the Bay' },
      { day: 8, title: 'Singapore Highlights', description: 'Sentosa Island, Universal Studios, and night safari' },
      { day: 9, title: 'Bali Paradise', description: 'Flight to Bali, Ubud Monkey Forest, and rice terraces' },
      { day: 10, title: 'Bali Beaches', description: 'Beach activities, water sports, and spa treatments' },
      { day: 11, title: 'Hong Kong Arrival', description: 'Flight to Hong Kong, Victoria Peak, and Star Ferry' },
      { day: 12, title: 'Hong Kong Exploration', description: 'Disneyland, Temple Street Night Market, and dim sum experience' },
      { day: 13, title: 'Shanghai Experience', description: 'Flight to Shanghai, The Bund, and Yu Garden' },
      { day: 14, title: 'Departure', description: 'Last minute shopping, airport transfer, departure' },
    ],
  },
  '3': {
    _id: '3',
    title: 'Tropical Paradise',
    duration: '7 Days',
    price: 1899,
    description: 'Relax and unwind in beautiful tropical destinations. Enjoy pristine beaches, crystal-clear waters, and luxurious resorts.',
    features: ['Beachfront Resort', 'Water Sports', 'Spa Access', 'Sunset Cruises', 'All-Inclusive'],
    images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920'],
    itinerary: [
      { day: 1, title: 'Arrival & Check-in', description: 'Arrive at tropical resort, welcome drink, beachfront accommodation check-in' },
      { day: 2, title: 'Beach Day', description: 'Relax on pristine beaches, swimming, and beach volleyball' },
      { day: 3, title: 'Water Sports', description: 'Snorkeling, scuba diving, jet skiing, and parasailing' },
      { day: 4, title: 'Island Hopping', description: 'Boat tour to nearby islands, picnic lunch, and sunset viewing' },
      { day: 5, title: 'Spa & Wellness', description: 'Full day spa treatments, yoga session, and meditation' },
      { day: 6, title: 'Sunset Cruise', description: 'Luxury sunset cruise with dinner and live music' },
      { day: 7, title: 'Departure', description: 'Last beach time, checkout, and airport transfer' },
    ],
  },
  '4': {
    _id: '4',
    title: 'Mountain Escape',
    duration: '8 Days',
    price: 2199,
    description: 'Adventure in the mountains with breathtaking views. Experience hiking, nature, and mountain culture.',
    features: ['Mountain Lodges', 'Hiking Tours', 'Scenic Views', 'Adventure Activities', 'Equipment Included'],
    images: ['https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1920'],
    itinerary: [
      { day: 1, title: 'Arrival in Mountain Town', description: 'Arrive at base camp, equipment check, welcome briefing' },
      { day: 2, title: 'Acclimatization Hike', description: 'Easy hike to nearby viewpoints, altitude adjustment' },
      { day: 3, title: 'Mountain Trek', description: 'Full day trek through scenic trails, picnic lunch' },
      { day: 4, title: 'Summit Attempt', description: 'Early morning summit attempt, breathtaking sunrise views' },
      { day: 5, title: 'Nature Exploration', description: 'Wildlife spotting, nature photography, and local flora study' },
      { day: 6, title: 'Adventure Activities', description: 'Rock climbing, rappelling, and zip-lining' },
      { day: 7, title: 'Cultural Experience', description: 'Visit mountain villages, local cuisine, and traditional music' },
      { day: 8, title: 'Departure', description: 'Final mountain views, equipment return, and departure' },
    ],
  },
}

export default function PackageDetailPage() {
  const params = useParams()
  const router = useRouter()
  const packageId = params.id as string
  const [packageData, setPackageData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        setLoading(true)
        
        // Try to fetch from API
        const res = await fetch(`${API_URL}/api/packages/${packageId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (res.ok) {
          const data = await res.json()
          if (data.success && data.data) {
            setPackageData(data.data)
          } else {
            // Use fallback if API returns no data
            setPackageData(fallbackPackages[packageId] || fallbackPackages['1'])
          }
        } else {
          // Use fallback if API fails
          setPackageData(fallbackPackages[packageId] || fallbackPackages['1'])
        }
      } catch (err) {
        console.error('Error fetching package:', err)
        // Use fallback if API fails
        setPackageData(fallbackPackages[packageId] || fallbackPackages['1'])
      } finally {
        setLoading(false)
      }
    }

    if (packageId) {
      fetchPackage()
    }
  }, [packageId])

  useEffect(() => {
    if (packageData && timelineRef.current) {
      const ctx = gsap.context(() => {
        // Set initial state
        gsap.set('.timeline-item', { opacity: 1, x: 0 })
        
        // Animate on scroll
        gsap.fromTo('.timeline-item',
          {
            x: -50,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            stagger: 0.1,
          }
        )
      }, timelineRef)

      return () => ctx.revert()
    }
  }, [packageData])

  const handleBookNow = () => {
    if (packageData) {
      router.push(`/book?package=${packageData._id || packageData.id || packageId}`)
    }
  }

  const getTypeLabel = (type: string) => {
    const typeMap: { [key: string]: string } = {
      tour: 'Tour Package',
      flight: 'Flight',
      train: 'Train',
      bus: 'Bus',
    }
    return typeMap[type] || type || 'Tour Package'
  }

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

  if (!packageData) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-32 pb-24 bg-off-white">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <BackButton />
              <div className="text-center py-12">
                <p className="text-xl text-charcoal/70">Package not found.</p>
                <Link href="/packages" className="premium-btn inline-block mt-4">
                  Browse Packages
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

  const itinerary = packageData.itinerary || [
    { day: 1, title: 'Arrival & Welcome', description: 'Arrive at destination, hotel check-in, welcome dinner' },
    { day: 2, title: 'City Tour', description: 'Explore the city highlights, visit famous landmarks' },
    { day: 3, title: 'Cultural Experience', description: 'Visit museums, local markets, traditional shows' },
    { day: 4, title: 'Adventure Day', description: 'Outdoor activities, nature exploration' },
    { day: 5, title: 'Relaxation', description: 'Beach time, spa, leisure activities' },
    { day: 6, title: 'Local Cuisine', description: 'Cooking class, food tours, local restaurants' },
    { day: 7, title: 'Departure', description: 'Last minute shopping, airport transfer' },
  ]

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-24 bg-off-white">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <BackButton />
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
              {/* Hero Image */}
              <div className="relative h-96 w-full overflow-hidden">
                {packageData.images && packageData.images.length > 0 ? (
                  <Image
                    src={packageData.images[0]}
                    alt={packageData.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="h-full bg-gradient-to-br from-teal-blue via-sky-blue-dark to-teal-blue" />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-transparent to-charcoal/70" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h1 className="text-5xl md:text-7xl font-black text-white text-center px-4">
                    {packageData.title}
                  </h1>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                  <div>
                    <span className="text-sm font-semibold text-gold uppercase tracking-wider">
                      {getTypeLabel(packageData.type)}
                    </span>
                    <span className="text-gold font-semibold uppercase tracking-wider ml-4">{packageData.duration}</span>
                    <p className="text-charcoal/70 mt-2 text-lg">{packageData.description}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <p className="text-5xl font-black text-teal-blue">
                      ${typeof packageData.price === 'number' ? packageData.price.toLocaleString() : packageData.price}
                    </p>
                    <p className="text-charcoal/60">per person</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">What's Included</h3>
                    {packageData.features && packageData.features.length > 0 ? (
                      <ul className="space-y-3">
                        {packageData.features.map((feature: string, index: number) => (
                          <li key={index} className="flex items-center">
                            <svg className="w-5 h-5 text-gold mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-charcoal/60">No features listed.</p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-4">Map View</h3>
                    <div className="h-64 bg-gradient-to-br from-sky-blue to-teal-blue rounded-lg flex items-center justify-center">
                      <p className="text-white/80">Interactive Map Coming Soon</p>
                    </div>
                  </div>
                </div>

                <button onClick={handleBookNow} className="w-full premium-btn text-lg py-4">
                  Book Now
                </button>
              </div>
            </div>

            <div ref={timelineRef} className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-4xl font-black text-charcoal mb-8">Day-by-Day Itinerary</h2>
              <div className="relative">
                {itinerary.map((item: any, index: number) => (
                  <div key={index} className="timeline-item relative pl-12 pb-8 last:pb-0 opacity-100">
                    <div className="absolute left-0 top-0 w-6 h-6 bg-teal-blue rounded-full border-4 border-white shadow-lg" />
                    {index < itinerary.length - 1 && (
                      <div className="absolute left-[11px] top-6 w-0.5 h-full bg-teal-blue/30" />
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-charcoal mb-1">
                        Day {item.day}: {item.title}
                      </h3>
                      <p className="text-charcoal/70">{item.description}</p>
                    </div>
                  </div>
                ))}
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

