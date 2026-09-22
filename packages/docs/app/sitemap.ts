import { source } from '@/lib/source';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string) => `https://react-modular-datepicker.vercel.app${path}`;

  return [
    {
      url: url(''),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...source.getPages().map((page) => ({
      url: url(page.url),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
