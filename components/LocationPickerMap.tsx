'use client'

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useState, useEffect } from 'react'

// Fix for default icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

interface LocationPickerMapProps {
  initialPosition: [number, number]
  onPositionChange: (position: [number, number]) => void
  tileUrl: string
  attribution: string
}

const LocationPickerMap = ({ initialPosition, onPositionChange, tileUrl, attribution }: LocationPickerMapProps) => {
  const [position, setPosition] = useState<[number, number]>(initialPosition)

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const newPos: [number, number] = [e.latlng.lat, e.latlng.lng]
        setPosition(newPos)
        onPositionChange(newPos)
      },
    })
    return null
  }

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  return (
    <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }} scrollWheelZoom={false}>
      <TileLayer url={tileUrl} attribution={attribution} />
      <Marker position={position} />
      <MapClickHandler />
    </MapContainer>
  )
}

export default LocationPickerMap 