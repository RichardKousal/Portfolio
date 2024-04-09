import React from "react";
import userData from "../constants/data";
import ExperienceCard from "./ExperienceCard";

const Experience: React.FC = () => {
  return (
    <div
      id="experience"
      className="min-h-screen bg-gray-300 dark:bg-gray-900 py-8"
      style={{ paddingTop: "50px" }}
    >
      <div className="mx-auto pt-2 relative z-0">
        <h1 className="text-4xl md:text-6xl font-bold py-8 sm:py-12 text-center md:text-left pl-4 z-20 lg:text-left lg:pl-20">
          Experience
        </h1>
      </div>
      <div className="container mx-auto">
        <section className="rounded-lg p-4 sm:p-8 max-w-4xl w-full grid place-items-center">
          <div className="grid-cols-1 gap-7">
            {userData.experience.map((exp, idx) => (
              <div
                key={idx}
                className="relative z-0"
                style={{ maxWidth: "600px" }} // Nastaví maximální šířku dlaždic
              >
                <ExperienceCard
                  title={exp.title}
                  desc={exp.desc || ""}
                  year={exp.year}
                  company={exp.company}
                  companyLink={exp.companyLink}
                />
                {idx === userData.experience.length - 1 ? null : (
                  <div className="divider-container flex flex-col items-center -mt-2">
                    <div className="w-4 h-4 bg-green-600 dark:bg-green-500 rounded-full relative z-10">
                      <div className="w-4 h-4 bg-green-600 dark:bg-green-500 rounded-full relative z-10 animate-ping"></div>
                    </div>
                    <div className="w-0.5 h-10 bg-gray-900 dark:bg-gray-300 rounded-full -mt-1"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Experience;
