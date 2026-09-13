import type { ContentBlock, ContentBundle, HistoricalVideo, ImageAsset, Location, PracticalInfo } from '../src/domain/content.js';

export const translated = { nl: 'SYNTHETISCHE TESTTEKST', en: 'SYNTHETIC TEST TEXT' };
export function block(): ContentBlock { return { text: { ...translated }, claimIds: ['TEST-CLAIM'] }; }
export function draftLocation(): Location {
  return {
    id: 'TEST-L001', cityId: 'test-city', slug: 'test-location', name: 'SYNTHETIC TEST LOCATION',
    fromCandidate: 'TEST-C001', coordinates: null, address: null, eras: [], categories: [],
    mainTheme: 'SYNTHETIC TEST THEME', durationMinutes: null, hook: null, shortStory: null,
    extendedStory: null, whyItMatters: null, funFacts: [], lookAround: [], timeline: [],
    thenVsNow: [], videos: [], practicalInfo: null, routeIds: [], nearbyLocationIds: [],
    sources: [], uncertainty: [], allowsAIReconstruction: false, status: 'SELECTED_NOT_RESEARCHED',
    researchStatus: { R01: 'NOT_STARTED', R02: 'NOT_STARTED', C01: 'BLOCKED', V01: 'BLOCKED' },
    productionNotes: {}, publication: { status: 'draft', reviewedBy: null, reviewedAt: null },
    place: { kind: 'unknown', survival: 'unknown', subject: null },
  };
}
export function draftBundle(): ContentBundle {
  return {
    schemaVersion: 1,
    cities: [{ id: 'test-city', slug: 'test-city', name: 'SYNTHETIC TEST CITY', center: null,
      languages: ['nl', 'en'], locationIds: ['TEST-L001'], routeIds: [] }],
    locations: [draftLocation()], routes: [], sources: [], claims: [],
  };
}
export function withEvidence(): ContentBundle {
  const bundle = draftBundle();
  bundle.sources.push({ id: 'TEST-SOURCE', title: 'SYNTHETIC TEST DOCUMENT', institution: 'TEST INSTITUTION',
    url: 'https://example.invalid/test-evidence', sourceType: 'OFFICIAL', claimsSupported: ['TEST-CLAIM'], notes: null });
  bundle.claims.push({ id: 'TEST-CLAIM', locationId: 'TEST-L001', text: { ...translated },
    value: { kind: 'text', value: 'SYNTHETIC TEST VALUE' }, confidence: 'verified', note: null,
    sourceIds: ['TEST-SOURCE'], verification: 'verified' });
  bundle.locations[0]!.sources = ['TEST-SOURCE'];
  return bundle;
}
export function publishedBundle(): ContentBundle {
  const bundle = withEvidence();
  const location = bundle.locations[0]!;
  Object.assign(location, {
    status: 'PRODUCTION_READY',
    publication: { status: 'published', reviewedBy: 'SYNTHETIC TEST REVIEWER', reviewedAt: '2000-01-01' },
    researchStatus: { R01: 'DONE', R02: 'DONE', C01: 'DONE', V01: 'NOT_STARTED' },
    qualityChecks: { historical: 'passed', copy: 'passed', ux: 'passed', mobile: 'passed', performance: 'passed' },
    place: { kind: 'viewpoint', survival: 'not_applicable', subject: { ...translated } },
    coordinates: { longitude: 0, latitude: 0, provenance: { provider: 'PDOK', url: 'https://example.invalid/test-coordinate', checkedAt: '2000-01-01' } },
    durationMinutes: 5, hook: block(), shortStory: block(),
    funFacts: [1, 2, 3].map(i => ({ id: `TEST-FACT-${i}`, claim: block(), explanation: block(), sourceIds: ['TEST-SOURCE'],
      confidence: 'verified', physicallyVisible: false, suitableForChildren: true, suitableForSharing: false })),
    lookAround: [{ id: 'TEST-LOOK', instruction: block(), direction: { ...translated }, targetObject: { ...translated },
      explanation: block(), historicalRelevance: block(), accessibilityNote: block(), confidence: 'verified' }],
    timeline: [1, 2, 3].map(i => ({ id: `TEST-TIMELINE-${i}`, dateLabel: { ...translated }, description: block() })),
  });
  return bundle;
}
export function image(type: ImageAsset['type'] = 'current'): ImageAsset {
  return { id: `TEST-IMAGE-${type}`, type, url: 'https://example.invalid/test.jpg', sourceIds: ['TEST-SOURCE'],
    claimIds: ['TEST-CLAIM'], disclosure: type === 'ai_reconstruction' ? { ...translated } : null, caption: block() };
}
export function video(): HistoricalVideo {
  return { id: 'TEST-VIDEO', type: 'current', period: { ...translated }, concept: block(), script: block(),
    scenes: [], sourceIds: ['TEST-SOURCE'], claimIds: ['TEST-CLAIM'], mustShow: [], mayShow: [], mustNotShow: [], disclosure: null,
    durationSeconds: 30, poster: image(), captions: ['nl', 'en'].map(language => ({ language: language as 'nl' | 'en', url: 'https://example.invalid/captions.vtt' })),
    transcript: block(), provider: { kind: 'file', url: 'https://example.invalid/video.mp4' } };
}
export function practical(): PracticalInfo {
  const verification = { status: 'verified' as const, sourceIds: ['TEST-SOURCE'], checkedAt: '2000-01-01' };
  return {
    hours: { kind: 'always_open', note: null, verification }, cost: { kind: 'free', note: null, verification },
    accessibility: [], behaviour: [], closures: [], temporaryStates: [], contact: null,
  };
}
