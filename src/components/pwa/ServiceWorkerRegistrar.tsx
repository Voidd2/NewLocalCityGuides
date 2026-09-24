"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).catch(() => {
        // Offline support is progressive enhancement; the app remains usable without it.
      });
    };

    window.addEventListener("load", register, { once: true });
    if (document.readyState === "complete") register();
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
