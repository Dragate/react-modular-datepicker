import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './global.css';

const inter = Inter({
  subsets: ['latin'],
});

const defaultTitle = "React Modular Datepicker — Modular, Lightweight & Type-Safe Datepicker for React";
const defaultDescription = "Build date range pickers, single selection calendars, or headless custom layouts for React. Powered by Tailwind CSS and pluggable date adapters.";

export const metadata: Metadata = {
  metadataBase: new URL("https://react-modular-datepicker.vercel.app"),
  applicationName: "React Modular Datepicker",
  title: {
    template: "%s | React Modular Datepicker",
    default: defaultTitle,
  },
  description: defaultDescription,
  keywords: [
    "react",
    "datepicker",
    "date picker",
    "calendar",
    "react datepicker",
    "react calendar",
    "date range picker",
    "react modular datepicker",
    "tailwind datepicker",
    "tailwind css datepicker",
    "headless datepicker",
    "date adapter",
    "dayjs datepicker",
    "date-fns datepicker",
    "type-safe datepicker",
    "react components",
    "ui library",
    "spidfair",
  ],
  authors: [{ name: "Spidfair", url: "https://www.spidfair.com" }],
  creator: "Spidfair",
  publisher: "React Modular Datepicker",
  category: "technology",
  openGraph: {
    title: "React Modular Datepicker",
    description: defaultDescription,
    url: "https://react-modular-datepicker.vercel.app",
    siteName: "React Modular Datepicker",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "React Modular Datepicker - Modular, Lightweight & Type-Safe Datepicker for React",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "React Modular Datepicker",
    description: defaultDescription,
    images: ["/opengraph-image"],
    creator: "@spidfair",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon0.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  verification: {
    google: "cPwTWWsKpgpJaiwv1lo8Q16c19J9l6bztgp4-o5BXiw",
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
        {process.env.NODE_ENV === "production" && <SpeedInsights />}
      </body>
    </html>
  );
}
