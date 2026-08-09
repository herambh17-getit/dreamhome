"use client";

import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { ListingIntent } from "@/lib/types";

/** Formspree endpoint — receives every enquiry and emails it to the business. */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrpzpeap";

interface EnquiryFormProps {
  /** Identifies which form produced the lead, for CRM routing. */
  source: string;
  propertyId?: string;
  defaultIntent?: ListingIntent;
  defaultMessage?: string;
  compact?: boolean;
  className?: string;
}

/**
 * The lead capture form.
 *
 * Errors are shown inline and announced, not just toasted — a toast that
 * disappears is useless to someone using a screen reader, and useless to
 * anyone who looked away.
 */
export function EnquiryForm({
  source,
  propertyId,
  defaultIntent,
  defaultMessage = "",
  compact = false,
  className,
}: EnquiryFormProps) {
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot: bots fill "company". Pretend success without sending anything.
    if (String(fd.get("company") ?? "").trim()) {
      setDone(true);
      form.reset();
      return;
    }

    // Minimal client-side validation (name + phone are the ones we need).
    const nextErrors: Record<string, string[]> = {};
    if (!String(fd.get("name") ?? "").trim())
      nextErrors.name = ["Please enter your name."];
    if (!String(fd.get("phone") ?? "").trim())
      nextErrors.phone = ["Please enter your mobile number."];
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      toast.error("Please check the highlighted fields and try again.");
      return;
    }

    // Context for routing/attribution; drop the honeypot before sending.
    fd.delete("company");
    fd.append("source", source);
    fd.append("page", pathname);
    if (propertyId) fd.append("propertyId", propertyId);
    fd.append("_subject", `New enquiry from ${source} — dreamhomeproperties.in`);

    startTransition(async () => {
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: fd,
        });

        if (res.ok) {
          setErrors({});
          setDone(true);
          form.reset();
          toast.success("Thank you — we'll be in touch shortly.");
        } else {
          const data = (await res.json().catch(() => null)) as {
            errors?: { message: string }[];
          } | null;
          toast.error(
            data?.errors?.map((x) => x.message).join(" ") ||
              "Something went wrong. Please WhatsApp or call us — we'll pick up.",
          );
        }
      } catch {
        toast.error(
          "Network error — please WhatsApp or call us and we'll pick up.",
        );
      }
    });
  }

  if (done) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-border bg-card p-8 text-center",
          className,
        )}
        role="status"
      >
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <Send className="size-5" aria-hidden />
        </div>
        <h3 className="mt-4 text-xl text-brand-indigo-900">
          Thank you — message received
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ll call you back shortly. If it&apos;s urgent, WhatsApp is the
          fastest way to reach us.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setDone(false)}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("space-y-4", className)} noValidate>
      {/* Honeypot. Hidden from sight and from assistive tech; bots fill it. */}
      <div aria-hidden className="absolute left-[-9999px] size-px overflow-hidden">
        <label htmlFor={`company-${source}`}>Company (leave blank)</label>
        <input
          id={`company-${source}`}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        <Field
          id={`name-${source}`}
          name="name"
          label="Your name"
          required
          autoComplete="name"
          placeholder="Nayan Jomraj"
          errors={errors.name}
        />
        <Field
          id={`phone-${source}`}
          name="phone"
          label="Mobile number"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="98765 43210"
          errors={errors.phone}
        />
      </div>

      <Field
        id={`email-${source}`}
        name="email"
        label="Email"
        hint="Optional"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        errors={errors.email}
      />

      {!compact && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor={`intent-${source}`}>
              I&apos;m looking to{" "}
              <span className="text-xs font-normal text-muted-foreground">
                Optional
              </span>
            </Label>
            <Select name="intent" defaultValue={defaultIntent}>
              <SelectTrigger id={`intent-${source}`} className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">Buy a property</SelectItem>
                <SelectItem value="rent">Rent a property</SelectItem>
                <SelectItem value="commercial">
                  Find commercial space
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Field
            id={`budget-${source}`}
            name="budget"
            label="Budget"
            hint="Optional"
            placeholder="e.g. ₹2 – 3 Cr"
            errors={errors.budget}
          />
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor={`message-${source}`}>
          How can we help?{" "}
          <span className="text-xs font-normal text-muted-foreground">
            Optional
          </span>
        </Label>
        <Textarea
          id={`message-${source}`}
          name="message"
          rows={compact ? 3 : 4}
          defaultValue={defaultMessage}
          placeholder="Tell us what you're looking for — area, configuration, timeline."
          aria-invalid={Boolean(errors.message)}
        />
        <FieldError errors={errors.message} id={`message-${source}-error`} />
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={pending}>
        {pending ? "Sending…" : "Send enquiry"}
        {!pending && <Send className="size-4" aria-hidden />}
      </Button>

      <p className="text-center text-xs leading-relaxed text-muted-foreground">
        We use your details only to respond to this enquiry. No spam, and we
        never sell your data.
      </p>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  hint,
  errors,
  ...props
}: {
  id: string;
  name: string;
  label: string;
  hint?: string;
  errors?: string[];
} & React.ComponentProps<typeof Input>) {
  const errorId = `${id}-error`;

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>
        {label}
        {hint && (
          <span className="text-xs font-normal text-muted-foreground">
            {hint}
          </span>
        )}
      </Label>
      <Input
        id={id}
        name={name}
        aria-invalid={Boolean(errors?.length)}
        aria-describedby={errors?.length ? errorId : undefined}
        {...props}
      />
      <FieldError errors={errors} id={errorId} />
    </div>
  );
}

function FieldError({ errors, id }: { errors?: string[]; id: string }) {
  if (!errors?.length) return null;
  return (
    <p id={id} role="alert" className="text-xs font-medium text-destructive">
      {errors[0]}
    </p>
  );
}
