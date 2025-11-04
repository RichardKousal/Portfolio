'use client';

import { useTranslations, useMessages } from 'next-intl';
import { useScrollReveal } from '@/app/hooks/useScrollReveal';

interface SkillCategory {
  name: string;
  items: string[];
}

export default function SkillsPills() {
  const t = useTranslations('professional.skills');
  const messages = useMessages() as any;
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal();
  
  // Get categories data from messages
  const categoriesData = messages?.professional?.skills?.categories || [];
  
  const categories: SkillCategory[] = categoriesData.map((cat: any) => ({
    name: cat.name,
    items: cat.items || [],
  }));

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-cyan/5 rounded-full blur-3xl animate-float"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 
          ref={titleRef}
          className={`text-4xl font-heading font-bold mb-12 scroll-reveal ${titleVisible ? 'visible' : ''}`}
        >
          <span className="gradient-text">{t('title')}</span>
        </h2>

        <div className="space-y-8">
          {categories.map((category, index) => (
            <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <h3 className="text-xl font-heading font-semibold mb-4 text-transparent bg-gradient-to-r from-accent-emerald to-accent-cyan bg-clip-text">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.items.map((skill, idx) => {
                  const gradients = [
                    'from-primary-600 to-primary-400',
                    'from-accent-purple to-accent-pink',
                    'from-accent-cyan to-accent-emerald',
                    'from-accent-orange to-accent-yellow',
                  ];
                  const gradient = gradients[idx % gradients.length];
                  
                  return (
                    <span
                      key={idx}
                      className={`px-4 py-2 bg-gradient-to-r ${gradient} text-white rounded-full text-sm 
                        shadow-lg hover:scale-110 hover:rotate-2 transition-all duration-300 cursor-default
                        animate-scale-in`}
                      style={{ animationDelay: `${(index * 0.1) + (idx * 0.05)}s` }}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

