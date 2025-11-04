'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition, useState, useRef, useEffect } from 'react';
import { MdLanguage, MdExpandMore } from 'react-icons/md';

const locales = [
  { code: 'cs', label: 'CS', fullName: 'Čeština' },
  { code: 'en', label: 'EN', fullName: 'English' },
  { code: 'de', label: 'DE', fullName: 'Deutsch' },
  { code: 'pl', label: 'PL', fullName: 'Polski' },
];

interface LanguageSwitcherProps {
  view: 'professional' | 'personal';
}

export default function LanguageSwitcher({ view }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Use setTimeout to avoid race condition with button click
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === locale) {
      setIsOpen(false);
      return;
    }

    startTransition(() => {
      const pathWithoutLocale = pathname.replace(`/${locale}`, '');
      router.replace(`/${newLocale}${pathWithoutLocale}?view=${view}`);
      setIsOpen(false);
    });
  };

  const currentLocale = locales.find((loc) => loc.code === locale) || locales[0];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        data-testid="language-switcher-button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        disabled={isPending}
        className="flex items-center gap-2 px-3 py-2 bg-dark-secondary rounded-lg border border-primary-500/20 
          hover:border-primary-500/40 transition-all text-dark-text hover:text-primary-400 group"
        aria-label="Change language"
      >
        <MdLanguage className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:inline">{currentLocale.label}</span>
        <MdExpandMore 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-dark-secondary border border-primary-500/20 rounded-lg shadow-2xl shadow-primary-500/20 
          overflow-hidden z-50 animate-slide-down">
          {locales.map((loc) => (
            <button
              key={loc.code}
              data-testid={`language-option-${loc.code}`}
              onClick={() => handleLocaleChange(loc.code)}
              disabled={isPending}
              className={`
                w-full px-4 py-2.5 text-left text-sm transition-all flex items-center justify-between
                ${locale === loc.code
                  ? 'bg-gradient-to-r from-primary-600 to-accent-purple text-white font-medium'
                  : 'text-dark-muted hover:text-white hover:bg-dark-accent'
                }
                ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <span>{loc.fullName}</span>
              <span className="text-xs opacity-70">{loc.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
