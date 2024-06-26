"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FaArrowDown } from "react-icons/fa";

const ContactForm: React.FC = () => {
  const router = useRouter();
  const { i18n } = useTranslation();

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

        router.push(`/${i18n.language}/thank-you`);
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const { t } = useTranslation();
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
              errors.name = t("contact.validations.name");
            }
            if (!values.email) {
              errors.email = t("contact.validations.email");
            } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
              errors.email = t("contact.validations.invalidEmail");
            }
            if (!values.subject) {
              errors.subject = t("contact.validations.subject");
            }

            if (!values.message) {
              errors.message = t("contact.validations.message");
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
                {t("contact.labels.name")}
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
                {t("contact.labels.email")}
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
                {t("contact.labels.subject")}
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
                {t("contact.labels.phoneNumber")}
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
                {t("contact.labels.message")}
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
              className="w-full text-white bg-blue-700/75 hover:bg-red-700/75 p-4 relative overflow-hidden transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-500 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full font-semibold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600"
            >
              <span className="flex items-center justify-center relative z-10">
                {t("contact.actions.submit")} <FaArrowDown className="ml-2" />
              </span>
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ContactForm;
