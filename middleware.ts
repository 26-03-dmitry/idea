import { NextRequest, NextResponse } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

let locales = ['en', 'ru', 'ka']
export let defaultLocale = 'ru'

function getLocale(request: NextRequest) {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  
  try {
    return match(languages, locales, defaultLocale)
  } catch (error) {
    // If an error occurs (e.g., no match found), return the default locale
    return defaultLocale
  }
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|favicon.ico).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
} 