"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocale } from "next-intl";
import { routes } from "@/data/routes";
import { applyDateAwareRoute } from "@/data/route-conditions";
import { addLocationToRoute, getSavedRoutes, saveRoute, type SavedRoute } from "@/lib/saved-routes";

type Locale = "nl" | "en" | "de";

export function RoutePickerModal({
  placeId,
  placeName,
  onClose,
  onResult,
}: {
  placeId: string;
  placeName: string;
  onClose: () => void;
  onResult?: (message: string) => void;
}) {
  const locale = useLocale() as Locale;
  const [savedRoutes] = useState<SavedRoute[]>(() => getSavedRoutes());
  const copy = locale === "de"
    ? { title: "Zu einer Route hinzufügen", standard: "Standardrouten", mine: "Meine Routen", create: "Neue Route erstellen", stops: "Stopps", added: "hinzugefügt zu", duplicate: "ist bereits Teil von" }
    : locale === "en"
      ? { title: "Add to a route", standard: "Suggested routes", mine: "My routes", create: "Create new route", stops: "stops", added: "added to", duplicate: "is already part of" }
      : { title: "Toevoegen aan route", standard: "Standaardroutes", mine: "Mijn routes", create: "Nieuwe route maken", stops: "stops", added: "toegevoegd aan", duplicate: "staat al in" };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, []);

  const finish = (route: SavedRoute) => {
    const result = addLocationToRoute(route.id, placeId);
    onResult?.(`${placeName} ${result === "duplicate" ? copy.duplicate : copy.added} ${route.name}`);
    onClose();
  };

  const addToStandard = (routeId: string) => {
    const base = routes.find((route) => route.id === routeId);
    if (!base) return;
    const active = applyDateAwareRoute(base);
    let saved = getSavedRoutes().find((route) => route.sourceRouteId === active.id || route.name === active.title);
    if (!saved) {
      saved = saveRoute(active.title, [...active.locationIds], {
        sourceRouteId: active.id,
        isLoop: active.isLoop,
        featuredLocalStop: active.featuredLocalStop,
      });
    }
    finish(saved);
  };

  const createNew = () => {
    const route = saveRoute(
      locale === "de" ? `Route mit ${placeName}` : locale === "en" ? `Route with ${placeName}` : `Route met ${placeName}`,
      [placeId],
    );
    onResult?.(`${copy.create}: ${route.name}`);
    onClose();
  };

  const customRoutes = savedRoutes.filter((saved) => !saved.sourceRouteId);

  return createPortal(
    <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={copy.title}>
      <button className="absolute inset-0 bg-black/50" onClick={onClose} aria-label="Sluiten" />
      <div className="relative z-10 flex max-h-[82vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between bg-navy-800 px-5 py-4">
          <div className="min-w-0">
            <p className="text-xs font-medium text-white/70">{copy.title}</p>
            <p className="truncate font-bold text-orange-400">{placeName}</p>
          </div>
          <button onClick={onClose} className="ml-3 h-9 w-9 shrink-0 rounded-full bg-white/10 text-xl text-white" aria-label="Sluiten">×</button>
        </div>

        <div className="overflow-y-auto p-4">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">{copy.standard}</p>
          <div className="space-y-1">
            {routes.map((base) => {
              const active = applyDateAwareRoute(base);
              const saved = savedRoutes.find((route) => route.sourceRouteId === active.id || route.name === active.title);
              const already = active.locationIds.includes(placeId) || saved?.locationIds.includes(placeId);
              return (
                <button key={active.id} onClick={() => addToStandard(active.id)} className="flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-orange-50">
                  <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    {active.image && <img src={active.image} alt="" className="h-full w-full object-cover" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-navy-800">{active.title}</p>
                    <p className="text-xs text-gray-400">{active.locationIds.length} {copy.stops}</p>
                  </div>
                  <span className={`text-xs font-bold ${already ? "text-green-600" : "text-orange-500"}`}>{already ? "✓" : "+"}</span>
                </button>
              );
            })}
          </div>

          {customRoutes.length > 0 && (
            <>
              <p className="mb-2 mt-5 text-[11px] font-bold uppercase tracking-wider text-gray-400">{copy.mine}</p>
              <div className="space-y-1">
                {customRoutes.map((route) => (
                  <button key={route.id} onClick={() => finish(route)} className="flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-orange-50">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-lg">⌖</div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-navy-800">{route.name}</p>
                      <p className="text-xs text-gray-400">{route.locationIds.length} {copy.stops}</p>
                    </div>
                    <span className={`text-xs font-bold ${route.locationIds.includes(placeId) ? "text-green-600" : "text-orange-500"}`}>
                      {route.locationIds.includes(placeId) ? "✓" : "+"}
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="border-t border-gray-100 p-4">
          <button onClick={createNew} className="w-full rounded-xl border-2 border-dashed border-orange-300 py-3 text-sm font-bold text-orange-600 hover:bg-orange-50">
            + {copy.create}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
