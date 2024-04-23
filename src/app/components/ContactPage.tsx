"use client";
import React from "react";
import ContactForm from "../components/ContactForm";
import { useTranslation } from "react-i18next";

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div
      id="contact"
      className="min-h-screen bg-gray-300/50 dark:bg-gray-950 py-8"
      style={{ paddingTop: "50px" }}
    >
      <div className="mx-auto pt-2 relative z-0">
        <h1 className="text-4xl md:text-6xl font-bold py-14 sm:py-20 text-center md:text-left pl-6 md:pl-20 z-20">
          {" "}
          {/* Adjusted padding and text alignment here */}
          {t("contact.contact")}
        </h1>
      </div>

      <div className="mx-auto  p-4 mt-4 border-gray-400 rounded-lg">
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactPage;
