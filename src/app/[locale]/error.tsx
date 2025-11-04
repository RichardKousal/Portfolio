'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('error');

  useEffect(() => {
    // Log the error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error boundary caught:', error);
    }
    
    // TODO: Log to error reporting service (e.g., Sentry)
    // logErrorToService(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-dark-bg">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated error icon */}
        <div className="relative mb-8">
          <div className="text-9xl animate-pulse">⚠️</div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent-orange/10 rounded-full blur-3xl animate-float"></div>
        </div>
        
        {/* Message */}
        <h2 className="text-3xl font-heading font-bold text-dark-text mb-4">
          {t('title')}
        </h2>
        <p className="text-lg text-dark-muted mb-8 max-w-md mx-auto">
          {t('description')}
        </p>
        
        {/* Error details (development only) */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mb-8 text-left bg-dark-secondary/50 p-4 rounded-lg border border-accent-orange/30">
            <summary className="cursor-pointer text-accent-orange font-medium mb-2">
              Error Details (Dev Only)
            </summary>
            <pre className="text-sm text-dark-muted overflow-auto">
              {error.message}
              {error.digest && `\nDigest: ${error.digest}`}
            </pre>
          </details>
        )}
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-orange to-accent-yellow 
              text-white font-medium rounded-lg shadow-lg shadow-accent-orange/30 
              hover:shadow-accent-orange/50 hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {t('retryButton')}
          </button>
          
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-dark-secondary 
              text-dark-text font-medium rounded-lg border border-primary-500/30
              hover:border-primary-500/60 hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {t('homeButton')}
          </a>
        </div>
        
        {/* Decorative elements */}
        <div className="mt-16 flex justify-center gap-3 opacity-50">
          <div className="w-2 h-2 rounded-full bg-accent-orange animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-accent-yellow animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-accent-pink animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}

