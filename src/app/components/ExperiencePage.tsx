"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const Experience: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div
      id="experience"
      className="min-h-screen bg-gray-300/50 dark:bg-gray-950 py-8"
      style={{ paddingTop: "50px" }}
    >
      <div className="mx-auto pt-2 relative z-0">
        <h1 className="text-4xl md:text-6xl font-bold py-14 sm:py-20 text-center md:text-left pl-6 pr-6 md:pl-20 md:pr-20 z-20">
          {t("experience.experience")}
        </h1>
      </div>
      <div className="container mx-auto">
        <section className="rounded-lg p-4 sm:p-8 max-w-4xl w-full grid place-items-center">
          <div className="grid grid-cols-1 gap-7 w-full md:w-96 lg:w-128">
            <div className="flex flex-col items-center">
              <div className="relative experience-card flex flex-col justify-between border rounded-lg shadow-xl bg-gray-900 dark:bg-gray-900 z-10 mx-4 p-4 sm:p-6 min-w-full md:min-w-96 lg:min-w-128 h-72">
                <div className="content-container h-64">
                  <h1 className="text-lg sm:text-xl font-bold text-gray-200 mb-2">
                    {t("experience.years.year1")}
                  </h1>
                  <h1 className="font-semibold text-xl text-white mb-2">
                    {t("experience.titles.title1")}
                  </h1>
                  <a
                    href="https://www.idodo.cz/"
                    className="text-white hover:underline text-gray-300 mb-2"
                  >
                    DODO
                  </a>
                  <ul className="list-disc list-outside text-white dark:text-gray-200 text-sm my-4 ml-4">
                    <li className="text-white hover:text-green-500 ">
                      {t("experience.descriptions.desc1.item1")}
                    </li>
                    <li className="text-white hover:text-green-500 ">
                      {t("experience.descriptions.desc1.item2")}
                    </li>
                    <li className="text-white hover:text-green-500 ">
                      {t("experience.descriptions.desc1.item3")}
                    </li>
                    <li className="text-white hover:text-green-500 ">
                      {t("experience.descriptions.desc1.item4")}
                    </li>
                    <li className="text-white hover:text-green-500 ">
                      {t("experience.descriptions.desc1.item5")}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="divider-container flex flex-col items-center -mt-2">
                <div className="w-4 h-4 bg-green-600 dark:bg-green-500 rounded-full relative z-10">
                  <div className="w-4 h-4 bg-green-600 dark:bg-green-500 rounded-full relative z-10 animate-ping"></div>
                </div>
                <div className="w-0.5 h-10 bg-gray-900 dark:bg-gray-300 rounded-full -mt-1"></div>
              </div>
              <div className="relative experience-card flex flex-col justify-between border rounded-lg shadow-xl bg-gray-900 dark:bg-gray-900 z-10 mx-4 p-4 sm:p-6 min-w-full md:min-w-96 lg:min-w-128 h-72">
                <div className="content-container h-64">
                  <h1 className="text-lg sm:text-xl font-bold text-gray-200 mb-2">
                    {t("experience.years.year2")}
                  </h1>
                  <h1 className="font-semibold text-xl text-white mb-2">
                    {t("experience.titles.title2")}
                  </h1>
                  <a
                    href="https://www.idodo.cz/"
                    className="text-white hover:underline text-gray-300 mb-2"
                  >
                    DODO
                  </a>
                  <ul className="list-disc list-outside text-white dark:text-gray-200 text-sm my-4 ml-4">
                    <li className="text-white hover:text-green-500 ">
                      {t("experience.descriptions.desc2.item1")}
                    </li>
                    <li className="text-white hover:text-green-500 ">
                      {t("experience.descriptions.desc2.item2")}
                    </li>
                    <li className="text-white hover:text-green-500 ">
                      {t("experience.descriptions.desc2.item3")}
                    </li>
                    <li className="text-white hover:text-green-500 ">
                      {t("experience.descriptions.desc2.item4")}
                    </li>
                    <li className="text-white hover:text-green-500 ">
                      {t("experience.descriptions.desc2.item5")}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="divider-container flex flex-col items-center -mt-2">
                <div className="w-4 h-4 bg-green-600 dark:bg-green-500 rounded-full relative z-10">
                  <div className="w-4 h-4 bg-green-600 dark:bg-green-500 rounded-full relative z-10 animate-ping"></div>
                </div>
                <div className="w-0.5 h-10 bg-gray-900 dark:bg-gray-300 rounded-full -mt-1"></div>
                <div className="relative experience-card flex flex-col justify-between border rounded-lg shadow-xl bg-gray-900 dark:bg-gray-900 z-10 mx-4 p-4 sm:p-6 min-w-full md:min-w-96 lg:min-w-128 h-72">
                  <div className="content-container h-64">
                    <h1 className="text-lg sm:text-xl font-bold text-gray-200 mb-2">
                      {t("experience.years.year3")}
                    </h1>
                    <h1 className="font-semibold text-xl text-white mb-2">
                      {t("experience.titles.title3")}
                    </h1>
                    <a
                      href="https://www.tesena.com/cypressio-bootcamp"
                      className="text-white hover:underline text-gray-300 mb-2"
                    >
                      Cypress.io
                    </a>
                    <ul className="list-disc list-outside text-white dark:text-gray-200 text-sm my-4 ml-4">
                      <li className="text-white hover:text-green-500 ">
                        {t("experience.descriptions.desc3.item1")}
                      </li>
                      <li className="text-white hover:text-green-500 ">
                        {t("experience.descriptions.desc3.item2")}
                      </li>
                      <li className="text-white hover:text-green-500 ">
                        {t("experience.descriptions.desc3.item3")}
                      </li>
                      <li className="text-white hover:text-green-500 ">
                        {t("experience.descriptions.desc3.item4")}
                      </li>
                      <li className="text-white hover:text-green-500 ">
                        {t("experience.descriptions.desc3.item5")}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="divider-container flex flex-col items-center -mt-2">
                  <div className="w-4 h-4 bg-green-600 dark:bg-green-500 rounded-full relative z-10">
                    <div className="w-4 h-4 bg-green-600 dark:bg-green-500 rounded-full relative z-10 animate-ping"></div>
                  </div>
                  <div className="w-0.5 h-10 bg-gray-900 dark:bg-gray-300 rounded-full -mt-1"></div>
                  <div className="relative experience-card flex flex-col justify-between border rounded-lg shadow-xl bg-gray-900 dark:bg-gray-900 z-10 mx-4 p-4 sm:p-6 min-w-full md:min-w-96 lg:min-w-128 h-72">
                    <div className="content-container h-64">
                      <h1 className="text-lg sm:text-xl font-bold text-gray-200 mb-2">
                        {t("experience.years.year4")}
                      </h1>
                      <h1 className="font-semibold text-xl text-white mb-2">
                        {t("experience.titles.title4")}
                      </h1>
                      <a
                        href="https://www.idodo.cz/"
                        className="text-white hover:underline text-gray-300 mb-2"
                      >
                        DODO
                      </a>
                      <ul className="list-disc list-outside text-white dark:text-gray-200 text-sm my-4 ml-4">
                        <li className="text-white hover:text-green-500 ">
                          {t("experience.descriptions.desc4.item1")}
                        </li>
                        <li className="text-white hover:text-green-500 ">
                          {t("experience.descriptions.desc4.item2")}
                        </li>
                        <li className="text-white hover:text-green-500 ">
                          {t("experience.descriptions.desc4.item3")}
                        </li>
                        <li className="text-white hover:text-green-500 ">
                          {t("experience.descriptions.desc4.item4")}
                        </li>
                        <li className="text-white hover:text-green-500 ">
                          {t("experience.descriptions.desc4.item5")}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Experience;
