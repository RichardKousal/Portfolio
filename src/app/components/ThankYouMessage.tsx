"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const ThankYouMessage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative">
      <div className="absolute inset-0">
        <Image
          src="/confirmation-background.jpeg"
          alt="Thank you background"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
      </div>
      <div className="z-10 relative text-white max-w-screen-sm mx-auto text-center">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
          {t("thankYou.title")}
        </h1>
        <p className="text-base mt-4 sm:text-xs md:text-xl lg:text-2xl">
          {t("thankYou.message")}
        </p>
        <p className="text-base md:text-xl lg:text-2xl">
          {t("thankYou.response")}
        </p>

        <div className="mt-8">
          <Link href="/">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              {t("thankYou.backToHome")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYouMessage;
