'use client'

import React from 'react'
import Header from '../components/Header'
import SearchForm from '../components/SearchForm'
import PropertyCard from '../components/PropertyCard'
import { Sparkles, TrendingUp, Shield, Users, Star, ChevronRight, Play } from 'lucide-react'

// Мокданные для недвижимости
const sampleProperties = [
  {
    id: '1',
    title: 'Роскошная квартира с видом на море в Батуми',
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
    features: ['Балкон', 'Кондиционер', 'Новостройка', 'Панорамные окна'],
    isNew: true,
    isFeatured: true,
    views: 234,
    addedDate: '2 дня назад'
  },
  {
    id: '2',
    title: 'Уютная студия в центре Тбилиси',
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
    features: ['Wi-Fi', 'Мебель', 'Кухня'],
    isNew: false,
    isFeatured: false,
    views: 89,
    addedDate: '5 дней назад'
  },
  {
    id: '3',
    title: 'Современный дом с садом в Кутаиси',
    location: 'Кутаиси, Белый мост',
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
    features: ['Сад', 'Гараж', 'Камин', 'Терраса'],
    isNew: false,
    isFeatured: true,
    views: 156,
    addedDate: '1 неделю назад'
  }
]

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero секция */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1920')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Найдите дом своей мечты
            <br />
            <span className="text-accent-300">в Грузии</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in max-w-3xl mx-auto">
            Более 10,000 объектов недвижимости в Тбилиси, Батуми и других городах Грузии
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center space-x-2">
              <Sparkles className="h-5 w-5" />
              <span>Начать поиск</span>
            </button>
            <button className="border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center space-x-2">
              <Play className="h-5 w-5" />
              <span>Посмотреть видео</span>
            </button>
          </div>

          {/* Статистика */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-200">Объектов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Продано в месяц</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">15</div>
              <div className="text-blue-200">Городов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">4.9</div>
              <div className="text-blue-200 flex items-center justify-center">
                <Star className="h-4 w-4 fill-current mr-1" />
                Рейтинг
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Форма поиска */}
      <section className="relative z-20">
        <div className="max-w-6xl mx-auto">
          <SearchForm />
        </div>
      </section>

      {/* Рекомендуемые объекты */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Рекомендуемые объекты
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Лучшие предложения недвижимости, отобранные нашими экспертами
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {sampleProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center">
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 mx-auto">
              <span>Посмотреть все объекты</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Почему выбирают нас
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Мы делаем процесс покупки и продажи недвижимости простым и безопасным
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Безопасность</h3>
              <p className="text-gray-600">Все объекты проверены и юридически чисты</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-200 transition-colors">
                <TrendingUp className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Лучшие цены</h3>
              <p className="text-gray-600">Актуальные цены и честная оценка стоимости</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Экспертная помощь</h3>
              <p className="text-gray-600">Опытные агенты помогут на каждом этапе</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Инновации</h3>
              <p className="text-gray-600">Современные технологии для удобного поиска</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готовы найти свой идеальный дом?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Присоединяйтесь к тысячам довольных клиентов, которые уже нашли свою недвижимость через нашу платформу
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              Начать поиск сейчас
            </button>
            <button className="border border-white/30 hover:bg-white/10 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              Продать недвижимость
            </button>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Georgia<span className="text-accent-500">Estate</span>
              </h3>
              <p className="text-gray-400 mb-4">
                Ваш надежный партнер в мире недвижимости Грузии
              </p>
              <div className="flex space-x-4">
                {/* Social links */}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Поиск недвижимости</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ипотека</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Районы</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Цены</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Продавцам</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Размещение объявления</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Оценка недвижимости</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Услуги агентов</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Реклама</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400">
                <li>+995 555 123 456</li>
                <li>info@georgiaestate.ge</li>
                <li>Тбилиси, пр. Руставели 12</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GeorgiaEstate. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage 