'use client'
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

// Это нужно, чтобы Next.js знал о всех возможных языках
export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ru' }, { lang: 'ka' }]
}

export const metadata: Metadata = {
  title: 'idealista.ge - Недвижимость в Грузии',
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
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (redirect && redirect !== location.href) {
      // We need to remove the basePath from the start of the pathname
      // as Next.js router works with paths without the basePath.
      const targetPath = new URL(redirect).pathname.replace(/^\/idea/, '');
      if (targetPath && targetPath !== pathname) {
        router.replace(targetPath);
      }
    }
  }, [pathname, router]);

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
        <div id="__next">
          {children}
        </div>
      </body>
    </html>
  )
} 