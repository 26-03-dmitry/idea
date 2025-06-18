'use client'

import React, { useState } from 'react'
import { Search, MapPin, ChevronDown } from 'lucide-react'

const SearchForm = ({ dict }: { dict: any }) => {
  const [searchType, setSearchType] = useState('buy')
  const [location, setLocation] = useState('')
  const [searchText, setSearchText] = useState('')

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

  return (
    <div className="bg-white rounded-sm shadow-lg border border-gray-200 mx-4 -mt-6 relative z-10">
      {/* Переключатель типа поиска как у Idealista */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setSearchType('buy')}
          className={`flex-1 py-4 px-6 text-center font-medium transition-all ${
            searchType === 'buy'
              ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
          }`}
        >
          {dict.buy}
        </button>
        <button
          onClick={() => setSearchType('rent')}
          className={`flex-1 py-4 px-6 text-center font-medium transition-all ${
            searchType === 'rent'
              ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
          }`}
        >
          {dict.rent}
        </button>
      </div>

      {/* Основная форма поиска */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Поисковая строка */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={dict.placeholder}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none text-gray-900"
              />
            </div>
          </div>

          {/* Выбор города */}
          <div className="lg:w-64">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-primary-500 focus:border-primary-500 outline-none appearance-none bg-white text-gray-900"
              >
                <option value="">{dict.allGeorgia}</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Кнопка поиска */}
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-sm font-medium transition-colors flex items-center justify-center space-x-2 lg:w-auto">
            <Search className="h-5 w-5" />
            <span>{dict.search}</span>
          </button>
        </div>

        {/* Дополнительные фильтры */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-4 text-sm">
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              {dict.advancedSearch}
            </button>
            <span className="text-gray-400">|</span>
            <button className="text-gray-600 hover:text-primary-600">
              {dict.houses}
            </button>
            <button className="text-gray-600 hover:text-primary-600">
              {dict.apartments}
            </button>
            <button className="text-gray-600 hover:text-primary-600">
              {dict.newBuildings}
            </button>
            <button className="text-gray-600 hover:text-primary-600">
              {dict.byTheSea}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchForm 