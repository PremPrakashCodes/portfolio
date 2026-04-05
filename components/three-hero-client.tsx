"use client";

import dynamic from "next/dynamic";

const ThreeHero = dynamic(() => import("@/components/three-hero"), {
  ssr: false,
  loading: () => (
    <section className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </section>
  ),
});

export default function ThreeHeroClient() {
  return <ThreeHero />;
}
