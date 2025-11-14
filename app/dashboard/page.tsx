'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function DashboardPage() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch user bookings
    // In a real app, you'd get the token from localStorage or context
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:5000/api/bookings/my-bookings', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        if (response.ok) {
          const data = await response.json()
          setBookings(data.data || [])
        }
      } catch (error) {
        console.error('Error fetching bookings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-24 bg-off-white min-h-screen">
        <div className="container-custom">
          <h1 className="text-5xl md:text-7xl font-black text-charcoal mb-4">
            My
            <span className="block bg-gradient-to-r from-teal-blue to-sky-blue-dark bg-clip-text text-transparent">
              Bookings
            </span>
          </h1>

          {loading ? (
            <div className="mt-12">
              <div className="skeleton h-32 rounded-lg mb-4" />
              <div className="skeleton h-32 rounded-lg mb-4" />
            </div>
          ) : bookings.length === 0 ? (
            <div className="mt-12 bg-white rounded-2xl shadow-xl p-12 text-center">
              <p className="text-xl text-charcoal/70 mb-6">No bookings found</p>
              <a href="/packages" className="premium-btn inline-block">
                Browse Packages
              </a>
            </div>
          ) : (
            <div className="mt-12 space-y-6">
              {bookings.map((booking: any) => (
                <div key={booking._id} className="bg-white rounded-2xl shadow-xl p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-charcoal mb-2">
                        Booking ID: {booking.bookingId}
                      </h3>
                      <p className="text-charcoal/70">
                        {booking.travelType.charAt(0).toUpperCase() + booking.travelType.slice(1)} Package
                      </p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold mt-4 md:mt-0 ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div>
                      <p className="text-sm text-charcoal/60">Passengers</p>
                      <p className="text-lg font-semibold">{booking.passengers}</p>
                    </div>
                    <div>
                      <p className="text-sm text-charcoal/60">Total Amount</p>
                      <p className="text-lg font-semibold">${booking.totalAmount}</p>
                    </div>
                    {booking.departureDate && (
                      <div>
                        <p className="text-sm text-charcoal/60">Departure</p>
                        <p className="text-lg font-semibold">
                          {new Date(booking.departureDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-charcoal/60">Payment</p>
                      <p className="text-lg font-semibold text-green-600">
                        {booking.payment.status === 'completed' ? 'Paid' : 'Pending'}
                      </p>
                    </div>
                  </div>
                </div>
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

