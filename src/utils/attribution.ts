import posthog from 'posthog-js';

export interface AttributionData {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  adClickId?: string;
  channel?: string;
  referrer?: string;
  landingPage?: string;
  posthogDistinctId?: string;
  posthogSessionId?: string;
  posthogSessionUrl?: string;
}

const STORAGE_KEY = 'mailplus_attribution_data';

/**
 * Parses current URL params and referrer to capture marketing attribution,
 * and saves to sessionStorage so it persists across multi-page navigation.
 */
export function captureAttributionData(): void {
  if (typeof window === 'undefined') return;

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const existing = getStoredAttribution();

    const utmSource = urlParams.get('utm_source') || existing?.utmSource || undefined;
    const utmMedium = urlParams.get('utm_medium') || existing?.utmMedium || undefined;
    const utmCampaign = urlParams.get('utm_campaign') || existing?.utmCampaign || undefined;
    const utmContent = urlParams.get('utm_content') || existing?.utmContent || undefined;
    const utmTerm = urlParams.get('utm_term') || existing?.utmTerm || undefined;

    const fbclid = urlParams.get('fbclid');
    const gclid = urlParams.get('gclid');
    const msclkid = urlParams.get('msclkid');
    const liFatId = urlParams.get('li_fat_id');
    const adClickId = fbclid || gclid || msclkid || liFatId || existing?.adClickId || undefined;

    const referrer = document.referrer || existing?.referrer || undefined;
    const landingPage = existing?.landingPage || window.location.href;

    let channel = existing?.channel;
    if (!channel) {
      if (fbclid || (utmSource && /facebook|instagram|meta|fb|ig/i.test(utmSource))) {
        channel = 'Meta Ads (Facebook/Instagram)';
      } else if (gclid || (utmSource && /google/i.test(utmSource))) {
        channel = 'Google Search / Display Ads';
      } else if (liFatId || (utmSource && /linkedin/i.test(utmSource))) {
        channel = 'LinkedIn Ads';
      } else if (utmSource) {
        channel = `${utmSource.charAt(0).toUpperCase() + utmSource.slice(1)} Campaign`;
      } else if (referrer && !referrer.includes(window.location.hostname)) {
        channel = `Referral (${new URL(referrer).hostname})`;
      } else {
        channel = 'Direct / Organic';
      }
    }

    const updated: AttributionData = {
      ...existing,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm,
      adClickId,
      channel,
      referrer,
      landingPage,
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Failed to capture attribution data:', err);
  }
}

/**
 * Returns stored attribution data merged with current PostHog user and session IDs.
 */
export function getAttributionPayload(): AttributionData {
  let data: AttributionData = {};

  if (typeof window !== 'undefined') {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        data = JSON.parse(stored);
      } else {
        captureAttributionData();
        const reRead = sessionStorage.getItem(STORAGE_KEY);
        if (reRead) data = JSON.parse(reRead);
      }
    } catch (err) {
      console.warn('Failed to read attribution storage:', err);
    }
  }

  // Attach PostHog distinct ID & session ID if PostHog is loaded
  try {
    if (posthog && typeof posthog.get_distinct_id === 'function') {
      data.posthogDistinctId = posthog.get_distinct_id();
    }
    if (posthog && typeof posthog.get_session_id === 'function') {
      const sessionId = posthog.get_session_id();
      if (sessionId) {
        data.posthogSessionId = sessionId;
        data.posthogSessionUrl = `https://us.posthog.com/project/108577/replay/${sessionId}`;
      }
    }
  } catch (phErr) {
    console.warn('Failed to extract PostHog session info:', phErr);
  }

  return data;
}

function getStoredAttribution(): AttributionData | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
