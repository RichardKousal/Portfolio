'use client';

import { useTranslations } from 'next-intl';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-secondary border-t border-primary-500/20 py-8 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-accent-purple/5 to-accent-pink/5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-dark-muted text-sm hover:text-primary-400 transition-colors">
            {t('copyright', { year: currentYear })}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/richard-kousal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-muted hover:text-primary-400 transition-all hover:scale-125 hover:rotate-6 transform"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/richardkousal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-muted hover:text-accent-purple transition-all hover:scale-125 hover:-rotate-6 transform"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
