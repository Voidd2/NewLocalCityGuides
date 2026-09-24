# PWA and offline architecture

## Requirements

- Visitors can install YourLocalCityGuide from a supported mobile browser.
- A route opened while online can be reopened after connectivity drops.
- Saved routes and progress remain on the device.
- Failed Next.js navigations can resume when connectivity returns.
- Offline support must be progressive enhancement: failure to register a service worker may not block the app.
- No analytics or advertising storage is enabled by this implementation.

## Components and data flow

```text
manifest.ts + generated icons
             |
             v
      browser installation

ServiceWorkerRegistrar -> /sw.js
                              |
                 +------------+-------------+
                 |                          |
          navigation cache             asset cache
         network, then cache          cache, then network
                 |                          |
                 +------------+-------------+
                              v
                   previously opened UI

saved-routes.ts --------> localStorage
useGeolocation.ts ------> in-memory position only
next/offline -----------> reconnect banner and request retry
```

## Cache policy

The service worker uses versioned caches. On activation it deletes only older caches whose names start with `ylcg-`.

- Local navigation requests use network-first. A successful response replaces its cached copy. If the request fails, the matching cached page is returned, followed by the current locale's cached homepage as fallback.
- Same-origin scripts, styles, fonts and images use cache-first. Hashed Next.js assets are immutable in practice, while the versioned cache provides an explicit reset point.
- RSC requests, Server Actions, non-GET requests, the service worker itself and cross-origin requests are not intercepted.
- OpenFreeMap tiles are deliberately excluded. Unbounded tile caching can consume significant device storage and requires a separate provider-policy review.

The initial app shell contains the NL, EN and DE homepages, the manifest and favicon. Other pages become available offline after they have been opened successfully once.

## Privacy model

- GPS permission remains user-initiated. Coordinates are kept in React state and are not persisted by the app.
- Login demo state, saved routes, route progress and the privacy choice use local storage.
- The service worker cache contains public application pages and assets. It does not cache POST requests or API responses.
- The privacy page discloses local storage, GPS use, offline caching, OpenFreeMap and user-initiated Google Maps navigation.

## Update and invalidation procedure

When the offline schema or cached shell changes materially:

1. Change `CACHE_VERSION` at the top of `public/sw.js`.
2. Keep the new cache names derived from that version.
3. Run a production build.
4. Load the app once online and verify the new worker reaches `activated` state.
5. Test a previously opened route with the browser set to offline.

Do not rename the `ylcg-` cache prefix without also changing the activation cleanup logic.

## Reliability and trade-offs

This design has no extra runtime dependency and works with Turbopack. Network-first pages prioritise fresh content but may wait briefly for network failure detection. Cache-first assets are fast but occupy device storage until the browser evicts them or the cache version changes.

The current app stores only public/demo client state. Before adding real authentication or personalised server-rendered pages, revisit navigation caching and explicitly exclude any response containing private account or payment data.

## Verification checklist

1. Run `npm run build` and `npm run lint`.
2. Confirm `/manifest.webmanifest`, `/icon`, `/apple-icon` and `/sw.js` return successfully.
3. In a production server, open a route once, switch DevTools to Offline and reload it.
4. Confirm the offline banner appears and disappears after reconnecting.
5. Confirm saved route progress survives a refresh.
6. Confirm denying GPS does not block route access.
7. Confirm external map tiles are not present in `ylcg-` caches.
