'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import BackButton from '@/components/BackButton'
import 'react-datepicker/dist/react-datepicker.css'
import type { ReactDatePickerProps } from 'react-datepicker'

const DatePicker = dynamic<ReactDatePickerProps>(
  () => import('react-datepicker'),
  { ssr: false }
) as React.ComponentType<ReactDatePickerProps>

export default function BookingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const packageId = searchParams.get('package')

  const [formData, setFormData] = useState({
    packageId: packageId || '',
    travelType: 'tour',
    departureDate: null as Date | null,
    returnDate: null as Date | null,
    passengers: 1,
    name: '',
    email: '',
    phone: '',
    country: '',
    specialRequests: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const countries = [
    'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
    'France', 'Italy', 'Spain', 'Japan', 'India', 'China', 'Other'
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required'
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone format'
    }
    if (!formData.country) newErrors.country = 'Country is required'
    if (!formData.departureDate) newErrors.departureDate = 'Departure date is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    // Redirect to payment page with booking data
    const bookingData = encodeURIComponent(JSON.stringify(formData))
    router.push(`/payment?booking=${bookingData}`)
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-24 bg-off-white">
        <div className="container-custom max-w-4xl">
          <BackButton />
          <h1 className="text-5xl md:text-7xl font-black text-charcoal mb-4 text-center">
            Book Your
            <span className="block bg-gradient-to-r from-teal-blue to-sky-blue-dark bg-clip-text text-transparent">
              Journey
            </span>
          </h1>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Travel Type *
                </label>
                <select
                  value={formData.travelType}
                  onChange={(e) => setFormData({ ...formData, travelType: e.target.value })}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-blue"
                >
                  <option value="tour">Tour Package</option>
                  <option value="flight">Flight</option>
                  <option value="train">Train</option>
                  <option value="bus">Bus</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Number of Passengers *
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.passengers}
                  onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-blue"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Departure Date *
                </label>
                <DatePicker
                  selected={formData.departureDate}
                  onChange={(date: Date | null) => setFormData({ ...formData, departureDate: date })}
                  minDate={new Date()}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-blue"
                  placeholderText="Select departure date"
                />
                {errors.departureDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.departureDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Return Date
                </label>
                <DatePicker
                  selected={formData.returnDate}
                  onChange={(date: Date | null) => setFormData({ ...formData, returnDate: date })}
                  minDate={formData.departureDate || new Date()}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-blue"
                  placeholderText="Select return date"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-blue"
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-blue"
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-blue"
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Country *
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-blue"
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Special Requests
              </label>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-blue"
                placeholder="Any special requests or requirements..."
              />
            </div>

            <button type="submit" className="w-full premium-btn text-lg py-4">
              Proceed to Payment
            </button>
          </form>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}

