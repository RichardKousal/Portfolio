"use client";
import React, { useState, useEffect, useRef } from "react";
import { FlagIcon } from "react-flag-kit";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { GlobeAltIcon } from "@heroicons/react/24/solid";

const LanguageSwitcher: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={toggleDropdown}
        className="text-white hover:text-green-300 focus:outline-none flex items-center"
      >
        <GlobeAltIcon className="h-6 w-6" />
      </button>
      {isOpen && (
        <div className="origin-top-right absolute left-0 sm:right-0 mt-8 sm:mt-6 min-w-max rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link href="/" locale="en">
              <div
                onClick={() => i18n.changeLanguage("en")}
                className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                role="menuitem"
              >
                <FlagIcon code="GB" size={24} className="mr-2" />
                {t("languages.en")}
              </div>
            </Link>
            <Link href="/" locale="cs" scroll>
              <div
                onClick={() => i18n.changeLanguage("cs")}
                className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                role="menuitem"
              >
                <FlagIcon code="CZ" size={24} className="mr-2" />
                {t("languages.cs")}
              </div>
            </Link>
            <Link href="/" locale="pl">
              <div
                onClick={() => i18n.changeLanguage("pl")}
                className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                role="menuitem"
              >
                <FlagIcon code="PL" size={24} className="mr-2" />
                {t("languages.pl")}
              </div>
            </Link>
            <Link href="/" locale="de">
              <div
                onClick={() => i18n.changeLanguage("de")}
                className="block px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                role="menuitem"
              >
                <FlagIcon code="DE" size={24} className="mr-2" />
                {t("languages.de")}
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
