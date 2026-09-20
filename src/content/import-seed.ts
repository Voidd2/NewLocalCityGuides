import { z } from 'zod';
import type { ContentBundle } from '../domain/content.js';
import { validateContent } from './validate.js';

const emptyArray = z.array(z.never());
const seedLocationSchema = z.object({
  id: z.string(),
  cityId: z.string(),
  slug: z.string(),
  name: z.string(),
  fromCandidate: z.string(),
  coordinates: z.null(),
  address: z.null(),
  eras: z.array(z.string()),
  categories: z.array(z.string()),
  mainTheme: z.string(),
  durationMinutes: z.null(),
  hook: z.null(),
  shortStory: z.null(),
  extendedStory: z.null(),
  whyItMatters: z.null(),
  funFacts: emptyArray,
  lookAround: emptyArray,
  timeline: emptyArray,
  thenVsNow: emptyArray,
  videos: emptyArray,
  practicalInfo: z.null(),
  routeIds: emptyArray,
  nearbyLocationIds: emptyArray,
  sources: emptyArray,
  uncertainty: emptyArray,
  allowsAIReconstruction: z.boolean(),
  status: z.literal('SELECTED_NOT_RESEARCHED'),
  researchStatus: z.object({
    R01: z.literal('NOT_STARTED'),
    R02: z.literal('NOT_STARTED'),
    C01: z.literal('BLOCKED'),
    V01: z.literal('BLOCKED'),
  }).strict(),
  productionNotes: z.record(z.string(), z.union([z.string(), z.array(z.string())])),
}).strict();

const seedSchema = z.object({
  // These fields describe the seed handoff. They are checked explicitly, but
  // are not visitor content or publication approval in the canonical bundle.
  _README: z.string().optional(),
  _comment: z.string().optional(),
  _task: z.string().optional(),
  _status: z.string().optional(),
  _rules: z.array(z.string()).optional(),
  city: z.object({
    id: z.string(),
    name: z.string(),
    languages: z.array(z.string()),
    center: z.null(),
  }).strict(),
  locations: z.array(seedLocationSchema).min(1),
}).strict();

/**
 * Convert an empty selection seed to a validated draft, without changing the
 * caller's object. Enriched or unexpected input is rejected, never discarded.
 * Editorial notes remain editorial notes; no location classification, copy,
 * coordinates, claims, routes, or source evidence is inferred from them.
 */
export function importSeed(input: unknown): ContentBundle {
  const result = seedSchema.safeParse(input);
  if (!result.success) {
    const issues = result.error.issues.map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join('.') : '(root)';
      return `${path}: ${issue.message}`;
    });
    throw new Error(`Invalid empty selection seed:\n${issues.join('\n')}`);
  }

  const seed = result.data;
  return validateContent({
    schemaVersion: 1,
    cities: [{
      ...seed.city,
      slug: seed.city.id,
      locationIds: seed.locations.map((location) => location.id),
      routeIds: [],
    }],
    locations: seed.locations.map((location) => ({
      ...location,
      publication: { status: 'draft', reviewedBy: null, reviewedAt: null },
      place: { kind: 'unknown', survival: 'unknown', subject: null },
    })),
    routes: [],
    sources: [],
    claims: [],
  });
}
