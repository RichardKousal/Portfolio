"use client";
import React from "react";
import userData from "../constants/data";

export default function Footer() {
  const links = [
    { id: 1, text: "Home", href: "/" },
    { id: 2, text: "About", href: "#about" },
    { id: 3, text: "Experience", href: "#experience" },
    { id: 4, text: "Skills", href: "#skills" },
    { id: 5, text: "Contact", href: "#contact" },
  ];

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    e.preventDefault();
    window.location.href = `/#${href.substring(1)}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 md:py-6">
      <div className="h-0.5 w-full bg-gray-300 my-2"></div>
      <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="text-center md:text-left">
          <p>Mobile: {userData.phone}</p>
          <p>E-mail: {userData.email}</p>
        </div>
        <div className="text-center md:text-left">
          Developed by{" "}
          <a
            className="hover:bg-green-700/75 rounded-md px-2 py-1 hover:text-gray-50"
            href="#about"
            onClick={(e) => handleClick(e, "#about")}
          >
            {userData.name}
          </a>
        </div>
        <div className="flex flex-wrap justify-center md:justify-start">
          {links.map(({ id, text, href }) => (
            <a
              key={id}
              href={`/#${href.substring(1)}`}
              className="hover:bg-green-700/75 rounded-md px-2 py-1 hover:text-gray-50 mr-2 mb-2"
              onClick={(e) => handleClick(e, href)}
            >
              {text}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
