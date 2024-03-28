import React from "react";
import Image from "next/image";
import AnimatedHeading from "./FramerComponent";

interface CustomHeroProps {
  mainHeadingClasses: string;
  additionalClass: string;
}

export default function CustomHero({}: CustomHeroProps) {
  return (
    <div className="flex h-screen items-start justify-center bg-neutral-300 dark:bg-gray-900 p-5">
      <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-8 md:px-8">
        <div className="md:mb-8">
          <div className="mb-2 md:mb-4 lg:mb-8 text-3xl font-bold text-black dark:text-white">
            <AnimatedHeading
              animationProps={{
                variants: {
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0 },
                },
                transition: { duration: 2.0, visible: 100 },
              }}
            >
              <h1>Hi,</h1>
            </AnimatedHeading>
          </div>
          <div className="mb-2 text-3xl font-bold text-green-500 md:mb-8">
            <AnimatedHeading
              animationProps={{
                variants: {
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0 },
                },
                transition: { duration: 2.5, visible: 100 },
              }}
            >
              <h1>I&apos;m Richard Kousal</h1>
            </AnimatedHeading>
          </div>
          <p className="mb-6 text-gray-800 dark:text-white">
            As a Test Engineer, I have a strong passion for automated testing. I
            believe that automated testing is essential and has a unique place
            in the software development lifecycle.
          </p>
          <div className="hidden md:flex justify-center space-x-5">
            <a href="/about">
              <button className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-700/75 p-4 font-semibold text-white hover:bg-red-700/75 p-4 relative overflow-hidden transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-500 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full">
                <span className="flex items-center justify-center relative z-10 w-full h-full">
                  Learn more
                </span>
              </button>
            </a>
          </div>
        </div>
        <div className="relative group">
          <div className="flex justify-center">
            <Image
              src="/avatar2.png"
              alt="Avatar"
              width={300}
              height={400}
              layout="fixed"
              className="rounded-lg transition-transform transform group-hover:scale-105"
            />
          </div>
          <div className="md:hidden mt-4 flex justify-center">
            <a href="/about">
              <button className="flex items-center justify-center gap-2 rounded-full bg-blue-700/75 p-4 font-semibold text-white hover:bg-red-700/75 p-4 relative overflow-hidden transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-500 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full">
                <span className="flex items-center justify-center relative z-10 w-full h-full">
                  Learn more
                </span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
