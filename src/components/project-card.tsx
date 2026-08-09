import Image from "next/image";
import Link from "next/link";
import { CalendarClock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import type { Project } from "@/lib/types";

const STATUS_TONE: Record<string, string> = {
  "Ready to Move": "bg-emerald-600 text-white",
  "New Launch": "bg-brand-gold text-brand-indigo-950",
  "Under Construction": "bg-brand-deep-blue text-white",
  Resale: "bg-brand-indigo-600 text-white",
  Sold: "bg-muted-foreground text-white",
};

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const cover = project.gallery[0];

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300",
        "hover:-translate-y-1 hover:border-brand-indigo-200 hover:shadow-xl hover:shadow-brand-indigo/8",
        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        className,
      )}
    >
      <div className="relative aspect-4/3 overflow-hidden bg-brand-indigo-50">
        {cover ? (
          <Image
            src={cover}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="brand-gradient flex size-full items-center justify-center"
            aria-hidden
          >
            <svg viewBox="0 0 120 80" className="w-2/5 opacity-30" fill="none">
              <path d="M40 52 L68 22 L96 52 Z" fill="white" />
              <path d="M12 52 L34 30 L52 48 L52 52 Z" fill="white" />
              <path
                d="M6 64 C 34 48, 90 46, 116 60 C 88 52, 34 55, 14 68 Z"
                fill="white"
              />
            </svg>
          </div>
        )}
        <Badge
          className={cn(
            "absolute left-3 top-3 border-0 font-semibold",
            STATUS_TONE[project.status] ?? "bg-primary text-primary-foreground",
          )}
        >
          {project.status}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <MapPin className="size-3.5 shrink-0 text-brand-gold-600" aria-hidden />
          {project.location}
        </p>

        <h3 className="mt-2 text-pretty text-lg leading-snug text-brand-indigo-900">
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {project.name}
          </Link>
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          by {project.developer}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.configurations.map((config) => (
            <li
              key={config}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-foreground/70"
            >
              {config}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <p className="text-xs text-muted-foreground">Starting from</p>
          <p className="text-xl font-extrabold text-brand-indigo-900">
            {formatPrice(project.priceFrom)}
          </p>
          {project.possession && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarClock className="size-3.5" aria-hidden />
              Possession {project.possession}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
