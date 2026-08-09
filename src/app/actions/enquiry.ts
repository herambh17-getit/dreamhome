"use server";

import { headers } from "next/headers";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { enquirySchema, type EnquiryInput } from "@/lib/validation";

export interface EnquiryResult {
  ok: boolean;
  message: string;
  /** Field-level errors, keyed by field name, for inline display. */
  errors?: Record<string, string[]>;
}

/**
 * Handles every lead form on the site.
 *
 * Design notes:
 *  - Validation runs server-side regardless of what the client did. The
 *    client-side copy is UX; this is the gate.
 *  - Without Supabase configured, the lead is logged and the user still gets
 *    a success response. A prospect typing their number into a form on a
 *    demo build should not see an error — and the WhatsApp path always works.
 *  - We never write the honeypot value or anything the user did not type,
 *    beyond the page path and campaign tags needed for attribution.
 */
export async function submitEnquiry(
  input: EnquiryInput,
): Promise<EnquiryResult> {
  const parsed = enquirySchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the highlighted fields and try again.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const data = parsed.data;

  // Honeypot tripped: pretend it worked. Telling a bot it failed just
  // teaches whoever wrote it to try again.
  if (data.company) {
    return { ok: true, message: "Thank you — we'll be in touch shortly." };
  }

  // Campaign attribution, read from the referring URL rather than asked for.
  const hdrs = await headers();
  const referer = hdrs.get("referer") ?? "";
  let utm: Record<string, string | undefined> = {};
  try {
    const url = new URL(referer);
    utm = {
      utm_source: url.searchParams.get("utm_source") ?? undefined,
      utm_medium: url.searchParams.get("utm_medium") ?? undefined,
      utm_campaign: url.searchParams.get("utm_campaign") ?? undefined,
    };
  } catch {
    // No or malformed referer. Attribution is a nice-to-have; a missing
    // header must never cost us the lead.
  }

  if (!isSupabaseConfigured()) {
    console.info(
      "[enquiry] Supabase not configured — lead captured in logs only:",
      { name: data.name, phone: data.phone, source: data.source },
    );
    return {
      ok: true,
      message: "Thank you — we'll be in touch shortly.",
    };
  }

  try {
    const supabase = await createClient();

    const { error } = await supabase.from("enquiries").insert({
      name: data.name,
      phone: data.phone,
      email: data.email ?? null,
      message: data.message ?? null,
      source: data.source,
      intent: data.intent ?? null,
      property_id: data.propertyId ?? null,
      budget: data.budget ?? null,
      page_path: data.pagePath ?? null,
      utm_source: utm.utm_source ?? null,
      utm_medium: utm.utm_medium ?? null,
      utm_campaign: utm.utm_campaign ?? null,
      status: "new",
    });

    if (error) throw error;

    return { ok: true, message: "Thank you — we'll be in touch shortly." };
  } catch (err) {
    console.error("[enquiry] insert failed:", err);
    // Surface the fallback rather than a dead end: this person is trying to
    // hand us money and our database is the thing that broke.
    return {
      ok: false,
      message:
        "Something went wrong on our end. Please call or WhatsApp us — we'll pick up.",
    };
  }
}
