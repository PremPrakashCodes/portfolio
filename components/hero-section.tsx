import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { proofPoints, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section className="hero-grid relative overflow-hidden border-b border-border">
      <div className="container relative mx-auto flex min-h-[92svh] flex-col justify-center px-4 pb-16 pt-28 md:px-6 md:pb-20 md:pt-32">
        <div className="max-w-5xl">
          <p className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary md:text-sm">
            <span className="size-2 rounded-full bg-signal shadow-[0_0_18px_hsl(var(--signal))]" />
            Software developer · AI and backend systems
          </p>

          <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Building production <span className="highlight-text">AI systems</span>{" "}
            that hold up in the real world.
          </h1>

          <p className="mt-8 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground md:text-xl">
            I&apos;m {siteConfig.name}. I design type-safe APIs, event-driven
            workflows, and observable LLM applications using Python,
            TypeScript, FastAPI, Node.js, and AWS.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild className="rounded-full">
              <Link href="/projects">
                Explore selected work
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="rounded-full">
              <a href="/Prem_Prakash_Sharma_Resume.pdf" target="_blank" rel="noreferrer">
                View résumé
                <ArrowDownRight data-icon="inline-end" />
              </a>
            </Button>
          </div>
        </div>

        <dl className="mt-16 grid border-y border-border sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {proofPoints.map((point, index) => (
            <div
              key={point.label}
              className={cn(
                "border-border px-0 py-5 sm:px-5",
                index % 2 === 0 ? "sm:pl-0" : "sm:border-l",
                index === 0
                  ? "lg:border-l-0 lg:pl-0"
                  : "lg:border-l lg:pl-5",
              )}
            >
              <dt className="max-w-44 text-sm leading-5 text-muted-foreground">{point.label}</dt>
              <dd className="order-first mb-1 font-mono text-lg font-medium text-primary">{point.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
