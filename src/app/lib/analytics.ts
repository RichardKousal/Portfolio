import { track } from '@vercel/analytics';

// Custom event types for better type safety
export const analyticsEvents = {
  // CV Download
  CV_DOWNLOAD_CLICKED: 'cv_download_clicked',
  CV_DOWNLOAD_SUCCESS: 'cv_download_success',
  CV_DOWNLOAD_ERROR: 'cv_download_error',
  
  // View Toggle
  VIEW_SWITCHED_TO_PROFESSIONAL: 'view_switched_professional',
  VIEW_SWITCHED_TO_PERSONAL: 'view_switched_personal',
  
  // Language Change
  LANGUAGE_CHANGED: 'language_changed',
  
  // Social Links
  LINKEDIN_CLICKED: 'linkedin_clicked',
  GITHUB_CLICKED: 'github_clicked',
  EMAIL_CLICKED: 'email_clicked',
  PHONE_CLICKED: 'phone_clicked',
  
  // External Links
  APARTMANY_IWONA_CLICKED: 'apartmany_iwona_clicked',
  
  // Navigation
  BACK_TO_TOP_CLICKED: 'back_to_top_clicked',
  
  // Error Pages
  ERROR_PAGE_VIEWED: 'error_page_viewed',
  NOT_FOUND_PAGE_VIEWED: '404_page_viewed',
} as const;

// Helper function to track events
export function trackEvent(
  eventName: (typeof analyticsEvents)[keyof typeof analyticsEvents],
  properties?: Record<string, string | number | boolean>
) {
  // Only track in production
  if (process.env.NODE_ENV === 'production') {
    track(eventName, properties);
  } else {
    // Log in development for debugging
    console.log('[Analytics]', eventName, properties);
  }
}

// Convenience functions for common events
export const analytics = {
  cvDownload: (locale: string, success: boolean = true) => {
    trackEvent(
      success ? analyticsEvents.CV_DOWNLOAD_SUCCESS : analyticsEvents.CV_DOWNLOAD_ERROR,
      { locale }
    );
  },
  
  viewSwitch: (view: 'professional' | 'personal') => {
    trackEvent(
      view === 'professional'
        ? analyticsEvents.VIEW_SWITCHED_TO_PROFESSIONAL
        : analyticsEvents.VIEW_SWITCHED_TO_PERSONAL,
      { view }
    );
  },
  
  languageChange: (from: string, to: string) => {
    trackEvent(analyticsEvents.LANGUAGE_CHANGED, { from, to });
  },
  
  socialClick: (platform: 'linkedin' | 'github' | 'email' | 'phone') => {
    const eventMap = {
      linkedin: analyticsEvents.LINKEDIN_CLICKED,
      github: analyticsEvents.GITHUB_CLICKED,
      email: analyticsEvents.EMAIL_CLICKED,
      phone: analyticsEvents.PHONE_CLICKED,
    };
    trackEvent(eventMap[platform], { platform });
  },
  
  externalLink: (name: string, url: string) => {
    trackEvent(analyticsEvents.APARTMANY_IWONA_CLICKED, { name, url });
  },
  
  backToTop: () => {
    trackEvent(analyticsEvents.BACK_TO_TOP_CLICKED);
  },
  
  errorPage: (errorType: '404' | 'error', message?: string) => {
    trackEvent(
      errorType === '404'
        ? analyticsEvents.NOT_FOUND_PAGE_VIEWED
        : analyticsEvents.ERROR_PAGE_VIEWED,
      message ? { message } : undefined
    );
  },
};

