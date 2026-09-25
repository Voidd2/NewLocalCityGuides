const STORAGE_KEY = "ylcg_saved_routes";
export const ROUTES_CHANGED_EVENT = "ylcg:routes-changed";

export interface SavedRoute {
  id: string;
  name: string;
  locationIds: string[];
  createdAt: string;
  arrivedLocationIds: string[];
  sourceRouteId?: string;
  isLoop?: boolean;
  featuredLocalStop?: "schaapsvis-daily";
  optimizedAt?: string;
}

function readAll(): SavedRoute[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function writeAll(routes: SavedRoute[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(routes));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(ROUTES_CHANGED_EVENT));
    }
  } catch {
    // ignore
  }
}

export function getSavedRoutes(): SavedRoute[] {
  return readAll();
}

export function getSavedRouteById(id: string): SavedRoute | undefined {
  return readAll().find((r) => r.id === id);
}

export function saveRoute(
  name: string,
  locationIds: string[],
  options: Pick<SavedRoute, "sourceRouteId" | "isLoop" | "featuredLocalStop"> = {},
): SavedRoute {
  const route: SavedRoute = {
    id: crypto.randomUUID(),
    name,
    locationIds,
    createdAt: new Date().toISOString(),
    arrivedLocationIds: [],
    ...options,
  };
  const all = readAll();
  all.unshift(route);
  writeAll(all);
  return route;
}

export function deleteSavedRoute(id: string): void {
  writeAll(readAll().filter((r) => r.id !== id));
}

export function addLocationToRoute(routeId: string, locationId: string): "added" | "duplicate" {
  const all = readAll();
  const route = all.find((r) => r.id === routeId);
  if (!route) return "duplicate";
  if (route.locationIds.includes(locationId)) return "duplicate";
  route.locationIds.push(locationId);
  route.name = route.name;
  writeAll(all);
  return "added";
}

export function markArrived(routeId: string, locationId: string): void {
  const all = readAll();
  const route = all.find((r) => r.id === routeId);
  if (!route) return;
  if (!route.arrivedLocationIds.includes(locationId)) {
    route.arrivedLocationIds.push(locationId);
    writeAll(all);
  }
}

export function getVisitedCount(route: SavedRoute): number {
  const routeIds = new Set(route.locationIds);
  return new Set(route.arrivedLocationIds.filter((id) => routeIds.has(id))).size;
}

export function updateRouteOrder(routeId: string, locationIds: string[]): SavedRoute | undefined {
  const all = readAll();
  const route = all.find((item) => item.id === routeId);
  if (!route) return undefined;
  const knownIds = new Set(route.locationIds);
  const uniqueIds = [...new Set(locationIds)].filter((id) => knownIds.has(id));
  if (uniqueIds.length !== knownIds.size) return undefined;
  route.locationIds = uniqueIds;
  route.optimizedAt = new Date().toISOString();
  writeAll(all);
  return route;
}
