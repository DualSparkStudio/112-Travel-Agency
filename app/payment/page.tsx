'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Script from 'next/script'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [bookingData, setBookingData] = useState<any>(null)

  useEffect(() => {
    const booking = searchParams.get('booking')
    if (booking) {
      try {
        setBookingData(JSON.parse(decodeURIComponent(booking)))
      } catch (e) {
        console.error('Error parsing booking data:', e)
      }
    }
  }, [searchParams])

  const handlePayment = async () => {
    if (!bookingData) return

    setLoading(true)

    try {
      // Call backend API to create Razorpay order
      const response = await fetch('http://localhost:5000/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 249900, // Amount in paise (₹2499.00)
          currency: 'INR',
          bookingData,
        }),
      })

      const order = await response.json()

      if (!order.success) {
        throw new Error(order.message || 'Failed to create order')
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_key', // Replace with your Razorpay key
        amount: order.data.amount,
        currency: order.data.currency,
        name: 'Premium Travel Agency',
        description: 'Travel Booking Payment',
        order_id: order.data.id,
        handler: async function (response: any) {
          // Verify payment on backend
          const verifyResponse = await fetch('http://localhost:5000/api/payments/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingData,
            }),
          })

          const verifyResult = await verifyResponse.json()

          if (verifyResult.success) {
            router.push(`/payment/success?bookingId=${verifyResult.bookingId}`)
          } else {
            alert('Payment verification failed. Please contact support.')
          }
        },
        prefill: {
          name: bookingData.name,
          email: bookingData.email,
          contact: bookingData.phone,
        },
        theme: {
          color: '#0E6E72',
        },
        modal: {
          ondismiss: function () {
            setLoading(false)
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
      setLoading(false)
    } catch (error: any) {
      console.error('Payment error:', error)
      alert(error.message || 'Payment failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => console.log('Razorpay script loaded')}
      />
      <Navbar />
      <section className="pt-32 pb-24 bg-off-white">
        <div className="container-custom max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-black text-charcoal mb-4 text-center">
            Complete Your
            <span className="block bg-gradient-to-r from-teal-blue to-sky-blue-dark bg-clip-text text-transparent">
              Payment
            </span>
          </h1>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mt-12">
            {bookingData && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-charcoal mb-4">Booking Summary</h2>
                <div className="space-y-2 text-charcoal/70">
                  <p><strong>Travel Type:</strong> {bookingData.travelType}</p>
                  <p><strong>Passengers:</strong> {bookingData.passengers}</p>
                  <p><strong>Name:</strong> {bookingData.name}</p>
                  <p><strong>Email:</strong> {bookingData.email}</p>
                  {bookingData.departureDate && (
                    <p><strong>Departure:</strong> {new Date(bookingData.departureDate).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            )}

            <div className="border-t border-charcoal/10 pt-8 mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl text-charcoal/70">Total Amount</span>
                <span className="text-4xl font-black text-teal-blue">₹2,499</span>
              </div>
              <p className="text-sm text-charcoal/60">Secure payment powered by Razorpay</p>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading || !bookingData}
              className="w-full premium-btn text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>

            <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-charcoal/60">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Your payment is secure and encrypted</span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}

