import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
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
      className="group block h-full rounded-2xl"
    >
      <Card className="flex h-full flex-col overflow-hidden rounded-2xl border-border bg-card/60 shadow-none transition-[border-color,box-shadow,transform] duration-300 group-hover:-translate-y-1 group-hover:border-foreground/20 group-hover:shadow-[0_22px_70px_hsl(var(--background)/0.45)]">
        {image && (
          <div
            className={cn(
              "relative overflow-hidden border-b border-border bg-secondary",
              featured ? "aspect-[2.25/1]" : "aspect-[16/8.5]",
            )}
          >
            <Image
              src={image}
              alt=""
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025]"
              priority={featured}
              sizes={featured ? "(max-width: 768px) 100vw, 1152px" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            />
            <div aria-hidden="true" className="absolute inset-0 ring-1 ring-inset ring-foreground/5" />
          </div>
        )}

        <CardHeader className={cn("gap-0 p-6 pb-0", featured && "md:p-8 md:pb-0")}>
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-signal">
              {tags[0] ?? "Engineering"}
            </p>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock aria-hidden="true" className="size-3.5" />
              {readTime}
            </p>
          </div>

          <CardTitle className={cn("mt-5 text-balance text-xl font-medium leading-snug tracking-[-0.025em] text-foreground transition-colors group-hover:text-signal", featured && "md:text-3xl")}>
            <h3>{title}</h3>
          </CardTitle>
        </CardHeader>

        <CardContent className={cn("flex-1 p-6 pb-0 pt-4", featured && "md:p-8 md:pb-0 md:pt-4")}>
          <CardDescription className={cn("line-clamp-2 text-sm leading-6", featured && "max-w-3xl md:text-base md:leading-7")}>
            {description}
          </CardDescription>
        </CardContent>

        <CardFooter className={cn("mt-6 flex items-center justify-between gap-4 border-t border-border p-6 py-5", featured && "md:px-8")}>
          <time dateTime={date} className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar aria-hidden="true" className="size-3.5" />
            {publishedDate}
          </time>
          <span className="flex items-center gap-2 text-sm font-medium text-foreground">
            Read article
            <span className="flex size-7 items-center justify-center rounded-full border border-border bg-secondary transition-colors group-hover:border-signal/30 group-hover:bg-signal group-hover:text-background">
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </span>
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
