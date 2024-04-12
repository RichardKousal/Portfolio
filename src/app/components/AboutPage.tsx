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
      className="min-h-screen bg-gray-300 dark:bg-gray-900 py-8"
      style={{ paddingTop: "50px" }}
    >
      <h1 className="text-4xl md:text-6xl font-bold py-8 sm:py-12 text-center md:text-left pl-4 z-20 lg:text-left lg:pl-20">
        {t("about.aboutMe")}
      </h1>
      <div className="container mx-auto p-8 grid md:grid-cols-2 gap-8 items-center">
        <div className="relative h-full">
          <Image
            src={userData.aboutMePic}
            alt="Your Photo"
            width={600} // specify the width
            height={600} // specify the height
            className="rounded-lg object-cover" // use className instead of objectFit
            sizes="(max-width: 600px) 100vw, 600px"
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
                  transition: { duration: 2.0, visible: 100 },
                  delay: index * 1000,
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
