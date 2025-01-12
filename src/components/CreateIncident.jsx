import React, { useState } from "react";
import "../styles/CreateIncident.css";

const CreateIncident = () => {
  const [formData, setFormData] = useState({
    address: "",
    description: "",
    callerName: "",
    callerNumber: "",
    locationUpdate: false,
    class: "",
    category: "",
    type: "",
    priority: "",
    dispatchType: "",
    maxResponders: "",
    tags: "",
  });

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
  };

  return (
    <div className="create-incident-container">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit} className="incident-form">
        <div className="form-group">
          <label>Place Map Marker to Enter Address</label>
          <div className="input-with-icon">
            <i className="fa fa-map-marker"></i>
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
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Fire">Traffic Congestion</option>
            <option value="Medical">Road Accident</option>
            <option value="Medical">Others</option>
          </select>
        </div>

        <div className="form-group">
          <label>Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
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
            {/* <button
              type="button"
              className={`dispatch-button ${formData.dispatchType === "Broadcast" ? "active" : ""}`}
              onClick={() => setFormData({ ...formData, dispatchType: "Broadcast" })}
            >
              Broadcast
            </button> */}
            <button
              type="button"
              className={`dispatch-button ${formData.dispatchType === "Assign" ? "active" : ""}`}
              onClick={() => setFormData({ ...formData, dispatchType: "Assign" })}
            >
              Assign
            </button>
            {/* <button
              type="button"
              className={`dispatch-button ${formData.dispatchType === "Both" ? "active" : ""}`}
              onClick={() => setFormData({ ...formData, dispatchType: "Both" })}
            >
              Both
            </button> */}
          </div>
        </div>

        {/* <div className="form-group">
          <label>Max. # Assigned Responders</label>
          <input
            type="number"
            name="maxResponders"
            placeholder="3"
            value={formData.maxResponders}
            onChange={handleChange}
          />
        </div> */}

        {/* <div className="form-group">
          <label>Select Tags</label>
          <input
            type="text"
            name="tags"
            placeholder="Enter Tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </div> */}

        <div className="form-actions">
          <button type="submit" className="create-button">
            Create
          </button>
          <button type="button" className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateIncident;
