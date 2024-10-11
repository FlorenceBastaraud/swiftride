import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTopButton from '@/components/ScrollToTopButton'

export const metadata: Metadata = {
  title: 'SwiftRide',
  description:
    'Your one-stop shop for rollers, skateboards, bikes, and all the equipment you need to ride in style and safety!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="w-full flex justify-center flex-col min-h-screen">
        <Header />
        {children}
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  )
}
