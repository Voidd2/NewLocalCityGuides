import type { Locale } from "@/i18n/config";

export type AffiliateOffer = {
  id: string;
  provider: string;
  cityId: "leiden";
  title: Record<Locale, string>;
  destinationUrl: string;
  placeId?: string;
  verifiedAt: string;
  approved: true;
};

// Publish only offers with a confirmed destination, provider agreement and current approval.
export const affiliateOffers: AffiliateOffer[] = [];

export function approvedTicketUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  return affiliateOffers.some((offer) => offer.destinationUrl === url && offer.approved) ? url : null;
}
