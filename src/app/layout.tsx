import type { Metadata } from "next";
import { Fraunces, Space_Grotesk } from "next/font/google";
import Script from "next/script";

import { themeBootstrapScript } from "@/lib/theme";
import "./globals.css";

const displayFont = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const bodyFont = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Freedom Landscaping",
  description: "Professional lawn maintenance, yard cleanup, and light construction services for your home or property.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`} suppressHydrationWarning>
      <head>
        <Script id="theme-bootstrap" strategy="beforeInteractive">
          {themeBootstrapScript}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
