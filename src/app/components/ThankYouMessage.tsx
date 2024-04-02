"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const ThankYouMessage: React.FC = () => {
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
          Thank You!
        </h1>
        <p className="text-base mt-4 sm:text-xs md:text-xl lg:text-2xl">
          Your message has been successfully sent.
        </p>
        <p className="text-base md:text-xl lg:text-2xl">
          I&apos;ll get back to you soon!
        </p>

        <div className="mt-8">
          <Link href="/">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYouMessage;
