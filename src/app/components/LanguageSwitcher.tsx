"use client";
import React from "react";
import { FlagIcon } from "react-flag-kit";
import Dropdown from "./Dropdown"; // Import Dropdown component

const LanguageSwitcher = () => {
  const options = [
    {
      label: (
        <>
          <FlagIcon code="GB" size={24} className="mr-2" />
          English
        </>
      ),
      onClick: () => {
        // Add your logic to switch to English
      },
    },
    {
      label: (
        <>
          <FlagIcon code="CZ" size={24} className="mr-2" />
          Czech
        </>
      ),
      onClick: () => {
        // Add your logic to switch to Czech
      },
    },
  ];

  return <Dropdown />;
};

export default LanguageSwitcher;
