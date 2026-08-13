import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const capabilities = [
  "AI workflows with tracing and observability",
  "Type-safe backend services and API design",
  "Event-driven processing and background jobs",
  "Containerized delivery on AWS",
] as const;

export default function AboutSection() {
  return (
    <section className="section-padding" aria-labelledby="about-title">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-card">
            <Image
              src="/images/profile-image.png"
              alt="Prem Prakash Sharma, software developer"
              fill
              className="object-cover grayscale-[20%]"
              sizes="(max-width: 1024px) 384px, 32vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-6 pt-20">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Production AI · backend systems</p>
            </div>
          </div>

          <div>
            <p className="section-kicker">How I work</p>
            <h2 id="about-title" className="section-title mt-3">
              Product context first. Technology in service of the outcome.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              I&apos;m a software developer with 2+ years of experience across
              AI-powered products, scalable backend services, and full-stack
              applications. I work closely with product and frontend teams to
              turn ambiguous workflows into systems that can be operated,
              debugged, and extended with confidence.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {capabilities.map((capability) => (
                <li key={capability} className="border-l border-primary pl-4 text-sm leading-6 text-muted-foreground">
                  {capability}
                </li>
              ))}
            </ul>
            <Link href="/experience" className="link-arrow mt-8">
              Explore experience and capabilities
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
