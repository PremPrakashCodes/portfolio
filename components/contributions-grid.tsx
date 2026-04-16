import Image from "next/image";
import { fetchExternalContributions } from "@/lib/github";
import { FaStar } from "react-icons/fa";
import ScrollAnimation from "./scroll-animation";

export default async function ContributionsGrid() {
  const contributions = await fetchExternalContributions();

  if (contributions.length === 0) return null;

  return (
    <ScrollAnimation
      animation="stagger"
      className="columns-1 md:columns-2 gap-6"
    >
      {contributions.map((repo) => (
        <div key={repo.repo} className="glass-card p-6 break-inside-avoid mb-6">
          <div className="flex items-center gap-3 pb-4 mb-3 border-b border-white/5">
            <Image
              src={repo.ownerAvatar}
              alt=""
              width={32}
              height={32}
              className="w-8 h-8 rounded-full flex-shrink-0 ring-1 ring-white/10"
              unoptimized
            />
            <a
              href={repo.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-white/90 hover:text-blue-400 transition-colors min-w-0 truncate"
            >
              {repo.repo}
            </a>
            <span className="flex items-center gap-1 text-xs text-amber-400 flex-shrink-0 ml-auto">
              <FaStar className="w-3 h-3" />
              {repo.stars.toLocaleString()}
            </span>
          </div>
          <ul className="space-y-0.5">
            {repo.prs.map((pr) => {
              const dateSource = pr.mergedAt ?? pr.createdAt;
              const dateStr = new Date(dateSource).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });
              return (
                <li key={pr.url}>
                  <a
                    href={pr.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-2 -mx-2 px-2 py-2 rounded-md hover:bg-white/5 transition-colors"
                  >
                    <span
                      className={`mt-0.5 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                        pr.state === "merged"
                          ? "bg-violet-500/10 text-violet-400 border border-violet-500/20"
                          : "bg-green-500/10 text-green-400 border border-green-500/20"
                      }`}
                    >
                      {pr.state}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        {pr.title}
                      </div>
                      <div className="mt-0.5 text-xs text-gray-500">
                        {dateStr}
                      </div>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </ScrollAnimation>
  );
}
