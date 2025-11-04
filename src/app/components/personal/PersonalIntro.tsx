"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function PersonalIntro() {
  const t = useTranslations("personal.intro");

  return (
    <section
      data-testid="personal-intro-section"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Animated background orbs */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-accent-orange/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-10 right-10 w-72 h-72 bg-accent-pink/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Avatar */}
          <div className="flex-shrink-0 animate-scale-in">
            <div
              className="relative h-64 sm:h-72 lg:h-80 rounded-2xl overflow-hidden 
              bg-dark-secondary/50
              border-4 border-accent-orange/50 shadow-2xl shadow-accent-orange/30 
              hover:border-accent-pink/70 transition-all duration-300 hover:scale-105"
            >
              <Image
                src="/avatar3.webp"
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 lg:mb-8 animate-fade-in">
              <span className="bg-gradient-to-r from-accent-pink via-accent-orange to-accent-yellow bg-clip-text text-transparent">
                {t("title")}
              </span>
            </h1>
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-orange to-accent-yellow 
                  text-white font-medium rounded-lg shadow-lg shadow-accent-orange/30 
                  hover:shadow-accent-orange/50 hover:scale-105 transition-all duration-300"
              >
                <FaLinkedin className="w-5 h-5" />
                <span>{t("btnLinkedIn")}</span>
              </a>

              <a
                href="mailto:richard.kousal@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-pink to-accent-purple 
                  text-white font-medium rounded-lg shadow-lg shadow-accent-pink/30 
                  hover:shadow-accent-pink/50 hover:scale-105 transition-all duration-300"
              >
                <FaEnvelope className="w-5 h-5" />
                <span>{t("btnContact")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
