export default function Loading() {
  return (
    <main className="pb-24 pt-28 md:pb-32 md:pt-36">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 flex max-w-3xl flex-col gap-4 border-b border-border pb-12">
          <div className="h-3 w-36 animate-pulse bg-primary/10" />
          <div className="h-14 w-3/4 animate-pulse bg-card" />
          <div className="h-5 w-full animate-pulse bg-card/70" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="overflow-hidden border border-border bg-card/35">
              <div className="aspect-[16/9] animate-pulse border-b border-border bg-secondary/60" />
              <div className="flex flex-col gap-3 p-6">
                <div className="flex gap-2">
                  <div className="h-5 w-14 animate-pulse border border-border bg-primary/10" />
                  <div className="h-5 w-14 animate-pulse border border-border bg-primary/10" />
                </div>
                <div className="h-6 w-3/4 animate-pulse bg-secondary" />
                <div className="h-4 w-full animate-pulse bg-secondary/70" />
                <div className="h-4 w-2/3 animate-pulse bg-secondary/70" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
