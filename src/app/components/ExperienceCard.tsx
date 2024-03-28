import React from "react";

interface ExperienceCardProps {
  title: string;
  title2: string;
  desc: string | JSX.Element;
  desc2: string | JSX.Element;
  year: string;
  company: string;
  company2: string;
  companyLink: string;
  companyLink2: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  title2,
  desc,
  desc2,
  year,
  company,
  company2,
  companyLink,
  companyLink2,
}) => {
  return (
    <div className="relative experience-card border p-4 rounded-md shadow-xl bg-white dark:bg-gray-800 z-10 mx-4">
      <h1 className="absolute -top-11 md:-left-10 md:-top-11 text-xl sm:text-4xl text-gray-500/50 font-bold dark:text-gray-400/75 p-">
        {year}
      </h1>
      <h1 className="font-semibold text-xl">{title}</h1>
      <a href={companyLink} className="text-gray-500">
        {company}
      </a>
      <div className="text-gray-600 dark:text-gray-400 my-2 sm:my-4">
        {desc}
      </div>

      <h1 className="font-semibold text-xl">{title2}</h1>
      <a href={companyLink2} className="text-gray-500">
        {company2}
      </a>
      <div className="text-gray-600 dark:text-gray-400 my-2 sm:my-4">
        {desc2}
      </div>
    </div>
  );
};

export default ExperienceCard;
