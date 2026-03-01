import React from 'react';
import { useTheme } from "../../contexts/ThemeContext";
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full p-1 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg transform transition-transform duration-300 ${theme === 'dark' ? 'translate-x-7' : 'translate-x-0'}`}>
        {theme === 'dark' ? (
          <span className="absolute inset-0 flex items-center justify-center text-yellow-500 text-sm">🌙</span>
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-orange-500 text-sm">☀️</span>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;