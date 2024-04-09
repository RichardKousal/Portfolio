"use client";
import React from "react";
import Hero from "./components/Hero";
import { useTranslation } from "react-i18next";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="home-page">
      {/* <Hero
        mainHeadingClasses="your-main-heading-classes"
        additionalClass="your-additional-class"
      /> */}
      <h1 className="mb-0 md:mb-4 lg:mb-8 text-3xl font-bold text-neutral-800 dark:text-white">
        {t("title")}
      </h1>
    </div>
  );
};

export default HomePage;
