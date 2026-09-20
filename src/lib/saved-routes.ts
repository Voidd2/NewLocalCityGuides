const STORAGE_KEY = "ylcg_saved_routes";

export interface SavedRoute {
  id: string;
  name: string;
  locationIds: string[];
  createdAt: string;
  arrivedLocationIds: string[];
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

export function saveRoute(name: string, locationIds: string[]): SavedRoute {
  const route: SavedRoute = {
    id: crypto.randomUUID(),
    name,
    locationIds,
    createdAt: new Date().toISOString(),
    arrivedLocationIds: [],
  };
  const all = readAll();
  all.unshift(route);
  writeAll(all);
  return route;
}

export function deleteSavedRoute(id: string): void {
  writeAll(readAll().filter((r) => r.id !== id));
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
