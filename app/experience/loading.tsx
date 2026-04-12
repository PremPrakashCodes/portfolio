export default function Loading() {
  return (
    <main className="section-padding">
      <div className="container mx-auto px-4 md:px-6 space-y-28">
        {/* Section skeleton */}
        {Array.from({ length: 3 }).map((_, i) => (
          <section key={i}>
            <div className="space-y-4 text-center mb-16">
              <div className="h-10 w-48 bg-white/5 rounded-lg animate-pulse mx-auto" />
              <div className="h-6 w-80 bg-white/5 rounded-lg animate-pulse mx-auto" />
            </div>
            <div className="space-y-6">
              {Array.from({ length: 2 }).map((_, j) => (
                <div key={j} className="glass-card p-6 rounded-2xl">
                  <div className="h-4 w-24 bg-blue-500/10 rounded animate-pulse mb-2" />
                  <div className="h-6 w-48 bg-white/5 rounded animate-pulse mb-1" />
                  <div className="h-4 w-36 bg-white/5 rounded animate-pulse mb-4" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                    <div className="h-4 w-5/6 bg-white/5 rounded animate-pulse" />
                    <div className="h-4 w-4/6 bg-white/5 rounded animate-pulse" />
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
