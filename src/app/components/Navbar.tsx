"use client";
import React, { useState, useEffect } from "react";
import userData from "../constants/data";
import ThemeSwitch from "./ThemeSwitcher";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [isDarkmode, setIsDarkmode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const storedDarkmode = localStorage.getItem("isDarkmode");
    if (storedDarkmode === "true") {
      setIsDarkmode(true);
    } else if (storedDarkmode === "false") {
      setIsDarkmode(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = [
    { id: 1, text: "Home", href: "/" },
    { id: 2, text: "About", href: "#about" },
    { id: 3, text: "Experience", href: "#experience" },
    { id: 4, text: "Skills", href: "#skills" },
    { id: 5, text: "Contact", href: "#contact" },
  ];

  const toggleTheme = () => {
    setIsDarkmode(!isDarkmode);
    localStorage.setItem("isDarkmode", String(!isDarkmode));
  };

  return (
    <nav
      className={`bg-blue-950 px-4 py-2 fixed top-0 left-0 right-0 z-50 flex justify-between items-center transition-all duration-500 ease-in-out ${
        scrolled ? "p-2" : "p-4"
      }`}
    >
      {/* Brand Name and Designation */}
      <div className="flex items-center space-x-4">
        <a href="/">
          <div className="text-white font-semibold text-xl cursor-pointer">
            {userData.name}
          </div>
        </a>
        <span className="text-gray-400 text-sm">{userData.designation}</span>
      </div>

      {/* Navigation Links for Desktop */}
      <div className="hidden md:flex space-x-4">
        {links.map(({ id, text, href }) => (
          <a
            key={id}
            href={`/#${href.substring(1)}`} // Odkaz vždy začíná na kořenové cestě a přidává se cílový identifikátor
            className={`py-2 px-4 text-base font-medium hover:text-green-300 transition duration-300 ease-in-out ${
              pathname === href ? "text-green-300" : "text-white"
            }`}
          >
            {text}
          </a>
        ))}
      </div>

      {/* Social Links and Theme Switch */}
      <div className="flex items-center space-x-4">
        {/* Social Links */}
        <div className="flex items-center space-x-2">
          {/* Hide icons for mobile resolutions */}
          <div className="hidden sm:flex space-x-2 items-center">
            <a
              href={userData.socialLinks.instagram}
              className="text-base text-white hover:text-green-300 transition duration-300 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d={userData.iconPath.instagram} />
              </svg>
            </a>
            <a
              href={userData.socialLinks.linkedin}
              className="text-base text-white hover:text-green-300 transition duration-300 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d={userData.iconPath.linkedIn} />
              </svg>
            </a>
          </div>
          <ThemeSwitch toggleTheme={toggleTheme} />
        </div>

        {/* Toggle Button for Mobile Menu */}
        <div className="md:hidden lg:hidden xl:hidden relative ml-4">
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="
            text-white hover:text-green-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {navOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
          {navOpen && (
            <div className="absolute top-12 right-0 bg-zinc-900 w-auto min-w-max mt-2 rounded-md shadow-lg">
              <ul className="py-2">
                {links.map(({ id, text, href }) => (
                  <li key={id}>
                    <a
                      href={`/#${href.substring(1)}`} // Odkaz vždy začíná na kořenové cestě a přidává se cílový identifikátor
                      className={`block px-4 py-2 text-base font-medium hover:text-green-300 transition duration-300 ease-in-out ${
                        pathname === href ? "text-green-300" : "text-white"
                      }`}
                      onClick={() => setNavOpen(false)}
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
