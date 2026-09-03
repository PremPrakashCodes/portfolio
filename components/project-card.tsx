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
import { cn } from "@/lib/utils";

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
  featured?: boolean;
};

const systemPaths: Record<string, readonly string[]> = {
  "document-intelligence": ["Upload", "Extract", "Normalize", "Verify"],
  ubik: ["Intent", "Planner", "Tools", "Action"],
  "document-classification": ["Webhook", "Queue", "OCR", "Classify"],
  brandiligence: ["Checkout", "PayPal", "Webhook", "Access"],
  "developer-portfolio": ["Content", "Build", "Edge", "Observe"],
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
  featured = false,
}: ProjectCardProps) {
  const systemPath = systemPaths[slug] ?? ["Input", "Process", "Verify", "Output"];

  return (
    <Card className={cn("system-card group relative grid h-full overflow-hidden rounded-none bg-card/45 shadow-none transition-colors hover:border-primary/40", featured && "lg:col-span-2 lg:grid-cols-[1.15fr_0.85fr]")}>
      {image && (
        <div className={cn("system-card__visual relative overflow-hidden border-b border-border bg-secondary", featured ? "aspect-[16/9] lg:order-2 lg:aspect-auto lg:border-b-0 lg:border-l" : "aspect-[16/9]")}>
          <Image
            src={image}
            alt={imageAlt || ""}
            fill
            priority={featured}
            className="object-cover opacity-75 saturate-[0.65] transition-all duration-700 ease-out group-hover:scale-[1.025] group-hover:opacity-90 group-hover:saturate-100"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,hsl(var(--card)/0.3),transparent_45%,hsl(var(--primary)/0.08))]" aria-hidden="true" />
          <span className="absolute right-4 top-4 border border-border bg-background/80 px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-primary backdrop-blur">SYSTEM / ONLINE</span>
        </div>
      )}
      <div className="flex min-w-0 flex-col">
        <CardHeader className="gap-5 p-6 md:p-8">
          <div className="flex items-center justify-between gap-4 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
            <span>{eyebrow}</span>
            <span>CASE / {slug.slice(0, 4).toUpperCase()}</span>
          </div>
          <CardTitle>
            <h2 className="text-3xl font-medium tracking-[-0.035em] text-foreground md:text-4xl">
              <Link href={`/projects/${slug}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <span className="absolute inset-0" aria-hidden="true" />
                {title}
              </Link>
            </h2>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-6 px-6 pb-6 md:px-8 md:pb-8">
          <p className="max-w-xl text-base leading-7 text-muted-foreground md:text-lg">{outcome}</p>
          <ol className="system-path" aria-label={`${title} system path`}>
            {systemPath.map((stage, index) => (
              <li key={stage}>
                <span>0{index + 1}</span>
                <strong>{stage}</strong>
                {index < systemPath.length - 1 && <i aria-hidden="true" />}
              </li>
            ))}
          </ol>
          <ul className="mt-auto flex flex-wrap gap-2" aria-label="Technologies used">
            {tags.slice(0, featured ? 8 : 5).map((tag) => (
              <li key={tag} className="border border-border bg-background/60 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.06em] text-muted-foreground">
                {tag}
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="relative flex-wrap gap-4 border-t border-border px-6 py-5 md:px-8">
          <Link href={`/projects/${slug}`} className="link-arrow relative z-10">
            Inspect architecture
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <div className="ml-auto flex gap-4">
            {github && (
              <a href={github} target="_blank" rel="noreferrer" className="relative z-10 text-muted-foreground transition-colors hover:text-primary" aria-label={`${title} source code`}>
                <Github aria-hidden="true" className="size-4" />
              </a>
            )}
            {demo && (
              <a href={demo} target="_blank" rel="noreferrer" className="relative z-10 text-muted-foreground transition-colors hover:text-primary" aria-label={`${title} live website`}>
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            )}
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
