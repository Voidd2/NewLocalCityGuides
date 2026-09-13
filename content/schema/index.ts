import { z } from 'zod';

const LocalizedText = z.object({ nl: z.string().min(1), en: z.string().min(1) });
const Coords = z.object({ lng: z.number().min(-180).max(180), lat: z.number().min(-90).max(90) });
const SlugId = z.string().regex(/^[a-z0-9-]+$/);

export const LocationSchema = z.object({
  id: SlugId, cityId: z.string(), coordinates: Coords,
  themes: z.array(z.enum(['HISTORY','HIDDEN_GEM','FOOD','SCENIC','CULTURE'])).min(1),
  status: z.enum(['draft','review','published']),
  accessType: z.enum(['free','paid','free_with_paid_interior']),
  visitMinutes: z.number().int().positive(),
  openingHours: z.string().optional(), address: z.string().optional(),
  content: z.object({
    title: LocalizedText, subtitle: LocalizedText, story: LocalizedText,
    lookAround: LocalizedText.optional(), thenVsNow: LocalizedText.optional(),
    funFacts: z.array(LocalizedText).max(5).optional(),
  }),
  sourceIds: z.array(z.string()).min(1),
  /** video = YouTube/MP4, audio = MP3, text = no media */
  mediaType: z.enum(['video', 'audio', 'text']).default('text'),
  videoUrl: z.string().url().optional(),
  audioUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
});

export const CitySchema = z.object({
  id: SlugId, slug: SlugId, name: LocalizedText,
  country: z.string(), countryCode: z.string().length(2), coordinates: Coords,
  status: z.enum(['coming_soon','live']), description: LocalizedText,
  coverImageUrl: z.string().url().optional(),
});

export const SourceSchema = z.object({
  id: SlugId, title: z.string().min(1),
  url: z.string().url().optional(), author: z.string().optional(),
  year: z.number().int().optional(),
  type: z.enum(['wikipedia','archive','book','newspaper','museum','official','other']),
});

export type LocationRecord = z.infer<typeof LocationSchema>;
export type CityRecord = z.infer<typeof CitySchema>;
export type SourceRecord = z.infer<typeof SourceSchema>;
