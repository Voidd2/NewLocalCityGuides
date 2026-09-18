"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="nl">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FEFCF9",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ maxWidth: 420, textAlign: "center", padding: 24 }}>
          <span style={{ fontSize: 48, color: "#FF6B00", display: "block", marginBottom: 8 }}>
            :(
          </span>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1B2A4A", marginBottom: 12 }}>
            Er ging iets mis
          </h1>
          <p style={{ color: "#475569", marginBottom: 24, lineHeight: 1.6 }}>
            Er is een onverwachte fout opgetreden. Probeer het nog eens.
          </p>
          <button
            onClick={retry}
            style={{
              background: "#FF6B00",
              color: "white",
              fontWeight: 600,
              padding: "12px 24px",
              borderRadius: 9999,
              border: "none",
              cursor: "pointer",
            }}
          >
            Probeer opnieuw
          </button>
        </div>
      </body>
    </html>
  );
}
