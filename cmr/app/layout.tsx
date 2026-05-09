import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, DM_Sans } from 'next/font/google'
import './globals.css'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'CMR Developers — Luxury Villa Builders in Kerala',
    template: '%s | CMR Developers',
  },
  description:
    "India's First Lifecycle Builder. Crafting luxury villas in Kerala for over 14 years. 600+ villas handed over across Kannur, Kottayam, and Ernakulam.",
  keywords: [
    'luxury villas Kerala',
    'villa builders Kannur',
    'CMR developers',
    'premium villas Kerala',
    'Taliparamba villas',
    'Vasthu villas Kerala',
    'villa builders Karuvanchal',
  ],
  openGraph: {
    title: 'CMR Developers — Where Dreams Find an Address',
    description: "Kerala's trusted luxury villa developer crafting timeless living experiences for over 14 years.",
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.cmrdevelopers.com',
    siteName: 'CMR Developers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CMR Developers — Luxury Villa Builders in Kerala',
  },
  metadataBase: new URL('https://www.cmrdevelopers.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakartaSans.variable} ${dmSans.variable} antialiased`}>
        <SmoothScrollProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
