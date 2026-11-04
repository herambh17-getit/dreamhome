import type { Metadata, Viewport } from "next";
import { Barlow } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { siteConfig, seoKeywords } from "@/lib/site-config";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
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
  // Canonical and Open Graph URLs are set per page via `pageMetadata()` —
  // a layout-level canonical would be inherited by any page that forgot to
  // set its own, silently marking it a duplicate of the homepage.
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Real Estate Consultant in Mumbai`,
    description: siteConfig.shortDescription,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Real Estate Consultant in Mumbai`,
    description: siteConfig.shortDescription,
    images: [DEFAULT_OG_IMAGE],
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
        {/* Scroll-reveal content is server-rendered at opacity 0 and faded
            in by JavaScript. If scripts don't run (blocked, failed, or a
            non-JS crawler/screenshot tool), show everything instead of a
            page that looks empty below the hero. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                '[style*="opacity:0"]{opacity:1!important;transform:none!important}',
            }}
          />
        </noscript>
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
