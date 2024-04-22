"use client";
import React from "react";
import Hero from "../components/Hero";
import AboutPage from "../components/AboutPage";
import ExperiencePage from "../components/ExperiencePage";
import SkillsPage from "../components/SkillsPage";
import ContactPage from "../components/ContactPage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const HomePage: React.FC = () => {
  return (
    <section className="home-page">
      <Navbar />
      <Hero
        mainHeadingClasses="your-main-heading-classes"
        additionalClass="your-additional-class"
      />
      <AboutPage />
      <ExperiencePage />
      <SkillsPage />
      <ContactPage />
      <Footer />
    </section>
  );
};

export default HomePage;
