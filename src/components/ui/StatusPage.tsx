import type { ReactNode } from "react";

export function StatusPage({
  code,
  eyebrow,
  title,
  description,
  actions,
}: {
  code: string;
  eyebrow: string;
  title: string;
  description: string;
  actions: ReactNode;
}) {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-warm-50 px-4 py-12">
      <div className="w-full max-w-lg text-center">
        <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-orange-50">
          <div className="absolute inset-3 rounded-full border border-dashed border-orange-300" />
          <svg viewBox="0 0 24 24" fill="none" className="h-12 w-12 text-orange-500" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M12 21s7-6.1 7-13a7 7 0 10-14 0c0 6.9 7 13 7 13z" />
            <path d="M9.5 8.5a2.5 2.5 0 015 0c0 1.7-2.5 2-2.5 3.5" />
            <path d="M12 16h.01" />
          </svg>
        </div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-orange-500">{eyebrow}</p>
        <p className="text-hand mb-1 text-2xl text-orange-500">{code}</p>
        <h1 className="mb-3 text-3xl font-extrabold text-navy-800 md:text-4xl">{title}</h1>
        <p className="mx-auto mb-8 max-w-md text-sm leading-6 text-gray-500 md:text-base">{description}</p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">{actions}</div>
      </div>
    </section>
  );
}
