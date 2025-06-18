'use client'

import React, { useState } from 'react'
import { Heart, MapPin, BedDouble, Bath, Square, Car } from 'lucide-react'

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
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ' + currency
  }

  return (
    <div className="bg-white border border-gray-200 rounded-sm hover:shadow-md transition-shadow duration-200 cursor-pointer group">
      {/* Изображение */}
      <div className="relative">
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3">
            {property.isNew && (
              <span className="bg-primary-600 text-white px-2 py-1 text-xs font-medium rounded-sm">
                НОВИНКА
              </span>
            )}
          </div>

          {/* Избранное */}
          <button
            onClick={toggleFavorite}
            className={`absolute top-3 right-3 p-2 rounded-sm transition-colors ${
              isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>

          {/* Количество фото */}
          {property.images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 text-xs rounded-sm">
              {property.images.length} фото
            </div>
          )}
        </div>
      </div>

      {/* Контент */}
      <div className="p-4">
        {/* Цена */}
        <div className="mb-2">
          <div className="text-xl font-semibold text-gray-900">
            {formatPrice(property.price, property.currency)}
            {property.type === 'rent' && (
              <span className="text-sm font-normal text-gray-500">/мес</span>
            )}
          </div>
        </div>

        {/* Заголовок */}
        <h3 className="text-gray-900 mb-2 line-clamp-2 text-sm leading-tight">
          {property.title}
        </h3>

        {/* Локация */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Характеристики */}
        <div className="flex items-center text-sm text-gray-600 mb-3 space-x-4">
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

        {/* Особенности */}
        {property.features.length > 0 && (
          <div className="text-xs text-gray-600 mb-3">
            {property.features.slice(0, 2).join(' • ')}
            {property.features.length > 2 && ` • +${property.features.length - 2}`}
          </div>
        )}

        {/* Дата и контакт */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            {property.addedDate}
          </div>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            Связаться
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard 