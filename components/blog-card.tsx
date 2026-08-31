import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type BlogCardProps = {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
  image?: string;
  featured?: boolean;
};

export default function BlogCard({
  title,
  description,
  date,
  readTime,
  tags,
  slug,
  image,
  featured = false,
}: BlogCardProps) {
  const publishedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${slug}`}
      aria-label={`Read ${title}`}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Card className="relative flex h-full flex-col overflow-hidden rounded-none border-border bg-card/45 shadow-none transition-[border-color,background-color] duration-500 group-hover:border-primary/45 group-hover:bg-card/65">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px origin-left scale-x-0 bg-gradient-to-r from-signal via-primary to-transparent transition-transform duration-700 group-hover:scale-x-100" />

        {image && (
          <div
            className={cn(
              "relative overflow-hidden border-b border-border bg-secondary",
              featured ? "aspect-[2.25/1]" : "aspect-[16/9]",
            )}
          >
            <Image
              src={image}
              alt=""
              fill
              className="object-cover opacity-70 saturate-[0.7] transition-[transform,opacity,filter] duration-700 ease-out group-hover:scale-[1.025] group-hover:opacity-90 group-hover:saturate-100"
              priority={featured}
              sizes={featured ? "(max-width: 768px) 100vw, 1152px" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            />
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,hsl(var(--card)/0.92)),linear-gradient(90deg,hsl(var(--background)/0.22),transparent_55%)]" />
            <div aria-hidden="true" className="absolute inset-0 opacity-25 [background-image:linear-gradient(hsl(var(--foreground)/0.08)_1px,transparent_1px)] [background-size:100%_4px]" />

            <div className="absolute left-4 top-4 flex items-center gap-2 border border-border bg-background/80 px-2.5 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-sm">
              <FileText aria-hidden="true" className="size-3 text-signal" />
              Field note
            </div>
            <div className="absolute right-4 top-4 flex items-center gap-2 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-primary">
              <span aria-hidden="true" className="size-1.5 bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.7)]" />
              Published
            </div>
          </div>
        )}

        <CardHeader className={cn("gap-0 p-6 pb-0", featured && "md:p-8 md:pb-0")}>
          <div className="flex items-center justify-between gap-4 border-b border-border pb-4 font-mono text-[0.6rem] uppercase tracking-[0.12em]">
            <p className="text-signal">{tags[0] ?? "Engineering"}</p>
            <p className="flex items-center gap-1.5 text-muted-foreground">
              <Clock aria-hidden="true" className="size-3.5" />
              {readTime}
            </p>
          </div>

          <CardTitle className={cn("mt-6 text-balance text-2xl font-medium leading-[1.18] tracking-[-0.035em] text-foreground transition-colors group-hover:text-primary", featured && "md:text-3xl")}>
            <h3>{title}</h3>
          </CardTitle>
        </CardHeader>

        <CardContent className={cn("flex-1 p-6 pb-0 pt-4", featured && "md:p-8 md:pb-0 md:pt-4")}>
          <CardDescription className={cn("line-clamp-3 text-sm leading-6", featured && "max-w-3xl md:text-base md:leading-7")}>
            {description}
          </CardDescription>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Article topics">
            {tags.slice(1, 4).map((tag) => (
              <li key={tag} className="border border-border bg-background/45 px-2 py-1 font-mono text-[0.56rem] uppercase tracking-[0.08em] text-muted-foreground">
                {tag}
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className={cn("relative mt-6 flex items-center justify-between gap-4 border-t border-border p-6 py-5", featured && "md:px-8")}>
          <time dateTime={date} className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground">
            <Calendar aria-hidden="true" className="size-3.5" />
            {publishedDate}
          </time>
          <span className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-foreground transition-colors group-hover:text-primary">
            Open note
            <ArrowRight aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
