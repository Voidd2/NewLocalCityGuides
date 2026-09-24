import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const maplibreDist = join(projectRoot, "node_modules", "maplibre-gl", "dist");
const publicWorkerDir = join(projectRoot, "public", "maplibre");

await mkdir(publicWorkerDir, { recursive: true });

await Promise.all([
  copyFile(
    join(maplibreDist, "maplibre-gl-worker.mjs"),
    join(publicWorkerDir, "maplibre-gl-worker.mjs"),
  ),
  copyFile(
    join(maplibreDist, "maplibre-gl-shared.mjs"),
    join(publicWorkerDir, "maplibre-gl-shared.mjs"),
  ),
]);

console.log("MapLibre worker files copied to public/maplibre");
