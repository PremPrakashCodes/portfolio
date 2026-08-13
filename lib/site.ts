export const siteConfig = {
  name: "Prem Prakash Sharma",
  shortName: "Prem Prakash",
  url: "https://premprakash.dev",
  email: "premprakashsharma.dev@gmail.com",
  title: "Software Developer building production AI systems",
  description:
    "Software Developer building production AI systems, type-safe APIs, and scalable backend platforms with Python, TypeScript, FastAPI, Node.js, and AWS.",
} as const;

export const proofPoints = [
  { value: "2+", label: "Years building production software" },
  { value: "80k+", label: "Stars across contributed projects" },
  { value: "17", label: "Tests shipped with an OSS connector" },
  { value: "AI + backend", label: "Systems built for real workflows" },
] as const;

export const openSourceHighlights = [
  {
    repository: "archestra-ai/archestra",
    context: "Enterprise MCP and AI platform",
    summary:
      "Built an end-to-end Outline knowledge connector with incremental sync, checkpoint management, 17 unit tests, and frontend integration. Also restored access to files attached in chat.",
    impact: "Connector shipped after multiple review rounds",
    stars: "3.9k+ stars",
    links: [
      { label: "Outline connector PR #3938", href: "https://github.com/archestra-ai/archestra/pull/3938" },
      { label: "File access fix PR #4192", href: "https://github.com/archestra-ai/archestra/pull/4192" },
    ],
  },
  {
    repository: "tw93/Mole",
    context: "Mac cleanup and optimization tool",
    summary:
      "Contributed fixes for installed-app cache filtering and log cleanup paths, with work credited by the maintainer in project release notes.",
    impact: "Maintainer-recognized production fixes",
    stars: "57k+ stars",
    links: [
      { label: "View repository", href: "https://github.com/tw93/Mole" },
    ],
  },
  {
    repository: "kortix-ai/suna",
    context: "Open-source AI agent platform",
    summary:
      "Diagnosed and fixed EventSource memory leaks in the frontend API and improved contributor setup by standardizing Supabase CLI usage.",
    impact: "Improved stability and developer experience",
    stars: "19.8k+ stars",
    links: [
      { label: "Memory leak fix PR #1560", href: "https://github.com/kortix-ai/suna/pull/1560" },
      { label: "Setup fix PR #1551", href: "https://github.com/kortix-ai/suna/pull/1551" },
    ],
  },
] as const;
