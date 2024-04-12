"use client";
import React from "react";

interface Skill {
  name: string;
  level: number;
}

interface SkillsSectionProps {
  title: string;
  skills: Skill[];
  backgroundColor?: string;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  title,
  skills,
  backgroundColor,
}) => {
  return (
    <div className={`mb-1 ${backgroundColor ? `bg-${backgroundColor}` : ""}`}>
      <div className="mb-1">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <div className="grid grid-cols-3">
          {skills.map((skill) => (
            <React.Fragment key={skill.name}>
              <div className="col-span-2 flex items-center">
                <span className="mr-2 flex-grow">{skill.name}</span>
              </div>
              <div className="flex items-center">
                <div className="relative h-3 w-full">
                  <div className="absolute top-0 left-0 w-full h-full bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-neutral-800 dark:bg-blue-400 rounded-full"
                      style={{ width: `${skill.level * 10}%` }}
                    />
                  </div>
                </div>
                <span className="ml-2" style={{ minWidth: "1.5rem" }}>
                  {skill.level}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
