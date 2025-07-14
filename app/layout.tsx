// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Button } from "@/components/ui/button"; // For nav buttons if desired
import Link from "next/link";

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
    icon: "/favicon.ico", // Add a favicon in /public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {" "}
      {/* suppressHydrationWarning for theme switching */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`} // Added bg/text classes for theme consistency
      >
        {/* Navigation Bar (simple, with blue accents) */}
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-blue-100">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-blue-700 font-bold text-xl">
              [Your Name]
            </Link>
            <div className="flex gap-4">
              <Link
                href="/"
                className="text-blue-700 hover:text-blue-800 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/contact"
                className="text-blue-700 hover:text-blue-800 transition-colors"
              >
                {" "}
                {/* Add a /contact page if needed */}
                Contact
              </Link>
              {/* Optional: Add more links, e.g., to GitHub */}
              <Button
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
                asChild
              >
                <a href="https://github.com/pleasehelpm32" target="_blank">
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main>{children}</main>

        {/* Footer (simple, with blue accents; matches our previous updates) */}
        <footer className="py-6 text-center text-sm text-gray-600 bg-blue-50 border-t border-blue-100 mt-auto">
          <div className="container mx-auto px-4">
            © {new Date().getFullYear()} [Your Name]. Built with Next.js,
            Tailwind, shadcn/ui, and Sanity.
            <div className="mt-2 flex justify-center gap-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                className="text-blue-700 hover:text-blue-800"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/joshuasingarayer/"
                target="_blank"
                className="text-blue-700 hover:text-blue-800"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
