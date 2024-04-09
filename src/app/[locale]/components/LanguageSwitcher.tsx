import React, { useState } from "react";
import { FlagIcon } from "react-flag-kit";
import { usePathname, redirect } from "next/navigation";
const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const switchLocale = (locale: string) => {
    const newPath = `/${locale}${pathname}`;
    redirect(newPath);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleDropdown}
          className="text-white hover:text-green-300 focus:outline-none flex items-center"
        >
          <FlagIcon
            code={pathname === "English" ? "GB" : "CZ"}
            size={24}
            className="mr-2"
          />
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <a
              onClick={() => switchLocale("en")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <FlagIcon code="GB" size={24} className="mr-2" />
              English
            </a>
            <a
              onClick={() => switchLocale("cs")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <FlagIcon code="CZ" size={24} className="mr-2" />
              Czech
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
