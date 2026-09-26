"use client";

import { RouteDetail } from "./RouteDetail";
import { getRouteBySlug } from "@/data/routes";

export function PremiumRouteExperience({ slug }: { slug: string }) {
  const route = getRouteBySlug(slug);
  if (!route) return null;
  return <RouteDetail route={route} />;
}
