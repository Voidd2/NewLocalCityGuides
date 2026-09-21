import { useSyncExternalStore } from "react";

const STORAGE_KEY = "ylcg_saved_routes";

export interface SavedRoute {
  id: string;
  name: string;
  locationIds: string[];
  createdAt: string;
  arrivedLocationIds: string[];
}

const EMPTY_ROUTES: SavedRoute[] = [];
const listeners = new Set<() => void>();
let cache: SavedRoute[] | null = null;

function readAll(): SavedRoute[] {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    cache = Array.isArray(parsed) ? parsed : [];
  } catch {
    cache = [];
  }
  return cache;
}

function writeAll(routes: SavedRoute[]): void {
  cache = routes;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(routes));
  } catch {
    // ignore
  }
  listeners.forEach((listener) => listener());
}

function subscribeSavedRoutes(callback: () => void): () => void {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSavedRoutesServerSnapshot(): SavedRoute[] {
  return EMPTY_ROUTES;
}

/** Reactive read of the saved routes, kept in sync with writes from anywhere in the app. */
export function useSavedRoutes(): SavedRoute[] {
  return useSyncExternalStore(subscribeSavedRoutes, readAll, getSavedRoutesServerSnapshot);
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
