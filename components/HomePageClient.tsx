'use client'

import React from 'react'
import Header from '@/components/Header'
import SearchForm from '@/components/SearchForm'
import PropertyCard from '@/components/PropertyCard'
import dynamic from 'next/dynamic'

const MapSearch = dynamic(() => import('@/components/MapSearch'), { 
  ssr: false 
});

// Мокданные для недвижимости
const sampleProperties = [
  {
    id: '1',
    title: 'Квартира с 2 спальнями в Батуми',
    location: 'Батуми, Новый Бульвар',
    price: 145000,
    currency: '$',
    type: 'sale' as const,
    propertyType: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    parking: true,
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=500',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500'
    ],
    features: ['Балкон', 'Кондиционер', 'Панорамные окна'],
    isNew: true,
    isFeatured: false,
    views: 234,
    addedDate: '2 дня назад'
  },
  {
    id: '2',
    title: 'Студия в центре Тбилиси',
    location: 'Тбилиси, Старый город',
    price: 1200,
    currency: '$',
    type: 'rent' as const,
    propertyType: 'studio',
    bedrooms: 0,
    bathrooms: 1,
    area: 45,
    parking: false,
    images: [
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=500',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=500'
    ],
    features: ['Wi-Fi', 'Мебель'],
    isNew: false,
    isFeatured: false,
    views: 89,
    addedDate: '5 дней назад'
  },
  {
    id: '3',
    title: 'Дом с садом в Кутаиси',
    location: 'Кутаиси, центр',
    price: 95000,
    currency: '$',
    type: 'sale' as const,
    propertyType: 'house',
    bedrooms: 3,
    bathrooms: 2,
    area: 150,
    parking: true,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=500'
    ],
    features: ['Сад', 'Гараж', 'Терраса'],
    isNew: false,
    isFeatured: false,
    views: 156,
    addedDate: '1 неделю назад'
  },
  {
    id: '4',
    title: 'Квартира у моря в Батуми',
    location: 'Батуми, Приморский район',
    price: 2000,
    currency: '$',
    type: 'rent' as const,
    propertyType: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    area: 60,
    parking: true,
    images: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=500',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=500'
    ],
    features: ['Вид на море', 'Балкон'],
    isNew: false,
    isFeatured: false,
    views: 312,
    addedDate: '3 дня назад'
  }
];

export default function HomePageClient({ dict, lang }: { dict: any, lang: string }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header lang={lang} dict={dict.header} />
      
      {/* Hero секция - упрощенная */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-normal text-gray-900 mb-4">
            {dict.homePage.heroTitle}
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            {dict.homePage.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Форма поиска */}
      <section className="relative z-10 pb-8 -mt-16">
        <div className="max-w-7xl mx-auto">
          <SearchForm dict={dict.searchForm} />
        </div>
      </section>

      {/* Секция с картой */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4">
           <h2 className="text-xl font-medium text-gray-900 mb-4">
            {dict.homePage.mapSearchTitle}
           </h2>
          <div className="border rounded-sm overflow-hidden">
            <MapSearch lang={lang} />
          </div>
        </div>
      </section>

      {/* Результаты поиска */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-gray-900">
              {dict.homePage.recommendedTitle}
            </h2>
            <div className="text-sm text-gray-600">
              {dict.homePage.found} {sampleProperties.length} {dict.homePage.foundObjects}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sampleProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* Пагинация */}
          <div className="flex justify-center mt-8">
            <div className="flex space-x-2">
              <button className="px-3 py-2 border border-gray-300 rounded-sm text-gray-600 hover:bg-gray-50">
                {dict.homePage.prevPage}
              </button>
              <button className="px-3 py-2 bg-primary-600 text-white rounded-sm">
                1
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-sm text-gray-600 hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-sm text-gray-600 hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-sm text-gray-600 hover:bg-gray-50">
                {dict.homePage.nextPage}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Футер - упрощенный */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {dict.homePage.footerTitle}
              </h3>
              <p className="text-gray-600 text-sm">
                {dict.homePage.footerDescription}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">{dict.homePage.buyersTitle}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary-600">{dict.homePage.apartments}</a></li>
                <li><a href="#" className="hover:text-primary-600">{dict.homePage.houses}</a></li>
                <li><a href="#" className="hover:text-primary-600">{dict.homePage.newBuildings}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">{dict.homePage.rentersTitle}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary-600">{dict.homePage.apartmentRental}</a></li>
                <li><a href="#" className="hover:text-primary-600">{dict.homePage.houseRental}</a></li>
                <li><a href="#" className="hover:text-primary-600">{dict.homePage.shortTermRental}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">{dict.homePage.helpTitle}</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-primary-600">{dict.homePage.contacts}</a></li>
                <li><a href="#" className="hover:text-primary-600">{dict.homePage.help}</a></li>
                <li><a href="#" className="hover:text-primary-600">{dict.homePage.aboutUs}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
            <p>{dict.homePage.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 