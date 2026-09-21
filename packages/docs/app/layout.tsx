import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://react-modular-datepicker.vercel.app'),
  applicationName: 'React Modular Datepicker',
  title: {
    template: '%s | React Modular Datepicker',
    default: 'React Modular Datepicker - Headless & Modular React Calendar Component',
  },
  description:
    'A modular, lightweight, accessible, and type-safe React datepicker library. Supports single, multiple, and date range selections with Tailwind CSS, CSS variables, CSS modules, or custom CSS classes, headless useDates hook, and pluggable date adapters.',
  keywords: [
    'react',
    'datepicker',
    'date-picker',
    'calendar',
    'react-calendar',
    'date-range-picker',
    'headless-ui',
    'tailwind-css',
    'css-variables',
    'typescript',
    'react-component',
    'useDates',
    'dayjs',
    'date-fns',
    'modular-datepicker',
    'accessible-datepicker',
    'wai-aria',
  ],
  authors: [{ name: 'Dragate' }, { name: 'spidfair', url: 'https://www.spidfair.com' }],
  creator: 'https://www.spidfair.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://react-modular-datepicker.vercel.app',
    title: 'React Modular Datepicker - Headless & Modular React Calendar Component',
    description:
      'Modular, lightweight, accessible, and type-safe React datepicker library. Flexible styling with Tailwind CSS, CSS variables, or custom CSS with headless hook support.',
    siteName: 'React Modular Datepicker',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'React Modular Datepicker - Modular, Lightweight & Type-Safe Datepicker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'React Modular Datepicker',
    description:
      'Modular, lightweight, accessible, and type-safe React datepicker library with versatile CSS styling.',
    images: ['/opengraph-image'],
  },
  verification: {
    google: 'cPwTWWsKpgpJaiwv1lo8Q16c19J9l6bztgp4-o5BXiw',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {process.env.NODE_ENV === 'production' && <SpeedInsights />}
      </body>
    </html>
  );
}
