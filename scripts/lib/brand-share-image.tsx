import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
export const alt = "CityWalkStories — Walk the city. Hear the story. — Leiden";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OpenGraphImage() {
  const pin = await readFile(join(process.cwd(), "public/brand/citywalkstories-pin-original.png"));
  return new ImageResponse(<div style={{ display: "flex", width: "100%", height: "100%", padding: 70, background: "#1D2F5F", color: "#FAF8F4", alignItems: "center", justifyContent: "space-between" }}>
    <div style={{ display: "flex", flexDirection: "column", width: 730 }}>
      <div style={{ color: "#F5AA56", fontSize: 24, letterSpacing: 5, marginBottom: 28 }}>LEIDEN · SELF-GUIDED CITY WALKS</div>
      <div style={{ fontSize: 68, fontWeight: 700, letterSpacing: -3 }}>CityWalkStories</div>
      <div style={{ fontSize: 46, marginTop: 34 }}>Walk the city.</div>
      <div style={{ fontSize: 46 }}>Hear the story.</div>
      <div style={{ fontSize: 23, marginTop: 42, color: "#F5AA56" }}>Nederlands · English · Deutsch</div>
    </div>
    <div style={{ display: "flex", width: 300, height: 390, background: "#FAF8F4", borderRadius: 38, overflow: "hidden", alignItems: "center", justifyContent: "center" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={"data:image/png;base64," + pin.toString("base64")} width={470} height={470} alt="" style={{ flexShrink: 0 }} />
    </div>
  </div>, size);
}
