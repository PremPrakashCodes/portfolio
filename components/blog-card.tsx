import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";

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
  featured,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block h-full">
      <div className="glass-card-hover overflow-hidden rounded-2xl h-full flex flex-col">
        {image && (
          <div className={`relative w-full overflow-hidden ${featured ? "aspect-[2.4/1]" : "aspect-[16/9]"}`}>
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority={featured}
            />
          </div>
        )}
        <div className={`flex flex-col flex-1 ${featured ? "p-8 md:p-10" : "p-5 md:p-6"}`}>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full text-xs bg-blue-500/10 border border-blue-500/20 text-blue-400"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className={`font-semibold text-white/90 group-hover:text-blue-400 transition-colors mb-2 ${featured ? "text-2xl md:text-3xl" : "text-lg"}`}>
            {title}
          </h3>

          <p className={`text-gray-400 leading-relaxed ${featured ? "text-base" : "text-sm line-clamp-2"}`}>
            {description}
          </p>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {readTime}
              </span>
            </div>
            <span className="text-xs text-gray-500 group-hover:text-blue-400 transition-colors flex items-center gap-1">
              Read more
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
