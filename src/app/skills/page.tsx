import React from "react";
import SkillsSection from "../components/SkillsSection";
import Link from "next/link";
import Image from "next/image";

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
    backgroundColor: "bg-blue-400",
  },
  {
    title: "Quality Enhancement",
    skills: [
      { name: "CI/CD in Azure DevOps", level: 3 },
      { name: "Git", level: 6 },
      { name: "Agile methodology", level: 7 },
    ],
    backgroundColor: "bg-green-500 dark:bg-green-700",
  },
  {
    title: "Soft Skills",
    skills: [
      { name: "Communication", level: 8 },
      { name: "Teamwork", level: 9 },
      { name: "Problem Solving", level: 8 },
      { name: "Time Management", level: 8 },
    ],
    backgroundColor: "bg-yellow-500 dark:bg-yellow-700",
  },
  {
    title: "Programming Languages",
    skills: [
      { name: "TypeScript", level: 8 },
      { name: "JavaScript", level: 6 },
      { name: "SQL Knowledge", level: 7 },
    ],
    backgroundColor: "bg-red-500 dark:bg-red-700",
  },
  {
    title: "Languages",
    skills: [
      { name: "English", level: 5 },
      { name: "Czech", level: 10 },
      { name: "Polish", level: 10 },
    ],
    backgroundColor: "bg-purple-400",
  },
  {
    title: "Frontend Technologies",
    skills: [
      { name: "Next.js", level: 4 },
      { name: "Tailwind CSS", level: 4 },
      { name: "CSS", level: 5 },
      { name: "HTML", level: 5 },
    ],
    backgroundColor: "bg-indigo-400",
  },
];

const SkillsPage: React.FC = () => {
  return (
    <section className="bg-gray-200 dark:bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-9xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
          Skills
        </h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
        </div>
      </div>
      <div className="text-center mt-8">
        <Link href="/contact">
          <button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold py-2 px-4 rounded-full transform transition-transform hover:scale-110 focus:outline-none">
            Get in Touch
          </button>
        </Link>
      </div>
    </section>
  );
};

export default SkillsPage;
