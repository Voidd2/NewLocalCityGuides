'use client';
import { useMemo } from 'react';
import type { GeoPosition } from './useGeolocation';

function haversineMetres(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export interface ProximityStop {
  id: string;
  lat: number;
  lng: number;
}

export interface NearbyStop {
  id: string;
  distanceMetres: number;
}

export function useProximity(
  stops: ProximityStop[],
  position: GeoPosition | null,
  thresholdMetres = 50
): NearbyStop[] {
  return useMemo(() => {
    if (!position) return [];
    return stops
      .map((s) => ({
        id: s.id,
        distanceMetres: haversineMetres(position.lat, position.lng, s.lat, s.lng),
      }))
      .filter((s) => s.distanceMetres <= thresholdMetres)
      .sort((a, b) => a.distanceMetres - b.distanceMetres);
  }, [stops, position, thresholdMetres]);
}
