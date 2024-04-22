"use client";
import React from "react";
import Image from "next/image";
import AnimatedHeading from "./FramerComponent";
import { FaArrowDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface CustomHeroProps {
  mainHeadingClasses: string;
  additionalClass: string;
}

export default function CustomHero({}: CustomHeroProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-300 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-5 py-20 md:py-32 flex justify-center items-start">
        <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-8 justify-center">
          <div className="md:mb-0">
            <div className="mb-0 md:mb-4 lg:mb-8 text-3xl font-bold text-neutral-800 dark:text-white">
              <AnimatedHeading
                animationProps={{
                  variants: {
                    hidden: { opacity: 0, x: 50 },
                    visible: { opacity: 1, x: 0 },
                  },
                  transition: { duration: 2.0, visible: 100 },
                }}
              >
                <h1>{t("hero.title")}</h1>
              </AnimatedHeading>
            </div>
            <div className="mb-0 text-3xl font-bold text-green-600 dark:text-green-500 md:mb-8">
              <AnimatedHeading
                animationProps={{
                  variants: {
                    hidden: { opacity: 0, x: 50 },
                    visible: { opacity: 1, x: 0 },
                  },
                  transition: { duration: 2.5, visible: 100 },
                }}
              >
                <h1>{t("hero.name")}</h1>
              </AnimatedHeading>
            </div>
            <p className="mb-6 text-gray-800 dark:text-white">
              {t("hero.intro")}
            </p>
            <div className="flex justify-center md:justify-start">
              <a href="#about">
                <button className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-700/75 p-4 font-semibold text-white hover:bg-red-700/75 p-4 relative overflow-hidden transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-500 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full">
                  <span className="flex items-center justify-center relative z-10">
                    {t("hero.button")} <FaArrowDown className="ml-2" />
                  </span>
                </button>
              </a>
            </div>
          </div>
          <div className="relative group flex justify-center">
            <Image
              src="/avatar2.png"
              alt="Avatar"
              width={400} // Zvětšená šířka obrázku
              height={533} // Poměr stran 3:4
              sizes="(max-width: 600px) 100vw, 600px" // Přidáno
              priority // Přidáno
              className="rounded-lg shadow-xl"
              style={{ width: "auto", height: "auto" }} // Přidáno
            />
          </div>
        </div>
      </div>
    </div>
  );
}
