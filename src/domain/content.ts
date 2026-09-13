import { z } from "zod";

// Editorial records deliberately retain nulls. Missing research is not content.
const text = z.string().refine(value => value.trim().length > 0, { message: "Text must not be blank" });
const id = text;
const ids = z.array(id);
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const nonNegative = z.number().finite().nonnegative();
export const languageSchema = z.enum(["nl", "en", "de", "fr"]);
export const confidenceSchema = z.enum([
  "verified", "probable", "plausible", "unknown", "disputed",
]);
export const httpUrlSchema = z.url().refine((value) => /^https?:\/\//i.test(value), {
  message: "Only HTTP(S) source and media URLs are permitted",
});

/** Calendar dates, rather than Date.parse's normalization of invalid dates. */
export const isoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}, { message: "Expected a real calendar date in YYYY-MM-DD format" });

const monthDaySchema = z.string().regex(/^\d{2}-\d{2}$/).refine((value) => {
  // A leap-year reference permits an explicit annual February 29 exception.
  return isoDateSchema.safeParse(`2000-${value}`).success;
}, { message: "Expected a real month and day in MM-DD format" });

export const localizedTextSchema = z.strictObject({
  nl: text.nullable(),
  en: text.nullable(),
  de: text.nullable().optional(),
  fr: text.nullable().optional(),
});

export const contentBlockSchema = z.strictObject({
  text: localizedTextSchema,
  claimIds: ids,
});

export const coordinatesSchema = z.strictObject({
  longitude: z.number().finite().min(-180).max(180),
  latitude: z.number().finite().min(-90).max(90),
  provenance: z.strictObject({
    provider: z.enum(["PDOK", "BAG"]),
    url: httpUrlSchema,
    checkedAt: isoDateSchema,
  }),
});

export const publicationSchema = z.strictObject({
  status: z.enum(["draft", "review", "published"]),
  reviewedBy: text.nullable(),
  reviewedAt: isoDateSchema.nullable(),
}).superRefine((value, context) => {
  if (value.status === "published" && (!value.reviewedBy || !value.reviewedAt)) {
    context.addIssue({
      code: "custom", message: "Published records need a named, dated review",
      path: [!value.reviewedBy ? "reviewedBy" : "reviewedAt"],
    });
  }
});

export const sourceRecordSchema = z.strictObject({
  id,
  title: text,
  institution: text.nullable(),
  url: httpUrlSchema.nullable(),
  sourceType: z.enum(["PRIMARY", "OFFICIAL", "ACADEMIC", "SECONDARY", "DISCOVERY_ONLY"]),
  claimsSupported: ids,
  notes: text.nullable(),
}).refine(value => Boolean(value.url || value.notes), {
  message: "Sources need a retrievable URL or a bibliographic/archive locator in notes", path: ["notes"],
});

export const claimValueSchema = z.discriminatedUnion("kind", [
  z.strictObject({ kind: z.literal("exact"), value: z.number().finite() }),
  z.strictObject({ kind: z.literal("range"), min: z.number().finite(), max: z.number().finite() })
    .refine((value) => value.min <= value.max, {
      message: "A claim's range minimum must not exceed its maximum", path: ["max"],
    }),
  z.strictObject({ kind: z.literal("text"), value: text }),
]);

export const claimSchema = z.strictObject({
  id,
  locationId: id,
  text: localizedTextSchema,
  value: claimValueSchema,
  confidence: confidenceSchema,
  note: text.nullable(),
  sourceIds: ids,
  verification: z.enum(["draft", "verified", "disputed"]),
}).superRefine((value, context) => {
  if ((value.confidence !== "verified" || value.value.kind === "range" || value.verification === "disputed") && !value.note) {
    context.addIssue({ code: "custom", path: ["note"], message: "Uncertain, disputed and range claims need an explanatory note" });
  }
  if (value.verification === "verified" && value.sourceIds.length === 0) {
    context.addIssue({ code: "custom", path: ["sourceIds"], message: "Verified claims need evidence" });
  }
  if (value.confidence === "verified" && value.verification !== "verified") {
    context.addIssue({ code: "custom", path: ["confidence"], message: "Verified confidence requires a verified claim" });
  }
});

export const factVerificationSchema = z.strictObject({
  status: z.enum(["unverified", "verified", "outdated"]),
  sourceIds: ids,
  checkedAt: isoDateSchema.nullable(),
}).superRefine((value, context) => {
  if (value.status === "verified" && (!value.checkedAt || value.sourceIds.length === 0)) {
    context.addIssue({ code: "custom", message: "Verified practical facts need a source and check date", path: [value.checkedAt ? "sourceIds" : "checkedAt"] });
  }
});

export const weekdaySchema = z.enum([
  "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",
]);

export const dateRangeSchema = z.strictObject({
  startDate: isoDateSchema,
  endDate: isoDateSchema,
}).refine((value) => value.startDate <= value.endDate, {
  message: "Date range must end on or after its start", path: ["endDate"],
});

// Annual ranges intentionally allow September–March and December–January.
export const annualRangeSchema = z.strictObject({
  startMonthDay: monthDaySchema,
  endMonthDay: monthDaySchema,
});

export const temporalConditionSchema = z.strictObject({
  weekdays: z.array(weekdaySchema).min(1).nullable(),
  dateRange: dateRangeSchema.nullable(),
  annualRange: annualRangeSchema.nullable(),
}).superRefine((value, context) => {
  if (!value.weekdays && !value.dateRange && !value.annualRange) {
    context.addIssue({ code: "custom", message: "A time condition must state weekdays or a date range" });
  }
  if (value.dateRange && value.annualRange) {
    context.addIssue({ code: "custom", message: "Use either dated or annually recurring bounds", path: ["annualRange"] });
  }
  if (value.weekdays && new Set(value.weekdays).size !== value.weekdays.length) {
    context.addIssue({ code: "custom", message: "Weekdays must be unique", path: ["weekdays"] });
  }
});

const clockTimeSchema = z.string().regex(/^(?:[01]\d|2[0-3]):[0-5]\d$/);
export const timeWindowSchema = z.strictObject({
  opens: clockTimeSchema,
  closes: clockTimeSchema,
}).refine((value) => value.opens < value.closes, {
  message: "Opening windows must close later on the same day; split overnight windows", path: ["closes"],
});

export const openingPeriodSchema = z.strictObject({
  when: temporalConditionSchema,
  windows: z.array(timeWindowSchema).min(1),
  verification: factVerificationSchema,
});

export const openingHoursSchema = z.discriminatedUnion("kind", [
  z.strictObject({ kind: z.literal("unknown"), note: contentBlockSchema.nullable(), verification: factVerificationSchema }),
  z.strictObject({ kind: z.literal("always_open"), note: contentBlockSchema.nullable(), verification: factVerificationSchema }),
  z.strictObject({ kind: z.literal("scheduled"), periods: z.array(openingPeriodSchema).min(1), note: contentBlockSchema.nullable(), verification: factVerificationSchema }),
]);

export const priceSchema = z.strictObject({
  label: localizedTextSchema,
  amount: nonNegative,
  currency: z.string().regex(/^[A-Z]{3}$/),
  bookingUrl: httpUrlSchema.nullable(),
  verification: factVerificationSchema,
});

export const costSchema = z.discriminatedUnion("kind", [
  z.strictObject({ kind: z.literal("unknown"), note: contentBlockSchema.nullable(), verification: factVerificationSchema }),
  z.strictObject({ kind: z.literal("free"), note: contentBlockSchema.nullable(), verification: factVerificationSchema }),
  z.strictObject({ kind: z.literal("ticketed"), prices: z.array(priceSchema).min(1), note: contentBlockSchema.nullable(), verification: factVerificationSchema }),
]);

export const accessDetailSchema = z.strictObject({
  id,
  area: localizedTextSchema,
  kind: z.enum(["step_free", "stairs", "wheelchair", "toilet", "assistance", "equipment", "age", "other"]),
  status: z.enum(["accessible", "restricted", "inaccessible", "unknown"]),
  instruction: contentBlockSchema,
  verification: factVerificationSchema,
});

export const behaviourRuleSchema = z.strictObject({
  id,
  instruction: contentBlockSchema,
  verification: factVerificationSchema,
});

export const closureSchema = z.strictObject({
  id,
  when: temporalConditionSchema,
  reason: contentBlockSchema,
  reopeningWindows: z.array(dateRangeSchema),
  alternativeInstruction: contentBlockSchema.nullable(),
  verification: factVerificationSchema,
}).superRefine((value, context) => {
  if (!value.when.dateRange && value.reopeningWindows.length > 0) {
    context.addIssue({ code: "custom", path: ["reopeningWindows"], message: "Dated reopening windows require a dated closure" });
  }
  if (value.when.dateRange) {
    const closure = value.when.dateRange;
    value.reopeningWindows.forEach((window, index) => {
      if (window.startDate < closure.startDate || window.endDate > closure.endDate) {
        context.addIssue({ code: "custom", path: ["reopeningWindows", index], message: "Reopening windows must fall inside their closure period" });
      }
    });
  }
});

export const temporaryStateSchema = z.strictObject({
  id,
  when: temporalConditionSchema.nullable(),
  description: contentBlockSchema,
  verification: factVerificationSchema,
});

export const practicalInfoSchema = z.strictObject({
  hours: openingHoursSchema,
  cost: costSchema,
  accessibility: z.array(accessDetailSchema),
  behaviour: z.array(behaviourRuleSchema),
  closures: z.array(closureSchema),
  temporaryStates: z.array(temporaryStateSchema),
  contact: z.strictObject({
    phone: text.nullable(),
    email: z.email().nullable(),
    website: httpUrlSchema.nullable(),
    verification: factVerificationSchema,
  }).nullable(),
});

export const funFactSchema = z.strictObject({
  id,
  claim: contentBlockSchema,
  explanation: contentBlockSchema,
  sourceIds: ids,
  confidence: confidenceSchema,
  physicallyVisible: z.boolean(),
  suitableForChildren: z.boolean(),
  suitableForSharing: z.boolean(),
});

export const lookAroundItemSchema = z.strictObject({
  id,
  instruction: contentBlockSchema,
  direction: localizedTextSchema,
  targetObject: localizedTextSchema,
  explanation: contentBlockSchema,
  historicalRelevance: contentBlockSchema,
  accessibilityNote: contentBlockSchema,
  confidence: confidenceSchema,
});

export const timelineItemSchema = z.strictObject({
  id,
  dateLabel: localizedTextSchema,
  description: contentBlockSchema,
});

const mediaFields = {
  id,
  url: httpUrlSchema,
  sourceIds: ids,
  claimIds: ids,
  disclosure: localizedTextSchema.nullable(),
  caption: contentBlockSchema,
};

export const imageAssetSchema = z.strictObject({
  ...mediaFields,
  type: z.enum(["archival", "ai_reconstruction", "current"]),
}).superRefine((value, context) => {
  if (value.type === "ai_reconstruction" && (!value.disclosure || !Object.values(value.disclosure).some(Boolean))) {
    context.addIssue({ code: "custom", path: ["disclosure"], message: "AI reconstructions require a visible disclosure" });
  }
  if (value.type === "archival" && value.sourceIds.length === 0) {
    context.addIssue({ code: "custom", path: ["sourceIds"], message: "Archival imagery must identify its historical source" });
  }
});

export const thenVsNowSchema = z.strictObject({
  id,
  then: imageAssetSchema,
  now: imageAssetSchema,
  historicalDate: localizedTextSchema,
  viewpoint: contentBlockSchema,
  caption: contentBlockSchema,
  knownChanges: z.array(contentBlockSchema),
}).superRefine((value, context) => {
  if (value.then.type === "current") {
    context.addIssue({ code: "custom", path: ["then", "type"], message: "The historical image must explicitly be archival or a reconstruction" });
  }
  if (value.now.type !== "current") {
    context.addIssue({ code: "custom", path: ["now", "type"], message: "The present-day image must be a current photograph" });
  }
});

export const videoSceneSchema = z.strictObject({
  id,
  description: contentBlockSchema,
  narration: contentBlockSchema,
  claimIds: ids,
  sourceIds: ids,
  uncertainty: text.nullable(),
});

export const historicalVideoSchema = z.strictObject({
  id,
  type: z.enum(["archival", "ai_reconstruction", "current"]),
  period: localizedTextSchema,
  concept: contentBlockSchema,
  script: contentBlockSchema,
  scenes: z.array(videoSceneSchema),
  sourceIds: ids,
  claimIds: ids,
  mustShow: z.array(contentBlockSchema),
  mayShow: z.array(contentBlockSchema),
  mustNotShow: z.array(contentBlockSchema),
  disclosure: localizedTextSchema.nullable(),
  durationSeconds: z.number().finite().positive(),
  poster: imageAssetSchema.nullable(),
  captions: z.array(z.strictObject({ language: languageSchema, url: httpUrlSchema })),
  transcript: contentBlockSchema.nullable(),
  provider: z.discriminatedUnion("kind", [
    z.strictObject({ kind: z.literal("cloudflare_stream"), assetId: id }),
    z.strictObject({ kind: z.literal("file"), url: httpUrlSchema }),
  ]).nullable(),
}).superRefine((value, context) => {
  if (value.type === "ai_reconstruction" && (!value.disclosure || !Object.values(value.disclosure).some(Boolean))) {
    context.addIssue({ code: "custom", path: ["disclosure"], message: "AI video requires a visible reconstruction disclosure" });
  }
  if (value.type === "archival" && value.sourceIds.length === 0) {
    context.addIssue({ code: "custom", path: ["sourceIds"], message: "Archival video must identify its source" });
  }
});

export const uncertaintyRecordSchema = z.strictObject({
  id,
  claimIds: ids,
  description: localizedTextSchema,
  confidence: confidenceSchema,
  sourceIds: ids,
});

export const placeSchema = z.strictObject({
  kind: z.enum(["structure", "site", "viewpoint", "unknown"]),
  survival: z.enum(["original", "partial", "replacement", "lost", "not_applicable", "unknown"]),
  subject: localizedTextSchema.nullable(),
});

export const productionNotesSchema = z.strictObject({
  absorbs: ids.optional(),
  lookAroundSeed: text.optional(),
  warning: text.optional(),
  pairsWith: id.optional(),
  accessNote: text.optional(),
  carriesTheme: text.optional(),
  thenVsNow: text.optional(),
  partnerLead: text.optional(),
  reservedSlot: text.optional(),
  carriesContent: text.optional(),
  bindingCondition: text.optional(),
});

const taskStatusSchema = z.enum(["NOT_STARTED", "IN_PROGRESS", "BLOCKED", "DONE"]);
export const locationSchema = z.strictObject({
  id,
  cityId: id,
  slug,
  name: text,
  fromCandidate: id,
  coordinates: coordinatesSchema.nullable(),
  address: text.nullable(),
  eras: z.array(text),
  categories: z.array(text),
  mainTheme: text,
  durationMinutes: nonNegative.nullable(),
  hook: contentBlockSchema.nullable(),
  shortStory: contentBlockSchema.nullable(),
  extendedStory: contentBlockSchema.nullable(),
  whyItMatters: contentBlockSchema.nullable(),
  funFacts: z.array(funFactSchema),
  lookAround: z.array(lookAroundItemSchema),
  timeline: z.array(timelineItemSchema),
  thenVsNow: z.array(thenVsNowSchema),
  videos: z.array(historicalVideoSchema),
  practicalInfo: practicalInfoSchema.nullable(),
  routeIds: ids,
  nearbyLocationIds: ids,
  sources: ids,
  uncertainty: z.array(uncertaintyRecordSchema),
  allowsAIReconstruction: z.boolean(),
  status: z.enum(["SELECTED_NOT_RESEARCHED", "RESEARCH_IN_PROGRESS", "RESEARCH_VERIFIED", "CONTENT_REVIEW", "PRODUCTION_READY"]),
  researchStatus: z.strictObject({ R01: taskStatusSchema, R02: taskStatusSchema, C01: taskStatusSchema, V01: taskStatusSchema }),
  productionNotes: productionNotesSchema,
  publication: publicationSchema,
  place: placeSchema,
  qualityChecks: z.strictObject({
    historical: z.enum(["pending", "passed", "failed"]),
    copy: z.enum(["pending", "passed", "failed"]),
    ux: z.enum(["pending", "passed", "failed"]),
    mobile: z.enum(["pending", "passed", "failed"]),
    performance: z.enum(["pending", "passed", "failed"]),
  }).optional(),
});

export const citySchema = z.strictObject({
  id,
  slug,
  name: text,
  center: coordinatesSchema.nullable(),
  languages: z.array(languageSchema).min(1)
    .refine(value => new Set(value).size === value.length, { message: "City languages must be unique" })
    .refine(value => value.includes("nl") && value.includes("en"), { message: "The project's required city languages are NL and EN" }),
  locationIds: ids,
  routeIds: ids,
});

export const routeVariantSchema = z.strictObject({
  id,
  when: temporalConditionSchema,
  stopIds: ids.min(1),
  description: contentBlockSchema,
});

export const routeSchema = z.strictObject({
  id,
  cityId: id,
  slug,
  name: localizedTextSchema,
  description: contentBlockSchema.nullable(),
  stopIds: ids.min(1),
  variants: z.array(routeVariantSchema),
  publication: publicationSchema,
});

export const contentBundleSchema = z.strictObject({
  schemaVersion: z.literal(1),
  cities: z.array(citySchema),
  locations: z.array(locationSchema),
  routes: z.array(routeSchema),
  sources: z.array(sourceRecordSchema),
  claims: z.array(claimSchema),
});

export type Language = z.infer<typeof languageSchema>;
export type LocalizedText = z.infer<typeof localizedTextSchema>;
export type ContentBlock = z.infer<typeof contentBlockSchema>;
export type Coordinates = z.infer<typeof coordinatesSchema>;
export type Publication = z.infer<typeof publicationSchema>;
export type SourceRecord = z.infer<typeof sourceRecordSchema>;
export type Claim = z.infer<typeof claimSchema>;
export type FactVerification = z.infer<typeof factVerificationSchema>;
export type TemporalCondition = z.infer<typeof temporalConditionSchema>;
export type PracticalInfo = z.infer<typeof practicalInfoSchema>;
export type FunFact = z.infer<typeof funFactSchema>;
export type LookAroundItem = z.infer<typeof lookAroundItemSchema>;
export type TimelineItem = z.infer<typeof timelineItemSchema>;
export type ImageAsset = z.infer<typeof imageAssetSchema>;
export type ThenVsNow = z.infer<typeof thenVsNowSchema>;
export type HistoricalVideo = z.infer<typeof historicalVideoSchema>;
export type UncertaintyRecord = z.infer<typeof uncertaintyRecordSchema>;
export type ProductionNotes = z.infer<typeof productionNotesSchema>;
export type Location = z.infer<typeof locationSchema>;
export type City = z.infer<typeof citySchema>;
export type RouteVariant = z.infer<typeof routeVariantSchema>;
export type Route = z.infer<typeof routeSchema>;
export type ContentBundle = z.infer<typeof contentBundleSchema>;
