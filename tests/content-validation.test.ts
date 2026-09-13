import { describe, expect, it } from 'vitest';
import { validateContent } from '../src/content/validate.js';
import { annualRangeSchema, claimSchema, closureSchema, coordinatesSchema, temporalConditionSchema, timeWindowSchema } from '../src/domain/content.js';
import { block, draftBundle, image, practical, publishedBundle, translated, video, withEvidence } from './content-fixtures.js';

describe('whole-bundle identity and source integrity', () => {
  it('keeps empty drafts and fully reviewed synthetic publication distinguishable', () => {
    expect(validateContent(draftBundle()).locations[0]!.hook).toBeNull();
    expect(validateContent(publishedBundle()).locations[0]!.publication.status).toBe('published');
  });
  it('does not change editorial whitespace', () => {
    const bundle = draftBundle(); bundle.locations[0]!.productionNotes.warning = '  SYNTHETIC WARNING  ';
    expect(validateContent(bundle)).toEqual(bundle);
  });
  it.each(['cities', 'locations', 'sources', 'claims'] as const)('rejects duplicate %s IDs', key => {
    const bundle = withEvidence(); const array = bundle[key] as Array<unknown>; array.push(structuredClone(array[0]));
    expect(() => validateContent(bundle)).toThrow('Duplicate ID');
  });
  it('rejects unknown properties rather than silently dropping fields', () => {
    const bundle = draftBundle(); Object.assign(bundle.locations[0]!, { hooked: 'TYPO' });
    expect(() => validateContent(bundle)).toThrow('hooked');
  });
  it('rejects unknown sources and mismatched bidirectional evidence', () => {
    const bundle = withEvidence(); bundle.sources[0]!.claimsSupported = [];
    expect(() => validateContent(bundle)).toThrow('claimsSupported');
    bundle.claims[0]!.sourceIds = ['NOT-FOUND'];
    expect(() => validateContent(bundle)).toThrow('Unknown reference NOT-FOUND');
  });
  it('requires a specific retrievable source citation', () => {
    const bundle = withEvidence(); bundle.sources[0]!.url = null;
    expect(() => validateContent(bundle)).toThrow('locator');
    bundle.sources[0]!.notes = 'SYNTHETIC archival inventory TEST-123, folio 4';
    expect(() => validateContent(bundle)).not.toThrow();
  });
  it('rejects a verified claim supported solely by a discovery lead', () => {
    const bundle = withEvidence(); bundle.sources[0]!.sourceType = 'DISCOVERY_ONLY';
    expect(() => validateContent(bundle)).toThrow('beyond discovery-only');
  });
  it('requires every claim source in its location source trail', () => {
    const bundle = withEvidence(); bundle.locations[0]!.sources = [];
    expect(() => validateContent(bundle)).toThrow('source trail');
  });
  it('rejects claims borrowed from another location', () => {
    const bundle = withEvidence(); const second = structuredClone(bundle.locations[0]!);
    second.id = 'TEST-L002'; second.slug = 'test-second'; second.hook = block();
    bundle.locations.push(second); bundle.cities[0]!.locationIds.push(second.id);
    expect(() => validateContent(bundle)).toThrow('different location');
  });
  it('requires reciprocal city membership and forbids duplicate city slugs', () => {
    const bundle = draftBundle(); bundle.cities[0]!.locationIds = [];
    expect(() => validateContent(bundle)).toThrow('city registry');
  });
  it('allows the same slug in separate cities with distinct IDs', () => {
    const bundle = draftBundle(); const other = structuredClone(bundle.locations[0]!);
    other.id = 'TEST-L002'; other.cityId = 'second-city';
    bundle.locations.push(other);
    bundle.cities.push({ ...bundle.cities[0]!, id: 'second-city', slug: 'second-city', locationIds: [other.id] });
    expect(() => validateContent(bundle)).not.toThrow();
    other.cityId = 'test-city'; bundle.cities[0]!.locationIds.push(other.id);
    expect(() => validateContent(bundle)).toThrow('Duplicate location slug');
  });
});

describe('publication gates', () => {
  it('cannot publish selection or R01-only research', () => {
    const bundle = publishedBundle(); bundle.locations[0]!.researchStatus.R02 = 'NOT_STARTED';
    expect(() => validateContent(bundle)).toThrow('R02');
  });
  it('requires a named dated review and all production QA outcomes', () => {
    const bundle = publishedBundle(); bundle.locations[0]!.publication.reviewedBy = null;
    expect(() => validateContent(bundle)).toThrow('named, dated review');
    bundle.locations[0]!.publication.reviewedBy = 'SYNTHETIC TEST REVIEWER';
    bundle.locations[0]!.qualityChecks!.mobile = 'pending';
    expect(() => validateContent(bundle)).toThrow('Gate F');
  });
  it.each(['nl', 'en'] as const)('requires %s for every published text block and canonical claim', language => {
    const bundle = publishedBundle(); bundle.locations[0]!.hook!.text[language] = null;
    expect(() => validateContent(bundle)).toThrow('Missing required published translation');
    bundle.locations[0]!.hook!.text[language] = 'SYNTHETIC TEST'; bundle.claims[0]!.text[language] = null;
    expect(() => validateContent(bundle)).toThrow('Missing required published translation');
  });
  it('supports configured future languages without silently falling back', () => {
    const bundle = publishedBundle(); bundle.cities[0]!.languages.push('de');
    expect(() => validateContent(bundle)).toThrow('.de');
  });
  it('cannot lower the locked NL+EN publication requirement through city configuration', () => {
    const bundle = publishedBundle(); bundle.cities[0]!.languages = ['nl'];
    expect(() => validateContent(bundle)).toThrow('NL and EN');
  });
  it('requires exact claim references for visitor prose', () => {
    const bundle = publishedBundle(); bundle.locations[0]!.shortStory!.claimIds = [];
    expect(() => validateContent(bundle)).toThrow('specific claim references');
  });
  it('rejects unverified content claims and unknown coordinates', () => {
    const bundle = publishedBundle(); bundle.claims[0]!.confidence = 'probable'; bundle.claims[0]!.note = 'SYNTHETIC uncertainty'; bundle.claims[0]!.verification = 'draft';
    expect(() => validateContent(bundle)).toThrow('source verification');
    bundle.claims[0]!.verification = 'verified'; bundle.locations[0]!.coordinates = null;
    expect(() => validateContent(bundle)).toThrow('sourced visitor coordinates');
  });
  it('requires physical subject/survival and the core visitor content', () => {
    const bundle = publishedBundle(); bundle.locations[0]!.place.subject = null;
    expect(() => validateContent(bundle)).toThrow('story subject');
    bundle.locations[0]!.place.subject = { ...translated }; bundle.locations[0]!.lookAround = [];
    expect(() => validateContent(bundle)).toThrow('Gate D');
  });
  it('does not publish unverified or outdated practical information', () => {
    const bundle = publishedBundle(); bundle.locations[0]!.practicalInfo = practical();
    expect(() => validateContent(bundle)).not.toThrow();
    bundle.locations[0]!.practicalInfo.hours.verification.status = 'outdated';
    expect(() => validateContent(bundle)).toThrow('cannot be published');
    bundle.locations[0]!.publication.status = 'draft';
    expect(() => validateContent(bundle)).not.toThrow();
  });
  it('requires practical and media evidence in the location source trail', () => {
    const bundle = publishedBundle(); bundle.locations[0]!.practicalInfo = practical();
    bundle.sources.push({ ...bundle.sources[0]!, id: 'UNRELATED', claimsSupported: [] });
    bundle.locations[0]!.practicalInfo.hours.verification.sourceIds = ['UNRELATED'];
    expect(() => validateContent(bundle)).toThrow('source trail');
    bundle.locations[0]!.practicalInfo = null;
    const clip = video(); clip.poster!.sourceIds = ['UNRELATED']; bundle.locations[0]!.videos = [clip];
    expect(() => validateContent(bundle)).toThrow('source trail');
  });
  it('enforces the minimum three fun facts', () => {
    const bundle = publishedBundle(); bundle.locations[0]!.funFacts.length = 1;
    expect(() => validateContent(bundle)).toThrow('at least 3 fun facts');
  });
  it('rejects duplicate IDs in content arrays', () => {
    const bundle = publishedBundle(); bundle.locations[0]!.timeline.push(structuredClone(bundle.locations[0]!.timeline[0]!));
    expect(() => validateContent(bundle)).toThrow('Duplicate ID');
  });
});

describe('media restrictions', () => {
  it('blocks AI images nested inside Then vs Now for a restricted location', () => {
    const bundle = withEvidence(); bundle.locations[0]!.thenVsNow = [{ id: 'TEST-COMPARISON', then: image('ai_reconstruction'),
      now: image(), historicalDate: { ...translated }, viewpoint: block(), caption: block(), knownChanges: [] }];
    expect(() => validateContent(bundle)).toThrow('AI reconstruction is forbidden');
    bundle.locations[0]!.allowsAIReconstruction = true;
    expect(() => validateContent(bundle)).not.toThrow();
    bundle.locations[0]!.thenVsNow[0]!.then.disclosure = null;
    expect(() => validateContent(bundle)).toThrow('disclosure');
  });
  it('blocks a reconstruction hidden in the poster of an archival/current video', () => {
    const bundle = withEvidence(); const clip = video(); clip.poster = image('ai_reconstruction'); bundle.locations[0]!.videos.push(clip);
    expect(() => validateContent(bundle)).toThrow('AI reconstruction is forbidden');
  });
  it('requires published delivery, fallback content and subtitles for all city languages', () => {
    const bundle = publishedBundle(); bundle.locations[0]!.videos.push(video());
    expect(() => validateContent(bundle)).not.toThrow();
    bundle.locations[0]!.videos[0]!.captions = [];
    expect(() => validateContent(bundle)).toThrow('subtitles');
    bundle.locations[0]!.videos[0]!.provider = null;
    expect(() => validateContent(bundle)).toThrow('delivery');
  });
  it('cannot publish video before V01 or without a sourced scene list', () => {
    const bundle = publishedBundle(); bundle.locations[0]!.videos = [video()]; bundle.locations[0]!.researchStatus.V01 = 'NOT_STARTED';
    expect(() => validateContent(bundle)).toThrow('V01');
    bundle.locations[0]!.researchStatus.V01 = 'DONE'; bundle.locations[0]!.videos[0]!.scenes = [];
    expect(() => validateContent(bundle)).toThrow('scene list');
  });
});

describe('date-aware routes and temporal records', () => {
  it('represents a closure, an opening inside it, and a sourced alternative instruction', () => {
    const closure = { id: 'TEST-CLOSURE', when: { weekdays: null, annualRange: null,
      dateRange: { startDate: '2000-01-01', endDate: '2000-12-31' } }, reason: block(),
      reopeningWindows: [{ startDate: '2000-06-01', endDate: '2000-06-02' }], alternativeInstruction: block(),
      verification: { status: 'verified', sourceIds: ['TEST-SOURCE'], checkedAt: '2000-01-01' } };
    expect(closureSchema.safeParse(closure).success).toBe(true);
    closure.reopeningWindows[0]!.endDate = '2001-01-01';
    expect(closureSchema.safeParse(closure).success).toBe(false);
  });
  it('distinguishes annual seasons crossing New Year and rejects invalid dates/times', () => {
    expect(annualRangeSchema.safeParse({ startMonthDay: '09-21', endMonthDay: '03-20' }).success).toBe(true);
    expect(annualRangeSchema.safeParse({ startMonthDay: '02-30', endMonthDay: '03-20' }).success).toBe(false);
    expect(timeWindowSchema.safeParse({ opens: '23:00', closes: '01:00' }).success).toBe(false);
    expect(temporalConditionSchema.safeParse({ weekdays: null, dateRange: null, annualRange: null }).success).toBe(false);
  });
  it('supports route variants without publishing unreviewed stops', () => {
    const bundle = withEvidence(); const location = bundle.locations[0]!;
    bundle.cities[0]!.routeIds = ['TEST-ROUTE']; location.routeIds = ['TEST-ROUTE'];
    bundle.routes.push({ id: 'TEST-ROUTE', cityId: location.cityId, slug: 'test-route', name: { ...translated }, description: block(), stopIds: [location.id],
      variants: [{ id: 'TEST-VARIANT', when: { weekdays: null, dateRange: null, annualRange: { startMonthDay: '10-03', endMonthDay: '10-03' } }, stopIds: [location.id], description: block() }],
      publication: { status: 'draft', reviewedBy: null, reviewedAt: null } });
    expect(() => validateContent(bundle)).not.toThrow();
    bundle.routes[0]!.variants[0]!.stopIds = ['MISSING-STOP'];
    expect(() => validateContent(bundle)).toThrow('MISSING-STOP');
    bundle.routes[0]!.variants[0]!.stopIds = [location.id];
    bundle.routes[0]!.publication = { status: 'published', reviewedBy: 'TEST REVIEWER', reviewedAt: '2000-01-01' };
    expect(() => validateContent(bundle)).toThrow('unpublished location');
  });
  it('rejects inverted uncertainty ranges and numeric-string coordinates', () => {
    const claim = withEvidence().claims[0]!;
    claim.value = { kind: 'range', min: 2, max: 1 }; claim.note = 'SYNTHETIC range note';
    expect(claimSchema.safeParse(claim).success).toBe(false);
    claim.value = { kind: 'range', min: 1, max: 2 }; claim.confidence = 'disputed'; claim.verification = 'disputed';
    expect(claimSchema.safeParse(claim).success).toBe(true);
    expect(coordinatesSchema.safeParse({ longitude: '0', latitude: 0, provenance: { provider: 'PDOK', url: 'https://example.invalid', checkedAt: '2000-01-01' } }).success).toBe(false);
  });
});
