/**
 * Content Loader — reads & validates YAML content records at build time.
 * Server-only: uses `fs` and `path`. Never import from client components.
 */
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { LocationSchema, CitySchema, SourceSchema } from '../schema';
import type { LocationRecord, CityRecord, SourceRecord } from '../schema';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

function readYaml<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return yaml.load(raw) as T;
}

export function loadCity(citySlug: string): CityRecord {
  const file = path.join(CONTENT_ROOT, 'cities', citySlug, 'city.yaml');
  const raw = readYaml<unknown>(file);
  return CitySchema.parse(raw);
}

export function loadLocations(citySlug: string): LocationRecord[] {
  const dir = path.join(CONTENT_ROOT, 'cities', citySlug, 'locations');
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.yaml'));
  return files
    .map((f) => {
      const raw = readYaml<unknown>(path.join(dir, f));
      const result = LocationSchema.safeParse(raw);
      if (!result.success) {
        console.warn(`[content] Invalid location in ${f}:`, result.error.flatten());
        return null;
      }
      return result.data;
    })
    .filter((l): l is LocationRecord => l !== null)
    .filter((l) => l.status === 'published');
}

export function loadSources(citySlug: string): SourceRecord[] {
  const file = path.join(CONTENT_ROOT, 'sources', `${citySlug}.yaml`);
  if (!fs.existsSync(file)) return [];
  const raw = readYaml<{ sources: unknown[] }>(file);
  return (raw.sources ?? [])
    .map((s) => {
      const result = SourceSchema.safeParse(s);
      if (!result.success) return null;
      return result.data;
    })
    .filter((s): s is SourceRecord => s !== null);
}
