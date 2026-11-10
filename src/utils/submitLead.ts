import { getAttributionPayload, AttributionData } from './attribution';
import posthog from 'posthog-js';

export interface LeadPayload {
  companyName: string;
  customerPhone: string;
  customerServiceEmail: string;
  interestedIn: string;
  selectedServiceOption?: string;
  weeklyParcels: string;
  bucket: string;
  isFiveFreeCollections?: boolean;
  noFranchisees?: boolean;
  sourcePage?: string;
  pageUrl?: string;
  attribution?: AttributionData;
  address: {
    address1: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    latitude: number;
    longitude: number;
  };
  contacts: {
    name: string;
    email: string;
    phone: string;
  }[];
}

export interface LeadResponse {
  success: boolean;
  id?: string;
  isDuplicate?: boolean;
  syncedWithNetSuite?: boolean;
  outOfTerritory?: boolean;
  message?: string;
  accountManagerName?: string;
  accountManagerCalendly?: string;
  internalid?: string;
  customerEntityId?: string;
  bookingUrlId?: string;
  franchiseeName?: string;
  localMilePlusAuthLink?: string;
}

export async function submitLead(data: LeadPayload): Promise<LeadResponse> {
  try {
    const attribution = data.attribution || getAttributionPayload();
    const payload = {
      ...data,
      attribution,
      utmSource: attribution?.utmSource,
      utmMedium: attribution?.utmMedium,
      utmCampaign: attribution?.utmCampaign,
      utmContent: attribution?.utmContent,
      utmTerm: attribution?.utmTerm,
      adClickId: attribution?.adClickId,
      channel: attribution?.channel,
      referrer: attribution?.referrer,
      landingPage: attribution?.landingPage,
      aiAssistant: attribution?.aiAssistant,
    };

    // Track lead submission in PostHog
    if (typeof posthog !== 'undefined' && posthog.capture) {
      posthog.capture('lead_submission_attempt', {
        interested_in: data.interestedIn,
        source_page: data.sourcePage,
        channel: attribution?.channel,
        referrer: attribution?.referrer,
        ai_assistant: attribution?.aiAssistant,
      });
    }

    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error('Failed to submit lead', await res.text());
      return { success: false, message: 'Server error' };
    }

    const result = await res.json();

    if (result.success && typeof posthog !== 'undefined' && posthog.capture) {
      posthog.capture('lead_submission_success', {
        lead_id: result.id,
        interested_in: data.interestedIn,
        source_page: data.sourcePage,
        channel: attribution?.channel,
        ai_assistant: attribution?.aiAssistant,
      });
    }

    return result;
  } catch (err) {
    console.error('Error submitting lead', err);
    return { success: false, message: 'Network error' };
  }
}
