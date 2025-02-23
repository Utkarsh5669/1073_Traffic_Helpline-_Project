
import React, { useState, useEffect, useRef } from "react";
import "../styles/CreateIncident.css";
import { Loader } from "@googlemaps/js-api-loader";
// import { useIncidents } from "../components/IncidentContext"; // Import context


const CreateIncident = () => {

  // const { incidents, addIncident } = useIncidents();

  const [formData, setFormData] = useState({
    address: "",
    incident_description: "", // Fixed key to match backend
    caller_name: "",
    caller_number: "",
    mdt_number: "",
    locationUpdate: false,
    category: "",
    event_type: "",
    priority: "",
    dispatchType: "",
  });

  const [suggestions, setSuggestions] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [autocompleteService, setAutocompleteService] = useState(null);
  const debounceRef = useRef(null);

  // Load Google Maps API & Initialize Autocomplete
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries: ["places"],
    });

    loader
      .load()
      .then(() => {
        if (window.google && window.google.maps) {
          setAutocompleteService(new window.google.maps.places.AutocompleteService());
          console.log("Google Autocomplete Service initialized.");
        }
      })
      .catch((error) => console.error("Failed to load Google Maps API:", error));
  }, []);

  // Handle Input Change & Address Autocomplete
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "address" && autocompleteService) {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (value.trim()) {
          autocompleteService.getPlacePredictions({ input: value }, (predictions, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              setSuggestions(predictions.map((pred) => pred.description));
            } else {
              setSuggestions([]);
            }
          });
        } else {
          setSuggestions([]);
        }
      }, 300);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData((prevData) => ({ ...prevData, address: suggestion }));
    setSuggestions([]);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // Validate required fields
    if (!formData.incident_description || !formData.address || !formData.category) {
      setErrorMessage("All required fields must be filled.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json(); // Parse JSON response

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to submit incident.");
      }

      console.log("Incident Submitted:", responseData);
      setShowSuccessMessage(true);
      // addIncident(responseData);
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
      incident_description: "", // Fixed key
      caller_name: "",
      caller_number: "",
      mdt_number: "",
      locationUpdate: false,
      category: "",
      event_type: "",
      priority: "",
      dispatchType: "",
    });
    setSuggestions([]);
  };

  return (
    <div className="create-incident-container">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit} className="incident-form">
        {/* Address Field */}
        <div className="form-group">
          <label>Place Map Marker to Enter Address</label>
          <div className="input-with-icon">
            <i className="fa-solid fa-location-dot"></i>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              disabled={loading}
            />
            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="suggestion-item" onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Incident Description */}
        <div className="form-group">
          <label>Incident Description</label>
          <textarea
            name="incident_description"
            placeholder="Incident Description"
            value={formData.incident_description}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* Caller Name */}
        <div className="form-group">
          <label>Caller Name</label>
          <input
            type="text"
            name="caller_name"
            placeholder="Caller Name"
            value={formData.caller_name}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* Caller Number */}
        <div className="form-group">
          <label>Caller Number</label>
          <input
            type="text"
            name="caller_number"
            placeholder="Caller Number"
            value={formData.caller_number}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* MDT Number */}
        <div className="form-group">
          <label>MDT Number</label>
          <input
            type="text"
            name="mdt_number"
            placeholder="Enter MDT Number"
            value={formData.mdt_number}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange} disabled={loading}>
            <option value="">Select</option>
            <option value="Traffic Congestion">Traffic Congestion</option>
            <option value="Road Accident">Road Accident</option>
            <option value="Signal Issue">Signal Issue</option>
            <option value="Others">Others</option>
          </select>
        </div>

        {/* Type */}
        <div className="form-group">
          <label>Type</label>
          <select name="event_type" value={formData.event_type} onChange={handleChange} disabled={loading}>
            {/* <option value="">Select</option>
            <option value="Rescue">Rescue</option>
            <option value="Emergency">Emergency</option> */}
            <option value="Quick Response">Quick Response</option>
          </select>
        </div>

        {/* Priority */}
        <div className="form-group">
          <label>Priority</label>
          <select name="priority" value={formData.priority} onChange={handleChange} disabled={loading}>
            <option value="">Select</option>
            <option value="High Priority">High Priority</option>
            <option value="Medium Priority">Medium Priority</option>
            <option value="Low Priority">Low Priority</option>
          </select>
        </div>

        {/* Submit Buttons */}
        <div className="form-actions">
          <button type="submit" className="create-button" disabled={loading}>
            {loading ? "Submitting..." : "Create"}
          </button>
          <button type="button" className="cancel-button" onClick={resetForm} disabled={loading}>
            Cancel
          </button>
        </div>
      </form>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {showSuccessMessage && <div className="success-message">Event created successfully!</div>}
    </div>
  );

};

export default CreateIncident;
