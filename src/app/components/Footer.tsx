"use client";
import React from "react";
import userData from "../constants/data";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const homeLink = { id: 1, text: t("navigation.navHome"), href: "/" };
  const aboutLink = { id: 2, text: t("navigation.navAbout"), href: "#about" };
  const experienceLink = {
    id: 3,
    text: t("navigation.navExperience"),
    href: "#experience",
  };
  const skillsLink = {
    id: 4,
    text: t("navigation.navSkills"),
    href: "#skills",
  };
  const contactLink = {
    id: 5,
    text: t("navigation.navContact"),
    href: "#contact",
  };

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    e.preventDefault();
    window.location.href = `/#${href.substring(1)}`;
  };

  return (
    <div className="mx-auto px-4 md:px-48 py-4 md:py-6 bg-blue-950 ">
      <div className="h-0.5 w-full bg-blue-950 my-2"></div>
      <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="text-center md:text-left text-white">
          <p>
            {t("other.mobile")} {userData.phone}
          </p>
          <p>E-mail: {userData.email}</p>
        </div>
        <div className="text-center md:text-left text-white">
          {t("other.developed")}

          <a
            className="hover:bg-blue-700/75 rounded-md px-2 py-1 hover:text-gray-50"
            href="#home"
            onClick={(e) => handleClick(e, "#home")}
          >
            {t("other.developedBy")}
          </a>
          <p>
            {" "}
            {t("other.address")} {t("other.addressValue")}
          </p>
        </div>
        <div className="flex flex-wrap justify-center md:justify-start">
          <a
            key={homeLink.id}
            href={homeLink.href}
            className="hover:bg-blue-700/75 rounded-md px-2 py-1 text-white hover:text-gray-50 mr-2 mb-2"
            onClick={(e) => handleClick(e, homeLink.href)}
          >
            {homeLink.text}
          </a>
          <a
            key={aboutLink.id}
            href={aboutLink.href}
            className="hover:bg-blue-700/75 rounded-md px-2 py-1 text-white hover:text-gray-50 mr-2 mb-2"
            onClick={(e) => handleClick(e, aboutLink.href)}
          >
            {aboutLink.text}
          </a>
          <a
            key={experienceLink.id}
            href={experienceLink.href}
            className="hover:bg-blue-700/75 rounded-md px-2 py-1 text-white hover:text-gray-50 mr-2 mb-2"
            onClick={(e) => handleClick(e, experienceLink.href)}
          >
            {experienceLink.text}
          </a>
          <a
            key={skillsLink.id}
            href={skillsLink.href}
            className="hover:bg-blue-700/75 rounded-md px-2 py-1 text-white hover:text-gray-50 mr-2 mb-2"
            onClick={(e) => handleClick(e, skillsLink.href)}
          >
            {skillsLink.text}
          </a>
          <a
            key={contactLink.id}
            href={contactLink.href}
            className="hover:bg-blue-700/75 rounded-md px-2 py-1 text-white hover:text-gray-50 mr-2 mb-2"
            onClick={(e) => handleClick(e, contactLink.href)}
          >
            {contactLink.text}
          </a>
        </div>
      </div>
    </div>
  );
}
