import { fetchExternalContributions } from "@/lib/github";
import { FaStar } from "react-icons/fa";
import ScrollAnimation from "./scroll-animation";

export default async function ContributionsGrid() {
  const contributions = await fetchExternalContributions();

  if (contributions.length === 0) return null;

  return (
    <ScrollAnimation animation="stagger" className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {contributions.map((repo) => (
        <div key={repo.repo} className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <a
              href={repo.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-white/90 hover:text-blue-400 transition-colors"
            >
              {repo.repo}
            </a>
            <span className="flex items-center gap-1 text-xs text-amber-400">
              <FaStar className="w-3 h-3" />
              {repo.stars.toLocaleString()}
            </span>
          </div>
          <ul className="space-y-2">
            {repo.prs.map((pr) => (
              <li key={pr.url} className="flex items-start gap-2">
                <span
                  className={`mt-1 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                    pr.state === "merged"
                      ? "bg-violet-500/10 text-violet-400 border border-violet-500/20"
                      : "bg-green-500/10 text-green-400 border border-green-500/20"
                  }`}
                >
                  {pr.state}
                </span>
                <a
                  href={pr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {pr.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </ScrollAnimation>
  );
}
