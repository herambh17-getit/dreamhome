import type { Metadata, Viewport } from "next";
import { Barlow } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { siteConfig, seoKeywords } from "@/lib/site-config";
import "./globals.css";

/**
 * Barlow is the only typeface in the brand guidelines. Weights map to the
 * brand type scale: 400 body · 500 caption · 600 H3 · 700 H2 · 800 H1.
 */
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Real Estate Consultant in Mumbai`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.shortDescription,
  keywords: [...seoKeywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Real Estate Consultant in Mumbai`,
    description: siteConfig.shortDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Real Estate Consultant in Mumbai`,
    description: siteConfig.shortDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "Real Estate",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#403696" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0d26" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-scroll-behavior="smooth" is required from Next 16 onward for the
    // router to reset scroll position on navigation when smooth scrolling
    // is enabled anywhere in the page.
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${barlow.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <WhatsAppFab />
        <Toaster position="top-center" richColors />
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
