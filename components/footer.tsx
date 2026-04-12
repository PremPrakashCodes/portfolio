import Link from "next/link";
import { socialLinks } from "@/lib/data";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        {/* Top section */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-3">
            <Link
              href="/"
              className="text-lg font-semibold text-blue-400 hover:opacity-80 transition-opacity"
            >
              Prem Prakash
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Software Developer building production-grade web and AI systems.
              Let&apos;s build something together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Links
            </h3>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-white transition-colors w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors w-fit"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-xs">
            &copy; {currentYear} Prem Prakash Sharma. All rights reserved.
          </div>
          <div className="text-gray-600 text-xs flex items-center gap-1">
            Built with Next.js & Three.js
            <span className="text-red-400">♥</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
