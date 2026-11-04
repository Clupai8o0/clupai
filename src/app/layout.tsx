import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const erode = localFont({
  src: [
    { path: "../fonts/Erode-Variable.woff2", style: "normal", weight: "300 700" },
    { path: "../fonts/Erode-VariableItalic.woff2", style: "italic", weight: "300 700" },
  ],
  variable: "--font-erode",
  display: "swap",
});

const DESCRIPTION =
  "We build and launch first versions for non-technical founders in Australia. Fixed price, fixed date, and the code is yours.";

export const metadata: Metadata = {
  metadataBase: new URL("https://clupai.com"),
  title: {
    default: "Clupai · Your software live by the date we agree",
    template: "%s · Clupai",
  },
  description: DESCRIPTION,
  applicationName: "Clupai",
  authors: [{ name: "Samridh Limbu" }],
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Clupai",
    url: "https://clupai.com",
    title: "Your software live by the date we agree, or you stop paying.",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Your software live by the date we agree, or you stop paying.",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Clupai",
  url: "https://clupai.com",
  email: "hello@clupai.com",
  description: DESCRIPTION,
  founder: { "@type": "Person", name: "Samridh Limbu" },
  areaServed: { "@type": "Country", name: "Australia" },
  address: { "@type": "PostalAddress", addressLocality: "Melbourne", addressRegion: "VIC", addressCountry: "AU" },
  serviceType: "Software development",
  taxID: "56 228 849 452",
};

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
const SHOULD_LOAD_GA = Boolean(GA_MEASUREMENT_ID) && process.env.NODE_ENV !== "development";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
const SHOULD_LOAD_PIXEL = Boolean(META_PIXEL_ID) && process.env.NODE_ENV !== "development";

// Runs before analytics. Moves name and email out of the address bar on the results
// link from our email, so they never reach GA or the pixel. See src/lib/booking-link.ts.
const STRIP_PREFILL = `(function(){var h=location.hash;if(location.pathname==="/start/result"&&h.indexOf("#p=")===0){try{sessionStorage.setItem("clupai-prefill",h.slice(3))}catch(e){}try{history.replaceState(null,"",location.pathname+location.search)}catch(e){}}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  return (
    <html lang="en-AU" className={erode.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: STRIP_PREFILL }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {SHOULD_LOAD_GA && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
            </Script>
          </>
        )}
        {SHOULD_LOAD_PIXEL && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');
fbq('track','PageView');`}
          </Script>
        )}
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
