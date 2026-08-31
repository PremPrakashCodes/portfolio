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
        <article key={category.name} className={`group relative border-b border-border p-6 transition-colors hover:bg-card/45 md:p-8 ${index % 2 === 0 ? "md:border-r" : ""}`}>
          <div className="flex items-center justify-between gap-4">
            <span className="grid size-9 place-items-center border border-border bg-background/60 text-signal"><category.icon aria-hidden="true" className="size-4" /></span>
            <span className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-muted-foreground">STACK / 0{index + 1}</span>
          </div>
          <h3 className="mt-5 text-xl font-medium tracking-tight text-foreground">{category.name}</h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{category.description}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {category.items.map((item) => (
              <li key={item.label} className="inline-flex items-center gap-2 border border-border bg-background/50 px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.06em] text-foreground transition-colors group-hover:border-border/90">
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
