'use client';
import { useState, useEffect, useCallback } from 'react';

export interface GeoPosition {
  lat: number;
  lng: number;
  accuracy: number;
  timestamp: number;
}

export type GeoStatus = 'idle' | 'watching' | 'error' | 'unsupported';

export function useGeolocation() {
  const [position, setPosition] = useState<GeoPosition | null>(null);
  const [status, setStatus] = useState<GeoStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);

  const start = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus('unsupported');
      return;
    }
    setStatus('watching');
    const id = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          timestamp: pos.timestamp,
        });
        setError(null);
      },
      (err) => {
        setError(err.message);
        setStatus('error');
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );
    setWatchId(id);
  }, []);

  const stop = useCallback(() => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setStatus('idle');
  }, [watchId]);

  useEffect(
    () => () => {
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    },
    [watchId]
  );

  return { position, status, error, start, stop };
}
