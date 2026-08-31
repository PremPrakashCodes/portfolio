import { BriefcaseBusiness, Check } from "lucide-react";
import { experienceData } from "@/lib/data";

export default function ExperienceTimeline() {
  return (
    <ol className="border-x border-t border-border bg-card/20">
      {experienceData.map((job, index) => (
        <li key={`${job.company}-${job.title}`} className="group relative grid gap-8 border-b border-border p-6 transition-colors hover:bg-card/45 md:p-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-primary transition-transform duration-500 group-hover:scale-y-100" />
          <div className="lg:border-r lg:border-border lg:pr-8">
            <div className="flex items-center justify-between gap-4 lg:block">
              <span className="inline-flex border border-primary/30 bg-primary/10 px-2 py-1 font-mono text-[0.62rem] text-primary">NODE / 0{index + 1}</span>
              <time className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground lg:mt-5 lg:block">{job.date}</time>
            </div>
            <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <BriefcaseBusiness aria-hidden="true" className="size-4 text-signal" />
              {job.company}
              {"location" in job && job.location ? ` · ${job.location}` : ""}
            </div>
          </div>

          <article className="min-w-0">
            <h3 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">{job.title}</h3>
            <ul className="mt-7 grid gap-4 xl:grid-cols-2 xl:gap-x-10">
              {job.description.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-7 text-muted-foreground">
                  <span className="mt-1.5 flex size-4 shrink-0 items-center justify-center border border-signal/30 bg-signal/10">
                    <Check aria-hidden="true" className="size-2.5 text-signal" />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        </li>
      ))}
    </ol>
  );
}
