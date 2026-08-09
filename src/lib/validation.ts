import { z } from "zod";

/**
 * Shared between the client form and the server action, so validation cannot
 * drift between them. The client copy is a convenience; the server copy is
 * the one that actually protects the database.
 */

/**
 * Indian mobile numbers: 10 digits starting 6–9, optionally with +91 / 0.
 * Deliberately permissive about spaces, dashes and brackets — rejecting a
 * real customer's number because they typed it with spaces loses a lead.
 */
const PHONE_RE = /^(?:\+?91[\s-]?|0)?[6-9]\d{9}$/;

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80, "That name looks too long"),

  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s()-]/g, ""))
    .refine((v) => PHONE_RE.test(v), "Enter a valid 10-digit mobile number"),

  email: z
    .union([z.string().trim().email("Enter a valid email address"), z.literal("")])
    .optional()
    .transform((v) => (v === "" ? undefined : v)),

  message: z
    .string()
    .trim()
    .max(2000, "Please keep this under 2000 characters")
    .optional()
    .transform((v) => (v === "" ? undefined : v)),

  intent: z.enum(["buy", "rent", "commercial"]).optional(),

  budget: z.string().trim().max(60).optional(),

  propertyId: z.string().trim().max(120).optional(),

  /** Which form produced the lead. Set by the component, not the user. */
  source: z.string().trim().min(1).max(80),

  pagePath: z.string().trim().max(200).optional(),

  /**
   * Honeypot. Real users never see this field, so anything in it is a bot.
   * Cheaper and less hostile than a CAPTCHA, and it does not punish people
   * using screen readers the way a visual challenge does.
   */
  company: z.string().max(0).optional(),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryValues = z.output<typeof enquirySchema>;

/** Normalises a phone number to E.164 for WhatsApp/CRM handoff. */
export function toE164(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const last10 = digits.slice(-10);
  return `91${last10}`;
}
