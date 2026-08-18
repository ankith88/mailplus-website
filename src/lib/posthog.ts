import posthog from 'posthog-js';

const POSTHOG_KEY =
  process.env.NEXT_PUBLIC_POSTHOG_KEY ||
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
  'phc_q2TeLAfUXEmJMni3LpXg8VWuSmFSRksJWmBP6PfNxRRt';

const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

let isInitialized = false;

export function initPostHog() {
  if (typeof window === 'undefined' || isInitialized) return;

  if (POSTHOG_KEY) {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: false, // Handled manually for Next.js App Router
      capture_pageleave: true,
      person_profiles: 'always', // Track all users & sessions
      session_recording: {
        maskAllInputs: true, // Privacy masking
      },
      loaded: (ph) => {
        if (process.env.NODE_ENV === 'development') {
          ph.debug(true); // Show console logs in dev mode so events are visible
          console.log('[PostHog] Initialized successfully with key:', POSTHOG_KEY);
        }
      },
    });
    isInitialized = true;
  } else {
    console.warn('[PostHog] Missing POSTHOG_KEY! Events will not be sent.');
  }
}

export function captureEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window === 'undefined') return;
  if (!isInitialized) {
    initPostHog();
  }
  try {
    posthog.capture(eventName, properties);
  } catch (e) {
    console.error('[PostHog] Event capture error:', e);
  }
}

/* ── Form Drop-Off Telemetry Helpers ───────────────────────────────────── */

/** Tracks when a user starts interacting with a form */
export function trackFormStarted(formId: string, extra?: Record<string, any>) {
  captureEvent('form_started', {
    form_id: formId,
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    timestamp: new Date().toISOString(),
    ...extra,
  });
}

/** Tracks when a specific step is completed in a multi-step form */
export function trackFormStepCompleted(
  formId: string,
  stepNumber: number,
  stepName?: string,
  extra?: Record<string, any>
) {
  captureEvent('form_step_completed', {
    form_id: formId,
    step_number: stepNumber,
    step_name: stepName,
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    ...extra,
  });
}

/** Tracks client-side validation failures */
export function trackFormValidationError(
  formId: string,
  errorFields: string[] | Record<string, any>,
  extra?: Record<string, any>
) {
  captureEvent('form_validation_failed', {
    form_id: formId,
    error_fields: Array.isArray(errorFields)
      ? errorFields
      : Object.keys(errorFields).filter((k) => !!errorFields[k]),
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    ...extra,
  });
}

/** Tracks when the user clicks Submit */
export function trackFormSubmitClicked(formId: string, extra?: Record<string, any>) {
  captureEvent('form_submit_clicked', {
    form_id: formId,
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    submit_click_time: new Date().toISOString(),
    ...extra,
  });
}

/** Tracks when the form enters the loading spinner / processing state */
export function trackFormSubmitProcessing(formId: string, extra?: Record<string, any>) {
  captureEvent('form_submit_processing_started', {
    form_id: formId,
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    processing_start_time: new Date().toISOString(),
    ...extra,
  });
}

/** Tracks successful API form submission completion */
export function trackFormSubmitSuccess(
  formId: string,
  durationMs: number,
  extra?: Record<string, any>
) {
  captureEvent('form_submit_success', {
    form_id: formId,
    duration_ms: Math.round(durationMs),
    duration_seconds: Math.round(durationMs / 100) / 10,
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    ...extra,
  });
}

/** Tracks failed API submission */
export function trackFormSubmitFailure(
  formId: string,
  durationMs: number,
  reason: string,
  extra?: Record<string, any>
) {
  captureEvent('form_submit_failed', {
    form_id: formId,
    duration_ms: Math.round(durationMs),
    duration_seconds: Math.round(durationMs / 100) / 10,
    failure_reason: reason,
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    ...extra,
  });
}

/** Tracks when user abandons page during the submit waiting spinner */
export function trackFormAbandonedDuringSubmission(
  formId: string,
  waitDurationMs: number,
  extra?: Record<string, any>
) {
  captureEvent('form_abandoned_during_submission', {
    form_id: formId,
    wait_duration_ms: Math.round(waitDurationMs),
    wait_duration_seconds: Math.round(waitDurationMs / 100) / 10,
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    ...extra,
  });
}

/** Tracks confirmation page load and correlation with submit duration */
export function trackConfirmationPageViewed(
  sourceForm?: string,
  waitTimeMs?: number,
  extra?: Record<string, any>
) {
  captureEvent('confirmation_page_viewed', {
    source_form: sourceForm || 'unknown',
    wait_time_to_confirm_ms: waitTimeMs ? Math.round(waitTimeMs) : undefined,
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    ...extra,
  });
}
