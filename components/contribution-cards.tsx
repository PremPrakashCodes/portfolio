"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import type { RepoContributions } from "@/lib/github";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function StatusBadge({ state }: { state: "merged" | "closed" | "open" }) {
  const styles = {
    merged: "bg-green-500/10 text-green-400 border-green-500/20",
    closed: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    open: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };

  const labels = {
    merged: "Merged",
    closed: "Closed",
    open: "Open",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs border ${styles[state]}`}
    >
      {labels[state]}
    </span>
  );
}

export default function ContributionCards({
  contributions,
}: {
  contributions: RepoContributions[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {contributions.map((repo, index) => (
        <motion.div
          key={repo.repo}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative"
        >
          {/* Hover glow */}
          <div
            className="absolute -inset-[1px] bg-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:duration-200"
            style={{ opacity: 0.05 }}
          />

          {/* Card */}
          <div className="relative flex flex-col bg-black/40 p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
            {/* Repo Header */}
            <Link
              href={repo.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 mb-6 group/link"
            >
              <Image
                src={repo.ownerAvatar}
                alt={repo.repo.split("/")[0]}
                width={44}
                height={44}
                className="rounded-xl"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold tracking-tight text-white/90 group-hover/link:text-blue-400 transition-colors">
                  {repo.repo}
                </h3>
                {repo.stars > 0 && (
                  <span className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                    <FaStar className="w-3 h-3 text-yellow-500" />
                    {repo.stars.toLocaleString()}
                  </span>
                )}
              </div>
            </Link>

            {/* PR List */}
            <ul className="space-y-4">
              {repo.prs.map((pr) => (
                <li key={pr.url} className="border-t border-white/5 pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-300 hover:text-white transition-colors leading-snug flex-1"
                    >
                      {pr.title}
                    </Link>
                    <StatusBadge state={pr.state} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(pr.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
