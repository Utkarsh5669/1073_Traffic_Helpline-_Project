import React, { useState, useEffect, useRef } from "react";
import "../styles/CreateIncident.css";
import { Loader } from "@googlemaps/js-api-loader";

const CreateIncident = () => {
  const [formData, setFormData] = useState({
    address: "",
    latitude: "",
    longitude: "",
    incident_description: "",
    caller_name: "",
    caller_number: "",
    mdt_number: "",
    locationUpdate: false,
    category: "",
    event_type: "",
    priority: "",
    dispatchType: "",
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  // Load Google Maps API
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries: ["places", "geometry"],
    });

    loader
      .load()
      .then(() => {
        if (window.google && window.google.maps) {
          initializeMap();
        }
      })
      .catch((error) => console.error("Failed to load Google Maps API:", error));
  }, []);

  // Initialize Map and Click Event Listener
  const initializeMap = () => {
    if (!mapRef.current) return;

    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: 30.7333, lng: 76.7794 }, // Default to Chandigarh
      zoom: 14,
    });

    setMap(mapInstance);

    mapInstance.addListener("click", (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setFormData((prevData) => ({ ...prevData, latitude: lat, longitude: lng }));

      // Update marker
      if (marker) marker.setMap(null);
      const newMarker = new window.google.maps.Marker({
        position: { lat, lng },
        map: mapInstance,
      });
      setMarker(newMarker);

      // Fetch address using reverse geocoding
      fetchAddressFromLatLng(lat, lng);
    });
  };

  // Reverse Geocode to Get Address
  const fetchAddressFromLatLng = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        setFormData((prevData) => ({ ...prevData, address: results[0].formatted_address }));
      } else {
        console.error("Geocoder failed due to:", status);
      }
    });
  };

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    if (!formData.incident_description || !formData.address || !formData.category) {
      setErrorMessage("All required fields must be filled.");
      setLoading(false);
      return;
    }

    try {
const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/events`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData),
});

      // const response = await fetch("https://4aee-2409-4055-4e18-8796-84ca-1132-464a-28a.ngrok-free.app/api/events", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to submit incident.");
      }

      console.log("Incident Submitted:", responseData);
      setShowSuccessMessage(true);
      resetForm();

      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error("Error submitting incident:", error);
      setErrorMessage(error.message || "An error occurred while submitting.");
    } finally {
      setLoading(false);
    }
  };

  // Reset Form Fields
  const resetForm = () => {
    setFormData({
      address: "",
      latitude: "",
      longitude: "",
      incident_description: "",
      caller_name: "",
      caller_number: "",
      mdt_number: "",
      locationUpdate: false,
      category: "",
      event_type: "",
      priority: "",
      dispatchType: "",
    });
  };

  return (
    <div className="create-incident-container">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit} className="incident-form">
        {/* Map Section */}
        <div className="form-group">
          <label>Click on Map to Select Address</label>
          <div ref={mapRef} style={{ width: "100%", height: "400px", border: "1px solid #ccc" }} />
        </div>

{/* Address Field (Read + Write) */}
<div className="form-group">
  <label>Address</label>
  <input
    type="text"
    name="address"
    value={formData.address}
    onChange={handleChange} // Allows manual input
  />
</div>

{/* Latitude Field (Read + Write) */}
<div className="form-group">
  <label>Latitude</label>
  <input
    type="text"
    name="latitude"
    value={formData.latitude}
    onChange={handleChange} // Allows manual input
  />
</div>

{/* Longitude Field (Read + Write) */}
<div className="form-group">
  <label>Longitude</label>
  <input
    type="text"
    name="longitude"
    value={formData.longitude}
    onChange={handleChange} // Allows manual input
  />
</div>

        {/* Incident Description */}
        <div className="form-group">
          <label>Incident Description</label>
          <textarea
            name="incident_description"
            placeholder="Describe the incident"
            value={formData.incident_description}
            onChange={handleChange}
          />
        </div>

        {/* Other Input Fields */}
        <div className="form-group">
          <label>Caller Name</label>
          <input type="text" name="caller_name" value={formData.caller_name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Caller Number</label>
          <input type="text" name="caller_number" value={formData.caller_number} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>MDT Number</label>
          <input type="text" name="mdt_number" value={formData.mdt_number} onChange={handleChange} />
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Traffic Congestion">Traffic Congestion</option>
            <option value="Road Accident">Road Accident</option>
            <option value="Signal Issue">Signal Issue</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="form-group">
          <label>Event Type</label>
          <select name="event_type" value={formData.event_type} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Quick Response">Quick Response</option>
          </select>
        </div>

        {/* Priority */}
        <div className="form-group">
          <label>Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="">Select</option>
            <option value="High Priority">High Priority</option>
            <option value="Medium Priority">Medium Priority</option>
            <option value="Low Priority">Low Priority</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Create"}</button>
          <button type="button" onClick={resetForm}>Cancel</button>
        </div>
      </form>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {showSuccessMessage && <div className="success-message">Event created successfully!</div>}
    </div>
  );
};

export default CreateIncident;
