# Review moderation and privacy workflow

This workflow is required before genuine customer reviews are shown publicly. Reviews must never be invented, imported without permission or presented as verified purchases unless that status is actually established.

## Submission

The `/api/reviews` endpoint accepts a name, private email address, rating, review text, route ID, locale and explicit publication consent. It adds a unique `reviewId`, submission time, 90-day retention-review date and `pending` status before sending the record to the private webhook. The endpoint does not add an IP address or user-agent to the review record.

Production requirements:

- configure `REVIEW_WEBHOOK_URL` and a strong `REVIEW_WEBHOOK_TOKEN`;
- use a provider covered by the privacy notice and, where required, a processor agreement;
- restrict inbox access to people who moderate reviews;
- enable provider-side rate limiting and monitoring at the edge;
- never publish the submitter's email address.

## Moderation states

1. `pending`: not public; check that the content appears to describe a real experience and contains no personal data about other people.
2. `needs-contact`: keep private while asking the submitter a necessary clarification.
3. `approved`: copy only the public name, rating, text, route and publication date into the public review dataset.
4. `rejected`: record the reason briefly, then remove the submission when it is no longer needed.
5. `withdrawn`: remove the public review and private source after a valid withdrawal or deletion request, unless a legal retention duty applies.

Moderators must reject spam, threats, discriminatory content, copied marketing text, conflicts of interest and claims that cannot reasonably relate to the tour. Negative but genuine experiences must not be rejected merely because they are negative.

## Retention and requests

Review every private submission no later than its `retentionReviewAt` date. Remove or anonymise records that are no longer needed. Use `reviewId` to handle access, correction, withdrawal and deletion requests without publishing the email address. The final production retention periods and legal identity must be confirmed before launch.

Only add aggregate ratings or Review schema after genuine visible reviews exist and the displayed count, rating and page content match exactly.
