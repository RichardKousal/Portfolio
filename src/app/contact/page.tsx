"use client";
import React, { useState } from "react";
import ContactForm from "../components/ContactForm";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
          Contact Me
        </h1>
        <div className="grid grid-cols-1 gap-8">
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
