'use client'

import React, { useState } from 'react'
import { Search, Menu, X, User, Heart } from 'lucide-react'
import Link from 'next/link'

const locales = [
  { code: 'ka', name: 'GE' },
  { code: 'en', name: 'EN' },
  { code: 'ru', name: 'RU' },
]

const Header = ({ lang, dict }: { lang: string, dict: any }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-red-500 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Лого как у Idealista */}
          <div className="flex items-center">
            <Link href={`/${lang}`} className="flex-shrink-0">
              <h1 className="text-2xl font-normal text-primary-600">
                idealista<span className="text-accent-600">.ge</span>
              </h1>
            </Link>
          </div>

          {/* Главная навигация */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                {dict.buy}
              </a>
              <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                {dict.rent}
              </a>
              <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                {dict.share}
              </a>
              <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                {dict.myArea}
              </a>
            </nav>
            
            <div className="flex items-center space-x-4">
              {/* Переключатель языка */}
              <div className="flex items-center border-r pr-4 mr-2">
                {locales.map((locale, index) => (
                  <React.Fragment key={locale.code}>
                    <Link
                      href={`/${locale.code}`}
                      className={`px-2 text-sm font-medium ${
                        lang === locale.code ? 'text-primary-600' : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      {locale.name}
                    </Link>
                    {index < locales.length - 1 && <span className="text-gray-300">|</span>}
                  </React.Fragment>
                ))}
              </div>

              <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              <Link href={`/${lang}/post-ad`} className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors">
                {dict.placeAd}
              </Link>
              <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-sm hover:bg-gray-50 transition-colors text-sm">
                <User className="h-4 w-4" />
                <span>{dict.signIn}</span>
              </button>
            </div>
          </div>

          {/* Мобильное меню */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-primary-600 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Мобильное меню */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors">
                {dict.buy}
              </a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors">
                {dict.rent}
              </a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors">
                {dict.share}
              </a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors">
                {dict.myArea}
              </a>
              
              <div className="flex items-center justify-between pt-4 mt-4 border-t">
                <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
                <Link href={`/${lang}/post-ad`} className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-sm text-sm font-medium transition-colors">
                  {dict.placeAd}
                </Link>
                <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-sm hover:bg-gray-50 transition-colors text-sm">
                  <User className="h-4 w-4" />
                  <span>{dict.signIn}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header 