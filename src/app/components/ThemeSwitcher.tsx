import React from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitch({ isDarkmode, toggleTheme }) {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    toggleTheme(); // volání toggleTheme funkce
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className={`w-12 h-6 rounded-full bg-white flex items-center justify-center transition duration-300 focus:outline-none shadow`}
      onClick={handleToggleTheme}
    >
      <div
        className={`w-7 h-7 flex items-center justify-center rounded-full transition duration-500 transform ${
          theme === "dark"
            ? "bg-yellow-500 -translate-x-3"
            : "bg-blue-500 translate-x-3"
        } p-1 text-white`}
      >
        {theme === "dark" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </div>
    </button>
  );
}
