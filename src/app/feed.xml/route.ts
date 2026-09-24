import { blogPosts } from "@/data/seo-content";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", "\"": "&quot;" })[character]!);

export function GET() {
  const items = blogPosts.map((post) => `
    <item>
      <title>${escapeXml(post.title.nl)}</title>
      <link>${SITE_URL}/nl/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/nl/blog/${post.slug}</guid>
      <description>${escapeXml(post.description.nl)}</description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
    </item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"><channel><title>${SITE_NAME} Blog</title><link>${SITE_URL}/nl/blog</link><description>Lokale verhalen en praktische tips voor een bezoek aan Leiden.</description><language>nl-NL</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
