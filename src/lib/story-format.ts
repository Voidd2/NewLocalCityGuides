export interface StorySection {
  heading: string | null;
  paragraphs: string[];
}

export interface ParsedStory {
  sections: StorySection[];
  facts: string[];
  sources: string[];
}

function cleanHeading(text: string): string {
  return text
    .replace(/^#{1,6}\s*/, "")
    .replace(/^\*\*(.+)\*\*$/, "$1")
    .trim();
}

function isLikelyHeading(text: string): boolean {
  const cleaned = cleanHeading(text);
  if (/^#{1,6}\s/.test(text) || /^\*\*.+\*\*$/.test(text)) return true;
  if (cleaned.length > 80 || cleaned.length < 2) return false;
  if (/[.!:;,]$/.test(cleaned)) return false;
  return cleaned.split(/\s+/).length < 12;
}

export function parseStoryText(text: string): ParsedStory {
  const sections: StorySection[] = [];
  const facts: string[] = [];
  const sources: string[] = [];
  let mode: "main" | "facts" | "sources" = "main";
  let currentSection: StorySection = { heading: null, paragraphs: [] };
  let paragraphLines: string[] = [];

  const flushParagraph = () => {
    if (paragraphLines.length === 0) return;
    currentSection.paragraphs.push(paragraphLines.join(" "));
    paragraphLines = [];
  };

  const flushSection = () => {
    flushParagraph();
    if (currentSection.heading !== null || currentSection.paragraphs.length > 0) {
      sections.push(currentSection);
    }
    currentSection = { heading: null, paragraphs: [] };
  };

  for (const rawLine of text.replace(/\r/g, "").split("\n")) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      continue;
    }

    const marker = line.toUpperCase().replace(/[:：]$/, "");
    if (marker === "AANVULLENDE FEITEN" || marker === "ADDITIONAL FACTS" || marker === "ZUSÄTZLICHE FAKTEN") {
      flushSection();
      mode = "facts";
      continue;
    }
    if (marker === "BRONNEN" || marker === "SOURCES" || marker === "QUELLEN") {
      flushSection();
      mode = "sources";
      continue;
    }

    if (mode === "facts") {
      facts.push(line.replace(/^[-*•]\s*/, ""));
      continue;
    }
    if (mode === "sources") {
      sources.push(line.replace(/^[-*•]\s*/, ""));
      continue;
    }

    if (isLikelyHeading(line)) {
      flushSection();
      currentSection.heading = cleanHeading(line);
      continue;
    }

    const combinedLength = paragraphLines.join(" ").length + line.length;
    if (paragraphLines.length >= 3 || combinedLength > 420) flushParagraph();
    paragraphLines.push(line);
  }

  flushSection();
  return { sections, facts, sources };
}

export function buildStorySummary(parsedStory: ParsedStory): string[] {
  const summary: string[] = [];

  for (const section of parsedStory.sections) {
    const firstParagraph = section.paragraphs[0];
    if (!firstParagraph) continue;
    const firstSentence = firstParagraph.match(/^.*?[.!?](?:\s|$)/)?.[0]?.trim() ?? firstParagraph;
    if (firstSentence.length >= 35) summary.push(firstSentence);
    if (summary.length === 3) break;
  }

  return summary;
}

function takeWholeSentences(text: string, wordBudget: number): string {
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [text];
  const selected: string[] = [];
  let used = 0;

  for (const sentence of sentences) {
    const words = sentence.trim().split(/\s+/).filter(Boolean).length;
    if (used + words > wordBudget && selected.length > 0) break;
    selected.push(sentence.trim());
    used += words;
    if (used >= wordBudget) break;
  }

  return selected.join(" ");
}

export function condenseStorySections(
  parsedStory: ParsedStory,
  maxWords = 500,
  maxSections = 6,
): StorySection[] {
  const selected: StorySection[] = [];
  let remainingWords = maxWords;

  for (const section of parsedStory.sections) {
    if (selected.length >= maxSections || remainingWords <= 25) break;
    const paragraphs: string[] = [];

    for (const paragraph of section.paragraphs) {
      if (remainingWords <= 25) break;
      const shortened = takeWholeSentences(paragraph, remainingWords);
      if (!shortened) continue;
      paragraphs.push(shortened);
      remainingWords -= shortened.split(/\s+/).filter(Boolean).length;
    }

    if (section.heading || paragraphs.length > 0) {
      selected.push({ heading: section.heading, paragraphs });
    }
  }

  return selected;
}
