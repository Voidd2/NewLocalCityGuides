import { resolve } from 'node:path';
import { importSeed } from '../src/content/import-seed.js';
import { readContentFile, readContentInput, writeDraftContentFile } from '../src/content/io.js';

async function main(args: string[]): Promise<void> {
  const [command, inputPath, outputPath, ...extra] = args;
  if (command === 'validate' && inputPath && !outputPath) {
    const bundle = await readContentFile(inputPath);
    console.log(`Valid content: ${bundle.cities.length} cities, ${bundle.locations.length} locations, ${bundle.routes.length} routes.`);
    return;
  }
  if (command === 'import' && inputPath && outputPath && extra.length === 0) {
    const bundle = importSeed(await readContentInput(inputPath));
    await writeDraftContentFile(outputPath, bundle);
    console.log(`Imported ${bundle.locations.length} selected locations as drafts: ${resolve(outputPath)}`);
    return;
  }
  throw new Error('Usage: content validate <bundle.json|bundle.yaml>\n       content import <seed.json|seed.yaml> <new-draft.yaml>');
}

main(process.argv.slice(2)).catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
