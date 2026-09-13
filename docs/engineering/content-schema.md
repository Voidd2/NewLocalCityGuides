# Content schema and validation

Task: FND-005. Runtime: Node.js 24. The executable definition is
`src/domain/content.ts`; inferred TypeScript types come from the same Zod schemas.
`src/content/validate.ts` checks relationships and publication requirements across
the entire bundle. Application code must use `validateContent` or `readContentFile`,
not only an individual Zod record parser.

## Run the checks

```sh
npm ci
npm run check
npm run content:validate -- path/to/bundle.yaml
npm run content:import -- path/to/locations.json work/selection-draft.yaml
```

The importer accepts the existing empty selection seed. It preserves all location
fields, including null coordinates and visitor copy, empty content arrays,
production notes, and `allowsAIReconstruction`. It adds an explicit draft
publication record and an unknown physical classification. It does not infer
history, copy, coordinates, a viewpoint, research progress, or approval from prose.
Enriched or unfamiliar input fails instead of being silently discarded.

The output filename is mandatory; existing files and `content/leiden/**` are
protected from overwrite. Q15's proposed production-directory change remains
open. The importer creates no production directory and does not move research.
The initial input was checked against Claude's `locations.json` at commit
`77ae70af890d5360ffa80d0741e891c8371cfdbb` on PR #1. Those research files are still
on PR #1, not included in this implementation.

## Bundle and evidence relationships

| Field | Records |
|---|---|
| `schemaVersion` | `1`; reject unsupported versions |
| `cities` | City metadata, required languages, location/route registries |
| `locations` | Master §21 fields plus publication, physical subject/survival and QA |
| `routes` | Ordered stop IDs, narrative description and date-aware variants |
| `sources` | Named documents with retrievable URLs or citation notes and supported claim IDs |
| `claims` | Canonical claim, location, exact/range/text value, confidence, uncertainty note and source IDs |

IDs are unique within each record kind. City registries and route memberships
must agree in both directions. Nearby locations and route stops must belong to
the same city. A source's `claimsSupported` and a claim's `sourceIds` must agree;
the location must also list each claim source in its source trail. Referencing
another location's claim from location copy is rejected. A source record is a
structured citation, not proof that engineering has independently verified it.

Visitor narrative fields use a `ContentBlock`: `text` holds `nl`, `en`, and optional
`de`/`fr`; `claimIds` identifies the shared factual basis. Null translations are
allowed in drafts. A published record must contain every language configured by
its city, including the referenced claim text. NL and EN remain required by the
project; city configuration can add DE/FR but cannot silently remove NL/EN.
There is no silent fallback.
Markdown remains text at ingestion; the future renderer must sanitize supported
markup rather than execute HTML or content as code.

## Publication is a separate decision

The empty seed imports as `SELECTED_NOT_RESEARCHED` and `publication.status: draft`.
A selected location, an existing file, or completed R01 research is insufficient
to publish. A published location requires:

- a named and dated publication review;
- `PRODUCTION_READY`, completed R01, R02 and C01;
- sourced visitor coordinates, a distinct story subject and explicit survival state;
- a positive experience duration, hook, short story, at least three fun facts, Look Around You and
  3–8 timeline milestones;
- recorded passes for historical, copy, UX, mobile and performance QA;
- non-draft claim verification and evidence beyond discovery-only sources;
- complete translations and verified practical information wherever supplied.

The QA fields record review outcomes; changing a status is not a substitute for
performing that review. This schema task does not mark any real location published
or any historical claim verified. Publication of real content remains Claude's
research/editorial workflow and the project's review gates.

Media retains archival/current/reconstruction identity. A false location-level
`allowsAIReconstruction` rejects every reconstruction, including nested comparison
images and video posters. Reconstructions require disclosure. Published videos
also require completed V01, a sourced scene list, delivery metadata, a poster,
transcript and captions for city languages. Practical and media sources must
belong to the location's own source trail.
The eventual UI must preserve those labels and flags; validation does not implement
a video player. Published routes cannot include unpublished stops, including in
date-specific variants.

## Practical information and date conditions

Unknown hours differ from always-open; unknown pricing differs from free. Scheduled
hours carry time windows and weekday/date/annual conditions. Annual ranges may
cross New Year. All dates are real calendar dates; same-day opening windows cannot
run backwards. Each practical fact records verification, source IDs and check date.

Closures include a condition, reason, reopening windows inside a dated closure and
an optional sourced alternative instruction. Accessibility is a list of specific
area restrictions and instructions. Behaviour rules and temporary arrangements
are separate fields. A single boolean must not replace a detailed access warning.
The model can represent unknown or unverified data as drafts; it refuses to label
such supplied facts published. An omitted practical-info section makes no access
claim.

Route variants accept the same conditions, allowing a different stop list for an
annual event. This only defines the data shape: no real route choice, live opening
status, holiday algorithm, geocoding or routing engine is implemented here. Those
belong to subsequent engineering/editorial tasks, with Q19's route choices open.

## File safety and verification

Objects reject unknown keys and numeric strings are not coerced to numbers. The
YAML loader uses YAML 1.2 core, rejects duplicate keys, aliases, merge keys, custom
tags and multiple documents. Errors identify the affected field or reference.
JSON is also supported with duplicate-key rejection. Canonical draft YAML round-trips without changing nulls,
booleans or editorial strings.

Tests use explicitly synthetic content only. Checks cover seed preservation,
strict parsing, reference integrity, evidence/translation/publication failures,
AI restrictions, date conditions, filesystem output protection and CLI failure
exit codes. CI runs the same `npm run check` command for PRs and `main`.

API references: [Zod strict objects](https://zod.dev/api),
[YAML document parsing](https://eemeli.org/yaml/#parsing-documents).
