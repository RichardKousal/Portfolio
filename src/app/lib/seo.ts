export function generateStructuredData(locale: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://richardkousal.cz';
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      // Person Schema
      {
        '@type': 'Person',
        '@id': `${baseUrl}/#person`,
        name: 'Richard Kousal',
        url: baseUrl,
        image: {
          '@type': 'ImageObject',
          url: `${baseUrl}/avatar.webp`,
          width: 256,
          height: 320,
        },
        jobTitle: 'QA & Test Automation Lead',
        worksFor: {
          '@type': 'Organization',
          name: 'Etnetera Core',
          url: 'https://www.etnetera.cz',
        },
        email: 'richard.kousal@gmail.com',
        telephone: '+420604674931',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'CZ',
          addressLocality: 'Prague',
        },
        sameAs: [
          'https://www.linkedin.com/in/richard-kousal',
          'https://github.com/richardkousal',
        ],
        knowsAbout: [
          'Test Automation',
          'Playwright',
          'Cypress',
          'TypeScript',
          'JavaScript',
          'CI/CD',
          'DevOps',
          'QA Leadership',
          'Mentoring',
          'Agile Methodology',
        ],
        alumniOf: {
          '@type': 'Organization',
          name: 'DODO',
        },
      },
      // Website Schema
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'Richard Kousal - QA & Test Automation Lead',
        description: 'Portfolio a profesní profil QA & Test Automation Leada se zaměřením na Playwright, budování týmů a mentoring.',
        inLanguage: [locale],
        publisher: {
          '@id': `${baseUrl}/#person`,
        },
      },
      // Professional Service Schema
      {
        '@type': 'ProfessionalService',
        '@id': `${baseUrl}/#service`,
        name: 'Richard Kousal - QA & Test Automation Services',
        description: 'QA Leadership, Test Automation, Mentoring a konzultace pro moderní softwarové projekty.',
        provider: {
          '@id': `${baseUrl}/#person`,
        },
        areaServed: {
          '@type': 'Country',
          name: 'Czech Republic',
        },
        serviceType: [
          'QA Leadership',
          'Test Automation',
          'Mentoring',
          'CI/CD Setup',
          'Quality Assurance Consulting',
        ],
      },
      // Breadcrumb Schema
      {
        '@type': 'BreadcrumbList',
        '@id': `${baseUrl}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl,
          },
        ],
      },
    ],
  };

  return JSON.stringify(structuredData);
}
