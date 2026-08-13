import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "arial"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Prem Prakash Sharma | Software Developer",
    template: "%s | Prem Prakash Sharma",
  },
  description: siteConfig.description,
  keywords: [
    "Prem Prakash Sharma",
    "Software Developer",
    "AI Developer",
    "Full Stack Developer",
    "TypeScript Developer",
    "Python Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
  ],
  authors: [{ name: "Prem Prakash Sharma" }],
  creator: "Prem Prakash Sharma",
  openGraph: {
    title: "Prem Prakash Sharma | Software Developer",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Prem Prakash Sharma - Software Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prem Prakash Sharma | Software Developer",
    description: siteConfig.description,
    creator: "@premprakashdev",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Prem Prakash Sharma",
    url: siteConfig.url,
    image: "https://premprakash.dev/images/profile-image.png",
    sameAs: [
      "https://github.com/PremPrakashCodes",
      "https://www.linkedin.com/in/premprakashsharma",
      "https://twitter.com/premprakashdev",
    ],
    jobTitle: "Software Developer",
    worksFor: {
      "@type": "Organization",
      name: "BigCircle",
    },
    email: siteConfig.email,
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <NavBar />
        {children}
        <Footer />
        <Toaster />
        <SpeedInsights />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
