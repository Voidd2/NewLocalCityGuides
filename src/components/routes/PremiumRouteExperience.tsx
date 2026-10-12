"use client";

import { RouteDetail } from "./RouteDetail";
import { usePremiumRoutes } from "@/lib/use-premium-routes";

export function PremiumRouteExperience({ slug }: { slug: string }) {
  const { routes, loading, error } = usePremiumRoutes();
  const route = routes.find((item) => item.slug === slug);
  if (!route) return loading
    ? <div className="min-h-40 animate-pulse rounded-2xl bg-gray-100" />
    : <div className="rounded-2xl border border-orange-200 bg-orange-50 p-6 text-sm text-navy-800" role="alert">{error ? "De route kan nu niet worden geladen. Vernieuw de pagina en controleer je toegang." : "Deze route is niet beschikbaar."}</div>;
  return <RouteDetail route={route} />;
}
