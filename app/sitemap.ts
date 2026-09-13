/**
 * Sitemap — gegenereerd bij elke build vanuit de YAML content.
 * Alle routes/locaties worden automatisch opgenomen.
 * SEO: hreflang via alternates (nl + en per pagina).
 */
import type { MetadataRoute } from 'next';
import { loadLocations, loadRoutes } from '@/content/loader';

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://yourlocalcityguide.com';

function entry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[0]['changeFrequency'] = 'monthly',
): MetadataRoute.Sitemap[0][] {
  return [
    {
      url: `${BASE}/nl${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: {
          nl: `${BASE}/nl${path}`,
          en: `${BASE}/en${path}`,
        },
      },
    },
    {
      url: `${BASE}/en${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: {
          nl: `${BASE}/nl${path}`,
          en: `${BASE}/en${path}`,
        },
      },
    },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const locations = loadLocations('leiden');
  const routes = loadRoutes('leiden');

  return [
    // Static pages
    ...entry('', 1.0, 'weekly'),
    ...entry('/cities', 0.9, 'weekly'),
    ...entry('/cities/leiden', 0.9, 'weekly'),
    ...entry('/cities/leiden/routes', 0.8, 'weekly'),
    ...entry('/about', 0.6),
    ...entry('/pricing', 0.7),

    // Dynamic location pages
    ...locations.flatMap((l) =>
      entry(`/cities/leiden/locations/${l.id}`, 0.7)
    ),

    // Dynamic route pages — high priority, keyword-rich URLs
    ...routes.flatMap((r) =>
      entry(`/cities/leiden/routes/${r.id}`, 0.85, 'weekly')
    ),
  ];
}
