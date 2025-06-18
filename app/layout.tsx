import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Georgia Estate - Недвижимость в Грузии',
  description: 'Найдите идеальную недвижимость в Грузии. Квартиры, дома, коммерческая недвижимость в Тбилиси, Батуми и других городах.',
  keywords: 'недвижимость Грузия, квартиры Тбилиси, дома Батуми, купить квартиру Грузия',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ka">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous" 
        />
      </head>
      <body className={inter.className}>
        <div id="__next">
          {children}
        </div>
      </body>
    </html>
  )
} 