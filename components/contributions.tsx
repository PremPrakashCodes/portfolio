import { fetchExternalContributions } from "@/lib/github";
import SectionHeader from "./section-header";
import ContributionCards from "./contribution-cards";

export default async function Contributions() {
  const contributions = await fetchExternalContributions();

  if (contributions.length === 0) return null;

  return (
    <section id="contributions" className="py-14 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div
        className="absolute inset-0 bg-black/5"
        style={{
          maskImage: "radial-gradient(ellipse at center, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent)",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="space-y-16">
          <SectionHeader
            title="Open Source Contributions"
            description="Pull requests I've contributed to open source projects across the community."
          />

          <ContributionCards contributions={contributions} />
        </div>
      </div>
    </section>
  );
}
