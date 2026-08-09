"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { rentBudgetOptions, saleBudgetOptions } from "@/lib/format";
import type { ListingIntent, Location } from "@/lib/types";

const INTENTS: { value: ListingIntent; label: string }[] = [
  { value: "buy", label: "Buy" },
  { value: "rent", label: "Rent" },
  { value: "commercial", label: "Commercial" },
];

const CONFIGURATIONS = ["1 BHK", "2 BHK", "3 BHK", "4 BHK"];

/**
 * Property search.
 *
 * Submits by navigating to /properties with a query string rather than
 * holding state client-side. That keeps results linkable, shareable,
 * back-button-correct and server-rendered — which matters for a page we
 * want indexed.
 *
 * The budget ladder swaps with intent: a ₹50 L step is meaningless for rent.
 */
export function PropertySearchForm({
  locations,
  variant = "page",
  defaultIntent = "buy",
}: {
  locations: Location[];
  variant?: "hero" | "page";
  defaultIntent?: ListingIntent;
}) {
  const router = useRouter();
  const [intent, setIntent] = useState<ListingIntent>(defaultIntent);
  const [location, setLocation] = useState("");
  const [configuration, setConfiguration] = useState("");
  const [budget, setBudget] = useState("");
  const [q, setQ] = useState("");

  const budgetOptions =
    intent === "rent" ? rentBudgetOptions : saleBudgetOptions;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams();
    params.set("intent", intent);
    if (location) params.set("location", location);
    if (configuration) params.set("configuration", configuration);
    if (budget) params.set("budget", budget);
    if (q.trim()) params.set("q", q.trim());

    router.push(`/properties?${params.toString()}`);
  }

  const hero = variant === "hero";

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "rounded-2xl p-4 sm:p-5",
        hero
          ? "border border-white/15 bg-white/10 shadow-2xl shadow-black/20 backdrop-blur-xl"
          : "border border-border bg-card shadow-sm",
      )}
      role="search"
      aria-label="Property search"
    >
      {/* Intent switch */}
      <div
        className={cn(
          "mb-4 inline-flex rounded-lg p-1",
          hero ? "bg-white/10" : "bg-muted",
        )}
        role="group"
        aria-label="What are you looking for?"
      >
        {INTENTS.map((option) => {
          const active = intent === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setIntent(option.value);
                // Budget bands differ per intent, so a carried-over value
                // would silently filter against the wrong ladder.
                setBudget("");
              }}
              aria-pressed={active}
              className={cn(
                "rounded-md px-4 py-1.5 text-sm font-semibold transition-colors",
                "focus-visible:outline-2 focus-visible:outline-offset-2",
                active
                  ? hero
                    ? "bg-white text-brand-indigo-900 focus-visible:outline-white"
                    : "bg-background text-primary shadow-sm focus-visible:outline-ring"
                  : hero
                    ? "text-white/75 hover:text-white focus-visible:outline-white"
                    : "text-muted-foreground hover:text-foreground focus-visible:outline-ring",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
        <Field label="Search" hero={hero} htmlFor="search-q">
          <Input
            id="search-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Locality, project or keyword"
            className={cn(
              hero &&
                "border-white/20 bg-white/10 text-white placeholder:text-white/50",
            )}
          />
        </Field>

        <Field label="Location" hero={hero} htmlFor="search-location">
          <Select value={location} onValueChange={(v) => setLocation(v ?? "")}>
            <SelectTrigger
              id="search-location"
              className={cn(
                "w-full",
                hero && "border-white/20 bg-white/10 text-white",
              )}
            >
              <SelectValue placeholder="Any location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((l) => (
                <SelectItem key={l.slug} value={l.slug}>
                  {l.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Configuration" hero={hero} htmlFor="search-config">
          <Select
            value={configuration}
            onValueChange={(v) => setConfiguration(v ?? "")}
          >
            <SelectTrigger
              id="search-config"
              className={cn(
                "w-full",
                hero && "border-white/20 bg-white/10 text-white",
              )}
            >
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              {CONFIGURATIONS.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label="Budget" hero={hero} htmlFor="search-budget">
          <Select value={budget} onValueChange={(v) => setBudget(v ?? "")}>
            <SelectTrigger
              id="search-budget"
              className={cn(
                "w-full",
                hero && "border-white/20 bg-white/10 text-white",
              )}
            >
              <SelectValue placeholder="Any budget" />
            </SelectTrigger>
            <SelectContent>
              {budgetOptions
                .filter((o) => o.value)
                .map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </Field>

        <div className="flex items-end">
          <Button
            type="submit"
            size="lg"
            className={cn(
              "w-full lg:w-auto",
              hero && "bg-brand-gold text-brand-indigo-950 hover:bg-brand-gold-400",
            )}
          >
            <Search className="size-4" aria-hidden />
            Search
          </Button>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  hero,
  children,
}: {
  label: string;
  htmlFor: string;
  hero: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label
        htmlFor={htmlFor}
        className={cn(
          "text-xs font-semibold uppercase tracking-wider",
          hero ? "text-white/70" : "text-muted-foreground",
        )}
      >
        {label}
      </Label>
      {children}
    </div>
  );
}
