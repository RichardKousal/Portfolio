import React from "react";
import userData from "../constants/data";
import Image from "next/image";
import AnimatedHeading from "../components/FramerComponent";
import { FaCheckCircle } from "react-icons/fa";

const AboutPage: React.FC = () => {
  return (
    <div
      id="about"
      className="min-h-screen bg-gray-300 dark:bg-gray-900 py-8"
      style={{ paddingTop: "50px" }}
    >
      <h1 className="text-4xl md:text-6xl font-bold py-8 sm:py-12 text-center md:text-left pl-4 z-20 lg:text-left lg:pl-20">
        About Me
      </h1>
      <div className="container mx-auto p-8 grid md:grid-cols-2 gap-8 items-center">
        <div className="relative h-full">
          <Image
            src={userData.aboutMePic}
            alt="Your Photo"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
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
                  <FaCheckCircle className="text-green-500 mr-2" />
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

const sections = [
  {
    title: "Quality Assurance",
    content:
      "Ensuring software quality and reliability through rigorous testing.",
  },
  {
    title: "Testing Philosophy",
    content:
      "Following a strong philosophy of ensuring software quality and reliability.",
  },
  {
    title: "Expertise",
    content:
      "Over three years of experience in writing tests according to best practices.",
  },
  {
    title: "Personal Motto",
    content: "Strive for excellence, one test at a time.",
  },
];
