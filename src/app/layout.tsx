import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { IBM_Plex_Mono } from "next/font/google";
import {
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site-config";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  // Required for relative URLs in openGraph/alternates to resolve.
  metadataBase: new URL(SITE_URL),
  title: {
    // Applies to child segments only; each page supplies the "%s".
    template: `%s — ${SITE_TITLE}`,
    default: SITE_TITLE,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    siteName: SITE_TITLE,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={SITE_LOCALE} className={`${ibmPlexMono.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
