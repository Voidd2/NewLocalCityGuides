import fs from "node:fs";
import path from "node:path";

const sourceRoot = path.resolve("src");
const publicRoot = path.resolve("public");
const extensions = new Set([".ts", ".tsx", ".css"]);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

const references = new Map();
for (const file of walk(sourceRoot).filter((candidate) => extensions.has(path.extname(candidate)))) {
  const source = fs.readFileSync(file, "utf8");
  for (const match of source.matchAll(/["'](\/images\/[^"'?#]+)["']/g)) {
    const publicPath = match[1];
    if (!references.has(publicPath)) references.set(publicPath, path.relative(process.cwd(), file));
  }
}

const missing = [...references.entries()].filter(([publicPath]) => !fs.existsSync(path.join(publicRoot, publicPath.slice(1))));
if (missing.length > 0) {
  console.error("Missing public image assets:");
  for (const [publicPath, sourceFile] of missing) console.error(`- ${publicPath} (referenced by ${sourceFile})`);
  process.exitCode = 1;
} else {
  console.log(`Media check passed: ${references.size} referenced image assets exist.`);
}
