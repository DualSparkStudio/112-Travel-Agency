'use client'

import { useRouter } from 'next/navigation'
import { gsap } from 'gsap'

export default function BackButton() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 text-charcoal hover:text-teal-blue transition-colors mb-6 group"
      aria-label="Go back"
    >
      <svg
        className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      <span className="font-semibold">Back</span>
    </button>
  )
}

