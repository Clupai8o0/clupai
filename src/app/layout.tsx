import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import StartNudge from "@/components/start-nudge";
import SiteMotion from "@/components/site-motion";
import { STAR } from "@/components/logo";

const inter = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

// The browser bar takes the brand blue, not whatever colour the page happens to start with.
export const viewport: Viewport = {
  themeColor: "#4da3ff",
};

const DESCRIPTION =
  "clupai is a development agency in Melbourne. We build first versions of apps and platforms for founders, with a fixed price and a launch date in the contract.";

export const metadata: Metadata = {
  metadataBase: new URL("https://clupai.com"),
  title: {
    default: "clupai · Your software live by the date we agree",
    template: "%s · clupai",
  },
  description: DESCRIPTION,
  applicationName: "clupai",
  authors: [{ name: "Samridh Limbu" }],
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "clupai",
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
  name: "clupai",
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

// Motion is opt-in: the plain page is the default, for no JS and for reduced motion.
// If motion hasn't booted 6 seconds after load, the class comes off and the plain page shows.
const MOTION_ON = `(function(){try{var d=document.documentElement;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("m");window.addEventListener("load",function(){setTimeout(function(){if(!window.__mOk)d.classList.remove("m")},6000)})}catch(e){}})()`;

// Marks each picture once it has arrived, so globals.css can show a placeholder until then on a slow connection.
// Until React has hydrated, they wait in a queue: an attribute React didn't render would be a hydration mismatch.
// site-motion.tsx empties the queue once hydrated.
// Runs the loader's count: creeps towards 92 while the page loads, then runs to 100 once boot.js says it's ready
// (html.m-in). Writes a string for the count's ::after, because Safari won't redraw a CSS counter as it animates.
const LOADER_COUNT = `(function(){var d=document.documentElement;if(!d.classList.contains("m"))return;var t0=performance.now(),v=0,a=0,s=0,shown=-1;function k(){var c=d.classList;if(c.contains("m-done")||!c.contains("m")){d.style.removeProperty("--load");return}var t=performance.now();if(c.contains("m-in")){if(!a){a=t;s=v}var y=Math.min((t-a)/280,1);v=s+(100-s)*y}else{var x=Math.min((t-t0)/9000,1);v=92*(1-Math.pow(1-x,3))}var n=Math.round(v);if(n!==shown){shown=n;d.style.setProperty("--load",'"'+n+'"')}requestAnimationFrame(k)}k()})()`;

// What the loader says when a first load runs long (timing in globals.css, .loader-say).
// Each visit picks two different QUIPS (10 s, 13 s) and one NUDGE (16 s, stays until the loader gives up at 22 s).
// Written by Grok 4.7 at Sam's ask (10 Nov 2026), picked by Claude.
const QUIPS = [
  "Okay, this is odd for us.",
  "Awkward, from a company that builds software.",
  "Us or the internet. Flip a coin.",
  "Even we think this is slow.",
  "If this is us, that's embarrassing.",
  "We didn't plan on a wait this long.",
];
const NUDGES = [
  "Refresh the page. Can't hurt.",
  "One refresh. See if the page gives in.",
  "Wi-Fi or mobile data. Try the other.",
];

// Writes the picks as CSS strings on <html>, like the count, so the server-rendered loader never changes.
const LOADER_SAY = `(function(){var q=${JSON.stringify(QUIPS)},n=${JSON.stringify(NUDGES)},s=document.documentElement.style;function r(a){return Math.floor(Math.random()*a.length)}var i=r(q),j=(i+1+Math.floor(Math.random()*(q.length-1)))%q.length;s.setProperty("--say-quip-1",JSON.stringify(q[i]));s.setProperty("--say-quip-2",JSON.stringify(q[j]));s.setProperty("--say-nudge",JSON.stringify(n[r(n)]))})()`;

const IMG_WAIT = `(function(){var q=[];window.__imgQ=q;function m(e){var t=e.target;if(!t||t.tagName!=="IMG")return;if(window.__imgQ)window.__imgQ.push(t);else t.setAttribute("data-loaded","")}document.addEventListener("load",m,true);document.addEventListener("error",m,true)})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  return (
    <html lang="en-AU" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: STRIP_PREFILL }} />
        <script dangerouslySetInnerHTML={{ __html: MOTION_ON }} />
        <script dangerouslySetInnerHTML={{ __html: LOADER_COUNT }} />
        <script dangerouslySetInnerHTML={{ __html: LOADER_SAY }} />
        <script dangerouslySetInnerHTML={{ __html: IMG_WAIT }} />
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
        {/* First load only, and only with motion on: covers the page until boot.js has staged it. */}
        <div className="loader" aria-hidden="true">
          <svg className="loader-star" viewBox="62.47 31.94 20 20">
            <path d={STAR} />
          </svg>
          <span className="loader-count" />
          {/* Only seen on a slow load: each line waits its turn in globals.css, and a fast load lifts before the first. Quip text comes from LOADER_SAY. */}
          <span className="loader-say">
            <span>Still with you.</span>
            <span>Big pictures on the way.</span>
            <span className="say-quip-1" />
            <span className="say-quip-2" />
            <span className="say-nudge" />
          </span>
        </div>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <StartNudge />
        <SiteMotion />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
