"use client";
import React, { useState, useEffect } from "react";
import userData from "../constants/data";
import ThemeSwitch from "./ThemeSwitcher";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isDarkmode, setIsDarkmode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    const hashListener = () => {
      setActiveHash(window.location.hash);
    };

    document.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", hashListener, false);

    return () => {
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", hashListener);
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
          className={`py-2 px-4 text-base font-medium hover:bg-blue-700/75 rounded-md px-2 py-1 hover:text-gray-50 ${
            activeHash === "#/" ? "text-blue-500" : "text-white"
          }`}
        >
          {t("navigation.navHome")}
        </a>
        <a
          href="/#about"
          className={`py-2 px-4 text-base font-medium hover:bg-blue-700/75 rounded-md px-2 py-1 hover:text-gray-50 ${
            activeHash === "#about" ? "text-blue-500" : "text-white"
          }`}
        >
          {t("navigation.navAbout")}
        </a>
        <a
          href="/#experience"
          className={`py-2 px-4 text-base font-medium hover:bg-blue-700/75 rounded-md px-2 py-1 hover:text-gray-50 ${
            activeHash === "#experience" ? "text-blue-500" : "text-white"
          }`}
        >
          {t("navigation.navExperience")}
        </a>
        <a
          href="/#skills"
          className={`py-2 px-4 text-base font-medium hover:bg-blue-700/75 rounded-md px-2 py-1 hover:text-gray-50 ${
            activeHash === "#skills" ? "text-blue-500" : "text-white"
          }`}
        >
          {t("navigation.navSkills")}
        </a>
        <a
          href="/#contact"
          className={`py-2 px-4 text-base font-medium hover:bg-blue-700/75 rounded-md px-2 py-1 hover:text-gray-50 ${
            activeHash === "#contact" ? "text-blue-500" : "text-white"
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
              className="text-base text-white hover:text-blue-500 transition duration-300 ease-in-out"
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
              className="text-base text-white hover:text-blue-500 transition duration-300 ease-in-out"
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
        <div className="md:hidden lg:hidden xl:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
