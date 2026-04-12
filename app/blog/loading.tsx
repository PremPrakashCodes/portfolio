export default function Loading() {
  return (
    <main className="section-padding">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header skeleton */}
        <div className="max-w-2xl mb-16 space-y-4">
          <div className="h-12 w-64 bg-white/5 rounded-lg animate-pulse" />
          <div className="h-6 w-96 bg-white/5 rounded-lg animate-pulse" />
        </div>

        {/* Blog grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-card rounded-2xl overflow-hidden">
              <div className="aspect-[16/9] bg-white/5 animate-pulse" />
              <div className="p-6 space-y-3">
                <div className="flex gap-2">
                  <div className="h-5 w-14 bg-blue-500/10 rounded-full animate-pulse" />
                  <div className="h-5 w-14 bg-blue-500/10 rounded-full animate-pulse" />
                </div>
                <div className="h-5 w-3/4 bg-white/5 rounded animate-pulse" />
                <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-white/5 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
