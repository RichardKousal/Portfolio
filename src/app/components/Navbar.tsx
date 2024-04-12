"use client";
import React, { useState, useEffect } from "react";
import userData from "../constants/data";
import ThemeSwitch from "./ThemeSwitcher";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [isDarkmode, setIsDarkmode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const toggleTheme = () => {
    setIsDarkmode(!isDarkmode);
    localStorage.setItem("isDarkmode", String(!isDarkmode));
  };
  const { t } = useTranslation();
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
        <a
          href="/#"
          className={`py-2 px-4 text-base font-medium hover:text-green-300 transition duration-300 ease-in-out ${
            pathname === "/" ? "text-green-300" : "text-white"
          }`}
        >
          {t("navigation.navHome")}
        </a>
        <a
          href="/#about"
          className={`py-2 px-4 text-base font-medium hover:text-green-300 transition duration-300 ease-in-out ${
            pathname === "#about" ? "text-green-300" : "text-white"
          }`}
        >
          {t("navigation.navAbout")}
        </a>
        <a
          href="/#experience"
          className={`py-2 px-4 text-base font-medium hover:text-green-300 transition duration-300 ease-in-out ${
            pathname === "#experience" ? "text-green-300" : "text-white"
          }`}
        >
          {t("navigation.navExperience")}
        </a>
        <a
          href="/#skills"
          className={`py-2 px-4 text-base font-medium hover:text-green-300 transition duration-300 ease-in-out ${
            pathname === "#skills" ? "text-green-300" : "text-white"
          }`}
        >
          {t("navigation.navSkills")}
        </a>
        <a
          href="/#contact"
          className={`py-2 px-4 text-base font-medium hover:text-green-300 transition duration-300 ease-in-out ${
            pathname === "#contact" ? "text-green-300" : "text-white"
          }`}
        >
          {t("navigation.navContact")}
        </a>
      </div>

      {/* Social Links and Theme Switch */}
      <div className="flex items-center space-x-4">
        {/* Social Links */}
        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
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
            className="text-white hover:text-green-300 focus:outline-none"
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
                <li>
                  <a
                    href="/#"
                    className={`block px-4 py-2 text-base font-medium hover:text-green-300 transition duration-300 ease-in-out ${
                      pathname === "/" ? "text-green-300" : "text-white"
                    }`}
                    onClick={() => setNavOpen(false)}
                  >
                    {t("navigation.navHome")}
                  </a>
                </li>
                <li>
                  <a
                    href="/#about"
                    className={`block px-4 py-2 text-base font-medium hover:text-green-300 transition duration-300 ease-in-out ${
                      pathname === "#about" ? "text-green-300" : "text-white"
                    }`}
                    onClick={() => setNavOpen(false)}
                  >
                    {t("navigation.navAbout")}
                  </a>
                </li>
                <li>
                  <a
                    href="/#experience"
                    className={`block px-4 py-2 text-base font-medium hover:text-green-300 transition duration-300 ease-in-out ${
                      pathname === "#experience"
                        ? "text-green-300"
                        : "text-white"
                    }`}
                    onClick={() => setNavOpen(false)}
                  >
                    {t("navigation.navExperience")}
                  </a>
                </li>
                <li>
                  <a
                    href="/#skills"
                    className={`block px-4 py-2 text-base font-medium hover:text-green-300 transition duration-300 ease-in-out ${
                      pathname === "#skills" ? "text-green-300" : "text-white"
                    }`}
                    onClick={() => setNavOpen(false)}
                  >
                    {t("navigation.navSkills")}
                  </a>
                </li>
                <li>
                  <a
                    href="/#contact"
                    className={`block px-4 py-2 text-base font-medium hover:text-green-300 transition duration-300 ease-in-out ${
                      pathname === "#contact" ? "text-green-300" : "text-white"
                    }`}
                    onClick={() => setNavOpen(false)}
                  >
                    {t("navigation.navContact")}
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
