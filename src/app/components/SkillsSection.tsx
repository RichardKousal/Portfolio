"use client";
import React, { useState } from "react";

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
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div className={`mb-8 ${backgroundColor ? `bg-${backgroundColor}` : ""}`}>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="mb-2 flex items-center"
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            <span className="mr-2 flex-grow">{skill.name}</span>
            <div className="relative flex-grow-0 h-3 w-1/2">
              <div className="absolute top-0 left-0 w-full h-full bg-gray-300 dark:bg-gray-700 rounded-full" />
              <div
                className="absolute top-0 left-0 h-full bg-blue-600 dark:bg-blue-300 rounded-full"
                style={{
                  width: `${
                    hoveredSkill === skill.name ? 0 : skill.level * 10
                  }%`,
                  transition: "width 0.5s ease-in-out",
                }}
              />
            </div>
            <span className="ml-2" style={{ minWidth: "1.5rem" }}>
              {skill.level}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;
