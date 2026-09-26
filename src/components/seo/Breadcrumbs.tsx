import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/config";
import { JsonLd } from "@/components/seo/JsonLd";
import { localizedUrl } from "@/lib/seo";

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({ items, locale, className = "" }: { items: BreadcrumbItem[]; locale: Locale; className?: string }) {
  const home = locale === "nl" ? "Home" : locale === "de" ? "Startseite" : "Home";
  const allItems = [{ label: home, href: "/" }, ...items];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: allItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            item: item.href ? localizedUrl(locale, item.href) : undefined,
          })),
        }}
      />
      <nav aria-label="Breadcrumb" className={`text-sm text-slate-500 ${className}`}>
        <ol className="flex flex-wrap items-center gap-2">
          {allItems.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {item.href ? (
                <Link href={item.href} className="font-semibold hover:text-orange-600">{item.label}</Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
