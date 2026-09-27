# Pre-media quality and accessibility gate

This is the repeatable gate before final photographs and videos are connected. It is not a claim of full WCAG certification; final manual testing remains necessary with the production media, authentication and checkout.

## Automated now

- TypeScript, ESLint, Vitest and a production build.
- Media reference and maximum-size check.
- Public-data boundary test for premium story fields, exact stop lists and private playback identifiers.
- Localised message consistency through the production build.

## Manual before media

Test at 320, 375, 768 and 1280 CSS pixels:

- dashboard, route overview/detail, location story, public place page, blog, privacy and terms;
- keyboard-only navigation, visible focus, Escape and focus return for dialogs;
- browser zoom at 200%, long NL/EN/DE labels and landscape orientation;
- map fallback, denied GPS, offline state, empty saved routes and failed review submission;
- VoiceOver or NVDA headings, landmarks, tabs, form labels and status messages.

## Repeat after final media

- check meaningful alt text; decorative images use empty alt text;
- confirm posters do not contain essential text that is absent from HTML;
- verify caption timing and that video does not autoplay;
- run Lighthouse/Core Web Vitals on production and inspect layout shift, LCP images and route-map performance;
- re-run the SEO crawl and signed-out premium-content inspection.

Block launch for keyboard traps, inaccessible checkout controls, missing captions on published story videos, premium URLs available without entitlement, broken primary navigation or missing legal identity/contact details.
