import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = () => {
  const [markerPosition, setMarkerPosition] = useState([27.7172, 85.3240]); // Default position for Kathmandu, Nepal
  const [coordinates, setCoordinates] = useState({ lat: 27.7172, lng: 85.3240 });

  const handleDragEnd = (e) => {
    const { lat, lng } = e.target.getLatLng();
    setMarkerPosition([lat, lng]);
    setCoordinates({ lat, lng });
    console.log('Latitude:', lat);
    console.log('Longitude:', lng);
  };

  return (
    <div>
      <MapContainer center={markerPosition} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={markerPosition} draggable={true} eventHandlers={{ dragend: handleDragEnd }} />
      </MapContainer>
      <div style={{ marginTop: '10px' }}>
        <p>Latitude: {coordinates.lat}</p>
        <p>Longitude: {coordinates.lng}</p>
      </div>
    </div>
  );
};

export default LeafletMap;
