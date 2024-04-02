import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const ContactForm: React.FC = () => {
  const onSubmit = async (values: any, actions: any) => {
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        console.log("Email sent successfully");
        actions.resetForm();
        window.location.href = "/thank-you"; // Přesměrování na klientské straně
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      <div className="border border-black dark:border-gray-700 p-8 rounded-md">
        <Formik
          initialValues={{
            name: "",
            email: "",
            subject: "",
            phoneNumber: "",
            message: "",
          }}
          validate={(values: {
            name: string;
            email: string;
            subject: string;
            phoneNumber: string;
            message: string;
          }) => {
            const errors: any = {};
            if (!values.name) {
              errors.name = "This field is required";
            }
            if (!values.email) {
              errors.email = "This field is required";
            } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
              errors.email = "Invalid email address";
            }
            if (!values.subject) {
              errors.subject = "This field is required";
            }
            if (
              values.phoneNumber &&
              !/^\+?\d{3} \d{3} \d{3} \d{3}$/.test(values.phoneNumber)
            ) {
              errors.phoneNumber =
                "Invalid phone number format (e.g. +xxx xxx xxx xxx)";
            }
            if (!values.message) {
              errors.message = "This field is required";
            }
            return errors;
          }}
          onSubmit={onSubmit}
        >
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block font-semibold text-gray-800 dark:text-gray-200"
              >
                Your Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
              />
              <ErrorMessage
                name="name"
                component="span"
                className="text-red-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block font-semibold text-gray-800 dark:text-gray-200"
              >
                Your Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
              />
              <ErrorMessage
                name="email"
                component="span"
                className="text-red-500"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block font-semibold text-gray-800 dark:text-gray-200"
              >
                Subject
              </label>
              <Field
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
              />
              <ErrorMessage
                name="subject"
                component="span"
                className="text-red-500"
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block font-semibold text-gray-800 dark:text-gray-200"
              >
                Phone Number (optional)
              </label>
              <Field
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
              />
              <ErrorMessage
                name="phoneNumber"
                component="span"
                className="text-red-500"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block font-semibold text-gray-800 dark:text-gray-200"
              >
                Message
              </label>
              <Field
                as="textarea"
                id="message"
                name="message"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-gray-300"
                rows={4}
              />
              <ErrorMessage
                name="message"
                component="span"
                className="text-red-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ContactForm;
