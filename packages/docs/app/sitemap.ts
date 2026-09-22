import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://react-modular-datepicker.vercel.app';
  const url = (path: string) => `${baseUrl}${path}`;

  return [
    {
      url: url('/'),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    ...source.getPages().map((page) => ({
      url: url(page.url),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
