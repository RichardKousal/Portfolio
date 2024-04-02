import React from "react";
import ContactForm from "../components/ContactForm";

const ContactPage: React.FC = () => {
  return (
    <div
      id="contact"
      className="min-h-screen bg-gray-300 dark:bg-gray-900 py-8"
      style={{ paddingTop: "50px" }}
    >
      <div className="mx-auto pt-2 relative z-0">
        <h1 className="text-4xl md:text-6xl font-bold py-8 sm:py-12 text-center md:text-left pl-4 z-20 lg:text-left lg:pl-20">
          Contact Me
        </h1>
      </div>

      <div className="mx-auto  p-4 mt-4 border-gray-400 rounded-lg">
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactPage;
