import type { Metadata } from "next";
import { Manrope, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClickSpark from "@/components/click-spark";

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
  title: "clupai — Websites, SEO & Automation · Melbourne",
  description:
    "A studio in Melbourne. Websites, SEO and automation for operators who want more customers — not more account managers.",
};

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
      <body>
        <ClickSpark sparkColor="#ffffff" sparkSize={10} sparkRadius={20} sparkCount={8} duration={400}>
          {children}
        </ClickSpark>
      </body>
    </html>
  );
}
