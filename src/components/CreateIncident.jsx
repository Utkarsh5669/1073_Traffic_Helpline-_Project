import React, { useState } from "react";
import "../styles/CreateIncident.css";

const CreateIncident = () => {
  const [formData, setFormData] = useState({
    address: "",
    description: "",
    callerName: "",
    callerNumber: "",
    mdtNumber: "",
    locationUpdate: false,
    category: "",
    type: "",
    priority: "",
    dispatchType: "",
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);

    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="create-incident-container">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit} className="incident-form">
        <div className="form-group">
          <label>Place Map Marker to Enter Address</label>
          <div className="input-with-icon">
           <i class="fa-solid fa-location-dot"></i> 
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Incident Description</label>
          <textarea
            name="description"
            placeholder="Incident Description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Caller Name</label>
          <input
            type="text"
            name="callerName"
            placeholder="Caller Name"
            value={formData.callerName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Caller Number</label>
          <input
            type="text"
            name="callerNumber"
            placeholder="Caller Number"
            value={formData.callerNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>MDT Number</label>
          <input
            type="text"
            name="mdtNumber"
            placeholder="Enter MDT Number"
            value={formData.mdtNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Traffic Congestion">Traffic Congestion</option>
            <option value="Road Accident">Road Accident</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="form-group">
          <label>Type</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Rescue">Rescue</option>
            <option value="Emergency">Emergency</option>
          </select>
        </div>

        <div className="form-group">
          <label>Event Priority</label>
          <div className="priority-buttons">
            <button
              type="button"
              className={`priority-button ${formData.priority === "High Priority" ? "active" : ""}`}
              onClick={() => setFormData({ ...formData, priority: "High Priority" })}
            >
              High Priority
            </button>
            <button
              type="button"
              className={`priority-button ${formData.priority === "Medium Priority" ? "active" : ""}`}
              onClick={() => setFormData({ ...formData, priority: "Medium Priority" })}
            >
              Medium Priority
            </button>
            <button
              type="button"
              className={`priority-button ${formData.priority === "Low Priority" ? "active" : ""}`}
              onClick={() => setFormData({ ...formData, priority: "Low Priority" })}
            >
              Low Priority
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Dispatch:</label>
          <div className="dispatch-buttons">
            <button
              type="button"
              className={`dispatch-button ${formData.dispatchType === "Assign" ? "active" : ""}`}
              onClick={() => setFormData({ ...formData, dispatchType: "Assign" })}
            >
              Assign
            </button>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="create-button">
            Create
          </button>
          <button type="button" className="cancel-button">
            Cancel
          </button>
        </div>
      </form>

      {showSuccessMessage && <div className="success-message">Event created successfully!</div>}
    </div>
  );
};

export default CreateIncident;
