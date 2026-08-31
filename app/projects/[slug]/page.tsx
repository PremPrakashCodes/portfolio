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
          <div className="grid gap-10 border-b border-border pb-12 lg:grid-cols-[1fr_0.32fr] lg:items-end lg:gap-16">
            <div>
              <p className="section-kicker">Case file / {project.category}</p>
              <h1 className="mt-4 max-w-5xl text-balance text-5xl font-semibold leading-none tracking-[-0.05em] text-foreground md:text-7xl">
                {project.title}
              </h1>
              <p className="mt-7 max-w-3xl text-pretty text-xl leading-9 text-muted-foreground md:text-2xl">
                {project.outcome}
              </p>
            </div>
            <dl className="border-y border-border py-5 font-mono text-[0.62rem] uppercase tracking-[0.12em] lg:border-y-0 lg:border-l lg:py-0 lg:pl-7">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-foreground">System state</dt>
                <dd className="flex items-center gap-2 text-primary"><span className="size-1.5 bg-primary" /> Verified</dd>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-4">
                <dt className="text-muted-foreground">Case ID</dt>
                <dd className="text-foreground">{project.slug.slice(0, 8).toUpperCase()}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.demo && (
              <Button asChild className="rounded-none">
                <a href={project.demo} target="_blank" rel="noreferrer">
                  Visit live product
                  <ArrowUpRight data-icon="inline-end" />
                </a>
              </Button>
            )}
            {project.github && (
              <Button variant="outline" asChild className="rounded-none">
                <a href={project.github} target="_blank" rel="noreferrer">
                  Source code
                  <Github data-icon="inline-end" />
                </a>
              </Button>
            )}
          </div>
        </header>

        <div className="container mx-auto mt-12 px-4 md:px-6 lg:mt-16">
          {project.image && (
            <figure className="group relative mb-16 aspect-[16/10] overflow-hidden border border-border bg-card lg:mb-20">
              <Image
                src={project.image}
                alt={project.imageAlt}
                fill
                priority
                className="object-cover opacity-90 transition-[transform,opacity] duration-700 group-hover:scale-[1.01] group-hover:opacity-100"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_70%,hsl(var(--background)/0.7))]" aria-hidden="true" />
              <div className="absolute left-4 top-4 border border-border bg-background/85 px-3 py-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-sm">Architecture map</div>
              <div className="absolute bottom-4 right-4 flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-signal"><span className="size-1.5 bg-signal" /> Signal nominal</div>
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
            <div>
              <p className="section-kicker">System log</p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground">The engineering story</h2>
            </div>
            <div className="border-t border-border">
              <section aria-labelledby="challenge-title" className="border-b border-border py-9">
                <p className="section-kicker">01 · Constraint</p>
                <h3 id="challenge-title" className="mt-3 text-2xl font-medium tracking-tight text-foreground">The challenge</h3>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">{project.challenge}</p>
              </section>
              <section aria-labelledby="approach-title" className="border-b border-border py-9">
                <p className="section-kicker">02 · System</p>
                <h3 id="approach-title" className="mt-3 text-2xl font-medium tracking-tight text-foreground">The approach</h3>
                <p className="mt-4 text-lg leading-8 text-muted-foreground">{project.approach}</p>
              </section>
              <section aria-labelledby="result-title" className="py-9">
                <p className="section-kicker">03 · Delivery</p>
                <h3 id="result-title" className="mt-3 text-2xl font-medium tracking-tight text-foreground">What shipped</h3>
                <ul className="mt-5 flex flex-col gap-4">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-lg leading-7 text-muted-foreground">
                      <span className="mt-1 grid size-5 shrink-0 place-items-center border border-primary/35 bg-primary/10"><Check aria-hidden="true" className="size-3 text-primary" /></span>
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
