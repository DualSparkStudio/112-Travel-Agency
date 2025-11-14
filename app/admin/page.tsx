'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('packages')
  const [packages, setPackages] = useState([])
  const [destinations, setDestinations] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch data based on active tab
    const fetchData = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem('token')
        const headers = { 'Authorization': `Bearer ${token}` }

        if (activeTab === 'packages') {
          const res = await fetch('http://localhost:5000/api/packages')
          const data = await res.json()
          setPackages(data.data || [])
        } else if (activeTab === 'destinations') {
          const res = await fetch('http://localhost:5000/api/destinations')
          const data = await res.json()
          setDestinations(data.data || [])
        } else if (activeTab === 'bookings') {
          const res = await fetch('http://localhost:5000/api/admin/bookings', { headers })
          const data = await res.json()
          setBookings(data.data || [])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [activeTab])

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-24 bg-off-white min-h-screen">
        <div className="container-custom">
          <h1 className="text-5xl md:text-7xl font-black text-charcoal mb-8">
            Admin
            <span className="block bg-gradient-to-r from-teal-blue to-sky-blue-dark bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex space-x-4 border-b border-charcoal/10 mb-6">
              <button
                onClick={() => setActiveTab('packages')}
                className={`px-6 py-3 font-semibold transition-colors ${
                  activeTab === 'packages' ? 'text-teal-blue border-b-2 border-teal-blue' : 'text-charcoal/60'
                }`}
              >
                Packages
              </button>
              <button
                onClick={() => setActiveTab('destinations')}
                className={`px-6 py-3 font-semibold transition-colors ${
                  activeTab === 'destinations' ? 'text-teal-blue border-b-2 border-teal-blue' : 'text-charcoal/60'
                }`}
              >
                Destinations
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-6 py-3 font-semibold transition-colors ${
                  activeTab === 'bookings' ? 'text-teal-blue border-b-2 border-teal-blue' : 'text-charcoal/60'
                }`}
              >
                Bookings
              </button>
            </div>

            {loading ? (
              <div className="skeleton h-64 rounded-lg" />
            ) : (
              <div>
                {activeTab === 'packages' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold">All Packages</h2>
                      <button className="premium-btn">Add Package</button>
                    </div>
                    <div className="space-y-4">
                      {packages.map((pkg: any) => (
                        <div key={pkg._id} className="p-4 border border-charcoal/10 rounded-lg">
                          <h3 className="font-bold">{pkg.title}</h3>
                          <p className="text-charcoal/70">{pkg.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'destinations' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold">All Destinations</h2>
                      <button className="premium-btn">Add Destination</button>
                    </div>
                    <div className="space-y-4">
                      {destinations.map((dest: any) => (
                        <div key={dest._id} className="p-4 border border-charcoal/10 rounded-lg">
                          <h3 className="font-bold">{dest.name}</h3>
                          <p className="text-charcoal/70">{dest.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'bookings' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
                    <div className="space-y-4">
                      {bookings.map((booking: any) => (
                        <div key={booking._id} className="p-4 border border-charcoal/10 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold">Booking ID: {booking.bookingId}</h3>
                              <p className="text-charcoal/70">{booking.user.name} - {booking.user.email}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}

