import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1B2A4A",
        borderRadius: 112,
      }}
    >
      <div
        style={{
          width: 292,
          height: 292,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 146,
          background: "#FF6B00",
          color: "white",
          fontSize: 118,
          fontWeight: 800,
          letterSpacing: -8,
        }}
      >
        YL
      </div>
    </div>,
    size,
  );
}
