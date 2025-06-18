'use client'

import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Иконки
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function LocationMarker({ position, setPosition }: { position: [number, number], setPosition: (pos: [number, number]) => void }) {
  const map = useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      map.flyTo(e.latlng, map.getZoom());
    },
  });
  return position ? <Marker position={position}></Marker> : null;
}

const LocationPickerMap = ({ initialPosition, onPositionChange, tileUrl, attribution }: { 
    initialPosition: [number, number],
    onPositionChange: (pos: [number, number]) => void,
    tileUrl: string,
    attribution: string
 }) => {

  return (
    <MapContainer 
        center={initialPosition} 
        zoom={13} 
        style={{ height: '350px', width: '100%', borderRadius: '0.375rem' }}
        >
        <TileLayer
            key={tileUrl} // Ключ для принудительного обновления
            url={tileUrl}
            attribution={attribution}
        />
        <LocationMarker position={initialPosition} setPosition={onPositionChange} />
    </MapContainer>
  );
};

export default LocationPickerMap; 