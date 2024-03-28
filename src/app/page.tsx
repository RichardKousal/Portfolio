"use client";
import React from "react";
import Hero from "./components/Hero";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Hero
        mainHeadingClasses="your-main-heading-classes"
        additionalClass="your-additional-class"
      />
    </div>
  );
};

export default HomePage;
