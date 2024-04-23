"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { BarsArrowDownIcon } from "@heroicons/react/24/solid";

const MobileMenu: React.FC = () => {
  const [activeHash, setActiveHash] = useState("");
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !(ref.current as unknown as Node).contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const hashListener = () => {
      setActiveHash(window.location.hash);
    };

    window.addEventListener("hashchange", hashListener, false);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("hashchange", hashListener);
    };
  }, [ref]);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={toggleDropdown}
        className="text-white hover:text-green-600 focus:outline-none flex items-center"
      >
        <BarsArrowDownIcon className="h-6 w-6" />
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-8 sm:mt-6 min-w-max rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
          <ul className="py-2">
            <li>
              <a
                href="/#home"
                className={`block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600  flex items-center ${
                  activeHash === "" || activeHash === "#/"
                    ? "text-blue-500 dark:text-blue-500"
                    : "text-black"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t("navigation.navHome")}
              </a>
            </li>
            <li>
              <a
                href="/#about"
                className={`block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600  flex items-center ${
                  activeHash === "#about"
                    ? "text-blue-500 dark:text-blue-500"
                    : "text-black"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t("navigation.navAbout")}
              </a>
            </li>
            <li>
              <a
                href="/#experience"
                className={`block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600  flex items-center ${
                  activeHash === "#experience"
                    ? "text-blue-500 dark:text-blue-500"
                    : "text-black"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t("navigation.navExperience")}
              </a>
            </li>
            <li>
              <a
                href="/#skills"
                className={`block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600  flex items-center ${
                  activeHash === "#skills"
                    ? "text-blue-500 dark:text-blue-500"
                    : "text-black"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t("navigation.navSkills")}
              </a>
            </li>
            <li>
              <a
                href="/#contact"
                className={`block px-4 py-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600  flex items-center ${
                  activeHash === "#contact"
                    ? "text-blue-500 dark:text-blue-500"
                    : "text-black"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {t("navigation.navContact")}
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
