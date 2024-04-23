import React from "react";
import userData from "../constants/data";
import Image from "next/image";
import AnimatedHeading from "../components/FramerComponent";
import { FaCheckCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  const sections = [
    {
      title: t("about.title1"),
      content: t("about.title1Value"),
    },
    {
      title: t("about.title2"),
      content: t("about.title2Value"),
    },
    {
      title: t("about.title3"),
      content: t("about.title3Value"),
    },
    {
      title: t("about.title4"),
      content: t("about.title4Value"),
    },
  ];

  return (
    <div
      id="about"
      className="min-h-screen bg-gray-400/50 dark:bg-gray-800/75 py-8"
      style={{ paddingTop: "50px" }}
    >
      <h1 className="text-4xl md:text-6xl font-bold py-14 sm:py-20 text-center md:text-left pl-6 pr-6 md:pl-20 md:pr-20 z-20">
        {t("about.aboutMe")}
      </h1>
      <div className="container mx-auto p-8 grid md:grid-cols-2 gap-8 items-center">
        <div className="relative h-full">
          <Image
            src={userData.aboutMePic}
            alt="Your Photo"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
            priority={true}
          />
        </div>
        <div>
          {sections.map((section, index) => (
            <section key={index} className="mb-8">
              <AnimatedHeading
                animationProps={{
                  variants: {
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                  },
                  transition: { duration: 1.0, delay: index * 0.5 },
                }}
              >
                <h2 className="text-3xl font-bold mb-4">{section.title}</h2>

                <div className="flex items-center mb-4">
                  <div>
                    <FaCheckCircle className="text-green-500 mr-2" />
                  </div>
                  <p className="text-lg text-gray-800 dark:text-gray-200 break-words">
                    {section.content}
                  </p>
                </div>
              </AnimatedHeading>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
