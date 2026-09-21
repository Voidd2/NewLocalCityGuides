"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { LocationData } from "@/data/locations";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapPin {
  location: LocationData;
  lat: number;
  lng: number;
}

function createCustomIcon(isSelected: boolean) {
  const color = isSelected ? "#FF6B00" : "#1B2A4A";
  const size = isSelected ? 40 : 32;
  return L.divIcon({
    className: "custom-map-pin",
    html: `<div style="
      width: ${size}px; height: ${size}px;
      background: ${color};
      border: 3px solid white;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex; align-items: center; justify-content: center;
    ">
      <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="
        width: ${size * 0.45}px; height: ${size * 0.45}px;
        transform: rotate(45deg);
      ">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5"/>
      </svg>
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
}

export function LeafletMap({
  pins,
  selectedId,
  onSelectPin,
}: {
  pins: MapPin[];
  selectedId: string | null;
  onSelectPin: (id: string) => void;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const [isReady, setIsReady] = useState(false);
  const onSelectPinRef = useRef(onSelectPin);
  onSelectPinRef.current = onSelectPin;

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [52.1601, 4.4970],
      zoom: 15,
      zoomControl: false,
      attributionControl: true,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;
    setIsReady(true);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markersRef.current.clear();
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current || !isReady) return;
    const map = mapInstanceRef.current;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    pins.forEach((pin) => {
      const icon = createCustomIcon(pin.location.id === selectedId);

      const marker = L.marker([pin.lat, pin.lng], { icon })
        .addTo(map)
        .on("click", () => onSelectPinRef.current(pin.location.id));

      markersRef.current.set(pin.location.id, marker);
    });

    if (pins.length > 0) {
      const bounds = L.latLngBounds(pins.map((p) => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
    }
    // Only rebuild markers and fitBounds when the pins list changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pins, isReady]);

  useEffect(() => {
    if (!mapInstanceRef.current || !isReady) return;

    markersRef.current.forEach((marker, id) => {
      const isSelected = id === selectedId;
      marker.setIcon(createCustomIcon(isSelected));
    });
  }, [selectedId, isReady]);

  useEffect(() => {
    if (!mapInstanceRef.current || !selectedId) return;
    const marker = markersRef.current.get(selectedId);
    if (marker) {
      mapInstanceRef.current.panTo(marker.getLatLng(), { animate: true });
    }
  }, [selectedId]);

  return (
    <div ref={mapRef} className="w-full h-full rounded-xl overflow-hidden" />
  );
}
