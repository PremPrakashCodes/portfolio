interface SectionHeaderProps {
  title: string;
  description: string;
  eyebrow?: string;
  as?: "h1" | "h2";
  align?: "left" | "center";
}

export default function SectionHeader({
  title,
  description,
  eyebrow,
  as: Heading = "h2",
  align = "left",
}: SectionHeaderProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && <p className="section-kicker">{eyebrow}</p>}
      <Heading className="section-title mt-3">{title}</Heading>
      <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">{description}</p>
    </div>
  );
}
