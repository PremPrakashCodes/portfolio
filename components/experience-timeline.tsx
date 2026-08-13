import { BriefcaseBusiness, Check } from "lucide-react";
import { experienceData } from "@/lib/data";

export default function ExperienceTimeline() {
  return (
    <ol className="border-y border-border">
      {experienceData.map((job, index) => (
        <li key={`${job.company}-${job.title}`} className="grid gap-8 border-b border-border py-10 last:border-b-0 md:py-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16">
          <div>
            <div className="flex items-center justify-between gap-4 lg:block">
              <span className="font-mono text-xs text-primary">0{index + 1}</span>
              <time className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground lg:mt-5 lg:block">{job.date}</time>
            </div>
            <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <BriefcaseBusiness aria-hidden="true" className="size-4 text-signal" />
              {job.company}
              {"location" in job && job.location ? ` · ${job.location}` : ""}
            </div>
          </div>

          <article>
            <h3 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">{job.title}</h3>
            <ul className="mt-7 grid gap-4 xl:grid-cols-2 xl:gap-x-10">
              {job.description.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-7 text-muted-foreground">
                  <span className="mt-1.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-signal/30 bg-signal/10">
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
