'use client';

import { useTranslations } from 'next-intl';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Image from 'next/image';

export default function SideHustle() {
  const t = useTranslations('personal.sideHustle');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-accent-emerald/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent-cyan/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="bg-gradient-to-br from-dark-secondary/80 to-dark-bg/80 rounded-lg overflow-hidden border border-accent-emerald/40 
          shadow-2xl shadow-accent-emerald/20 hover:shadow-accent-emerald/40 transition-all duration-500
          backdrop-blur-sm hover:scale-[1.01] transform animate-scale-in">
          
          <div className="flex flex-col lg:flex-row">
            {/* Image */}
            <div className="lg:w-2/5 relative h-64 lg:h-auto">
              <Image
                src="/lounge-1.webp"
                alt="Apartmány Iwona"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiMxYTFhMWEiLz48L3N2Zz4="
              />
            </div>
            
            {/* Content */}
            <div className="lg:w-3/5 p-8">
              <h2 className="text-3xl font-heading font-bold mb-4">
                <span className="bg-gradient-to-r from-accent-emerald to-accent-cyan bg-clip-text text-transparent">
                  {t('title')}
                </span>
              </h2>
              <a 
                href={`https://${t('link')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent-yellow hover:text-accent-orange transition-colors mb-6 text-lg font-medium group"
              >
                <span>{t('link')}</span>
                <FaExternalLinkAlt className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <p className="text-lg text-dark-muted leading-relaxed hover:text-dark-text transition-colors">
                {t('description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

