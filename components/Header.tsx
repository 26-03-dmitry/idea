'use client'

import React, { useState } from 'react'
import { Search, Menu, X, User, Heart } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Лого как у Idealista */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-normal text-primary-600">
                idealista<span className="text-accent-600">.ge</span>
              </h1>
            </div>
          </div>

          {/* Главная навигация */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Купить
              </a>
              <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Аренда
              </a>
              <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Поделиться
              </a>
              <a href="#" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Моя площадь
              </a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-sm hover:bg-gray-50 transition-colors">
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
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors">
                Купить
              </a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors">
                Аренда
              </a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors">
                Поделиться
              </a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors">
                Моя площадь
              </a>
              
              <div className="flex items-center justify-between pt-4 mt-4 border-t">
                <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-sm hover:bg-gray-50 transition-colors">
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