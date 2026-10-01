import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'
import { work } from '@/lib/work'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/work`, lastModified: now, priority: 0.8 },
    ...work.map((w) => ({ url: `${site.url}/work/${w.slug}`, lastModified: now, priority: 0.7 })),
    ...(site.demos.invoiceSpace ? [{ url: `${site.url}/demo`, lastModified: now, priority: 0.6 }] : []),
  ]
}
