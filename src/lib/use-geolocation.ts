"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GeoPoint } from "@/lib/route-engine";

export type GeolocationStatus = "idle" | "requesting" | "granted" | "denied" | "unavailable" | "error";

export interface UserPosition extends GeoPoint {
  accuracy: number;
  timestamp: number;
}

export function useGeolocation() {
  const [status, setStatus] = useState<GeolocationStatus>("idle");
  const [position, setPosition] = useState<UserPosition | null>(null);
  const [errorCode, setErrorCode] = useState<number | null>(null);
  const watchId = useRef<number | null>(null);

  const stopWatching = useCallback(() => {
    if (watchId.current !== null && typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  }, []);

  const requestLocation = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("unavailable");
      return;
    }

    stopWatching();
    setStatus("requesting");
    setErrorCode(null);
    watchId.current = navigator.geolocation.watchPosition(
      ({ coords, timestamp }) => {
        setPosition({ lat: coords.latitude, lng: coords.longitude, accuracy: coords.accuracy, timestamp });
        setStatus("granted");
      },
      (error) => {
        setErrorCode(error.code);
        setStatus(error.code === error.PERMISSION_DENIED ? "denied" : "error");
        stopWatching();
      },
      { enableHighAccuracy: true, timeout: 12_000, maximumAge: 30_000 },
    );
  }, [stopWatching]);

  useEffect(() => stopWatching, [stopWatching]);

  return { status, position, errorCode, requestLocation, stopWatching };
}
