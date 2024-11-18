import React from 'react';
import { useTheme } from './ThemeContext'; // Import useTheme hook

const ThemeToggleButton = () => {
  const { toggleTheme, theme } = useTheme(); // Access theme and toggle function from context

  return (
    <label className="theme-toggle">
      <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
      <span className="slider"></span>
    </label>
  );
};

export default ThemeToggleButton;
