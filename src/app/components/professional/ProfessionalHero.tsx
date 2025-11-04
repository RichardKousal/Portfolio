"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Image from "next/image";
import { FaLinkedin, FaDownload, FaEnvelope } from "react-icons/fa";
import { analytics } from "@/app/lib/analytics";

export default function ProfessionalHero() {
  const t = useTranslations("professional.hero");
  const locale = useLocale();

  return (
    <section
      data-testid="professional-hero-section"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-20 left-20 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Avatar */}
          <div className="flex-shrink-0 animate-scale-in">
            <div
              className="relative h-64 sm:h-72 lg:h-80 rounded-2xl overflow-hidden 
              bg-dark-secondary/50
              border-4 border-primary-500/50 shadow-2xl shadow-primary-500/30 
              hover:border-primary-400/70 transition-all duration-300 hover:scale-105"
            >
              <Image
                src="/avatar.webp"
                alt="Richard Kousal"
                width={256}
                height={320}
                className="h-full w-auto object-contain"
                priority
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjMyMCIgdmlld0JveD0iMCAwIDI1NiAzMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjI1NiIgaGVpZ2h0PSIzMjAiIGZpbGw9IiMxYTFhMWEiLz48L3N2Zz4="
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold mb-4 animate-fade-in">
              <span className="gradient-text">{t("title")}</span>
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading mb-6 lg:mb-8 animate-slide-up bg-gradient-to-r from-primary-400 to-accent-cyan bg-clip-text text-transparent">
              {t("subtitle")}
            </h2>
            <p
              className="text-base sm:text-lg lg:text-xl text-dark-muted leading-relaxed animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              {t("description")}
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <a
                href="https://www.linkedin.com/in/richard-kousal"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.socialClick("linkedin")}
                data-testid="btn-linkedin-professional"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 
                  text-white font-medium rounded-lg shadow-lg shadow-primary-500/30 
                  hover:shadow-primary-500/50 hover:scale-105 transition-all duration-300"
              >
                <FaLinkedin className="w-5 h-5" />
                <span>{t("btnLinkedIn")}</span>
              </a>

              <a
                href="mailto:richard.kousal@gmail.com"
                onClick={() => analytics.socialClick("email")}
                data-testid="btn-email-professional"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-cyan to-accent-emerald 
                  text-white font-medium rounded-lg shadow-lg shadow-accent-cyan/30 
                  hover:shadow-accent-cyan/50 hover:scale-105 transition-all duration-300"
              >
                <FaEnvelope className="w-5 h-5" />
                <span>{t("btnContact")}</span>
              </a>

              {/* CV tlačítko - dynamicky generované */}
              <a
                href={`/api/generate-cv?locale=${locale}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.cvDownload(locale)}
                data-testid="btn-download-cv"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-purple to-accent-pink 
                  text-white font-medium rounded-lg shadow-lg shadow-accent-purple/30 
                  hover:shadow-accent-purple/50 hover:scale-105 transition-all duration-300"
              >
                <FaDownload className="w-5 h-5" />
                <span>{t("btnDownloadCV")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
