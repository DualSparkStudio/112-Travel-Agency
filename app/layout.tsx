import type { Metadata } from 'next'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import CustomCursor from '@/components/CustomCursor'
import Preloader from '@/components/Preloader'

export const metadata: Metadata = {
  title: 'Premium Travel Agency - Luxury Travel Experiences',
  description: 'Book premium flights, trains, buses, and tour packages. Experience luxury travel with our curated destinations.',
  keywords: 'travel, flights, tours, luxury travel, booking',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Preloader />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}

