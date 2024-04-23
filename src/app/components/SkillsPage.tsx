"use client";
import React from "react";
import SkillsSection from "../components/SkillsSection";
import { useTranslation } from "react-i18next";

const SkillsPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div
      id="skills"
      className="min-h-screen bg-gray-400/50 dark:bg-gray-800/75 py-8"
      style={{ paddingTop: "50px" }}
    >
      <div className="mx-auto pt-2 relative z-0">
        <h1 className="text-4xl md:text-6xl font-bold py-8 sm:py-12 text-center md:text-left pl-4 z-20 lg:text-left lg:pl-20">
          {" "}
          {t("skills.skills")}
        </h1>
      </div>
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 gap-8">
          <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-blue-700/75 p-4 rounded-lg">
              <SkillsSection
                title={t("skills.title1")}
                skills={[
                  { name: "Cypress", level: 7 },
                  { name: "Playwright", level: 2 },
                  { name: "Postman", level: 7 },
                ]}
                backgroundColor="bg-blue-700/75"
              />
            </div>
            <div className="bg-green-700/75 p-4 rounded-lg">
              <SkillsSection
                title={t("skills.title2")}
                skills={[
                  { name: "CI/CD DevOps", level: 3 },
                  { name: "Git", level: 6 },
                  { name: t("skillsDetail.agileMethodology"), level: 7 },
                ]}
                backgroundColor="bg-green-700/75"
              />
            </div>
            <div className="bg-yellow-700/75 p-4 rounded-lg">
              <SkillsSection
                title={t("skills.title3")}
                skills={[
                  { name: t("skillsDetail.communication"), level: 8 },
                  { name: t("skillsDetail.teamwork"), level: 9 },
                  { name: t("skillsDetail.problemSolving"), level: 8 },
                  { name: t("skillsDetail.timeManagement"), level: 8 },
                ]}
                backgroundColor="bg-yellow-700/75"
              />
            </div>
            <div className="bg-indigo-700/75 p-4 rounded-lg">
              <SkillsSection
                title={t("skills.title4")}
                skills={[
                  { name: "Next.js", level: 4 },
                  { name: "Tailwind CSS", level: 4 },
                  { name: "CSS", level: 5 },
                  { name: "HTML", level: 5 },
                ]}
                backgroundColor="bg-indigo-700/75"
              />
            </div>
            <div className="bg-red-700/75 p-4 rounded-lg">
              <SkillsSection
                title={t("skills.title5")}
                skills={[
                  { name: "TypeScript", level: 8 },
                  { name: "JavaScript", level: 6 },
                  { name: t("skillsDetail.SQLKnowledge"), level: 7 },
                ]}
                backgroundColor="bg-red-700/75"
              />
            </div>
            <div className="bg-purple-700/75 p-4 rounded-lg">
              <SkillsSection
                title={t("skills.title6")}
                skills={[
                  { name: t("skillsDetail.english"), level: 5 },
                  { name: t("skillsDetail.czech"), level: 10 },
                  { name: t("skillsDetail.polish"), level: 10 },
                ]}
                backgroundColor="bg-purple-700/75"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
