import { ArrowUpRight, Award, GraduationCap } from "lucide-react";
import { certificates, educationData } from "@/lib/data";

export default function EducationCertifications() {
  return (
    <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
      <section aria-labelledby="education-list-title">
        <div className="flex items-center gap-3">
          <GraduationCap aria-hidden="true" className="size-5 text-signal" />
          <h3 id="education-list-title" className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Education</h3>
        </div>
        <div className="mt-7 border-x border-t border-border">
          {educationData.map((edu, index) => (
            <article key={edu.id} className="border-b border-border p-6 transition-colors hover:bg-card/45">
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-xs text-primary">{edu.duration}</p>
                <span className="font-mono text-[0.56rem] uppercase tracking-[0.12em] text-muted-foreground">EDU / 0{index + 1}</span>
              </div>
              <h4 className="mt-3 text-xl font-medium tracking-tight text-foreground">{edu.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{edu.institution}</p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{edu.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="certifications-list-title">
        <div className="flex items-center gap-3">
          <Award aria-hidden="true" className="size-5 text-signal" />
          <h3 id="certifications-list-title" className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Credentials</h3>
        </div>
        <div className="mt-7 border-x border-t border-border">
          {certificates.map((cert) => (
            <a key={cert.id} href={cert.link} target="_blank" rel="noreferrer" className="group grid gap-3 border-b border-border p-5 transition-colors hover:bg-card/45 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="flex min-w-0 items-start gap-3">
                <cert.icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                <div>
                  <h4 className="font-medium text-foreground transition-colors group-hover:text-primary">{cert.title}</h4>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{cert.institution} · {cert.duration.replace("Issued: ", "")}</p>
                </div>
              </div>
              <ArrowUpRight aria-hidden="true" className="ml-7 size-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:ml-0" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
