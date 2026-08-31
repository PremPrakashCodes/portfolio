import { ArrowUpRight, CheckCircle2, Mail } from "lucide-react";
import ContactForm from "@/components/contact-form";
import { socialLinks } from "@/lib/data";
import { siteConfig } from "@/lib/site";

const goodFit = [
  "Production AI and LLM workflows",
  "Backend platforms and API architecture",
  "Full-stack product development",
] as const;

export default function ContactPage() {
  return (
    <main id="main-content" className="pb-24 pt-28 md:pb-32 md:pt-36">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 xl:gap-28">
          <section aria-labelledby="contact-title" className="lg:sticky lg:top-32 lg:self-start">
            <p className="section-kicker">Communication channel / Available</p>
            <h1 id="contact-title" className="mt-4 max-w-xl text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.05em] text-foreground md:text-6xl">
              Let&apos;s build something <span className="highlight-text">useful.</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-muted-foreground">
              Tell me what you&apos;re building, where the difficult part is, and
              what a successful outcome looks like. I&apos;ll reply with a clear
              next step.
            </p>

            <div className="mt-10 border-x border-t border-border bg-card/25">
              <div className="flex items-center justify-between border-b border-border px-5 py-3 font-mono text-[0.58rem] uppercase tracking-[0.12em]">
                <span className="text-muted-foreground">Fit check</span>
                <span className="text-signal">03 capabilities</span>
              </div>
              <ul>
                {goodFit.map((item, index) => (
                  <li key={item} className="flex items-center gap-3 border-b border-border px-5 py-4 text-sm text-foreground">
                    <span className="font-mono text-[0.58rem] text-muted-foreground">0{index + 1}</span>
                    <CheckCircle2 aria-hidden="true" className="size-4 shrink-0 text-signal" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7">
              <p className="text-sm text-muted-foreground">Prefer email?</p>
              <a href={`mailto:${siteConfig.email}`} className="link-arrow mt-2 break-all text-base">
                <Mail aria-hidden="true" className="size-4" />
                {siteConfig.email}
              </a>
            </div>
          </section>

          <ContactForm />
        </div>

        <section className="mt-20 border-t border-border pt-8 md:mt-28" aria-labelledby="elsewhere-title">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="section-kicker">Elsewhere</p>
              <h2 id="elsewhere-title" className="mt-3 text-2xl font-medium tracking-tight text-foreground">Follow the work in public.</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              {socialLinks.filter((link) => link.label !== "Email").map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="group inline-flex min-h-12 items-center justify-between gap-4 border border-border bg-card/50 px-5 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary">
                  <span className="flex items-center gap-2">
                    <link.icon aria-hidden="true" className="size-4" />
                    {link.label}
                  </span>
                  <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
