'use client';

import { useTranslations } from 'next-intl';

interface ViewToggleProps {
  view: 'professional' | 'personal';
  onViewChange: (view: 'professional' | 'personal') => void;
}

export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  const t = useTranslations('header');

  return (
    <div className="relative flex items-center bg-dark-secondary rounded-lg p-1 border border-accent-pink/30 shadow-lg" data-testid="view-toggle-container">
      {/* Background slider */}
      <div
        className={`
          absolute top-1 bottom-1 w-[calc(50%-4px)] 
          bg-gradient-to-r from-accent-pink to-accent-orange rounded-md transition-all duration-300 ease-in-out
          shadow-lg shadow-accent-pink/50 animate-glow
          ${view === 'professional' ? 'left-1' : 'left-[calc(50%+4px-1px)]'}
        `}
      />
      
      {/* Professional button */}
      <button
        data-testid="toggle-professional"
        onClick={() => onViewChange('professional')}
        className={`
          relative z-10 px-4 md:px-5 py-2 text-sm md:text-base font-medium rounded transition-all transform
          ${view === 'professional' ? 'text-white scale-105' : 'text-dark-muted hover:text-white hover:scale-105'}
        `}
      >
        {t('toggleProfessional')}
      </button>

      {/* Personal button */}
      <button
        data-testid="toggle-personal"
        onClick={() => onViewChange('personal')}
        className={`
          relative z-10 px-4 md:px-5 py-2 text-sm md:text-base font-medium rounded transition-all transform
          ${view === 'personal' ? 'text-white scale-105' : 'text-dark-muted hover:text-white hover:scale-105'}
        `}
      >
        {t('togglePersonal')}
      </button>
    </div>
  );
}

