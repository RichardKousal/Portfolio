import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Richard Kousal - QA & Test Automation Lead',
    short_name: 'Richard Kousal',
    description: 'QA & Test Automation Lead portfolio - Playwright, Cypress, CI/CD expertise',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0f',
    theme_color: '#0a0a0f',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icon-512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/apple-touch-icon.svg',
        sizes: '180x180',
        type: 'image/svg+xml',
        purpose: 'apple-touch-icon',
      },
    ],
    categories: ['business', 'productivity', 'portfolio'],
    lang: 'cs',
    dir: 'ltr',
  };
}

