import React from "react";
import userData from "../constants/data";
import ExperienceCard from "../components/ExperienceCard";
import Link from "next/link";

const Experience: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-800 relative">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-9xl font-bold py-8 sm:py-24 text-center md:text-left z-10">
          Experience
        </h1>
      </div>
      <div className="bg-[#F1F1F1] dark:bg-gray-900 -mt-4">
        <div className="grid grid-cols-1 dark:bg-gray-900 max-w-xl mx-auto pt-20 relative z-0">
          {userData.experience.map((exp, idx) => (
            <React.Fragment key={idx}>
              <ExperienceCard
                title={exp.title}
                title2={exp.title2 || ""}
                desc={exp.desc || ""}
                desc2={exp.desc2 || ""}
                year={exp.year}
                company={exp.company}
                company2={exp.company2 || ""}
                companyLink={exp.companyLink}
                companyLink2={exp.companyLink2 || ""}
              />
              {idx === userData.experience.length - 1 ? null : (
                <div className="divider-container flex flex-col items-center -mt-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full relative z-10">
                    <div className="w-4 h-4 bg-green-500 rounded-full relative z-10 animate-ping"></div>
                  </div>
                  <div className="w-1 h-24 bg-gray-300 dark:bg-gray-500 rounded-full -mt-2"></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="fixed bottom-4 right-4 z-50">
        <Link href="/skills">
          <button className="h-16 w-16 bg-blue-700/75 rounded-full flex items-center justify-center text-white font-semibold hover:bg-red-700/75 transition-all relative z-10 md:h-20 md:w-20">
            <span className="hidden md:block">My Skills</span>
            <span className="md:hidden">Skills</span>
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Experience;
