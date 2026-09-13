/**
 * YourLocalCityGuide — Domain Types
 * Framework-independent. Pages import from here, never the reverse.
 */

export type Locale = 'nl' | 'en';
export interface LocalizedText { nl: string; en: string; }
export interface Coordinates { lng: number; lat: number; }

export type LocationTheme = 'HISTORY' | 'HIDDEN_GEM' | 'FOOD' | 'SCENIC' | 'CULTURE';
export type LocationStatus = 'draft' | 'review' | 'published';
export type AccessType = 'free' | 'paid' | 'free_with_paid_interior';

/**
 * Media type for a location stop.
 * - 'video'  → videoUrl is an MP4/WebM or YouTube URL; plays in LocationVideoModal
 * - 'audio'  → audioUrl is an MP3/OGG; plays in bottom AudioBar
 * - 'text'   → no media; content is read on-screen
 */
export type MediaType = 'video' | 'audio' | 'text';

export interface Location {
  id: string; cityId: string; coordinates: Coordinates;
  themes: LocationTheme[]; status: LocationStatus; accessType: AccessType;
  visitMinutes: number; openingHours?: string; address?: string;
  content: {
    title: LocalizedText; subtitle: LocalizedText; story: LocalizedText;
    lookAround?: LocalizedText; thenVsNow?: LocalizedText; funFacts?: LocalizedText[];
  };
  sourceIds: string[];
  /** Primary media — video is preferred over audio */
  mediaType: MediaType;
  /** MP4/WebM self-hosted or YouTube URL (youtube.com / youtu.be) */
  videoUrl?: string;
  /** MP3/OGG for audio-only stops */
  audioUrl?: string;
  imageUrl?: string;
}

export interface Route {
  id: string; cityId: string; theme: LocationTheme;
  status: 'draft' | 'review' | 'published';
  title: LocalizedText; description: LocalizedText;
  walkMinutes: number; distanceMetres: number;
  stops: Array<{ locationId: string; order: number; instruction?: LocalizedText }>;
  coverImageUrl?: string;
}

export interface City {
  id: string; slug: string; name: LocalizedText;
  country: string; countryCode: string; coordinates: Coordinates;
  status: 'coming_soon' | 'live'; description: LocalizedText; coverImageUrl?: string;
}

export interface Source {
  id: string; title: string; url?: string; author?: string; year?: number;
  type: 'wikipedia' | 'archive' | 'book' | 'newspaper' | 'museum' | 'official' | 'other';
}
