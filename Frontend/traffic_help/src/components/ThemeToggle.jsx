import React, { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => {
      const newTheme = !prevTheme;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [isDarkTheme]);

  return (
    <button className="theme-toggle-button" onClick={toggleTheme}>
      Switch to {isDarkTheme ? "Light" : "Dark"} Theme
    </button>
  );
};

export default ThemeToggle;
