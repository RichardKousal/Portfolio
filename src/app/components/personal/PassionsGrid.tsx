'use client';

import { useTranslations, useMessages } from 'next-intl';

export default function PassionsGrid() {
  const t = useTranslations('personal.passions');
  const messages = useMessages() as any;
  
  const categories = messages?.personal?.passions?.categories || [];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-secondary relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-accent-emerald/5 rounded-full blur-3xl animate-float"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl font-heading font-bold mb-12 animate-fade-in">
          <span className="gradient-text">{t('title')}</span>
        </h2>

        <div className="space-y-8">
          {categories.map((category: any, index: number) => {
            const gradients = [
              'from-accent-pink to-accent-orange',
              'from-primary-500 to-accent-cyan',
              'from-accent-purple to-accent-pink',
            ];
            const gradient = gradients[index % gradients.length];
            
            return (
              <div
                key={index}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <h3 className={`text-2xl font-heading font-semibold mb-4 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                  {category.name}
                </h3>
                
                {/* If category has description, render it as text */}
                {category.description && (
                  <p className="text-lg text-dark-muted leading-relaxed">
                    {category.description}
                  </p>
                )}
                
                {/* If category has items, render them as pills */}
                {category.items && (
                  <div className="flex flex-wrap gap-3">
                    {category.items.map((item: string, idx: number) => {
                      return (
                        <span
                          key={idx}
                          className={`px-4 py-2 bg-gradient-to-r ${gradient} text-white rounded-full text-sm 
                            shadow-lg hover:scale-110 hover:rotate-2 transition-all duration-300 cursor-default
                            animate-scale-in`}
                          style={{ animationDelay: `${(index * 0.2) + (idx * 0.05)}s` }}
                        >
                          {item}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

