import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getBlogPlaces } from "@/data/blog-places";
import type { Locale } from "@/i18n/config";

export function BlogPlaces({ slug, locale }: { slug: string; locale: Locale }) {
  const places = getBlogPlaces(slug);
  if (!places.length) return null;
  const labels = {
    nl: { title: "Van verhaal naar plek", intro: "Deze plekken in Leiden sluiten aan op je wandeling. Bekijk het verhaal of open de locatie op de kaart.", detail: "Ontdek deze plek", map: "Bekijk op de kaart" },
    en: { title: "From story to place", intro: "Bring your Leiden walk to life with these places. Explore their stories or find them on the map.", detail: "Explore this place", map: "View on the map" },
    de: { title: "Von der Geschichte zum Ort", intro: "Entdecke diese Orte bei deinem Spaziergang durch Leiden. Lies ihre Geschichten oder finde sie auf der Karte.", detail: "Diesen Ort entdecken", map: "Auf der Karte ansehen" },
  }[locale];
  return <section className="my-12 border-y border-warm-200 py-8">
    <h2 className="text-2xl font-bold text-navy-800">{labels.title}</h2>
    <p className="mt-3 text-sm leading-6 text-slate-600">{labels.intro}</p>
    <div className="mt-6 grid gap-5 sm:grid-cols-2">
      {places.map(place => <figure key={place.id} className="overflow-hidden rounded-2xl border border-warm-200 bg-white">
        <div className="relative aspect-[4/3]"><Image src={place.image} alt={place.name + ", Leiden"} fill sizes="(min-width: 640px) 360px, 100vw" className="object-cover" /></div>
        <figcaption className="p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-700">Leiden · {locale === "nl" ? "Nederland" : locale === "de" ? "Niederlande" : "Netherlands"}</p>
          <h3 className="mt-2 text-lg font-bold text-navy-800">{place.name}</h3>
          <p className="mt-1 text-xs tabular-nums text-gray-500">{place.coords.lat.toFixed(4)}° N · {place.coords.lng.toFixed(4)}° E</p>
          <Link href={place.href} className="mt-4 block text-sm font-semibold text-navy-800 underline underline-offset-4">{labels.detail} →</Link>
          <a href={"https://www.google.com/maps/search/?api=1&query=" + place.coords.lat + "," + place.coords.lng} target="_blank" rel="noopener noreferrer" className="mt-3 block text-xs font-medium text-slate-600 underline underline-offset-4">{labels.map} ↗</a>
        </figcaption>
      </figure>)}
    </div>
  </section>;
}
