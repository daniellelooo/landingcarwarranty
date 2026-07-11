/**
 * Client-side Meta (Facebook) Pixel helpers.
 *
 * The base pixel is injected by <MetaPixel /> in the root layout, which defines
 * the global `fbq` stub. These helpers fire standard events on top of it and
 * share an `event_id` with the server-side Conversions API so Meta can
 * deduplicate the browser event against the server event.
 */

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

type FbqArgs =
  | ["track", string]
  | ["track", string, Record<string, unknown>]
  | ["track", string, Record<string, unknown>, { eventID: string }]
  | ["init", string]
  | [string, ...unknown[]];

type Fbq = (...args: FbqArgs) => void;

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** Generate an id shared between the browser Pixel event and the CAPI event. */
export function newEventId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function track(
  event: string,
  params: Record<string, unknown>,
  eventId?: string
): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  if (eventId) {
    window.fbq("track", event, params, { eventID: eventId });
  } else {
    window.fbq("track", event, params);
  }
}

/** Fired when a visitor starts filling out the lead form. */
export function trackInitiateCheckout(): void {
  track("InitiateCheckout", { content_category: "auto_refinance_lead" });
}

/** Fired on a successful lead submission. `eventId` must match the CAPI event. */
export function trackLead(
  eventId: string,
  params: Record<string, unknown> = {}
): void {
  track("Lead", { content_category: "auto_refinance_lead", ...params }, eventId);
}
