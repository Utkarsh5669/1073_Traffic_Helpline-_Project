import React from "react";
import "../styles/MapView.css";

function MapView({ location = "Chandigarh", zoom = 13 }) {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="map-view">
      <iframe
        title="Map"
        src={mapSrc}
        className="map-iframe"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
}

export default MapView;
