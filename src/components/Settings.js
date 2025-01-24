import React from "react";
import "../styles/SettingsPage.css"; // Importing CSS for Settings page

const SettingsPage = () => {
  return (
    <div className="settings-page-container">
      <h2>Settings</h2>
      <p>Customize your experience with the following options:</p>

      <h3>Notification Preferences</h3>
      <label>
        <input type="checkbox" /> Receive traffic alerts and updates
      </label>
      <label>
        <input type="checkbox" /> Enable location-based notifications
      </label>
      <label>
        <input type="checkbox" /> Get daily summaries via email
      </label>

      <h3>Map View Settings</h3>
      <select>
        <option value="traffic">Show Traffic Density</option>
        <option value="accidents">Show Recent Accidents</option>
        <option value="police">Show Police Presence</option>
      </select>

      <h3>Language</h3>
      <select>
        <option value="english">English</option>
        <option value="hindi">Hindi</option>
        <option value="spanish">Spanish</option>
      </select>

      <h3>Theme Settings</h3>
      <select>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="blue">Blue</option>
      </select>

      <h3>Privacy Settings</h3>
      <label>
        <input type="checkbox" /> Allow location tracking
      </label>
      <label>
        <input type="checkbox" /> Share anonymous usage data
      </label>

      <h3>Accessibility Options</h3>
      <label>
        <input type="checkbox" /> Enable high contrast mode
      </label>
      <label>
        <input type="checkbox" /> Increase font size
      </label>

      <button type="submit">Save Changes</button>
    </div>
  );
};

export default SettingsPage;
