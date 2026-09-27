#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const args = process.argv.slice(2);
const value = (flag, fallback) => {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : fallback;
};
const base = new URL(value("--base", args.find((arg) => !arg.startsWith("--")) ?? "http://localhost:3000"));
const output = resolve(value("--output", `reports/seo/crawl-${base.hostname}.json`));
const maxPages = Number(value("--max-pages", "500"));
// Field names that should never be serialized into public HTML. UI copy such
// as "readFullStory" is intentionally excluded because that is only a CTA.
const premiumMarkers = ["cloudflareStreamId", "premiumStory", "readingText", "voiceOver"];

function matches(html, pattern) {
  return html.match(pattern)?.[1]?.trim() ?? null;
}

function absolute(raw, current) {
  try {
    const url = new URL(raw, current);
    url.hash = "";
    url.search = "";
    return url;
  } catch {
    return null;
  }
}

async function fetchWithChain(url, maxRedirects = 8) {
  const chain = [];
  let current = url;
  for (let count = 0; count <= maxRedirects; count += 1) {
    const response = await fetch(current, {
      redirect: "manual",
      headers: { "user-agent": "YourLocalCityGuide-SEO-Crawl/1.0" },
    });
    chain.push({ url: current.toString(), status: response.status });
    if (![301, 302, 303, 307, 308].includes(response.status)) {
      return { response, chain, finalUrl: current };
    }
    const location = response.headers.get("location");
    if (!location) return { response, chain, finalUrl: current };
    current = new URL(location, current);
  }
  throw new Error(`Meer dan ${maxRedirects} redirects voor ${url}`);
}

async function sitemapUrls() {
  const url = new URL("/sitemap.xml", base);
  const { response } = await fetchWithChain(url);
  if (!response.ok || !(response.headers.get("content-type") ?? "").includes("xml")) return [];
  const xml = await response.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/gi)]
    .map((match) => match[1].replaceAll("&amp;", "&"))
    .map((entry) => absolute(entry, base))
    .filter((entry) => entry?.origin === base.origin);
}

async function inspect(url) {
  try {
    const { response, chain, finalUrl } = await fetchWithChain(url);
    const type = response.headers.get("content-type") ?? "";
    const html = type.includes("text/html") ? await response.text() : "";
    const links = [...html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)]
      .map((match) => absolute(match[1], finalUrl))
      .filter((entry) => entry?.origin === base.origin && !entry.pathname.startsWith("/api/"))
      .map((entry) => entry.toString());
    const canonical = matches(html, /<link\b[^>]*rel=["'][^"']*canonical[^"']*["'][^>]*href=["']([^"']+)["']/i)
      ?? matches(html, /<link\b[^>]*href=["']([^"']+)["'][^>]*rel=["'][^"']*canonical[^"']*["']/i);
    const robotsMeta = matches(html, /<meta\b[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i) ?? "";
    const robotsHeader = response.headers.get("x-robots-tag") ?? "";
    const noindex = `${robotsMeta},${robotsHeader}`.toLowerCase().includes("noindex");
    const hreflang = [...html.matchAll(/<link\b[^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["']/gi)]
      .map((match) => ({ lang: match[1], href: match[2] }));
    return {
      url: url.toString(), finalUrl: finalUrl.toString(), status: response.status, chain,
      contentType: type, title: matches(html, /<title[^>]*>([^<]*)<\/title>/i),
      description: matches(html, /<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i),
      canonical: canonical ? absolute(canonical, finalUrl)?.toString() ?? canonical : null,
      noindex, robotsMeta, robotsHeader, hreflang, links: [...new Set(links)],
      premiumMarkers: premiumMarkers.filter((marker) => html.includes(marker)),
    };
  } catch (error) {
    return { url: url.toString(), error: error instanceof Error ? error.message : String(error), links: [] };
  }
}

const sitemap = await sitemapUrls();
const queue = [...new Set((sitemap.length ? sitemap : [new URL("/", base)]).map(String))];
const seen = new Set();
const pages = [];
while (queue.length && pages.length < maxPages) {
  const batch = queue.splice(0, Math.min(6, maxPages - pages.length)).filter((url) => !seen.has(url));
  batch.forEach((url) => seen.add(url));
  const results = await Promise.all(batch.map((url) => inspect(new URL(url))));
  pages.push(...results);
  for (const page of results) {
    for (const link of page.links ?? []) if (!seen.has(link) && !queue.includes(link)) queue.push(link);
  }
}

const issues = [];
for (const page of pages) {
  if (page.error) issues.push({ severity: "error", url: page.url, issue: page.error });
  else {
    if (page.status !== 200) issues.push({ severity: "error", url: page.url, issue: `HTTP ${page.status}` });
    if (page.chain.length > 1) issues.push({ severity: "warning", url: page.url, issue: `Redirectketen van ${page.chain.length - 1} stap(pen)` });
    if (page.contentType.includes("text/html")) {
      if (!page.title) issues.push({ severity: "error", url: page.url, issue: "Titel ontbreekt" });
      if (!page.description) issues.push({ severity: "warning", url: page.url, issue: "Meta description ontbreekt" });
      if (!page.canonical) issues.push({ severity: "error", url: page.url, issue: "Canonical ontbreekt" });
      if (page.noindex) issues.push({ severity: "warning", url: page.url, issue: "Pagina is noindex" });
      if (page.premiumMarkers.length) issues.push({ severity: "error", url: page.url, issue: `Mogelijke premium-data in HTML: ${page.premiumMarkers.join(", ")}` });
    }
  }
}

const reportPages = pages.map(({ links, ...page }) => ({ ...page, internalLinkCount: links?.length ?? 0 }));
const report = {
  generatedAt: new Date().toISOString(), base: base.toString(), sitemapUrlCount: sitemap.length,
  crawledPageCount: pages.length, truncated: queue.length > 0, issueCount: issues.length, issues, pages: reportPages,
};
await mkdir(dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(`SEO-crawl: ${pages.length} pagina's, ${issues.length} meldingen -> ${output}`);
for (const issue of issues.slice(0, 40)) console.log(`[${issue.severity}] ${issue.url} — ${issue.issue}`);
if (issues.some((issue) => issue.severity === "error")) process.exitCode = 1;
