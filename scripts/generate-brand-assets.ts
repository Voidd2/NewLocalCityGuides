import React from "react";
import { writeFile } from "node:fs/promises";
import { brandIcon } from "../src/lib/brand-icon";
import OpenGraphImage from "./lib/brand-share-image";

// Generate once and commit portable static assets; Workers never read local source files.
Object.assign(globalThis, { React });
async function main() {
  for (const [file, pixels, maskable] of [
    ["src/app/icon.png", 512, false],
    ["src/app/apple-icon.png", 180, true],
    ["public/brand/app-icon-192.png", 192, true],
    ["public/brand/app-icon-512.png", 512, true],
  ] as const) {
    await writeFile(file, Buffer.from(await (await brandIcon(pixels, maskable)).arrayBuffer()));
  }
  await writeFile("src/app/opengraph-image.png", Buffer.from(await (await OpenGraphImage()).arrayBuffer()));
  console.log("Static CityWalkStories app icons and share image generated.");
}
void main();
