# Environment and integration matrix

Use this document when configuring local development, Vercel or a future Cloudflare-backed production environment. Values marked **secret** belong in encrypted hosting settings and must never be committed.

## Active now

| Variable | Visibility | Required | Purpose | Environments |
|---|---|---:|---|---|
| `NEXT_PUBLIC_SITE_URL` | public | production | Canonical origin without trailing slash; drives metadata, canonicals and sitemap URLs | preview, production |
| `GOOGLE_SITE_VERIFICATION` | public HTML token | at launch | Google Search Console verification token | production |
| `REVIEW_WEBHOOK_URL` | secret | when reviews open | Private moderation destination for genuine review submissions | preview, production |
| `REVIEW_WEBHOOK_TOKEN` | secret | when reviews open | Bearer token used to authenticate the moderation webhook | preview, production |
| `RESEND_API_KEY` | secret | when newsletter opens | Resend API access | preview, production |
| `RESEND_AUDIENCE_ID` | secret/config | optional fallback | Default newsletter audience | preview, production |
| `RESEND_AUDIENCE_ID_NL` | secret/config | optional | Dutch newsletter audience | preview, production |
| `RESEND_AUDIENCE_ID_EN` | secret/config | optional | English newsletter audience | preview, production |
| `RESEND_AUDIENCE_ID_DE` | secret/config | optional | German newsletter audience | preview, production |

`LEGAL_BUSINESS_NAME`, `LEGAL_BUSINESS_ADDRESS`, `LEGAL_REGISTRATION_NUMBER` and `PRIVACY_CONTACT_EMAIL` are reserved in `.env.example` for the launch/legal integration. The current pages still contain explicit launch placeholders, so setting these variables alone does not complete the legal launch gate.

## Next phase — names reserved, not implemented

Choose providers before creating these values. Do not add inactive secrets merely to fill the table.

| Capability | Suggested server-only variables | Required implementation before use |
|---|---|---|
| Database | `DATABASE_URL` | schema, migrations, backup and access policy |
| Authentication | `AUTH_SECRET`, provider-specific client ID/secret | secure sessions, email verification, account recovery and rate limits |
| Cloudflare Stream | `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_STREAM_API_TOKEN`, signing-key variables | entitlement endpoint and short-lived signed playback tokens |
| Stripe | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, public publishable key if needed | product mapping, webhook verification, refunds and iDEAL/card checkout |
| Mollie | `MOLLIE_API_KEY`, webhook verification configuration | same payment and entitlement flow; use instead of Stripe unless both are deliberately supported |
| Transactional email | provider API key and verified sender variables | purchase, welcome and access-recovery templates |
| Analytics | provider-specific site ID or endpoint | privacy review and consent gating before any non-essential tracking loads |

## Environment rules

- Local development uses `.env.local`; never commit it.
- Preview uses test or sandbox credentials.
- Production uses the definitive domain and live provider credentials.
- Public variables may be bundled into browser code. Never prefix a secret with `NEXT_PUBLIC_`.
- Rotate a secret immediately if it appears in a commit, log, screenshot or client bundle.
- After changing the production origin, run the SEO crawl and recheck redirects, canonicals, hreflang, sitemap and robots rules.

## Launch configuration order

1. Set the final domain and `NEXT_PUBLIC_SITE_URL`.
2. Add legal business details and review the privacy/terms pages.
3. Configure database and authentication.
4. Configure one payment provider and verified webhooks.
5. Connect entitlements to private route and media delivery.
6. Add Cloudflare Stream signing and upload final media.
7. Configure transactional email, reviews and newsletter.
8. Add analytics only after its privacy and consent requirements are understood.
9. Run the complete release gate in `docs/PRE-MEDIA-QA.md` and `docs/SEO-LAUNCH-CHECKLIST.md`.
