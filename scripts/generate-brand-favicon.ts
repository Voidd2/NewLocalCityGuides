import React from "react";
import { writeFile } from "node:fs/promises";
import { brandIcon } from "../src/lib/brand-icon";
Object.assign(globalThis, { React });
async function main() {
  const png = Buffer.from(await (await brandIcon(64)).arrayBuffer());
  const header = Buffer.alloc(22);
  header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
  header[6] = 64; header[7] = 64;
  header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
  header.writeUInt32LE(png.length, 14); header.writeUInt32LE(22, 18);
  await writeFile("src/app/favicon.ico", Buffer.concat([header, png]));
  console.log("CityWalkStories favicon generated from original pin.");
}
void main();
