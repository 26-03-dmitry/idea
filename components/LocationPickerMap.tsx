'use client'

import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Исправление для иконок Leaflet
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Компонент для обработки кликов по карте
function LocationMarker({ position, setPosition }: { position: [number, number], setPosition: (pos: [number, number]) => void }) {
  const map = useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
}

const LocationPickerMap = ({ onLocationSelect }: { onLocationSelect: (coords: { lat: number, lng: number }) => void }) => {
  const [position, setPosition] = useState<[number, number]>([41.7151, 44.8271]); // Начальная позиция - Тбилиси

  const handlePositionChange = (newPos: [number, number]) => {
    setPosition(newPos);
    onLocationSelect({ lat: newPos[0], lng: newPos[1] });
  };
  
  return (
    <div>
        <p className="text-sm text-gray-600 mb-2">Кликните на карту, чтобы указать точное расположение.</p>
        <MapContainer 
            center={position} 
            zoom={13} 
            style={{ height: '350px', width: '100%', borderRadius: '0.375rem' }}
            >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker position={position} setPosition={handlePositionChange} />
        </MapContainer>
        {position && (
            <div className="mt-2 text-xs text-gray-500">
                Выбранные координаты: {position[0].toFixed(5)}, {position[1].toFixed(5)}
            </div>
        )}
    </div>
  );
};

export default LocationPickerMap; 