export default function SectionBackground() {
  return (
    <>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div
        className="absolute inset-0 bg-black/5"
        style={{
          maskImage: "radial-gradient(ellipse at center, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent)",
        }}
      />
    </>
  );
}
