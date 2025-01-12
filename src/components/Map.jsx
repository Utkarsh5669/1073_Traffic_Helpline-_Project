import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Map() {
  return (
    <MapContainer center={[30.7333, 76.7794]} zoom={13} className="h-full w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={[30.7333, 76.7794]}>
        <Popup>Chandigarh Police Headquarters</Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
