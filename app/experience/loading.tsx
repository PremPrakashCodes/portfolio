export default function Loading() {
  return (
    <main className="pb-24 pt-28 md:pb-32 md:pt-36">
      <div className="container mx-auto flex flex-col gap-28 px-4 md:px-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <section key={i}>
            <div className="mb-12 flex flex-col gap-4">
              <div className="h-3 w-40 animate-pulse bg-primary/10" />
              <div className="h-10 w-2/3 animate-pulse bg-card" />
            </div>
            <div className="flex flex-col border-x border-t border-border">
              {Array.from({ length: 2 }).map((_, j) => (
                <div key={j} className="border-b border-border p-6">
                  <div className="mb-5 h-4 w-24 animate-pulse bg-primary/10" />
                  <div className="mb-3 h-7 w-48 animate-pulse bg-secondary" />
                  <div className="flex flex-col gap-2">
                    <div className="h-4 w-full animate-pulse bg-secondary/70" />
                    <div className="h-4 w-5/6 animate-pulse bg-secondary/70" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
