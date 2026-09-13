import { describe, expect, it } from 'vitest';
import { importSeed } from '../src/content/import-seed.js';

function makeSeedLocation(index = 1) {
  return {
    id: `TEST-L00${index}`,
    cityId: 'synthetic-city',
    slug: `synthetic-location-${index}`,
    name: `SYNTHETIC TEST LOCATION ${index}`,
    fromCandidate: `TEST-C00${index}`,
    coordinates: null,
    address: null,
    eras: ['SYNTHETIC ERA TOKEN'],
    categories: ['synthetic-test'],
    mainTheme: 'SYNTHETIC TEST THEME',
    durationMinutes: null,
    hook: null,
    shortStory: null,
    extendedStory: null,
    whyItMatters: null,
    funFacts: [],
    lookAround: [],
    timeline: [],
    thenVsNow: [],
    videos: [],
    practicalInfo: null,
    routeIds: [],
    nearbyLocationIds: [],
    sources: [],
    uncertainty: [],
    allowsAIReconstruction: index !== 2,
    status: 'SELECTED_NOT_RESEARCHED',
    researchStatus: { R01: 'NOT_STARTED', R02: 'NOT_STARTED', C01: 'BLOCKED', V01: 'BLOCKED' },
    productionNotes: {
      warning: 'SYNTHETIC TEST WARNING: no building classification has been verified.',
      absorbs: ['SYNTHETIC TEST TOKEN'],
    },
  };
}

function makeSeed() {
  return {
    _README: 'SYNTHETIC EMPTY SELECTION SEED — NOT HISTORICAL CONTENT',
    _task: 'SYNTHETIC-TEST',
    _status: 'SYNTHETIC SELECTION APPROVAL ONLY',
    _rules: ['SYNTHETIC TEST RULE: preserve nulls.'],
    city: { id: 'synthetic-city', name: 'SYNTHETIC TEST CITY', languages: ['nl', 'en'], center: null },
    locations: [makeSeedLocation(1), makeSeedLocation(2)],
  };
}

describe('empty selection seed import', () => {
  it('preserves every seed location field, ordering, empty value and AI restriction', () => {
    const seed = makeSeed();
    const before = structuredClone(seed);
    const bundle = importSeed(seed);
    expect(seed).toEqual(before);
    expect(bundle.cities).toEqual([{
      ...seed.city, slug: seed.city.id, locationIds: ['TEST-L001', 'TEST-L002'], routeIds: [],
    }]);
    expect(bundle.locations).toEqual(seed.locations.map((location) => ({
      ...location,
      publication: { status: 'draft', reviewedBy: null, reviewedAt: null },
      place: { kind: 'unknown', survival: 'unknown', subject: null },
    })));
    expect(bundle.locations[1]?.allowsAIReconstruction).toBe(false);
    expect(bundle.routes).toEqual([]);
    expect(bundle.sources).toEqual([]);
    expect(bundle.claims).toEqual([]);
    expect(bundle.schemaVersion).toBe(1);
  });

  it('keeps editorial warnings opaque instead of converting them to classification or copy', () => {
    const seed = makeSeed();
    seed.locations[0]!.productionNotes.warning = 'SYNTHETIC WARNING: HAS NO BUILDING. TEST ONLY.';
    const location = importSeed(seed).locations[0]!;
    expect(location.productionNotes).toEqual(seed.locations[0]!.productionNotes);
    expect(location.place).toEqual({ kind: 'unknown', survival: 'unknown', subject: null });
    expect(location.hook).toBeNull();
    expect(location.lookAround).toEqual([]);
  });

  it.each([
    ['hook', 'SYNTHETIC UNAPPROVED COPY'],
    ['shortStory', { nl: 'SYNTHETIC UNAPPROVED COPY' }],
    ['extendedStory', 'SYNTHETIC UNAPPROVED COPY'],
    ['whyItMatters', 'SYNTHETIC UNAPPROVED COPY'],
    ['coordinates', { latitude: 0, longitude: 0 }],
    ['address', 'SYNTHETIC ADDRESS'],
    ['durationMinutes', 0],
    ['practicalInfo', {}],
    ['funFacts', ['SYNTHETIC UNAPPROVED FACT']],
    ['lookAround', ['SYNTHETIC UNAPPROVED INSTRUCTION']],
    ['timeline', [{}]],
    ['thenVsNow', [{}]],
    ['videos', [{}]],
    ['sources', ['SYNTHETIC-SOURCE']],
    ['routeIds', ['SYNTHETIC-ROUTE']],
    ['nearbyLocationIds', ['SYNTHETIC-NEIGHBOUR']],
    ['uncertainty', ['SYNTHETIC UNREVIEWED NOTE']],
    ['status', 'RESEARCHED'],
    ['researchStatus', { R01: 'DONE', R02: 'NOT_STARTED', C01: 'BLOCKED', V01: 'BLOCKED' }],
  ])('rejects enriched %s input without silently deleting or replacing it', (key, value) => {
    const seed = makeSeed();
    Object.assign(seed.locations[0]!, { [key]: value });
    expect(() => importSeed(seed)).toThrow(`locations.0.${key}`);
  });

  it('rejects non-null city coordinates', () => {
    const seed = makeSeed();
    Object.assign(seed.city, { center: { latitude: 0, longitude: 0 } });
    expect(() => importSeed(seed)).toThrow('city.center');
  });

  it.each(['top', 'city', 'location', 'researchStatus'])('rejects unknown keys in %s', (level) => {
    const seed = makeSeed();
    const target = level === 'top' ? seed : level === 'city' ? seed.city :
      level === 'location' ? seed.locations[0]! : seed.locations[0]!.researchStatus;
    Object.assign(target, { unexpectedField: 'SYNTHETIC VALUE MUST NOT DISAPPEAR' });
    expect(() => importSeed(seed)).toThrow('unexpectedField');
  });

  it('rejects injected publication or place rather than overwriting an existing decision', () => {
    const seed = makeSeed();
    Object.assign(seed.locations[0]!, { publication: { status: 'published' }, place: { kind: 'building' } });
    expect(() => importSeed(seed)).toThrow('publication');
  });

  it('requires AI restrictions and all empty fields to be explicit', () => {
    const seed = makeSeed();
    Reflect.deleteProperty(seed.locations[0]!, 'allowsAIReconstruction');
    expect(() => importSeed(seed)).toThrow('locations.0.allowsAIReconstruction');
  });

  it('validates descriptive seed metadata without treating it as publication approval', () => {
    const seed = makeSeed();
    Object.assign(seed, { _comment: 'SYNTHETIC LEGACY COMMENT' });
    expect(importSeed(seed).locations.every((location) => location.publication.status === 'draft')).toBe(true);
    Object.assign(seed, { _rules: { unexpected: true } });
    expect(() => importSeed(seed)).toThrow('_rules');
  });

  it('applies canonical identity and city-reference checks after mapping', () => {
    const seed = makeSeed();
    seed.locations[1]!.id = seed.locations[0]!.id;
    expect(() => importSeed(seed)).toThrow();
    const other = makeSeed();
    other.locations[0]!.cityId = 'synthetic-missing-city';
    expect(() => importSeed(other)).toThrow();
  });
});
