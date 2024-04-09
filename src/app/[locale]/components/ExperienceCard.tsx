import React from "react";

interface ExperienceCardProps {
  title: string;
  desc: string | JSX.Element;
  year: string;
  company: string;
  companyLink: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  desc,
  year,
  company,
  companyLink,
}) => {
  return (
    <div className="relative experience-card flex flex-col justify-between border rounded-lg shadow-xl bg-gray-900 dark:bg-gray-900 z-10 mx-4 p-4 sm:p-6 flex-grow">
      <h1 className="text-lg sm:text-xl font-bold text-gray-200 mb-2">
        {year}
      </h1>
      <h1 className="font-semibold text-xl text-white mb-2">{title}</h1>
      <a
        href={companyLink}
        className="text-white hover:underline text-gray-300 mb-2"
      >
        {company}
      </a>
      <div className="text-white">{desc}</div>
    </div>
  );
};

export default ExperienceCard;
