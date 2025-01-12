import React, { useState } from 'react';

function IncidentForm() {
  const [formData, setFormData] = useState({ location: '', description: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <h3 className="text-lg font-bold mb-4">Create Incident</h3>
      <div className="mb-4">
        <label className="block mb-1">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded p-2"
        ></textarea>
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
    </form>
  );
}

export default IncidentForm;
