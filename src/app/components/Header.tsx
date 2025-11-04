'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';
import ViewToggle from './ViewToggle';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdEmail, MdPhone, MdMenu, MdClose } from 'react-icons/md';

interface HeaderProps {
  view: 'professional' | 'personal';
  onViewChange: (view: 'professional' | 'personal') => void;
}

export default function Header({ view, onViewChange }: HeaderProps) {
  const t = useTranslations('header');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/95 backdrop-blur-sm border-b border-primary-500/20 shadow-lg shadow-primary-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Row */}
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left: Avatar + Name */}
          <div className="flex items-center gap-3 flex-shrink-0 animate-fade-in">
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden border-2 border-primary-500/50 shadow-lg shadow-primary-500/20 bg-dark-secondary">
              <Image
                src="/avatar2.webp"
                alt="Richard Kousal"
                fill
                sizes="(max-width: 768px) 40px, 48px"
                className="object-contain"
                priority
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiMxYTFhMWEiLz48L3N2Zz4="
              />
            </div>
            <h1 className="text-xl md:text-2xl font-heading font-bold gradient-text hover:scale-105 transition-transform cursor-default">
              {t('name')}
            </h1>
          </div>

          {/* Right: Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {/* Phone */}
            <a
              href={`tel:${t('phone')}`}
              className="hidden lg:flex items-center gap-2 text-dark-muted hover:text-accent-cyan transition-all hover:scale-105"
              aria-label="Phone"
            >
              <MdPhone className="w-5 h-5 animate-pulse-slow" />
              <span className="text-sm">{t('phone')}</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${t('email')}`}
              className="hidden lg:flex items-center gap-2 text-dark-muted hover:text-primary-400 transition-all hover:scale-105"
              aria-label="Email"
            >
              <MdEmail className="w-5 h-5 animate-pulse-slow" />
              <span className="text-sm">{t('email')}</span>
            </a>

            {/* Language Switcher */}
            <LanguageSwitcher view={view} />

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/richard-kousal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-muted hover:text-primary-400 transition-all hover:scale-110 hover:rotate-6"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/richardkousal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark-muted hover:text-accent-purple transition-all hover:scale-110 hover:-rotate-6"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </div>

            {/* View Toggle (Desktop) */}
            <div data-testid="view-toggle-desktop">
              <ViewToggle view={view} onViewChange={onViewChange} />
            </div>
          </div>

          {/* Right: Hamburger Menu (Mobile) */}
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-dark-muted hover:text-primary-400 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <MdClose className="w-6 h-6" />
            ) : (
              <MdMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile View Toggle - separate row on mobile */}
        <div className="md:hidden py-3 border-t border-primary-500/10 flex justify-center" data-testid="view-toggle-mobile">
          <ViewToggle view={view} onViewChange={onViewChange} />
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div data-testid="mobile-menu-content" className="md:hidden border-t border-primary-500/20 py-4 animate-slide-down">
            <div className="flex flex-col gap-4">
              {/* Language Switcher - už je jako dropdown, takže ho jen vystředíme */}
              <div className="flex justify-center">
                <LanguageSwitcher view={view} />
              </div>

              {/* Contact Links */}
              <div className="flex flex-col gap-3 items-center">
                <a
                  href={`tel:${t('phone')}`}
                  className="flex items-center gap-2 text-dark-muted hover:text-accent-cyan transition-all"
                  aria-label="Phone"
                >
                  <MdPhone className="w-5 h-5" />
                  <span className="text-sm">{t('phone')}</span>
                </a>

                <a
                  href={`mailto:${t('email')}`}
                  className="flex items-center gap-2 text-dark-muted hover:text-primary-400 transition-all"
                  aria-label="Email"
                >
                  <MdEmail className="w-5 h-5" />
                  <span className="text-sm">{t('email')}</span>
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-6 pt-2">
                <a
                  href="https://www.linkedin.com/in/richard-kousal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-muted hover:text-primary-400 transition-all hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://github.com/richardkousal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-muted hover:text-accent-purple transition-all hover:scale-110"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

