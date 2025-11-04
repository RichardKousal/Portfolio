'use client';

import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/app/hooks/useScrollReveal';

export default function VisionSection() {
  const t = useTranslations('professional.vision');
  const { ref: boxRef, isVisible: boxVisible } = useScrollReveal();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-secondary relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-accent-purple/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div 
          ref={boxRef}
          className={`bg-gradient-to-br from-dark-accent/50 to-dark-secondary/50 rounded-lg p-8 border border-primary-500/30 
          shadow-2xl shadow-primary-500/20 hover:shadow-primary-500/40 transition-all duration-500
          backdrop-blur-sm hover:scale-[1.02] transform scroll-reveal-scale ${boxVisible ? 'visible' : ''}`}
        >
          <h2 className="text-3xl font-heading font-bold mb-6">
            <span className="gradient-text">{t('title')}</span>
          </h2>
          <p className="text-lg text-dark-text leading-relaxed italic relative pl-6">
            <span className="text-5xl text-primary-400 absolute -left-2 -top-2 opacity-50">&ldquo;</span>
            <span className="text-transparent bg-gradient-to-r from-primary-300 via-accent-cyan to-accent-emerald bg-clip-text">
              {t('text')}
            </span>
            <span className="text-5xl text-primary-400 absolute -right-2 -bottom-2 opacity-50">&rdquo;</span>
          </p>
        </div>
      </div>
    </section>
  );
}

