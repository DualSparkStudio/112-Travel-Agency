'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('bookingId')

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-24 bg-off-white min-h-screen flex items-center">
        <div className="container-custom max-w-2xl text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-charcoal mb-4">
              Payment
              <span className="block text-teal-blue">Successful!</span>
            </h1>
            <p className="text-xl text-charcoal/70 mb-6">
              Your booking has been confirmed. A confirmation email has been sent to your registered email address.
            </p>
            {bookingId && (
              <p className="text-charcoal/60 mb-8">
                Booking ID: <strong>{bookingId}</strong>
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="premium-btn">
                Back to Home
              </Link>
              <Link href="/dashboard" className="premium-btn bg-transparent border-2 border-teal-blue text-teal-blue hover:bg-teal-blue hover:text-white">
                View Dashboard
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

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen">
        <Navbar />
        <section className="pt-32 pb-24 bg-off-white min-h-screen flex items-center">
          <div className="container-custom max-w-2xl text-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        </section>
        <Footer />
        <WhatsAppButton />
      </main>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}

