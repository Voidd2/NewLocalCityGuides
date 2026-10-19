"use client";

import { useEffect, useState } from "react";
import type { RouteData } from "@/data/routes";

export function usePremiumRoutes(enabled = true): { routes: RouteData[]; loading: boolean; error: boolean } {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    const controller = new AbortController();
    fetch("/api/premium/routes", { cache: "no-store", credentials: "same-origin", signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("route_access_failed");
        return response.json() as Promise<{ routes: RouteData[] }>;
      })
      .then((body) => { if (!controller.signal.aborted) setRoutes(body.routes); })
      .catch(() => { if (!controller.signal.aborted) { setRoutes([]); setError(true); } })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [enabled]);
  return { routes: enabled ? routes : [], loading: enabled && loading, error: enabled && error };
}
