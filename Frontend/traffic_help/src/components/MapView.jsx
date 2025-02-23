// import React from "react";
// import "../styles/MapView.css";

// function MapView({ location = "Chandigarh", zoom = 13 }) {
//   const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;

//   return (
//     <div className="map-view">
//       <iframe
//         title="Map"
//         src={mapSrc}
//         className="map-iframe"
//         allowFullScreen
//         loading="lazy"
//       ></iframe>
//     </div>
//   );
// }

// export default MapView;

import React, { useEffect, useRef } from "react";
import "../styles/MapView.css";

function MapView({ location = "Chandigarh", zoom = 13 }) {
  const mapRef = useRef(null);

  useEffect(() => {
    // Load the Google Maps JavaScript API
    const loadGoogleMaps = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      document.body.appendChild(script);
    };

    const initMap = () => {
      // Create a new map instance
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 30.7333, lng: 76.7794 }, // Default coordinates for Chandigarh
        zoom: zoom,
      });

      // Geocode the location to get latitude and longitude
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: location }, (results, status) => {
        if (status === "OK") {
          map.setCenter(results[0].geometry.location);
          new window.google.maps.Marker({
            position: results[0].geometry.location,
            map: map,
          });
        } else {
          console.error("Geocode was not successful for the following reason: " + status);
        }
      });
    };

    // Load the Google Maps script and initialize the map
    loadGoogleMaps();
    window.initMap = initMap; // Assign initMap to window to be callable by the script

    return () => {
      // Clean up the script when the component unmounts
      const script = document.querySelector(`script[src*="maps.googleapis.com"]`);
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [location, zoom]);

  return <div className="map-view" ref={mapRef} ></div>;
}

export default MapView;
