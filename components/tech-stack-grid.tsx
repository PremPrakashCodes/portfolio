import {
  SiAmazonwebservices,
  SiDocker,
  SiFastapi,
  SiGithubactions,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { Braces, Database, Orbit, ServerCog } from "lucide-react";

const categories = [
  {
    name: "Languages & product UI",
    description: "Typed interfaces and responsive experiences that stay easy to evolve.",
    icon: Braces,
    items: [
      { label: "Python", icon: SiPython },
      { label: "TypeScript", icon: SiTypescript },
      { label: "JavaScript", icon: SiJavascript },
      { label: "React", icon: SiReact },
      { label: "Next.js", icon: SiNextdotjs },
      { label: "Tailwind CSS", icon: SiTailwindcss },
    ],
  },
  {
    name: "Backend & APIs",
    description: "Type-safe services, integrations, and asynchronous workflows built for production.",
    icon: ServerCog,
    items: [
      { label: "Node.js", icon: SiNodedotjs },
      { label: "FastAPI", icon: SiFastapi },
      { label: "tRPC" },
      { label: "Express" },
      { label: "REST APIs" },
      { label: "Dramatiq" },
    ],
  },
  {
    name: "Data & persistence",
    description: "Practical data models, queues, and storage choices for reliable systems.",
    icon: Database,
    items: [
      { label: "PostgreSQL", icon: SiPostgresql },
      { label: "MongoDB", icon: SiMongodb },
      { label: "Redis", icon: SiRedis },
      { label: "Supabase" },
      { label: "SQLAlchemy" },
      { label: "Prisma / Drizzle" },
    ],
  },
  {
    name: "AI, cloud & operations",
    description: "Observable LLM workflows and repeatable delivery from container to cloud.",
    icon: Orbit,
    items: [
      { label: "OpenAI", icon: SiOpenai },
      { label: "LiteLLM" },
      { label: "Langfuse" },
      { label: "Docker", icon: SiDocker },
      { label: "AWS", icon: SiAmazonwebservices },
      { label: "GitHub Actions", icon: SiGithubactions },
    ],
  },
] as const;

export default function TechStackGrid() {
  return (
    <div className="grid border-x border-t border-border md:grid-cols-2">
      {categories.map((category, index) => (
        <article key={category.name} className={`border-b border-border p-6 md:p-8 ${index % 2 === 0 ? "md:border-r" : ""}`}>
          <category.icon aria-hidden="true" className="size-5 text-signal" />
          <h3 className="mt-5 text-xl font-medium tracking-tight text-foreground">{category.name}</h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{category.description}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {category.items.map((item) => (
              <li key={item.label} className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-2 text-xs text-foreground">
                {"icon" in item && item.icon ? <item.icon aria-hidden="true" className="size-3.5 text-primary" /> : null}
                {item.label}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
