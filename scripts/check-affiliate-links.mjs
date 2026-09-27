import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const EXPECTED_PARTNER_ID = "W9KB6MF";
const allowedHosts = new Set(["www.getyourguide.com", "www.getyourguide.nl", "www.getyourguide.de"]);
const allowedTargetTypes = new Set(["location", "spot", "activity"]);
const allowedLocales = new Set(["nl", "en", "de"]);
const allowedStatuses = new Set(["draft", "verified", "disabled"]);

export function validateAffiliateConfig(config) {
  const errors = [];
  if (!config || typeof config !== "object" || Array.isArray(config)) return ["Root must be an object."];
  if (config.partnerId !== EXPECTED_PARTNER_ID) errors.push(`partnerId must be ${EXPECTED_PARTNER_ID}.`);
  if (!Array.isArray(config.links)) return [...errors, "links must be an array."];

  const ids = new Set();
  const targets = new Set();
  for (const [index, link] of config.links.entries()) {
    const prefix = `links[${index}]`;
    if (!link || typeof link !== "object" || Array.isArray(link)) {
      errors.push(`${prefix} must be an object.`);
      continue;
    }

    for (const key of ["id", "targetType", "targetId", "label", "locale", "url", "status"]) {
      if (typeof link[key] !== "string" || !link[key].trim()) errors.push(`${prefix}.${key} must be a non-empty string.`);
    }

    if (typeof link.id === "string") {
      if (ids.has(link.id)) errors.push(`${prefix}.id is duplicated: ${link.id}.`);
      ids.add(link.id);
    }
    if (!allowedTargetTypes.has(link.targetType)) errors.push(`${prefix}.targetType must be location, spot or activity.`);
    if (!allowedLocales.has(link.locale)) errors.push(`${prefix}.locale must be nl, en or de.`);
    if (!allowedStatuses.has(link.status)) errors.push(`${prefix}.status must be draft, verified or disabled.`);

    if (typeof link.targetId === "string" && typeof link.locale === "string") {
      const targetKey = `${link.targetType}:${link.targetId}:${link.locale}`;
      if (targets.has(targetKey)) errors.push(`${prefix} duplicates target and locale ${targetKey}.`);
      targets.add(targetKey);
    }

    let url;
    try {
      url = new URL(link.url);
    } catch {
      errors.push(`${prefix}.url must be a valid absolute URL.`);
    }
    if (url) {
      if (url.protocol !== "https:") errors.push(`${prefix}.url must use HTTPS.`);
      if (!allowedHosts.has(url.hostname.toLowerCase())) errors.push(`${prefix}.url must use an approved GetYourGuide host.`);
      if (!/-t\d+(?:\/|$)/i.test(url.pathname)) errors.push(`${prefix}.url must point to an exact activity with a -t123456 ID.`);
      if (url.searchParams.get("partner_id") !== EXPECTED_PARTNER_ID) errors.push(`${prefix}.url has the wrong or missing partner_id.`);
      if (url.searchParams.get("currency") !== "EUR") errors.push(`${prefix}.url must set currency=EUR.`);
      if (url.searchParams.get("travel_agent") !== "1") errors.push(`${prefix}.url must set travel_agent=1.`);
      if (url.searchParams.get("cmp") !== "share_to_earn") errors.push(`${prefix}.url must set cmp=share_to_earn.`);
    }

    if (link.status === "verified" && !/^\d{4}-\d{2}-\d{2}$/.test(link.checkedAt ?? "")) {
      errors.push(`${prefix}.checkedAt must be YYYY-MM-DD when status is verified.`);
    }
    if (link.status !== "verified" && link.checkedAt !== null && link.checkedAt !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(link.checkedAt)) {
      errors.push(`${prefix}.checkedAt must be null or YYYY-MM-DD.`);
    }
  }
  return errors;
}

function run() {
  const file = path.resolve(process.argv[2] ?? "content/affiliate-links.json");
  let config;
  try {
    config = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    console.error(`Could not read affiliate file: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
    return;
  }

  const errors = validateAffiliateConfig(config);
  if (errors.length > 0) {
    console.error("Affiliate validation failed:");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
    return;
  }

  const verified = config.links.filter((link) => link.status === "verified").length;
  console.log(`Affiliate check passed: ${config.links.length} link(s), ${verified} verified.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) run();
