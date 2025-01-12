import React from "react";
import "../styles/MapView.css";

function MapView() {
  return (
    <div className="map-view">
      {/* <h3 className="map-title">Map View</h3> */}
      <iframe
        title="Map"
        src="https://maps.google.com/maps?q=Chandigarh&t=&z=13&ie=UTF8&iwloc=&output=embed"
        className="map-iframe"
      ></iframe>
    </div>
  );
}

export default MapView;
