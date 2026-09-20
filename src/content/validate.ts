import { contentBundleSchema, type ContentBundle } from '../domain/content.js';

export type ContentIssue = { path: string; message: string };

export class ContentValidationError extends Error {
  constructor(public readonly issues: ContentIssue[]) {
    super(issues.map(({ path, message }) => `${path}: ${message}`).join('\n'));
    this.name = 'ContentValidationError';
  }
}

type ObjectValue = Record<string, unknown>;
function isObject(value: unknown): value is ObjectValue {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function visit(value: unknown, path: string, fn: (node: ObjectValue, path: string) => void): void {
  if (Array.isArray(value)) value.forEach((child, i) => visit(child, `${path}[${i}]`, fn));
  else if (isObject(value)) {
    fn(value, path);
    for (const [key, child] of Object.entries(value)) visit(child, `${path}.${key}`, fn);
  }
}

/** Validates a whole bundle, including relationships that a single record cannot prove. */
export function validateContent(input: unknown): ContentBundle {
  const parsed = contentBundleSchema.safeParse(input);
  if (!parsed.success) {
    throw new ContentValidationError(parsed.error.issues.map(issue => ({
      path: issue.path.length ? issue.path.map(String).join('.') : '$',
      message: issue.message,
    })));
  }
  const bundle = parsed.data;
  const issues: ContentIssue[] = [];
  const fail = (path: string, message: string) => { issues.push({ path, message }); };
  function index<T extends { id: string }>(items: T[], path: string): Map<string, T> {
    const result = new Map<string, T>();
    items.forEach((item, i) => {
      if (result.has(item.id)) fail(`${path}[${i}].id`, `Duplicate ID ${item.id}`);
      result.set(item.id, item);
    });
    return result;
  }
  const cities = index(bundle.cities, 'cities');
  const locations = index(bundle.locations, 'locations');
  const routes = index(bundle.routes, 'routes');
  const sources = index(bundle.sources, 'sources');
  const claims = index(bundle.claims, 'claims');

  function refs(ids: string[], target: Map<string, unknown>, path: string): void {
    const seen = new Set<string>();
    ids.forEach((id, i) => {
      if (seen.has(id)) fail(`${path}[${i}]`, `Duplicate reference ${id}`);
      seen.add(id);
      if (!target.has(id)) fail(`${path}[${i}]`, `Unknown reference ${id}`);
    });
  }
  visit(bundle, '$', (node, path) => {
    for (const [key, value] of Object.entries(node)) {
      if (!Array.isArray(value) || !value.every(v => typeof v === 'string')) continue;
      if (key === 'sourceIds' || key === 'sources') refs(value, sources, `${path}.${key}`);
      if (key === 'claimIds' || key === 'claimsSupported') refs(value, claims, `${path}.${key}`);
    }
  });

  bundle.cities.forEach((city, i) => {
    const path = `cities[${i}]`;
    refs(city.locationIds, locations, `${path}.locationIds`);
    refs(city.routeIds, routes, `${path}.routeIds`);
    for (const id of city.locationIds) {
      if (locations.get(id)?.cityId !== city.id) fail(`${path}.locationIds`, `${id} belongs to another city`);
    }
    for (const id of city.routeIds) {
      if (routes.get(id)?.cityId !== city.id) fail(`${path}.routeIds`, `${id} belongs to another city`);
    }
  });

  bundle.sources.forEach((source, i) => {
    for (const id of source.claimsSupported) {
      if (!claims.get(id)?.sourceIds.includes(source.id)) {
        fail(`sources[${i}].claimsSupported`, `${id} must also name source ${source.id}`);
      }
    }
  });
  bundle.claims.forEach((claim, i) => {
    const path = `claims[${i}]`;
    const location = locations.get(claim.locationId);
    if (!location) fail(`${path}.locationId`, `Unknown location ${claim.locationId}`);
    for (const id of claim.sourceIds) {
      if (!sources.get(id)?.claimsSupported.includes(claim.id)) {
        fail(`${path}.sourceIds`, `${id} must list ${claim.id} in claimsSupported`);
      }
      if (location && !location.sources.includes(id)) {
        fail(`${path}.sourceIds`, `${id} is missing from location ${location.id}'s source trail`);
      }
    }
    if (claim.verification !== 'draft' && !claim.sourceIds.some(id => sources.get(id)?.sourceType !== 'DISCOVERY_ONLY' && sources.has(id))) {
      fail(`${path}.sourceIds`, 'Verified or disputed claims need evidence beyond discovery-only sources');
    }
  });

  function localized(value: unknown, languages: readonly string[], path: string): void {
    if (!isObject(value)) { fail(path, 'Published text must provide every city language'); return; }
    for (const language of languages) {
      if (typeof value[language] !== 'string' || !value[language].trim()) {
        fail(`${path}.${language}`, 'Missing required published translation');
      }
    }
  }
  function publishedClaim(id: string, languages: readonly string[], path: string): void {
    const claim = claims.get(id);
    if (!claim) return;
    if (claim.verification === 'draft' || claim.confidence === 'unknown') {
      fail(path, `Claim ${id} has not passed source verification`);
    }
    localized(claim.text, languages, `${path}(${id}).text`);
    if (!claim.sourceIds.some(sourceId => sources.has(sourceId) && sources.get(sourceId)?.sourceType !== 'DISCOVERY_ONLY')) {
      fail(path, `Claim ${id} needs evidence beyond discovery-only sources`);
    }
  }
  function publicationContent(value: unknown, languages: readonly string[], path: string): void {
    visit(value, path, (node, nodePath) => {
      if ('nl' in node && 'en' in node) localized(node, languages, nodePath);
      if (Array.isArray(node.claimIds)) {
        if (!node.claimIds.length) fail(`${nodePath}.claimIds`, 'Published content requires specific claim references');
        for (const id of node.claimIds) if (typeof id === 'string') publishedClaim(id, languages, `${nodePath}.claimIds`);
      }
      if (isObject(node.verification) && node.verification.status !== 'verified') {
        fail(`${nodePath}.verification`, 'Unverified or outdated practical information cannot be published');
      }
      if (isObject(node.verification) && Array.isArray(node.verification.sourceIds) && !node.verification.sourceIds.some(id => typeof id === 'string' && sources.has(id) && sources.get(id)?.sourceType !== 'DISCOVERY_ONLY')) {
        fail(`${nodePath}.verification.sourceIds`, 'Published practical facts need evidence beyond discovery-only sources');
      }
    });
  }

  const locationSlugs = new Set<string>();
  bundle.locations.forEach((location, i) => {
    const path = `locations[${i}]`;
    const city = cities.get(location.cityId);
    if (!city) fail(`${path}.cityId`, `Unknown city ${location.cityId}`);
    else if (!city.locationIds.includes(location.id)) fail(`${path}.id`, 'Location missing from its city registry');
    const slugKey = `${location.cityId}/${location.slug}`;
    if (locationSlugs.has(slugKey)) fail(`${path}.slug`, 'Duplicate location slug within city');
    locationSlugs.add(slugKey);
    refs(location.routeIds, routes, `${path}.routeIds`);
    refs(location.nearbyLocationIds, locations, `${path}.nearbyLocationIds`);
    for (const id of location.nearbyLocationIds) {
      if (id === location.id || locations.get(id)?.cityId !== location.cityId) {
        fail(`${path}.nearbyLocationIds`, 'Nearby locations must be distinct locations in the same city');
      }
    }
    for (const id of location.routeIds) {
      const route = routes.get(id);
      if (route && (route.cityId !== location.cityId || ![...route.stopIds, ...route.variants.flatMap(v => v.stopIds)].includes(location.id))) {
        fail(`${path}.routeIds`, `${id} must belong to the same city and include this location`);
      }
    }
    visit(location, path, (node, nodePath) => {
      if (Array.isArray(node.sourceIds)) {
        for (const id of node.sourceIds) {
          if (typeof id === 'string' && !location.sources.includes(id)) fail(`${nodePath}.sourceIds`, `${id} is missing from this location's source trail`);
        }
      }
      if (Array.isArray(node.claimIds)) {
        for (const id of node.claimIds) {
          if (typeof id === 'string' && claims.has(id) && claims.get(id)?.locationId !== location.id) {
            fail(`${nodePath}.claimIds`, `Claim ${id} belongs to a different location`);
          }
        }
      }
      if (node.type === 'ai_reconstruction' || node.kind === 'ai_reconstruction') {
        if (!location.allowsAIReconstruction) fail(nodePath, 'AI reconstruction is forbidden for this location');
        if (!node.disclosure) fail(`${nodePath}.disclosure`, 'AI reconstruction requires a disclosure');
      }
      for (const [key, value] of Object.entries(node)) {
        if (Array.isArray(value) && value.length && value.every(item => isObject(item) && typeof item.id === 'string')) {
          index(value as Array<{ id: string }>, `${nodePath}.${key}`);
        }
      }
    });
    if (location.publication.status === 'published') {
      if (location.status !== 'PRODUCTION_READY' || location.researchStatus.R01 !== 'DONE' || location.researchStatus.R02 !== 'DONE' || location.researchStatus.C01 !== 'DONE') {
        fail(`${path}.researchStatus`, 'Publishing requires production readiness, R01, R02 and C01 completion');
      }
      if (!location.coordinates) fail(`${path}.coordinates`, 'Publishing requires sourced visitor coordinates');
      if (location.place.kind === 'unknown' || location.place.survival === 'unknown') fail(`${path}.place`, 'Publishing requires an explicit subject/viewpoint and survival status');
      if (!location.place.subject) fail(`${path}.place.subject`, 'Publishing requires the story subject to be distinguished from the visitor position');
      if (!location.hook || !location.shortStory) fail(path, 'Publishing requires a hook and short story');
      if (!location.sources.length) fail(`${path}.sources`, 'Publishing requires a source trail');
      if (!location.durationMinutes) fail(`${path}.durationMinutes`, 'Publishing requires a positive experience duration');
      if (location.funFacts.length < 3 || !location.lookAround.length || location.timeline.length < 3 || location.timeline.length > 8) {
        fail(path, 'Publishing requires at least 3 fun facts, Look Around You and 3–8 timeline milestones (Gate D)');
      }
      if (!location.qualityChecks || Object.values(location.qualityChecks).some(value => value !== 'passed')) {
        fail(`${path}.qualityChecks`, 'Publishing requires recorded historical, copy, UX, mobile and performance QA (Gate F)');
      }
      location.videos.forEach((video, j) => {
        const videoPath = `${path}.videos[${j}]`;
        if (location.researchStatus.V01 !== 'DONE' || !video.scenes.length) fail(videoPath, 'Published video requires completed V01 and a sourced scene list');
        if (!video.provider || !video.poster || !video.transcript) fail(videoPath, 'Published videos require delivery, a poster and a transcript');
        for (const language of city?.languages ?? []) {
          if (!video.captions.some(caption => caption.language === language)) fail(`${videoPath}.captions`, `Missing ${language} subtitles`);
        }
        if (new Set(video.captions.map(caption => caption.language)).size !== video.captions.length) fail(`${videoPath}.captions`, 'Subtitle languages must be unique');
      });
      if (city) publicationContent(location, city.languages, path);
    }
  });

  const routeSlugs = new Set<string>();
  bundle.routes.forEach((route, i) => {
    const path = `routes[${i}]`;
    const city = cities.get(route.cityId);
    if (!city) fail(`${path}.cityId`, `Unknown city ${route.cityId}`);
    else if (!city.routeIds.includes(route.id)) fail(`${path}.id`, 'Route missing from its city registry');
    const slugKey = `${route.cityId}/${route.slug}`;
    if (routeSlugs.has(slugKey)) fail(`${path}.slug`, 'Duplicate route slug within city');
    routeSlugs.add(slugKey);
    const stopLists = [{ stopIds: route.stopIds, path }, ...route.variants.map((variant, j) => ({ stopIds: variant.stopIds, path: `${path}.variants[${j}]` }))];
    index(route.variants, `${path}.variants`);
    for (const stops of stopLists) {
      refs(stops.stopIds, locations, `${stops.path}.stopIds`);
      for (const id of stops.stopIds) {
        const location = locations.get(id);
        if (location && (location.cityId !== route.cityId || !location.routeIds.includes(route.id))) {
          fail(`${stops.path}.stopIds`, `${id} must belong to this city and reference route ${route.id}`);
        }
        if (route.publication.status === 'published' && location?.publication.status !== 'published') {
          fail(`${stops.path}.stopIds`, `Published routes cannot include unpublished location ${id}`);
        }
      }
    }
    visit(route, path, (node, nodePath) => {
      if (!Array.isArray(node.claimIds)) return;
      for (const id of node.claimIds) {
        const claim = typeof id === 'string' ? claims.get(id) : undefined;
        if (claim && locations.get(claim.locationId)?.cityId !== route.cityId) fail(`${nodePath}.claimIds`, 'Route claim belongs to another city');
      }
    });
    if (route.publication.status === 'published') {
      if (!route.description) fail(`${path}.description`, 'Published routes need their narrative description');
      if (city) publicationContent(route, city.languages, path);
    }
  });
  if (issues.length) throw new ContentValidationError(issues);
  return bundle;
}
