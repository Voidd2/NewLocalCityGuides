# GPS routes and MapLibre maintenance

This document explains the route, GPS and map architecture and how to add new places without breaking route behaviour.

## Requirements and boundaries

- Location permission is requested only after a visitor presses a button.
- A route remains usable when GPS is denied or unavailable.
- Completed stops are never reordered or removed.
- Coordinates must come from a verified source. Do not estimate them (DEC-010).
- Standard loops preserve their curated order and can be rotated to the closest sensible start.
- Custom routes minimise unnecessary backtracking with a geographic heuristic.
- Schaapsvishandel is promoted as the local family business: Wednesday uses S031, Saturday uses S032, and all other days use shop S030.
- Date and time checks use the `Europe/Amsterdam` timezone, not the visitor device timezone.
- On 3 October, Singels & Stad replaces L010 Hortus with L012 Leidens Ontzet.
- C052 Nieuwe Rijn market is a supplemental stop only while the Wednesday or Saturday market is open from 08:00 until 17:00.
- The current line is a geographic preview between stops, not turn-by-turn street navigation.

## Architecture and data flow

```text
locations.ts / local-spots.ts / routes.ts
                   |
                   v
          canonical coordinates
                   |
        +----------+-----------+
        |                      |
        v                      v
 route-engine.ts         schaapsvis.ts
 ordering/distance       day-aware stop
        |                      |
        +----------+-----------+
                   v
        saved-routes.ts (localStorage)
                   |
                   v
 use-geolocation.ts -> SavedRouteWalker -> MapLibreMap
                           |
                           +-> visited progress and next stop
```

`src/lib/route-engine.ts` has no browser dependencies and is the single place for distance and ordering algorithms. `src/lib/use-geolocation.ts` owns permission, watch lifecycle and errors. `src/components/map/MapLibreMap.tsx` only renders pins, clustering, route lines and the user's position.

`src/data/route-conditions.ts` owns calendar and clock rules. Keep date-specific route variants and temporary stops there so cards, route details and the saved-route walker use the same decision.

## Route ordering

Standard routes set `isLoop: true`. When GPS is available, the remaining stops are rotated to start at the nearest stop. The engine compares both directions around the loop and keeps the shorter direction. This preserves the editorial story order better than rebuilding the entire route.

Custom routes use nearest-neighbour ordering followed by a 2-opt improvement. The visitor's current position is the origin when permission was granted. Stops without coordinates stay at the end; they must not receive invented coordinates.

When resuming a saved route, visited IDs remain at the beginning in their existing order. Only unvisited stops are recalculated. `updateRouteOrder` validates that the same unique IDs remain before writing the update.

## Schaapsvishandel day logic

The canonical switch lives in `src/data/schaapsvis.ts`:

| Day | Spot | Destination |
| --- | --- | --- |
| Wednesday | S031 | Wednesday market fish cart |
| Saturday | S032 | Saturday market fish cart |
| Other days | S030 | Shop, Herenstraat 48 |

Do not duplicate these coordinates or addresses in route components. Add or correct the data in `src/data/local-spots.ts`; `schaapsvis.ts` then supplies the active record everywhere. Standard routes that promote the business use `featuredLocalStop: "schaapsvis-daily"`.

## Date and time conditions

Route records can opt into two conditional features:

```ts
{
  dateVariant: "leidens-ontzet",
  conditionalStops: ["nieuwe-rijn-market"],
}
```

`applyDateAwareRoute` returns the 3 October variant without changing the canonical route record. When the route is saved on that date, the resolved L012 stop is stored, so it remains stable during the walk.

`getConditionalRouteStops` returns C052 only on Wednesday and Saturday from 08:00 through 16:59 Leiden time. C052 is supplemental: it appears on the route map and as a live information card, but is not counted as a required premium story. Its point reuses the verified Nieuwe Rijn market coordinate from S031 rather than inventing a new coordinate. Public holidays and exceptional closures still require a future exceptions source.

## Adding a historical location

1. Add the record to `src/data/locations.ts` with a new stable ID and verified coordinates.
2. Add its story and translations according to `PROJECT-GUIDE.md`.
3. Add the ID to a route's `locationIds` in `src/data/routes.ts` only after checking the physical order on the map.
4. Update the route's stop count, distance copy and description.
5. Verify the marker, route line, next-stop distance and resume behaviour on mobile.

## Adding a local spot

1. Add the record to `src/data/local-spots.ts` with a stable S-ID and verified coordinates.
2. Set its visibility, category, address, opening information and localized description.
3. Add a map category translation in all three `messages/*.json` files if the category is new.
4. If it must participate in route ordering, model it explicitly in the saved route schema first. Do not silently mix an S-ID into historical location lookups.
5. For Schaapsvishandel changes, update the canonical S030/S031/S032 records, not component copy.

## Adding a standard route

Create one entry in `src/data/routes.ts`:

```ts
{
  id: "stable-route-id",
  slug: "public-url-slug",
  title: "Route title",
  locationIds: ["L001", "L002"],
  isLoop: true,
  featuredLocalStop: "schaapsvis-daily", // only when relevant
  // description, stops, distance, type, tags and image
}
```

Walk through the order on MapLibre. Keep adjacent points geographically sensible, but also preserve a coherent story. Saving a standard route must pass `sourceRouteId`, `isLoop` and `featuredLocalStop` to `saveRoute`; this enables GPS resume and the correct day-aware fish stop.

## MapLibre maintenance

The map uses one clustered GeoJSON point source, one line source and one user-position source. The public OpenFreeMap Liberty style is loaded over HTTPS. Pin and route updates call `setData`, so do not recreate the map for every React render.

When changing layers:

- keep cluster layers before individual point layers;
- retain a visible selected state and a separate local-business colour;
- keep the route outline under the route line;
- verify keyboard/button alternatives because the canvas itself is not a complete accessible interface;
- test an empty pin set and locations without coordinates.

## Validation checklist

1. Run `npm run build` and the configured lint command.
2. Test NL, EN and DE JSON parsing and the route pages in each locale.
3. Test GPS granted, denied and unavailable states. The denied state must not block the route.
4. Mark a stop visited, refresh, resume from a different position and confirm progress remains intact.
5. Check Wednesday, Saturday and a non-market day for S031, S032 and S030 respectively.
6. Check C052 just before 08:00, during market hours and at/after 17:00 in the Leiden timezone.
7. Check 2, 3 and 4 October and confirm only 3 October swaps L010 for L012.
8. Zoom out to verify clustering; zoom in and click both historical and local-business pins.
9. Confirm no coordinate was added without a verifiable source.

## Trade-offs and future work

Straight-line distance is fast, private and requires no routing API, but canals, bridges and closed streets can make the displayed order imperfect. Revisit the engine when turn-by-turn guidance is required; use a pedestrian routing service such as self-hosted OSRM or Valhalla and cache route geometry. At that point add rerouting thresholds, network failure handling and offline map tiles. Also revisit client-local weekday selection if the product expands beyond one city or visitors can plan from another timezone.
