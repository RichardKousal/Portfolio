import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://richardkousal.cz';
  const locales = ['cs', 'en', 'de', 'pl'];
  const lastModified = new Date();

  // Generate sitemap entries for each locale
  const localeUrls = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${baseUrl}/${l}`])
        ),
      },
    },
    {
      url: `${baseUrl}/${locale}?view=professional`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/${locale}?view=personal`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]);

  return [
    // Root redirect
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...localeUrls,
  ];
}
