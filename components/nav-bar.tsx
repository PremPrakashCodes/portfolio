"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/#open-source", label: "Open Source" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Writing" },
  { href: "/contact", label: "Contact" },
] as const;

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsMenuOpen(false), [pathname]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 border-b border-transparent transition-colors", scrolled || isMenuOpen ? "border-border bg-background/92 backdrop-blur-xl" : "bg-background/30 backdrop-blur-sm")}>
      <a href="#main-content" className="sr-only rounded-md bg-foreground px-4 py-2 text-background focus:not-sr-only focus:absolute focus:left-4 focus:top-4">
        Skip to main content
      </a>

      <nav className="container mx-auto flex h-[72px] items-center justify-between px-4 md:px-6" aria-label="Primary navigation">
        <Link href="/" className="group flex items-center gap-3 font-mono text-foreground">
          <span className="grid size-8 place-items-center border border-primary/40 bg-primary/5 text-[0.62rem] font-semibold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">PP</span>
          <span className="hidden flex-col sm:flex">
            <strong className="text-[0.68rem] font-medium uppercase tracking-[0.14em]">Prem Prakash</strong>
            <small className="text-[0.52rem] tracking-[0.16em] text-muted-foreground">SYSTEMS / AI</small>
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const isActive = link.href.includes("#")
              ? false
              : link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn("px-1 py-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] transition-colors hover:text-primary", isActive ? "text-primary" : "text-muted-foreground")}
              >
                {link.label}
              </Link>
            );
          })}
          <Button variant="outline" size="sm" asChild className="rounded-none font-mono text-[0.68rem] uppercase tracking-[0.1em]">
            <a href="/Prem_Prakash_Sharma_Resume.pdf" target="_blank" rel="noreferrer">
              <Download data-icon="inline-start" />
              Résumé
            </a>
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMenuOpen((open) => !open)} aria-label={isMenuOpen ? "Close menu" : "Open menu"} aria-expanded={isMenuOpen} aria-controls="mobile-navigation">
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </nav>

      {isMenuOpen && (
        <nav id="mobile-navigation" className="border-t border-border bg-background/95 px-4 pb-6 pt-3 backdrop-blur-xl lg:hidden" aria-label="Mobile navigation">
          <div className="container mx-auto flex flex-col">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="flex min-h-12 items-center border-b border-border font-mono text-sm uppercase tracking-[0.1em] text-foreground">
                {link.label}
              </Link>
            ))}
            <a href="/Prem_Prakash_Sharma_Resume.pdf" target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-12 items-center gap-2 text-primary">
              <Download className="size-4" />
              View résumé
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
