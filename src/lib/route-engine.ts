export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface RoutableItem {
  id: string;
  coords: GeoPoint | null;
}

export function haversineMeters(a: GeoPoint, b: GeoPoint): number {
  const earthRadius = 6_371_000;
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const deltaLatitude = toRadians(b.lat - a.lat);
  const deltaLongitude = toRadians(b.lng - a.lng);
  const latitudeA = toRadians(a.lat);
  const latitudeB = toRadians(b.lat);
  const value =
    Math.sin(deltaLatitude / 2) ** 2 +
    Math.cos(latitudeA) * Math.cos(latitudeB) * Math.sin(deltaLongitude / 2) ** 2;

  return earthRadius * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
}

export function findNearestItem<T extends RoutableItem>(items: T[], origin: GeoPoint): T | null {
  let nearest: T | null = null;
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (const item of items) {
    if (!item.coords) continue;
    const distance = haversineMeters(origin, item.coords);
    if (distance < nearestDistance) {
      nearest = item;
      nearestDistance = distance;
    }
  }

  return nearest;
}

function routeLength(items: RoutableItem[], origin?: GeoPoint): number {
  let distance = 0;
  let previous = origin ?? items[0]?.coords ?? null;

  for (const item of items) {
    if (!item.coords) continue;
    if (previous) distance += haversineMeters(previous, item.coords);
    previous = item.coords;
  }

  return distance;
}

function twoOpt<T extends RoutableItem>(route: T[], origin?: GeoPoint): T[] {
  if (route.length < 4) return route;
  let best = [...route];
  let bestLength = routeLength(best, origin);
  let improved = true;

  while (improved) {
    improved = false;
    for (let start = 0; start < best.length - 2; start += 1) {
      for (let end = start + 2; end < best.length; end += 1) {
        const candidate = [
          ...best.slice(0, start),
          ...best.slice(start, end + 1).reverse(),
          ...best.slice(end + 1),
        ];
        const candidateLength = routeLength(candidate, origin);
        if (candidateLength + 1 < bestLength) {
          best = candidate;
          bestLength = candidateLength;
          improved = true;
        }
      }
    }
  }

  return best;
}

export function optimizeRouteOrder<T extends RoutableItem>(items: T[], origin?: GeoPoint): T[] {
  if (items.length < 2) return [...items];

  const withoutCoordinates = items.filter((item) => !item.coords);
  const remaining = items.filter((item) => item.coords);
  const ordered: T[] = [];
  let cursor = origin ?? remaining[0]?.coords ?? null;

  while (remaining.length > 0) {
    let bestIndex = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    for (let index = 0; index < remaining.length; index += 1) {
      const coordinates = remaining[index].coords;
      const distance = cursor && coordinates ? haversineMeters(cursor, coordinates) : 0;
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = index;
      }
    }
    const [next] = remaining.splice(bestIndex, 1);
    ordered.push(next);
    cursor = next.coords;
  }

  return [...twoOpt(ordered, origin), ...withoutCoordinates];
}

export function rotateLoopFromNearest<T extends RoutableItem>(items: T[], origin: GeoPoint): T[] {
  if (items.length < 2) return [...items];
  const nearest = findNearestItem(items, origin);
  if (!nearest) return [...items];
  const index = items.findIndex((item) => item.id === nearest.id);
  const clockwise = [...items.slice(index), ...items.slice(0, index)];
  const reversed = [clockwise[0], ...clockwise.slice(1).reverse()];
  return routeLength(clockwise, origin) <= routeLength(reversed, origin) ? clockwise : reversed;
}

export function insertAtSmallestDetour<T extends RoutableItem>(items: T[], extra: T): T[] {
  if (!extra.coords || items.length === 0) return [...items, extra];
  if (items.length === 1 || !items[0].coords) return [extra, ...items];

  let bestIndex = 1;
  let smallestDetour = Number.POSITIVE_INFINITY;
  for (let index = 0; index <= items.length; index += 1) {
    const before = items[index - 1]?.coords ?? null;
    const after = items[index]?.coords ?? null;
    const added =
      (before ? haversineMeters(before, extra.coords) : 0) +
      (after ? haversineMeters(extra.coords, after) : 0) -
      (before && after ? haversineMeters(before, after) : 0);
    if (added < smallestDetour) {
      smallestDetour = added;
      bestIndex = index;
    }
  }

  return [...items.slice(0, bestIndex), extra, ...items.slice(bestIndex)];
}

export function estimateRouteDistanceMeters(items: RoutableItem[], origin?: GeoPoint): number {
  return Math.round(routeLength(items, origin));
}
