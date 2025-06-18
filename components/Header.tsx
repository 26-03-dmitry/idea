'use client'

import React, { useState } from 'react'
import { Search, Menu, X, User, Heart, Bell } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Лого */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary-600">
                Georgia<span className="text-accent-500">Estate</span>
              </h1>
            </div>
          </div>

          {/* Поиск */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className={`relative w-full transition-all duration-200 ${
              isSearchFocused ? 'transform scale-105' : ''
            }`}>
              <input
                type="text"
                placeholder="Поиск по городу, району или улице..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Навигация и кнопки */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors">
                Купить
              </a>
              <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors">
                Аренда
              </a>
              <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors">
                Продать
              </a>
              <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors">
                Ипотека
              </a>
            </nav>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                <User className="h-4 w-4" />
                <span>Войти</span>
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
              {/* Мобильный поиск */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Поиск по городу, району..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              {/* Мобильная навигация */}
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors">
                Купить
              </a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors">
                Аренда
              </a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors">
                Продать
              </a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors">
                Ипотека
              </a>
              
              {/* Мобильные кнопки */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t">
                <div className="flex space-x-3">
                  <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                    <Bell className="h-5 w-5" />
                  </button>
                </div>
                <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  <User className="h-4 w-4" />
                  <span>Войти</span>
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