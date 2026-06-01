import type { Metadata } from "next";
import { Manrope, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ClickSpark from "@/components/click-spark";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clupai.com"),
  title: {
    default: "clupai — Websites, SEO & Automation · Melbourne",
    template: "%s · clupai",
  },
  description:
    "A Melbourne studio. Websites, SEO and automation for operators who want more customers — not more account managers.",
  openGraph: {
    siteName: "clupai",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@clupai",
  },
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "clupai",
  alternateName: "Clupai",
  description:
    "Melbourne web, SEO and automation studio. Websites, SEO and automation for operators who want more customers — not more account managers.",
  url: "https://clupai.com",
  telephone: "+61000000000",
  email: "hello@clupai.com",
  foundingDate: "2024",
  founder: {
    "@type": "Person",
    name: "Sam Limbu",
    jobTitle: "Founder",
    url: "https://samridhlimbu.com",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Brunswick",
    addressRegion: "VIC",
    addressCountry: "AU",
  },
  areaServed: [
    { "@type": "City", name: "Melbourne" },
    { "@type": "State", name: "Victoria" },
    { "@type": "Country", name: "Australia" },
  ],
  serviceType: ["Web Design", "SEO", "Business Automation"],
  sameAs: [
    "https://www.linkedin.com/company/clupai",
    "https://x.com/clupai",
  ],
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID?.trim();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {GTM_ID ? (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        <ClickSpark sparkColor="#ffffff" sparkSize={10} sparkRadius={20} sparkCount={8} duration={400}>
          {children}
        </ClickSpark>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
