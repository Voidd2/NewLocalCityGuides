function Skeleton({ className }: { className: string }) {
  return <div aria-hidden="true" className={`motion-safe:animate-pulse bg-gray-200 ${className}`} />;
}

export function RoutesSkeleton() {
  return (
    <div aria-busy="true">
      <section className="bg-navy-800 px-4 py-8 pb-12">
        <div className="mx-auto max-w-7xl">
          <Skeleton className="mb-3 h-8 w-56 rounded-lg bg-white/20" />
          <Skeleton className="mb-6 h-4 w-72 max-w-full rounded bg-white/10" />
          <div className="rounded-xl bg-white/10 p-4">
            <Skeleton className="mb-3 h-4 w-40 rounded bg-white/20" />
            <Skeleton className="h-3 w-full max-w-md rounded bg-white/10" />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-6">
        <Skeleton className="mb-2 h-6 w-52 rounded" />
        <Skeleton className="mb-6 h-4 w-64 rounded" />
        <div className="grid gap-4 md:grid-cols-2">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="overflow-hidden rounded-xl border border-gray-100 bg-white">
              <Skeleton className="h-40 w-full rounded-none" />
              <div className="space-y-3 p-4">
                <Skeleton className="h-5 w-2/3 rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <div className="flex gap-3">
                  <Skeleton className="h-3 w-16 rounded" />
                  <Skeleton className="h-3 w-16 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function MapSkeleton() {
  return (
    <div aria-busy="true" className="mx-auto max-w-7xl px-4 py-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <Skeleton className="h-8 w-40 rounded-lg" />
        <Skeleton className="h-9 w-24 rounded-full" />
      </div>
      <Skeleton className="mb-4 h-11 w-full rounded-xl" />
      <div className="mb-4 flex gap-2 overflow-hidden">
        {["w-20", "w-24", "w-20", "w-28"].map((width, index) => (
          <Skeleton key={index} className={`h-8 ${width} shrink-0 rounded-full`} />
        ))}
      </div>
      <div className="relative h-[65vh] overflow-hidden rounded-xl bg-gray-200 motion-safe:animate-pulse">
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="absolute left-1/3 top-1/3 h-8 w-8 rounded-full border-4 border-white bg-orange-300" />
        <div className="absolute right-1/4 top-1/2 h-8 w-8 rounded-full border-4 border-white bg-orange-300" />
      </div>
    </div>
  );
}

export function LocationSkeleton() {
  return (
    <div aria-busy="true">
      <div className="relative h-72 bg-gray-200 motion-safe:animate-pulse md:h-96">
        <div className="absolute inset-x-0 bottom-0 space-y-3 p-5">
          <Skeleton className="h-5 w-24 rounded-full bg-white/40" />
          <Skeleton className="h-8 w-64 max-w-full rounded-lg bg-white/50" />
          <Skeleton className="h-4 w-full max-w-lg rounded bg-white/30" />
        </div>
      </div>
      <div className="mx-auto max-w-7xl space-y-4 px-4 py-6">
        <Skeleton className="h-12 w-full rounded-full" />
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="rounded-xl bg-white p-3">
              <Skeleton className="mx-auto mb-2 h-10 w-10 rounded-full" />
              <Skeleton className="mx-auto h-3 w-16 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
