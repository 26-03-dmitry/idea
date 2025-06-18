'use client'

import React, { useState } from 'react'
import { Heart, MapPin, BedDouble, Bath, Square, Car, Eye, Share2, ChevronLeft, ChevronRight } from 'lucide-react'

interface PropertyCardProps {
  property: {
    id: string
    title: string
    location: string
    price: number
    currency: string
    type: 'sale' | 'rent'
    propertyType: string
    bedrooms: number
    bathrooms: number
    area: number
    parking?: boolean
    images: string[]
    features: string[]
    isNew?: boolean
    isFeatured?: boolean
    views?: number
    addedDate: string
  }
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    )
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ' + currency
  }

  return (
    <div 
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Изображения */}
      <div className="relative overflow-hidden">
        <div className="aspect-[4/3] relative">
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Навигация по изображениям */}
          {property.images.length > 1 && isHovered && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}

          {/* Индикаторы изображений */}
          {property.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
              {property.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {property.isNew && (
              <span className="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                Новая
              </span>
            )}
            {property.isFeatured && (
              <span className="bg-accent-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                Рекомендуем
              </span>
            )}
            <span className={`px-2 py-1 rounded-md text-xs font-medium text-white ${
              property.type === 'sale' ? 'bg-primary-600' : 'bg-purple-600'
            }`}>
              {property.type === 'sale' ? 'Продажа' : 'Аренда'}
            </span>
          </div>

          {/* Действия */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2">
            <button
              onClick={toggleFavorite}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/80 text-gray-700 hover:bg-white'
              }`}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
          </div>

          {/* Просмотры */}
          {property.views && (
            <div className="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded-md text-xs flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span>{property.views}</span>
            </div>
          )}
        </div>
      </div>

      {/* Контент */}
      <div className="p-4">
        {/* Цена */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-2xl font-bold text-gray-900">
            {formatPrice(property.price, property.currency)}
            {property.type === 'rent' && (
              <span className="text-sm font-normal text-gray-500">/месяц</span>
            )}
          </div>
          <div className="text-sm text-gray-500">
            {property.addedDate}
          </div>
        </div>

        {/* Заголовок */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
          {property.title}
        </h3>

        {/* Локация */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Характеристики */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-4">
            {property.bedrooms > 0 && (
              <div className="flex items-center space-x-1">
                <BedDouble className="h-4 w-4" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center space-x-1">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Square className="h-4 w-4" />
              <span>{property.area} м²</span>
            </div>
            {property.parking && (
              <div className="flex items-center space-x-1">
                <Car className="h-4 w-4" />
              </div>
            )}
          </div>
        </div>

        {/* Особенности */}
        {property.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {property.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
              >
                {feature}
              </span>
            ))}
            {property.features.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                +{property.features.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Кнопка */}
        <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium">
          Подробнее
        </button>
      </div>
    </div>
  )
}

export default PropertyCard 