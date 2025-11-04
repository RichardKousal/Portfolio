'use client';

import { useTranslations, useMessages } from 'next-intl';
import { useScrollReveal } from '@/app/hooks/useScrollReveal';

interface TimelineItem {
  role: string;
  company: string;
  period: string;
  responsibilities: string[];
}

export default function ExperienceTimeline() {
  const t = useTranslations('professional.experience');
  const messages = useMessages() as any;
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  
  // Get timeline data from messages
  const timelineData = messages?.professional?.experience?.timeline || [];
  
  const timeline: TimelineItem[] = timelineData.map((item: any) => ({
    role: item.role,
    company: item.company,
    period: item.period,
    responsibilities: item.responsibilities || [],
  }));

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-secondary relative">
      <div className="max-w-4xl mx-auto">
        <h2 
          ref={titleRef}
          className={`text-4xl font-heading font-bold mb-12 scroll-reveal ${titleVisible ? 'visible' : ''}`}
        >
          <span className="gradient-text">{t('title')}</span>
        </h2>

        <div className="relative">
          {/* Vertical line with gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 via-accent-purple to-accent-pink ml-2 rounded-full" />

          {/* Timeline items */}
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <div key={index} className="relative pl-10 group animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                {/* Dot with pulse effect */}
                <div className="absolute left-0 top-2 w-5 h-5 rounded-full bg-gradient-to-r from-primary-500 to-accent-purple border-4 border-dark-bg animate-pulse" />

                {/* Content */}
                <div className="bg-dark-bg rounded-lg p-6 border border-primary-500/30 hover:border-primary-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/20 hover:scale-[1.02] transform">
                  <h3 className="text-2xl font-heading font-bold text-transparent bg-gradient-to-r from-primary-300 to-accent-cyan bg-clip-text mb-1">
                    {item.role}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-primary-400 font-medium">{item.company}</span>
                    <span className="text-dark-muted">•</span>
                    <span className="text-dark-muted text-sm">{item.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {item.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-dark-muted flex items-start hover:text-dark-text transition-colors">
                        <span className="text-primary-400 mr-2">▸</span>
                        <span dangerouslySetInnerHTML={{ __html: resp }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

