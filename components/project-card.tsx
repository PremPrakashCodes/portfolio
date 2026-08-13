import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProjectCardProps = {
  slug: string;
  title: string;
  eyebrow: string;
  outcome: string;
  description: string;
  tags: readonly string[];
  github: string;
  demo: string;
  image?: string;
  imageAlt?: string;
};

export default function ProjectCard({
  slug,
  title,
  eyebrow,
  outcome,
  tags,
  github,
  demo,
  image,
  imageAlt,
}: ProjectCardProps) {
  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card/50 shadow-none transition-colors hover:border-primary/40">
      {image && (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-secondary">
          <Image
            src={image}
            alt={imageAlt || ""}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/45 via-transparent to-transparent" aria-hidden="true" />
        </div>
      )}
      <CardHeader className="gap-5 p-6 md:p-8">
        <div className="flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <span>{eyebrow}</span>
          <span aria-hidden="true">↗</span>
        </div>
        <CardTitle>
          <h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            <Link href={`/projects/${slug}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span className="absolute inset-0" aria-hidden="true" />
              {title}
            </Link>
          </h2>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-6 px-6 pb-6 md:px-8 md:pb-8">
        <p className="max-w-xl text-lg leading-7 text-muted-foreground">{outcome}</p>
        <ul className="mt-auto flex flex-wrap gap-2" aria-label="Technologies used">
          {tags.slice(0, 6).map((tag) => (
            <li key={tag} className="rounded-full border border-border bg-background/60 px-3 py-1 font-mono text-[0.7rem] text-muted-foreground">
              {tag}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="relative flex-wrap gap-4 border-t border-border px-6 py-5 md:px-8">
        <Link href={`/projects/${slug}`} className="link-arrow relative z-10">
          Read case study
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
        <div className="ml-auto flex gap-4">
          {github && (
            <a href={github} target="_blank" rel="noreferrer" className="relative z-10 text-muted-foreground transition-colors hover:text-foreground" aria-label={`${title} source code`}>
              <Github aria-hidden="true" className="size-4" />
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noreferrer" className="relative z-10 text-muted-foreground transition-colors hover:text-foreground" aria-label={`${title} live website`}>
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
