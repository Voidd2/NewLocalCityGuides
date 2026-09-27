import { describe, expect, it } from "vitest";
import { blogPosts } from "../src/data/seo-content";
import { publicEntities } from "../src/data/public-entities";
import { publicRoutePreviews } from "../src/data/public-route-seo";
import { locationMediaManifest } from "../src/data/media-manifest";

function collectKeys(value: unknown, keys = new Set<string>()): Set<string> {
  if (Array.isArray(value)) {
    value.forEach((item) => collectKeys(item, keys));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) => {
      keys.add(key);
      collectKeys(item, keys);
    });
  }
  return keys;
}

describe("public content boundary", () => {
  it("does not expose premium story or private delivery fields through public datasets", () => {
    const publicKeys = collectKeys({ blogPosts, publicEntities, publicRoutePreviews, locationMediaManifest });
    const forbiddenKeys = [
      "readingText",
      "voiceOver",
      "streamId",
      "videoUid",
      "playbackUrl",
      "signedUrl",
      "transcript",
      "exactStopOrder",
    ];

    for (const key of forbiddenKeys) expect(publicKeys.has(key), `${key} must remain private`).toBe(false);
  });

  it("keeps public route previews separate from complete ordered stops", () => {
    for (const route of publicRoutePreviews) {
      expect(collectKeys(route).has("locationIds")).toBe(false);
    }
  });
});
