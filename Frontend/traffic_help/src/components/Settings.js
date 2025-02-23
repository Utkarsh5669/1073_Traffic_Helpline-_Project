import React, { useState, useEffect } from "react";
import "../styles/SettingsPage.css"; // Importing CSS for styling

const SettingsPage = () => {
  // Load settings from localStorage or set defaults
  const getSavedSettings = () => {
    const saved = localStorage.getItem("settings");
    return saved ? JSON.parse(saved) : {
      notifications: {
        trafficAlerts: false,
        locationBased: false,
        dailySummaries: false,
      },
      mapView: "traffic",
      language: "english",
      theme: "light",
      privacy: {
        locationTracking: false,
        anonymousData: false,
      },
      accessibility: {
        highContrast: false,
        largeFont: false,
      },
    };
  };

  // State for user settings
  const [settings, setSettings] = useState(getSavedSettings());

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  // Handle checkbox changes
  const handleCheckboxChange = (category, key) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key],
      },
    }));
  };

  // Handle dropdown (select) changes
  const handleSelectChange = (category, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  return (
    <div className="settings-page-container">
      <h2>Settings</h2>
      <p>Customize your experience with the following options:</p>

      {/* Notification Preferences */}
      <h3>Notification Preferences</h3>
      <label>
        <input
          type="checkbox"
          checked={settings.notifications.trafficAlerts}
          onChange={() => handleCheckboxChange("notifications", "trafficAlerts")}
        /> 
        Receive traffic alerts and updates
      </label>
      <label>
        <input
          type="checkbox"
          checked={settings.notifications.locationBased}
          onChange={() => handleCheckboxChange("notifications", "locationBased")}
        />
        Enable location-based notifications
      </label>
      <label>
        <input
          type="checkbox"
          checked={settings.notifications.dailySummaries}
          onChange={() => handleCheckboxChange("notifications", "dailySummaries")}
        />
        Get daily summaries via email
      </label>

      {/* Map View Settings */}
      <h3>Map View Settings</h3>
      <select
        value={settings.mapView}
        onChange={(e) => handleSelectChange("mapView", e.target.value)}
      >
        <option value="traffic">Show Traffic Density</option>
        <option value="accidents">Show Recent Accidents</option>
        <option value="police">Show Police Presence</option>
      </select>

      {/* Language Selection */}
      <h3>Language</h3>
      <select
        value={settings.language}
        onChange={(e) => handleSelectChange("language", e.target.value)}
      >
        <option value="english">English</option>
        <option value="hindi">Hindi</option>
        <option value="spanish">Spanish</option>
      </select>

      {/* Theme Settings */}
      <h3>Theme Settings</h3>
      <select
        value={settings.theme}
        onChange={(e) => handleSelectChange("theme", e.target.value)}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="blue">Blue</option>
      </select>

      {/* Privacy Settings */}
      <h3>Privacy Settings</h3>
      <label>
        <input
          type="checkbox"
          checked={settings.privacy.locationTracking}
          onChange={() => handleCheckboxChange("privacy", "locationTracking")}
        />
        Allow location tracking
      </label>
      <label>
        <input
          type="checkbox"
          checked={settings.privacy.anonymousData}
          onChange={() => handleCheckboxChange("privacy", "anonymousData")}
        />
        Share anonymous usage data
      </label>

      {/* Accessibility Options */}
      <h3>Accessibility Options</h3>
      <label>
        <input
          type="checkbox"
          checked={settings.accessibility.highContrast}
          onChange={() => handleCheckboxChange("accessibility", "highContrast")}
        />
        Enable high contrast mode
      </label>
      <label>
        <input
          type="checkbox"
          checked={settings.accessibility.largeFont}
          onChange={() => handleCheckboxChange("accessibility", "largeFont")}
        />
        Increase font size
      </label>

      {/* Save Button */}
      <button type="submit">Save Changes</button>
    </div>
  );
};

export default SettingsPage;
