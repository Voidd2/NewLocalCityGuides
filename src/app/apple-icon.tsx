import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1B2A4A",
        borderRadius: 38,
      }}
    >
      <div
        style={{
          width: 104,
          height: 104,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 52,
          background: "#FF6B00",
          color: "white",
          fontSize: 42,
          fontWeight: 800,
          letterSpacing: -3,
        }}
      >
        YL
      </div>
    </div>,
    size,
  );
}
