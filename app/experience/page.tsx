import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Download } from "lucide-react";
import ContributionsGrid from "@/components/contributions-grid";
import EducationCertifications from "@/components/education-certifications";
import ExperienceTimeline from "@/components/experience-timeline";
import SectionHeader from "@/components/section-header";
import TechStackGrid from "@/components/tech-stack-grid";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Software Development Experience",
  description:
    "Explore Prem Prakash Sharma's experience building production AI systems, backend platforms, full-stack products, and reviewed open-source contributions.",
  alternates: { canonical: "/experience" },
};

const highlights = [
  { value: "2+", label: "Years building software" },
  { value: "80k+", label: "OSS stars reached" },
  { value: "17", label: "Tests shipped in one connector" },
] as const;

const sectionLinks = [
  { href: "#currently", label: "Currently" },
  { href: "#work", label: "Work" },
  { href: "#open-source", label: "Open source" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#education", label: "Education" },
] as const;

const collaborationStrengths = [
  "Production AI workflows",
  "Backend platforms and APIs",
  "Full-stack product delivery",
] as const;

export default function ExperiencePage() {
  return (
    <main id="main-content" className="pb-24 pt-28 md:pb-32 md:pt-36">
      <header className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 border-b border-border pb-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20 lg:pb-16">
          <div>
            <p className="section-kicker">Professional journey</p>
            <h1 className="mt-4 max-w-4xl text-balance text-5xl font-semibold leading-[1.01] tracking-[-0.055em] text-foreground md:text-7xl">
              Building dependable systems for <span className="highlight-text">real work.</span>
            </h1>
          </div>
          <div className="lg:pb-1">
            <p className="max-w-xl text-pretty text-lg leading-8 text-muted-foreground">
              I work across backend, AI, and product engineering—turning complex workflows into production software that is observable, maintainable, and useful.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/Prem_Prakash_Sharma_Resume.pdf" target="_blank" rel="noreferrer" className={cn(buttonVariants({ size: "lg" }), "rounded-full")}>
                <Download aria-hidden="true" data-icon="inline-start" />
                View résumé
              </a>
              <Link href="/contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full")}>
                Start a conversation
                <ArrowRight aria-hidden="true" data-icon="inline-end" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid border-b border-border sm:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.label} className="border-b border-border py-6 last:border-b-0 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0">
              <p className="text-2xl font-semibold tracking-tight text-foreground">{item.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>

        <nav aria-label="Experience page sections" className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
          {sectionLinks.map((link) => (
            <a key={link.href} href={link.href} className="-my-2 py-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary">
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <section id="currently" className="scroll-mt-24 pt-16 md:pt-20" aria-labelledby="currently-title">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid border-y border-border py-8 md:grid-cols-[0.72fr_1.28fr] md:gap-12 md:py-10 lg:gap-20">
            <div>
              <p className="section-kicker">Currently</p>
              <h2 id="currently-title" className="mt-3 max-w-md text-balance text-3xl font-semibold tracking-[-0.035em] text-foreground md:text-4xl">
                Software Developer at BigCircle.
              </h2>
            </div>

            <dl className="mt-8 grid gap-7 sm:grid-cols-2 md:mt-0">
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.14em] text-primary">Building</dt>
                <dd className="mt-2 text-sm leading-7 text-muted-foreground">
                  Type-safe backend services, observable LLM workflows, and repeatable production deployments.
                </dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.14em] text-primary">Interested in</dt>
                <dd className="mt-2 text-sm leading-7 text-muted-foreground">
                  Thoughtful product, backend, and applied AI work where reliability matters as much as the idea.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="work" className="scroll-mt-24 pt-24 md:pt-32" aria-labelledby="work-title">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader eyebrow="01 / Experience" title="From product requirements to production systems." description="Roles where I have owned backend services, AI workflows, integrations, deployments, and the details that make software reliable after launch." />
          <div className="mt-12 md:mt-16">
            <ExperienceTimeline />
          </div>
        </div>
      </section>

      <section id="open-source" className="mt-24 scroll-mt-24 border-y border-border bg-card/30 py-24 md:mt-32 md:py-32" aria-labelledby="open-source-title">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="section-kicker">02 / Public work</p>
              <h2 id="open-source-title" className="section-title mt-3">Reviewed in the open. Shipped in the real world.</h2>
              <p className="mt-5 max-w-md text-pretty leading-7 text-muted-foreground">
                Public contributions show how I enter unfamiliar codebases, communicate through review, and leave systems more stable than I found them.
              </p>
            </div>
            <ContributionsGrid />
          </div>
        </div>
      </section>

      <section id="capabilities" className="scroll-mt-24 pt-24 md:pt-32" aria-labelledby="capabilities-title">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader eyebrow="03 / Capabilities" title="A stack shaped around dependable delivery." description="The tools change with the problem. The through-line is type safety, observability, clean interfaces, and pragmatic infrastructure." />
          <div className="mt-12 md:mt-16">
            <TechStackGrid />
          </div>
        </div>
      </section>

      <section id="education" className="scroll-mt-24 pt-24 md:pt-32" aria-labelledby="education-title">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeader eyebrow="04 / Foundation" title="Education and continued learning." description="Formal study supported by focused credentials in the technologies I use to build and ship software." />
          <div className="mt-12 md:mt-16">
            <EducationCertifications />
          </div>
        </div>
      </section>

      <section className="container mx-auto mt-24 px-4 md:mt-32 md:px-6" aria-labelledby="experience-cta-title">
        <Card className="overflow-hidden rounded-3xl border-primary/20 bg-card/70 shadow-[0_28px_90px_hsl(var(--primary)/0.08)]">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="flex flex-col justify-between">
              <CardHeader className="p-7 md:p-10 lg:p-12">
                <p className="section-kicker">Next project</p>
                <CardTitle className="mt-4">
                  <h2 id="experience-cta-title" className="max-w-2xl text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-foreground md:text-5xl">
                    Bring me the <span className="highlight-text">hard part.</span>
                  </h2>
                </CardTitle>
                <CardDescription className="mt-5 max-w-xl text-base leading-7 md:text-lg md:leading-8">
                  If you&apos;re turning a complex workflow into a dependable product, I can help shape the architecture and carry it through to production.
                </CardDescription>
              </CardHeader>

              <CardFooter className="flex flex-wrap gap-3 px-7 pb-8 pt-0 md:px-10 md:pb-10 lg:px-12 lg:pb-12">
                <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "rounded-full")}>
                  Start a conversation
                  <ArrowRight aria-hidden="true" data-icon="inline-end" />
                </Link>
                <Link href="/projects" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full bg-transparent")}>
                  View selected work
                </Link>
              </CardFooter>
            </div>

            <CardContent className="relative border-t border-border bg-secondary/35 p-7 md:p-10 lg:border-l lg:border-t-0 lg:p-12">
              <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,hsl(var(--primary)/0.16),transparent_18rem)]" />
              <div className="relative flex h-full flex-col">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  <span className="size-2 rounded-full bg-signal shadow-[0_0_16px_hsl(var(--signal)/0.65)]" />
                  Open to thoughtful opportunities
                </div>

                <h3 className="mt-9 max-w-sm text-2xl font-medium tracking-tight text-foreground">Where I add the most value</h3>
                <ul className="mt-6 border-y border-border">
                  {collaborationStrengths.map((item, index) => (
                    <li key={item} className="flex items-center gap-4 border-b border-border py-4 last:border-b-0">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/10 font-mono text-xs text-primary">0{index + 1}</span>
                      <span className="flex-1 text-sm font-medium text-foreground">{item}</span>
                      <Check aria-hidden="true" className="size-4 text-signal" />
                    </li>
                  ))}
                </ul>

                <p className="mt-auto pt-8 text-sm leading-6 text-muted-foreground">
                  From the first architecture decision to a production release.
                </p>
              </div>
            </CardContent>
          </div>
        </Card>
      </section>
    </main>
  );
}
