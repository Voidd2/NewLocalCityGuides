'use client';

/**
 * CityMap — MapLibre GL map component.
 * Client-only (uses browser APIs). Import dynamically with ssr:false.
 */
import { useEffect, useRef } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { Map as MapLibreMap } from 'maplibre-gl';
import type { MapConfig } from './types';

const THEME_COLORS: Record<string, string> = {
  HISTORY: '#b45309',
  HIDDEN_GEM: '#7c3aed',
  FOOD: '#059669',
  SCENIC: '#0284c7',
  CULTURE: '#c2410c',
};

interface Props {
  config: MapConfig;
  className?: string;
  onMarkerClick?: (id: string) => void;
}

export default function CityMap({ config, className = '', onMarkerClick }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let map: MapLibreMap;
    let cancelled = false;

    async function init() {
      // Dynamic import keeps maplibre-gl out of the server bundle
      const maplibre = await import('maplibre-gl');

      if (cancelled || !containerRef.current) return;

      map = new maplibre.Map({
        container: containerRef.current,
        // Free OpenFreeMap Positron style — no API key needed
        style: 'https://tiles.openfreemap.org/styles/positron',
        center: config.center,
        zoom: config.zoom,
        attributionControl: false,
      });

      map.addControl(
        new maplibre.AttributionControl({ compact: true }),
        'bottom-right',
      );

      map.on('load', () => {
        config.markers.forEach((marker) => {
          const color = THEME_COLORS[marker.theme] ?? '#6b7280';

          const el = document.createElement('div');
          el.className = 'lcg-marker';
          el.style.cssText = `
            width: 32px; height: 32px; border-radius: 50% 50% 50% 0;
            background: ${color}; border: 2px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,.35);
            transform: rotate(-45deg); cursor: pointer;
          `;

          const dot = document.createElement('div');
          dot.style.cssText = `
            width: 10px; height: 10px; background: white; border-radius: 50%;
            position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
          `;
          el.appendChild(dot);

          new maplibre.Marker({ element: el, anchor: 'bottom-left' })
            .setLngLat([marker.lng, marker.lat])
            .addTo(map);

          const popup = new maplibre.Popup({ offset: 20, closeButton: false })
            .setHTML(`<p style="font-weight:600;margin:0;font-size:13px">${marker.label}</p>`);

          el.addEventListener('mouseenter', () => popup.addTo(map).setLngLat([marker.lng, marker.lat]));
          el.addEventListener('mouseleave', () => popup.remove());
          el.addEventListener('click', () => onMarkerClick?.(marker.id));
        });
      });

      mapRef.current = map;
    }

    init().catch(console.error);

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []); // mount once

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', minHeight: '400px' }}
    />
  );
}
