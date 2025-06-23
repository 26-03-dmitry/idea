import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import SessionRedirect from '@/components/SessionRedirect';

const inter = Inter({ subsets: ['latin'] })

// Это нужно, чтобы Next.js знал о всех возможных языках
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ru' }, { lang: 'ka' }]
}

export const metadata: Metadata = {
  title: 'dedamitsa.ge - Недвижимость в Грузии',
  description: 'Найдите идеальную недвижимость в Грузии. Квартиры, дома, коммерческая недвижимость в Тбилиси, Батуми и других городах.',
  keywords: 'недвижимость Грузия, квартиры Тбилиси, дома Батуми, купить квартиру Грузия',
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={params.lang}>
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
        <SessionRedirect />
        <div id="__next">
          {children}
        </div>
      </body>
    </html>
  )
} 
