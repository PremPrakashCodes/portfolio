import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

type BlogCardProps = {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
};

export default function BlogCard({
  title,
  description,
  date,
  readTime,
  tags,
  slug,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block h-full">
      <div className="glass-card-hover h-full p-8 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs bg-blue-500/10 border border-blue-500/20 text-blue-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-semibold text-white/90 group-hover:text-blue-400 transition-colors mb-3">
          {title}
        </h3>

        <p className="text-sm text-gray-400 leading-relaxed flex-1">
          {description}
        </p>

        <div className="flex items-center gap-4 mt-6 pt-4 border-t border-white/10 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
