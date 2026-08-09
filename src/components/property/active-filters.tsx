"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { rentBudgetOptions, saleBudgetOptions } from "@/lib/format";
import type { Location } from "@/lib/types";

/**
 * Removable chips for the filters currently applied.
 *
 * Without these, a filtered result set looks identical to an unfiltered one
 * with fewer listings — people conclude the inventory is thin when actually
 * they left a budget cap set three clicks ago.
 */
export function ActiveFilters({ locations }: { locations: Location[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const intent = searchParams.get("intent");
  const budgetOptions = intent === "rent" ? rentBudgetOptions : saleBudgetOptions;

  const chips: { key: string; label: string }[] = [];

  const q = searchParams.get("q");
  if (q) chips.push({ key: "q", label: `“${q}”` });

  const location = searchParams.get("location");
  if (location) {
    const name = locations.find((l) => l.slug === location)?.name ?? location;
    chips.push({ key: "location", label: name });
  }

  const configuration = searchParams.get("configuration");
  if (configuration) chips.push({ key: "configuration", label: configuration });

  const budget = searchParams.get("budget");
  if (budget) {
    const label = budgetOptions.find((o) => o.value === budget)?.label ?? budget;
    chips.push({ key: "budget", label });
  }

  if (!chips.length) return null;

  function remove(key: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <ul className="mt-2 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <li key={chip.key}>
          <button
            type="button"
            onClick={() => remove(chip.key)}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-indigo-100 bg-brand-indigo-50 py-1 pl-3 pr-2 text-xs font-medium text-brand-indigo-900 transition-colors hover:bg-brand-indigo-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {chip.label}
            <X className="size-3" aria-hidden />
            <span className="sr-only">Remove {chip.label} filter</span>
          </button>
        </li>
      ))}
      <li>
        <Link
          href={pathname}
          className="rounded-md px-2 py-1 text-xs font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Clear all
        </Link>
      </li>
    </ul>
  );
}
