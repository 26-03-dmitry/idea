'use client'

import React, { useState } from 'react'
import { Search, MapPin, Home, DollarSign, BedDouble, ChevronDown } from 'lucide-react'

const SearchForm = () => {
  const [searchType, setSearchType] = useState('buy')
  const [propertyType, setPropertyType] = useState('all')
  const [location, setLocation] = useState('')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [bedrooms, setBedrooms] = useState('')

  const cities = [
    'Тбилиси',
    'Батуми',
    'Кутаиси', 
    'Рустави',
    'Гори',
    'Зугдиди',
    'Поти',
    'Кобулети',
    'Телави',
    'Ахалкалаки'
  ]

  const propertyTypes = [
    { value: 'all', label: 'Все типы' },
    { value: 'apartment', label: 'Квартира' },
    { value: 'house', label: 'Дом' },
    { value: 'villa', label: 'Вилла' },
    { value: 'studio', label: 'Студия' },
    { value: 'penthouse', label: 'Пентхаус' },
    { value: 'commercial', label: 'Коммерческая' },
    { value: 'land', label: 'Земельный участок' }
  ]

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mx-4 -mt-10 relative z-10">
      {/* Переключатель типа поиска */}
      <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
        <button
          onClick={() => setSearchType('buy')}
          className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
            searchType === 'buy'
              ? 'bg-primary-600 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Купить
        </button>
        <button
          onClick={() => setSearchType('rent')}
          className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
            searchType === 'rent'
              ? 'bg-primary-600 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Аренда
        </button>
        <button
          onClick={() => setSearchType('sell')}
          className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${
            searchType === 'sell'
              ? 'bg-accent-500 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Продать
        </button>
      </div>

      {/* Форма поиска */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Местоположение */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Местоположение
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none appearance-none bg-white"
            >
              <option value="">Выберите город</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Тип недвижимости */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Тип недвижимости
          </label>
          <div className="relative">
            <Home className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none appearance-none bg-white"
            >
              {propertyTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Цена */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Цена ({searchType === 'rent' ? 'в месяц' : ''})
          </label>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="от"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="relative flex-1">
              <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="до"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Спальни */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Спальни
          </label>
          <div className="relative">
            <BedDouble className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none appearance-none bg-white"
            >
              <option value="">Любое количество</option>
              <option value="1">1 спальня</option>
              <option value="2">2 спальни</option>
              <option value="3">3 спальни</option>
              <option value="4">4+ спальни</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Кнопки */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 font-medium">
          <Search className="h-5 w-5" />
          <span>Поиск недвижимости</span>
        </button>
        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          Расширенный поиск
        </button>
      </div>

      {/* Популярные поиски */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-3">Популярные поиски:</p>
        <div className="flex flex-wrap gap-2">
          {[
            'Квартиры в Тбилиси',
            'Дома в Батуми',
            'Студии у моря',
            'Пентхаусы в центре',
            'Новостройки'
          ].map((search) => (
            <button
              key={search}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
            >
              {search}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchForm 