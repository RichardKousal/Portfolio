import React from "react";
import userData from "../constants/data";
import Image from "next/image";
import AnimatedHeading from "../components/FramerComponent";
import Link from "next/link";

const AboutMe: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900">
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <section className="mb-8">
              <Image
                src={userData.aboutMePic}
                alt="Your Photo"
                layout="responsive"
                width={1920}
                height={1080}
                className="rounded-lg"
              />
            </section>
          </div>
          <div>
            <section className="mb-8">
              <AnimatedHeading
                animationProps={{
                  variants: {
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                  },
                  transition: { duration: 2.0, visible: 100 },
                }}
              >
                <h2 className="text-3xl font-bold mb-4">
                  Quality Assurance Approach
                </h2>
                <p className="text-lg text-gray-800 dark:text-gray-200 mb-4">
                  In my role as a Test Engineer, I adhere to a robust philosophy
                  of ensuring software quality and reliability. I firmly believe
                  in the potency of rigorous testing to pinpoint and resolve
                  potential issues, ensuring that the final product attains the
                  highest standards of performance.
                </p>
              </AnimatedHeading>
            </section>
            <section className="mb-8">
              <AnimatedHeading
                animationProps={{
                  variants: {
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                  },
                  transition: { duration: 2.0, visible: 100 },
                  delay: 1000,
                }}
              >
                <h2 className="text-3xl font-bold mb-4">Testing Philosophy</h2>
                <p className="text-lg text-gray-800 dark:text-gray-200 mb-4">
                  In my journey as a Test Engineer, I follow a strong philosophy
                  of ensuring software quality and reliability. I believe in the
                  power of rigorous testing to help identify and resolve
                  potential issues and ensure that the final product meets the
                  highest standards of performance.
                </p>
              </AnimatedHeading>
            </section>
            <section className="mb-8">
              <AnimatedHeading
                animationProps={{
                  variants: {
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                  },
                  transition: { duration: 2.0, visible: 100 },
                  delay: 2000,
                }}
              >
                <h2 className="text-3xl font-bold mb-4">Expertise</h2>
                <p className="text-lg text-gray-800 dark:text-gray-200 mb-4">
                  With over three years of experience in the testing field, I
                  have worked on various projects in a logistics and technology
                  company, gaining skills in writing tests according to best
                  practices.
                </p>
              </AnimatedHeading>
            </section>
            <section className="mb-8">
              <AnimatedHeading
                animationProps={{
                  variants: {
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                  },
                  transition: { duration: 2.0, visible: 100 },
                  delay: 3000,
                }}
              >
                <h2 className="text-3xl font-bold mb-4">Personal Motto</h2>
                <p className="text-lg text-gray-800 dark:text-gray-200 mb-4">
                  Strive for excellence, one test at a time. Testing is not just
                  a task, it is a commitment to deliver quality and reliability
                  in every software journey.
                </p>
              </AnimatedHeading>
            </section>
            <section>
              <div className="text-center">
                <Link href="/experience">
                  <button className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-700/75 p-4 font-semibold text-white hover:bg-red-700/75 p-4 relative overflow-hidden transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-500 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full">
                    <span className="flex items-center justify-center relative z-10">
                      Explore My Experience
                    </span>
                  </button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
