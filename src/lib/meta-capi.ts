import { createHash } from "crypto";
import type { LeadData } from "@/lib/sheets";

/**
 * Server-side Meta Conversions API (CAPI).
 *
 * Sends the "Lead" event straight from our server to Meta, which is far more
 * resilient than the browser Pixel (ad blockers, iOS, cookie loss). The same
 * `event_id` is used on the browser Pixel event so Meta deduplicates the two.
 *
 * All PII is SHA-256 hashed per Meta's requirements. This never throws to the
 * caller: a CAPI failure must not break lead capture.
 */

const GRAPH_VERSION = "v21.0";

/** Lowercase + trim, then SHA-256 hex. Returns undefined for empty input. */
function hash(value?: string | null): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return createHash("sha256").update(normalized).digest("hex");
}

/** Normalize a US phone to digits with country code, then hash. */
function hashPhone(phone?: string | null): string | undefined {
  if (!phone) return undefined;
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 10) digits = `1${digits}`;
  if (!digits) return undefined;
  return createHash("sha256").update(digits).digest("hex");
}

export interface CapiContext {
  eventId?: string;
  eventSourceUrl?: string;
  clientIp?: string;
  userAgent?: string;
  fbp?: string;
  fbc?: string;
}

export async function sendLeadEvent(
  lead: LeadData,
  ctx: CapiContext
): Promise<void> {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  // Silently no-op if CAPI isn't configured.
  if (!pixelId || !accessToken) return;

  const userData: Record<string, unknown> = {
    em: hash(lead.email),
    ph: hashPhone(lead.phone),
    fn: hash(lead.first_name),
    ln: hash(lead.last_name),
    st: hash(lead.state),
    zp: hash(lead.zip_code),
    country: hash("us"),
  };
  if (ctx.clientIp && ctx.clientIp !== "unknown") {
    userData.client_ip_address = ctx.clientIp;
  }
  if (ctx.userAgent) userData.client_user_agent = ctx.userAgent;
  if (ctx.fbp) userData.fbp = ctx.fbp;
  if (ctx.fbc) userData.fbc = ctx.fbc;

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: ctx.eventId,
        action_source: "website",
        event_source_url: ctx.eventSourceUrl,
        user_data: userData,
        custom_data: {
          content_category: "auto_refinance_lead",
        },
      },
    ],
    ...(process.env.META_CAPI_TEST_EVENT_CODE
      ? { test_event_code: process.env.META_CAPI_TEST_EVENT_CODE }
      : {}),
  };

  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${accessToken}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const detail = await res.text();
      console.error(`Meta CAPI responded ${res.status}: ${detail}`);
    }
  } catch (error) {
    console.error("Meta CAPI request failed:", error);
  }
}
