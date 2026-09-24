"use client";

import { useEffect, useMemo, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import type { GeoJSONSource, Map as MapLibreInstance } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { GeoPoint } from "@/lib/route-engine";

export interface MapPin {
  id: string;
  name: string;
  category: string;
  kind: "location" | "spot";
  lat: number;
  lng: number;
}

const PIN_SOURCE = "ylcg-pins";
const ROUTE_SOURCE = "ylcg-route";
const USER_SOURCE = "ylcg-user";

export function MapLibreMap({
  pins,
  selectedId,
  onSelectPin,
  routeCoordinates = [],
  userLocation = null,
}: {
  pins: MapPin[];
  selectedId: string | null;
  onSelectPin: (id: string) => void;
  routeCoordinates?: GeoPoint[];
  userLocation?: GeoPoint | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreInstance | null>(null);
  const selectRef = useRef(onSelectPin);

  useEffect(() => {
    selectRef.current = onSelectPin;
  }, [onSelectPin]);

  const pointData = useMemo(() => ({
    type: "FeatureCollection" as const,
    features: pins.map((pin) => ({
      type: "Feature" as const,
      geometry: { type: "Point" as const, coordinates: [pin.lng, pin.lat] },
      properties: {
        id: pin.id,
        name: pin.name,
        category: pin.category,
        kind: pin.kind,
        selected: pin.id === selectedId ? 1 : 0,
      },
    })),
  }), [pins, selectedId]);

  const routeData = useMemo(() => ({
    type: "FeatureCollection" as const,
    features: routeCoordinates.length >= 2 ? [{
      type: "Feature" as const,
      geometry: {
        type: "LineString" as const,
        coordinates: routeCoordinates.map((point) => [point.lng, point.lat]),
      },
      properties: {},
    }] : [],
  }), [routeCoordinates]);

  const userData = useMemo(() => ({
    type: "FeatureCollection" as const,
    features: userLocation ? [{
      type: "Feature" as const,
      geometry: { type: "Point" as const, coordinates: [userLocation.lng, userLocation.lat] },
      properties: {},
    }] : [],
  }), [userLocation]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: [4.4909, 52.1596],
      zoom: 14.5,
      attributionControl: { compact: true },
    });
    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "bottom-right");
    map.addControl(new maplibregl.GeolocateControl({ positionOptions: { enableHighAccuracy: true }, trackUserLocation: true }), "bottom-right");

    map.on("load", () => {
      map.addSource(PIN_SOURCE, { type: "geojson", data: pointData, cluster: true, clusterMaxZoom: 15, clusterRadius: 45 });
      map.addLayer({
        id: "ylcg-clusters",
        type: "circle",
        source: PIN_SOURCE,
        filter: ["has", "point_count"],
        paint: {
          "circle-color": "#1B2A4A",
          "circle-radius": ["step", ["get", "point_count"], 18, 10, 24, 30, 30],
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 3,
        },
      });
      map.addLayer({
        id: "ylcg-cluster-count",
        type: "symbol",
        source: PIN_SOURCE,
        filter: ["has", "point_count"],
        layout: { "text-field": ["get", "point_count_abbreviated"], "text-size": 12 },
        paint: { "text-color": "#ffffff" },
      });
      map.addLayer({
        id: "ylcg-points",
        type: "circle",
        source: PIN_SOURCE,
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": ["case", ["==", ["get", "selected"], 1], "#FF6B00", ["==", ["get", "kind"], "spot"], "#E55E00", "#1B2A4A"],
          "circle-radius": ["case", ["==", ["get", "selected"], 1], 11, 8],
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 3,
        },
      });
      map.addSource(ROUTE_SOURCE, { type: "geojson", data: routeData });
      map.addLayer({
        id: "ylcg-route-outline",
        type: "line",
        source: ROUTE_SOURCE,
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": "#ffffff", "line-width": 8, "line-opacity": 0.9 },
      });
      map.addLayer({
        id: "ylcg-route-line",
        type: "line",
        source: ROUTE_SOURCE,
        layout: { "line-cap": "round", "line-join": "round" },
        paint: { "line-color": "#FF6B00", "line-width": 5, "line-opacity": 0.9 },
      });
      map.addSource(USER_SOURCE, { type: "geojson", data: userData });
      map.addLayer({
        id: "ylcg-user-halo",
        type: "circle",
        source: USER_SOURCE,
        paint: { "circle-color": "#3B82F6", "circle-radius": 16, "circle-opacity": 0.2 },
      });
      map.addLayer({
        id: "ylcg-user-point",
        type: "circle",
        source: USER_SOURCE,
        paint: { "circle-color": "#2563EB", "circle-radius": 7, "circle-stroke-color": "#ffffff", "circle-stroke-width": 3 },
      });

      map.on("click", "ylcg-clusters", async (event) => {
        const feature = map.queryRenderedFeatures(event.point, { layers: ["ylcg-clusters"] })[0];
        const clusterId = Number(feature?.properties?.cluster_id);
        const coordinates = feature?.geometry.type === "Point" ? feature.geometry.coordinates as [number, number] : null;
        if (!coordinates || Number.isNaN(clusterId)) return;
        const source = map.getSource(PIN_SOURCE) as GeoJSONSource;
        const zoom = await source.getClusterExpansionZoom(clusterId);
        map.easeTo({ center: coordinates, zoom });
      });
      map.on("click", "ylcg-points", (event) => {
        const id = event.features?.[0]?.properties?.id;
        if (typeof id === "string") selectRef.current(id);
      });
      for (const layer of ["ylcg-clusters", "ylcg-points"]) {
        map.on("mouseenter", layer, () => { map.getCanvas().style.cursor = "pointer"; });
        map.on("mouseleave", layer, () => { map.getCanvas().style.cursor = ""; });
      }

      const coordinates = pins.map((pin) => [pin.lng, pin.lat] as [number, number]);
      if (coordinates.length > 0) {
        const bounds = coordinates.reduce((value, coordinate) => value.extend(coordinate), new maplibregl.LngLatBounds(coordinates[0], coordinates[0]));
        map.fitBounds(bounds, { padding: 48, maxZoom: 16, duration: 0 });
      }
    });

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  // Initial map setup intentionally runs once; sources are updated below.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map?.isStyleLoaded()) return;
    (map.getSource(PIN_SOURCE) as GeoJSONSource | undefined)?.setData(pointData);
  }, [pointData]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map?.isStyleLoaded()) return;
    (map.getSource(ROUTE_SOURCE) as GeoJSONSource | undefined)?.setData(routeData);
  }, [routeData]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map?.isStyleLoaded()) return;
    (map.getSource(USER_SOURCE) as GeoJSONSource | undefined)?.setData(userData);
  }, [userData]);

  useEffect(() => {
    if (!selectedId) return;
    const pin = pins.find((item) => item.id === selectedId);
    if (pin) mapRef.current?.easeTo({ center: [pin.lng, pin.lat], zoom: Math.max(mapRef.current.getZoom(), 16) });
  }, [pins, selectedId]);

  return <div ref={containerRef} className="h-full w-full overflow-hidden rounded-xl" aria-label="Interactive map" />;
}
