import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Github } from "lucide-react";
import { projects } from "@/lib/data";
import { Button } from "@/components/ui/button";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.outcome,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} - Engineering case study`,
      description: project.outcome,
      url: `/projects/${project.slug}`,
      type: "article",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${project.title} engineering case study` }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: project.title,
        description: project.outcome,
        url: `https://premprakash.dev/projects/${project.slug}`,
        creator: { "@type": "Person", name: "Prem Prakash Sharma" },
        keywords: project.tags.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://premprakash.dev" },
          { "@type": "ListItem", position: 2, name: "Projects", item: "https://premprakash.dev/projects" },
          { "@type": "ListItem", position: 3, name: project.title, item: `https://premprakash.dev/projects/${project.slug}` },
        ],
      },
    ],
  };

  return (
    <main id="main-content" className="pb-24 pt-28 md:pb-32 md:pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        <header className="container mx-auto px-4 md:px-6">
          <Link href="/projects" className="link-arrow mb-10">
            <ArrowLeft aria-hidden="true" className="size-4" />
            All projects
          </Link>
          <p className="section-kicker">{project.eyebrow}</p>
          <h1 className="mt-4 max-w-5xl text-balance text-5xl font-semibold leading-none tracking-[-0.05em] text-foreground md:text-7xl">
            {project.title}
          </h1>
          <p className="mt-7 max-w-3xl text-pretty text-xl leading-9 text-muted-foreground md:text-2xl">
            {project.outcome}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {project.demo && (
              <Button asChild className="rounded-full">
                <a href={project.demo} target="_blank" rel="noreferrer">
                  Visit live product
                  <ArrowUpRight data-icon="inline-end" />
                </a>
              </Button>
            )}
            {project.github && (
              <Button variant="outline" asChild className="rounded-full">
                <a href={project.github} target="_blank" rel="noreferrer">
                  Source code
                  <Github data-icon="inline-end" />
                </a>
              </Button>
            )}
          </div>
        </header>

        <div className="container mx-auto mt-16 px-4 md:px-6 lg:mt-24">
          {project.image && (
            <figure className="relative mb-16 aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_30px_90px_hsl(var(--primary)/0.12)] lg:mb-24">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" aria-hidden="true" />
            </figure>
          )}

          <dl className="grid border-y border-border md:grid-cols-3">
            <div className="py-6 md:pr-8">
              <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Role</dt>
              <dd className="mt-2 text-foreground">{project.role}</dd>
            </div>
            <div className="border-t border-border py-6 md:border-l md:border-t-0 md:px-8">
              <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Focus</dt>
              <dd className="mt-2 text-foreground">{project.category} systems and product infrastructure</dd>
            </div>
            <div className="border-t border-border py-6 md:border-l md:border-t-0 md:pl-8">
              <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Stack</dt>
              <dd className="mt-2 text-foreground">{project.tags.slice(0, 4).join(" · ")}</dd>
            </div>
          </dl>

          <div className="mt-16 grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
            <h2 className="text-3xl font-medium tracking-tight text-foreground">The engineering story</h2>
            <div className="flex flex-col gap-12">
              <section aria-labelledby="challenge-title">
                <p className="section-kicker">01 · Constraint</p>
                <h3 id="challenge-title" className="mt-3 text-2xl font-medium tracking-tight text-foreground">The challenge</h3>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">{project.challenge}</p>
              </section>
              <section aria-labelledby="approach-title">
                <p className="section-kicker">02 · System</p>
                <h3 id="approach-title" className="mt-3 text-2xl font-medium tracking-tight text-foreground">The approach</h3>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">{project.approach}</p>
              </section>
              <section aria-labelledby="result-title">
                <p className="section-kicker">03 · Delivery</p>
                <h3 id="result-title" className="mt-3 text-2xl font-medium tracking-tight text-foreground">What shipped</h3>
                <ul className="mt-5 flex flex-col gap-4">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-lg leading-7 text-muted-foreground">
                      <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-primary" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
