"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth-context";
import type { LocationData } from "@/data/locations";
import { getLocationStory } from "@/data/stories";

interface StorySection {
  heading: string | null;
  paragraphs: string[];
}

interface ParsedStory {
  sections: StorySection[];
  facts: string[];
  sources: string[];
}

function isLikelyHeading(text: string): boolean {
  if (text.length > 80) return false;
  if (text.endsWith(".")) return false;
  if (text.split(/\s+/).length >= 12) return false;
  return true;
}

function parseStoryText(text: string): ParsedStory {
  const blocks = text.split("\n\n").map((b) => b.trim()).filter(Boolean);
  const sections: StorySection[] = [];
  const facts: string[] = [];
  const sources: string[] = [];
  let mode: "main" | "facts" | "sources" = "main";
  let currentSection: StorySection = { heading: null, paragraphs: [] };

  for (const block of blocks) {
    if (block.toUpperCase().startsWith("AANVULLENDE FEITEN")) {
      if (currentSection.heading !== null || currentSection.paragraphs.length > 0) {
        sections.push(currentSection);
        currentSection = { heading: null, paragraphs: [] };
      }
      mode = "facts";
      for (const line of block.split("\n").slice(1)) {
        const c = line.replace(/^\*\s*/, "").trim();
        if (c) facts.push(c);
      }
      continue;
    }
    if (block.toUpperCase().startsWith("BRONNEN")) {
      if (currentSection.heading !== null || currentSection.paragraphs.length > 0) {
        sections.push(currentSection);
        currentSection = { heading: null, paragraphs: [] };
      }
      mode = "sources";
      for (const line of block.split("\n").slice(1)) {
        if (line.trim()) sources.push(line.trim());
      }
      continue;
    }
    if (mode === "facts") {
      for (const line of block.split("\n")) {
        const c = line.replace(/^\*\s*/, "").trim();
        if (c) facts.push(c);
      }
      continue;
    }
    if (mode === "sources") {
      for (const line of block.split("\n")) {
        if (line.trim()) sources.push(line.trim());
      }
      continue;
    }

    if (isLikelyHeading(block)) {
      if (currentSection.heading !== null || currentSection.paragraphs.length > 0) {
        sections.push(currentSection);
      }
      currentSection = { heading: block, paragraphs: [] };
    } else {
      currentSection.paragraphs.push(block);
    }
  }

  if (currentSection.heading !== null || currentSection.paragraphs.length > 0) {
    sections.push(currentSection);
  }

  return { sections, facts, sources };
}

function StoryImagePlaceholder({ description }: { description: string }) {
  return (
    <div className="my-6 bg-gray-100 rounded-xl aspect-[16/9] flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
      <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-gray-400 mb-2" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <p className="text-xs text-gray-400 font-medium px-4 text-center">
        --HIER IMAGE VAN {description}--
      </p>
    </div>
  );
}

type ExperienceState = "preview" | "arrived" | "video" | "story" | "practical";

export function LocationExperience({ location }: { location: LocationData }) {
  const t = useTranslations("location");
  const tCommon = useTranslations("common");
  const locale = useLocale() as "nl" | "en" | "de";
  const { hasPaid, isLoading } = useAuth();
  const [state, setState] = useState<ExperienceState>(hasPaid ? "arrived" : "preview");
  const story = getLocationStory(location.id);
  const parsedStory = useMemo(
    () => (story ? parseStoryText(story.readingText[locale]) : null),
    [story, locale],
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {state === "preview" && (
        <div>
          <div className="relative h-72 md:h-96 bg-gray-200">
            {location.image && (
              <img src={location.image} alt={location.name} className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-navy-900/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-orange-500 text-white uppercase tracking-wide">
                  {location.mainTheme}
                </span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm">
                  30-60 min
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">{location.name}</h1>
              <p className="text-sm text-white/70 mt-1 line-clamp-2">{location.shortDescription}</p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 py-6 relative">
            {!hasPaid && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl mx-4">
                <div className="w-14 h-14 rounded-full bg-navy-800 flex items-center justify-center mb-3">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-7 h-7 text-white">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-navy-800 text-lg mb-1">{t("premiumContent")}</h3>
                <p className="text-sm text-gray-500 text-center max-w-xs mb-4">
                  {t("premiumDesc")}
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition-colors text-sm"
                >
                  {t("viewPricing")}
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            )}

            <button
              onClick={() => hasPaid && setState("arrived")}
              className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 rounded-full transition-colors text-base ${!hasPaid ? "blur-sm pointer-events-none" : ""}`}
            >
              {t("startExperience")}
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 inline-block ml-2">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </button>

            {hasPaid && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                <button
                  onClick={() => setState("video")}
                  className="flex flex-col items-center gap-1.5 bg-gray-50 rounded-xl p-3 hover:bg-orange-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white ml-0.5">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-navy-800">{t("video")}</span>
                </button>
                <button
                  onClick={() => setState("story")}
                  className="flex flex-col items-center gap-1.5 bg-gray-50 rounded-xl p-3 hover:bg-orange-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-navy-800 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-navy-800">{t("story")}</span>
                </button>
                <button
                  onClick={() => setState("practical")}
                  className="flex flex-col items-center gap-1.5 bg-gray-50 rounded-xl p-3 hover:bg-orange-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-gray-600" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-medium text-navy-800">{t("info")}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {state === "arrived" && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h2 className="text-xl font-bold text-navy-800 mb-1">{location.name}</h2>
          <p className="text-hand text-orange-500 text-lg -rotate-1 mb-4">{t("youAreHere")}</p>
          <p className="text-sm text-gray-500 mb-6">{t("whatDoYouWant")}</p>

          <div className="space-y-3">
            <button
              onClick={() => setState("video")}
              className="w-full flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:border-orange-300 hover:bg-orange-50 transition-all text-left"
            >
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white ml-0.5">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-navy-800">{t("watchVideo")}</h3>
                <p className="text-xs text-gray-500">{t("watchVideoDesc")}</p>
              </div>
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-300 shrink-0 ml-auto">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </button>

            <button
              onClick={() => setState("story")}
              className="w-full flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:border-orange-300 hover:bg-orange-50 transition-all text-left"
            >
              <div className="w-12 h-12 rounded-full bg-navy-800 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-navy-800">{t("readStory")}</h3>
                <p className="text-xs text-gray-500">{t("readStoryDesc")}</p>
              </div>
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-300 shrink-0 ml-auto">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </button>

            <button
              onClick={() => setState("practical")}
              className="w-full flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:border-orange-300 hover:bg-orange-50 transition-all text-left"
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-gray-600" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-navy-800">{t("practicalInfo")}</h3>
                <p className="text-xs text-gray-500">{t("practicalInfoDesc")}</p>
              </div>
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-300 shrink-0 ml-auto">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => setState("preview")}
            className="mt-6 text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
            </svg>
            {t("backToOverview")}
          </button>
        </div>
      )}

      {state === "video" && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="relative bg-navy-900 rounded-2xl overflow-hidden aspect-video mb-4">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <p className="text-hand text-orange-300 text-lg mb-2">{t("leidenHistorical")}</p>
              <h3 className="text-xl font-bold mb-4">{location.name}</h3>
              <button className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-white ml-1">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </button>
              <p className="text-xs text-white/50 mt-4">{t("loadingVideo")}</p>
            </div>
          </div>
          <p className="text-[11px] text-gray-400 text-center mb-6">
            {t("videoDisclaimer")}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setState("story")}
              className="flex-1 bg-navy-800 hover:bg-navy-900 text-white font-semibold py-3 rounded-full text-sm transition-colors"
            >
              {t("readStory")}
            </button>
            <button
              onClick={() => setState("arrived")}
              className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-full text-sm hover:bg-gray-50 transition-colors"
            >
              {t("back")}
            </button>
          </div>
        </div>
      )}

      {state === "story" && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          {parsedStory && parsedStory.sections.length > 0 ? (() => {
            const titleSection = parsedStory.sections[0];
            const bodySections = parsedStory.sections.slice(1);

            return (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-navy-800/10 text-navy-800">
                    {location.mainTheme}
                  </span>
                </div>

                {titleSection.heading && (
                  <h2 className="text-2xl font-extrabold text-navy-800 mb-1 leading-tight">
                    {titleSection.heading}
                  </h2>
                )}
                <p className="text-hand text-orange-500 -rotate-1 mb-5">{t("theStory")}</p>

                {titleSection.paragraphs[0] && (
                  <p className="text-base text-gray-700 leading-relaxed font-medium mb-4">
                    {titleSection.paragraphs[0]}
                  </p>
                )}

                <StoryImagePlaceholder description={location.name} />

                {bodySections.map((section, si) => (
                  <div key={si}>
                    {section.heading && (
                      <div className="flex items-center gap-3 mt-6 mb-4">
                        <div className="h-px flex-1 bg-orange-200" />
                        <h3 className="text-base font-bold text-navy-800 shrink-0 text-center">
                          {section.heading}
                        </h3>
                        <div className="h-px flex-1 bg-orange-200" />
                      </div>
                    )}

                    {section.paragraphs[0] && (
                      <p className="text-sm text-gray-600 leading-relaxed mb-3">
                        {section.paragraphs[0]}
                      </p>
                    )}

                    {si < bodySections.length - 1 && si % 2 === 0 && (
                      <StoryImagePlaceholder
                        description={bodySections[si + 1]?.heading || location.name}
                      />
                    )}
                  </div>
                ))}

                {parsedStory.facts.length > 0 && (
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-6 mb-4">
                    <h4 className="text-sm font-bold text-navy-800 mb-3">
                      {locale === "de" ? "Wussten Sie das?" : locale === "en" ? "Did you know?" : "Wist je dat?"}
                    </h4>
                    <ul className="space-y-2">
                      {parsedStory.facts.map((fact, i) => (
                        <li key={i} className="text-xs text-gray-600 flex gap-2">
                          <span className="text-orange-400 mt-0.5 shrink-0">&#8226;</span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {parsedStory.sources.length > 0 && (
                  <div className="mb-6">
                    <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-1">
                      {locale === "de" ? "Quellen" : locale === "en" ? "Sources" : "Bronnen"}
                    </p>
                    {parsedStory.sources.map((source, i) => (
                      <p key={i} className="text-[10px] text-gray-400">{source}</p>
                    ))}
                  </div>
                )}
              </>
            );
          })() : (
            <>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-navy-800/10 text-navy-800">
                  {location.mainTheme}
                </span>
              </div>
              <h2 className="text-xl font-bold text-navy-800 mb-1">{location.name}</h2>
              <p className="text-hand text-orange-500 -rotate-1 mb-4">{t("theStory")}</p>
              <div className="text-sm text-gray-700 mb-6">
                <p>{location.shortDescription}</p>
                <p className="text-gray-400 italic mt-4">{t("storyPendingVerification")}</p>
              </div>
            </>
          )}

          <div className="flex gap-2 mt-6">
            <button
              onClick={() => setState("practical")}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-full text-sm transition-colors"
            >
              {t("practicalInfo")}
            </button>
            <button
              onClick={() => setState("arrived")}
              className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-full text-sm hover:bg-gray-50 transition-colors"
            >
              {t("back")}
            </button>
          </div>
        </div>
      )}

      {state === "practical" && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h2 className="text-lg font-bold text-navy-800 mb-4">{t("practicalInfo")}</h2>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-orange-500 mt-0.5 shrink-0">
                <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-navy-800">{t("address")}</p>
                <p className="text-sm text-gray-500">{t("addressPending")}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-orange-500 mt-0.5 shrink-0">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-navy-800">{t("openingHours")}</p>
                <p className="text-sm text-gray-500">{t("pendingVerification")}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-orange-500 mt-0.5 shrink-0">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-navy-800">{t("duration")}</p>
                <p className="text-sm text-gray-500">30 - 60 {t("minutes")}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-orange-500 mt-0.5 shrink-0">
                <path d="M10 1a6 6 0 00-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 00.75.75h2.5a.75.75 0 00.75-.75v-.644c0-1.013.762-1.957 1.815-2.825A6 6 0 0010 1zM8.863 17.414a.75.75 0 00-.726.57 2.001 2.001 0 003.726 0 .75.75 0 00-.726-.57h-2.274z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-navy-800">{t("accessibility")}</p>
                <p className="text-sm text-gray-500">{t("pendingVerification")}</p>
              </div>
            </div>
          </div>

          <a
            href={
              location.coords
                ? `https://www.google.com/maps/dir/?api=1&destination=${location.coords.lat},${location.coords.lng}`
                : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.name + ", Leiden")}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-navy-800 hover:bg-navy-900 text-white font-semibold py-3 rounded-full text-sm text-center mb-3 transition-colors"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M8.157 2.175a1.5 1.5 0 00-1.147 0l-4.084 1.69A1.5 1.5 0 002 5.251v10.877a1.5 1.5 0 002.074 1.386l3.51-1.453 4.26 1.763a1.5 1.5 0 001.146 0l4.083-1.69A1.5 1.5 0 0018 14.748V3.873a1.5 1.5 0 00-2.073-1.386l-3.51 1.452-4.26-1.763z" clipRule="evenodd" />
            </svg>
            {t("navigateWithGoogleMaps")}
          </a>

          <button
            onClick={() => setState("arrived")}
            className="w-full border border-gray-300 text-gray-700 font-semibold py-3 rounded-full text-sm hover:bg-gray-50 transition-colors"
          >
            {t("backToChoices")}
          </button>
        </div>
      )}
    </div>
  );
}
