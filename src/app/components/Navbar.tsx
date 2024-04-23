"use client";
import React, { useState, useEffect } from "react";
import userData from "../constants/data";
import ThemeSwitch from "./ThemeSwitcher";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";

interface Links {
  links: string[];
  activeSection: string;
}

function Nav({ links, activeSection }: Links) {
  const { t } = useTranslation();
  return (
    <div className="hidden md:flex space-x-4">
      {links.map((link, index) => (
        <a
          key={index}
          href={`/#${link}`}
          className={`py-2 px-4 text-base font-medium rounded-md px-2 py-1 ${
            activeSection === `#${link}`
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-700/75 hover:text-gray-50 text-white"
          }`}
        >
          {t(`navigation.nav${link.charAt(0).toUpperCase() + link.slice(1)}`)}
        </a>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [isDarkmode, setIsDarkmode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const links = ["home", "about", "experience", "skills", "contact"];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    let sections = links.map((link) => document.getElementById(link));

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection((prev) =>
            prev === null ? "#home" : `#${entry.target.id}`
          );
          window.history.pushState({}, "", `#${entry.target.id}`);
        }
      });
    }, observerOptions);

    sections?.forEach((section) => {
      section && observer.observe(section);
    });

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        <a href="/#home">
          <div className="text-white font-semibold text-xl cursor-pointer">
            {userData.name}
          </div>
        </a>
        <span className="text-gray-200 text-sm">{userData.designation}</span>
      </div>

      {/* Navigation Links for Desktop */}
      <Nav links={links} activeSection={activeSection} />

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
