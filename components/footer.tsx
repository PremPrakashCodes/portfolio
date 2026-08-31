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
    <footer className="border-t border-border bg-card/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-10 py-14 md:grid-cols-[1.4fr_0.7fr_0.7fr]">
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="font-mono text-sm font-medium uppercase tracking-[0.16em] text-primary transition-opacity hover:opacity-80"
            >
              PP / AI Systems
            </Link>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Designing the path from probabilistic intelligence to dependable
              software. Built with observability, failure modes, and humans in mind.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-foreground">
              Navigate
            </h3>
            <nav className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-foreground">
              Connect
            </h3>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <link.icon className="size-4" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted-foreground sm:flex-row">
          <div>
            &copy; {currentYear} Prem Prakash Sharma. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary" />
            System operational · Next.js / TypeScript
          </div>
        </div>
      </div>
    </footer>
  );
}
