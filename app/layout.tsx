// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Load fonts (unchanged)
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Updated metadata for SEO and social sharing (customize with your details)
export const metadata: Metadata = {
  title: "Joshua Singarayer's Portfolio", // E.g., "Josh's Developer Portfolio"
  description:
    "Showcasing front-end projects built with TypeScript, Next.js, Tailwind, and more. Available for hire.",
  openGraph: {
    title: "Joshua Singarayer's Portfolio",
    description:
      "Interactive web apps and projects by a passionate front-end developer.",
    url: "https://joshthejourneyman.netlify.app/", // Replace with your deployed URL (e.g., Netlify)
    siteName: "Joshua Singarayer's Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Add an open graph image in /public for social previews
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
