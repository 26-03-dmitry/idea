'use client'

import React from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';

// Исправление для иконок Leaflet в Next.js
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapSearch = () => {
  const onCreated = (e: any) => {
    const { layerType, layer } = e;
    if (layerType === 'rectangle') {
      const bounds = layer.getBounds();
      console.log('Выделенная область (координаты):', bounds);
      // Здесь будет логика для поиска по координатам bounds
      alert(`Выделена область.
Северо-восток: ${bounds.getNorthEast().toString()}
Юго-запад: ${bounds.getSouthWest().toString()}`);
    }
    // Можно добавить обработку для других фигур (polygon, circle)
  };

  return (
    <MapContainer 
      center={[41.7151, 44.8271]} // Центр карты - Тбилиси
      zoom={12} 
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={onCreated}
          draw={{
            rectangle: true,
            polygon: true,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: false,
          }}
          edit={{
            featureGroup: new L.FeatureGroup(),
            edit: false,
            remove: true
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
};

export default MapSearch; 