# Affiliate-link intake and publication

Affiliate links are imported through `content/affiliate-links.json`. This keeps unverified links out of visitor-facing components until the exact activity and destination have been checked manually.

## Add the user's list

Add one object per exact activity:

```json
{
  "id": "hortus-entry-nl",
  "targetType": "spot",
  "targetId": "S010",
  "label": "Hortus botanicus entrance ticket",
  "locale": "nl",
  "url": "https://www.getyourguide.nl/example-activity-t123456/?partner_id=W9KB6MF&currency=EUR&travel_agent=1&cmp=share_to_earn",
  "status": "draft",
  "checkedAt": null
}
```

Then run `npm run affiliate:check`.

The validator checks the data shape, unique IDs, known target types/locales, HTTPS, a GetYourGuide host, an exact activity ID, partner ID `W9KB6MF` and required tracking parameters.

## Manual verification

Before changing `status` to `verified`:

1. open the URL in a private browser window;
2. confirm it opens the intended attraction or activity rather than a general Leiden listing;
3. confirm the activity is bookable and appropriate for the linked page;
4. check the displayed language and currency;
5. set `checkedAt` to the UTC date in `YYYY-MM-DD` format;
6. run the validator again.

Automated URL validation does not prove availability or commercial suitability. Only `verified` records may later be connected to public ticket buttons. Existing generic GetYourGuide city links are placeholders and must be replaced or removed during the affiliate integration.
