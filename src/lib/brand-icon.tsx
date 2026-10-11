import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/** Compose the supplied, unchanged pin artwork on an ivory surface at build time. */
export async function brandIcon(pixels: number, maskable = false) {
  const source = await readFile(join(process.cwd(), "public/brand/citywalkstories-pin-original.png"));
  const scale = maskable ? 1 : 1.24;
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#FAF8F4", overflow: "hidden", position: "relative" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={"data:image/png;base64," + source.toString("base64")} width={pixels * scale} height={pixels * scale} style={{ position: "absolute", left: -pixels * (scale - 1) / 2, top: -pixels * (scale - 1) / 2 }} />
    </div>, { width: pixels, height: pixels },
  );
}
