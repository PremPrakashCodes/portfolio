import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import ErrorBoundary from "@/components/error-boundary";
import { GoogleAnalytics } from "@next/third-parties/google";

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
  title: "Prem Prakash Sharma | Software Developer | AI & Web Development Expert",
  description: "Prem Prakash Sharma - Software Developer at BigCircle specializing in production-grade web and AI systems. Expert in TypeScript, Python, React.js, Next.js, Node.js, FastAPI, Docker, AWS. Building scalable backend services with LLM integration, tRPC, PostgreSQL, MongoDB, Redis. Experience in AI-powered document classification, multi-agent systems, and enterprise applications.",
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
    "FastAPI",
    "tRPC",
    "LLM Integration",
    "AI Systems",
    "Machine Learning",
    "Web Development",
    "Backend Development",
    "Frontend Development",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Docker",
    "AWS",
    "Cloud Computing",
    "DevOps",
    "Supabase",
    "Prisma",
    "Drizzle ORM",
    "REST API",
    "Microservices",
    "Electron.js",
    "Tailwind CSS",
    "LiteLLM",
    "Langfuse",
    "BigCircle",
    "Gandhinagar",
    "India",
    "Software Engineer",
    "Web Developer"
  ],
  authors: [{ name: "Prem Prakash Sharma" }],
  creator: "Prem Prakash Sharma",
  publisher: "Prem Prakash Sharma",
  openGraph: {
    title: "Prem Prakash Sharma | Software Developer | AI & Web Development Expert",
    description: "Software Developer building production-grade web and AI systems. Expert in TypeScript, Python, React.js, Next.js, FastAPI, Node.js, Docker, AWS, and LLM integration. View projects and experience.",
    url: "https://premprakash.dev/",
    siteName: "Prem Prakash Sharma - Software Developer Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://premprakash.dev/images/profile-image.png",
        width: 1200,
        height: 630,
        alt: "Prem Prakash Sharma - Software Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prem Prakash Sharma | Software Developer | AI & Web Development Expert",
    description: "Software Developer building production-grade web and AI systems. Expert in TypeScript, Python, React.js, Next.js, FastAPI, Node.js, Docker, AWS, and LLM integration.",
    creator: "@premprakashdev",
    images: ["https://premprakash.dev/images/profile-image.png"],
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
  alternates: {
    canonical: "https://premprakash.dev/",
  },
  category: "Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Prem Prakash Sharma",
    url: "https://premprakash.dev",
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
      address: {
        "@type": "PostalAddress",
        addressLocality: "Gandhinagar",
        addressRegion: "Gujarat",
        addressCountry: "India",
      },
    },
    knowsAbout: [
      "TypeScript",
      "Python",
      "JavaScript",
      "React.js",
      "Next.js",
      "Node.js",
      "FastAPI",
      "AI Development",
      "Machine Learning",
      "LLM Integration",
      "Docker",
      "AWS",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Web Development",
      "Software Engineering",
    ],
    email: "premprakashsharma.dev@gmail.com",
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <ErrorBoundary>
          <NavBar />
          {children}
          <Footer />
          <ScrollToTop />
        </ErrorBoundary>
        <GoogleAnalytics gaId="G-L49P87PHWD" />
      </body>
    </html>
  );
}
