import React from "react";
import SkillsSection from "../components/SkillsSection";

interface Skill {
  name: string;
  level: number;
}

interface Section {
  title: string;
  skills: Skill[];
  backgroundColor: string;
}

const skillsData: Section[] = [
  {
    title: "Test Automation",
    skills: [
      { name: "Cypress", level: 7 },
      { name: "Playwright", level: 2 },
      { name: "Postman", level: 7 },
    ],
    backgroundColor: "bg-blue-700/75",
  },
  {
    title: "Quality Enhancement",
    skills: [
      { name: "CI/CD in DevOps", level: 3 },
      { name: "Git", level: 6 },
      { name: "Agile methodology", level: 7 },
    ],
    backgroundColor: "bg-green-700/75",
  },
  {
    title: "Soft Skills",
    skills: [
      { name: "Communication", level: 8 },
      { name: "Teamwork", level: 9 },
      { name: "Problem Solving", level: 8 },
      { name: "Time Management", level: 8 },
    ],
    backgroundColor: "bg-yellow-700/75",
  },
  {
    title: "Frontend Technologies",
    skills: [
      { name: "Next.js", level: 4 },
      { name: "Tailwind CSS", level: 4 },
      { name: "CSS", level: 5 },
      { name: "HTML", level: 5 },
    ],
    backgroundColor: "bg-indigo-700/75",
  },
  {
    title: "Programming Languages",
    skills: [
      { name: "TypeScript", level: 8 },
      { name: "JavaScript", level: 6 },
      { name: "SQL Knowledge", level: 7 },
    ],
    backgroundColor: "bg-red-700/75",
  },
  {
    title: "Languages",
    skills: [
      { name: "English", level: 5 },
      { name: "Czech", level: 10 },
      { name: "Polish", level: 10 },
    ],
    backgroundColor: "bg-purple-700/75",
  },
];

const SkillsPage: React.FC = () => {
  return (
    <div
      id="skills"
      className="min-h-screen bg-gray-300 dark:bg-gray-900 py-8"
      style={{ paddingTop: "50px" }}
    >
      <div className="mx-auto pt-2 relative z-0">
        <h1 className="text-4xl md:text-6xl font-bold py-8 sm:py-12 text-center md:text-left pl-4 z-20 lg:text-left lg:pl-20">
          {" "}
          Skills
        </h1>
      </div>
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 gap-8">
          <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {skillsData.map((section, index) => (
              <div
                key={section.title}
                className={`${section.backgroundColor} p-4 rounded-lg`}
              >
                <SkillsSection
                  title={section.title}
                  skills={section.skills}
                  backgroundColor={section.backgroundColor}
                />
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
