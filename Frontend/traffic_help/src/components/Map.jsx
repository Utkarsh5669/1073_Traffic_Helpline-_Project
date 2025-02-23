import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "../styles/Map.css";

function Map({ center = [30.7333, 76.7794], zoom = 13, markers = [] }) {
  return (
    <MapContainer center={center} zoom={zoom} className="map-container">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>{marker.popup}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
