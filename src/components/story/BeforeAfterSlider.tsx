"use client";

import { useState } from "react";
import Image from "next/image";
import type { StoryMediaSide } from "@/data/story-media";

function ImagePanel({ media }: { media: StoryMediaSide }) {
  if (media.src) {
    return (
      <div className="relative h-full w-full">
        <Image src={media.src} alt={media.alt} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-100 p-5 text-center">
      <p className="max-w-md text-xs font-medium leading-relaxed text-gray-500">{media.placeholder}</p>
    </div>
  );
}

export function BeforeAfterSlider({
  current,
  historical,
  locale,
  historicalIsAiAllowed,
}: {
  current: StoryMediaSide;
  historical: StoryMediaSide;
  locale: "nl" | "en" | "de";
  historicalIsAiAllowed: boolean;
}) {
  const [position, setPosition] = useState(50);
  const labels = locale === "de"
    ? { then: "Früher", now: "Heute", control: "Vergleichen Sie früher und heute", ai: "Historische KI-Impression" }
    : locale === "en"
      ? { then: "Then", now: "Now", control: "Compare then and now", ai: "Historical AI impression" }
      : { then: "Vroeger", now: "Nu", control: "Vergelijk vroeger en nu", ai: "Historische AI-impressie" };

  return (
    <figure className="my-7">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
        <div className="absolute inset-0"><ImagePanel media={current} /></div>
        <div className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white" style={{ width: `${position}%` }}>
          <div className="h-full" style={{ width: `${10000 / position}%` }}>
            <ImagePanel media={historical} />
          </div>
        </div>

        <span className="absolute left-3 top-3 rounded-full bg-navy-900/85 px-3 py-1 text-xs font-bold text-white">{labels.then}</span>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-navy-800">{labels.now}</span>
        <span className="pointer-events-none absolute top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-orange-500 shadow" style={{ left: `${position}%` }} aria-hidden="true" />

        <input
          type="range"
          min="5"
          max="95"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label={labels.control}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      {historicalIsAiAllowed && historical.src && (
        <figcaption className="mt-2 text-center text-[11px] text-gray-500">{labels.ai}</figcaption>
      )}
    </figure>
  );
}
