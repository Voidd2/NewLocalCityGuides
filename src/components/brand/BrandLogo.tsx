import Image from "next/image";

/** Original supplied artwork, framed to remove transparent layout padding. */
export function BrandLogo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return <Image src="/brand/citywalkstories-logo.svg" alt="CityWalkStories — Walk the city. Hear the story." width={1228} height={335} unoptimized priority={priority} className={className} />;
}

export function BrandMark({ className = "" }: { className?: string }) {
  return <Image src="/brand/citywalkstories-pin.svg" alt="" width={745} height={900} unoptimized className={className} />;
}
