import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Prem Prakash Sharma about software engineering, production AI systems, backend platforms, and product development.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
