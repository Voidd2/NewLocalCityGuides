import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicImages = path.resolve("public/images");
const maximumInputBytes = 2_000_000;

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  }));
  return nested.flat();
}

const candidates = (await walk(publicImages)).filter((file) => /\.jpe?g$/i.test(file));
let optimized = 0;

for (const file of candidates) {
  const before = (await fs.stat(file)).size;
  if (before <= maximumInputBytes) continue;

  const temporary = `${file}.optimized.jpg`;
  await sharp(file)
    .rotate()
    .resize({ width: 2200, height: 2200, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(temporary);

  const after = (await fs.stat(temporary)).size;
  if (after >= before) {
    await fs.unlink(temporary);
    continue;
  }

  await fs.rename(temporary, file);
  optimized += 1;
  console.log(`${path.relative(process.cwd(), file)}: ${Math.ceil(before / 1024)} KB -> ${Math.ceil(after / 1024)} KB`);
}

console.log(`Optimized ${optimized} JPEG asset(s).`);
