import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

/**
 * Section shell + eyebrow/heading lockup used across the site.
 *
 * Exists so vertical rhythm and heading treatment are decided once. Ad-hoc
 * `py-` values on every section is how a "premium" layout quietly turns
 * inconsistent.
 */

export function Section({
  children,
  className,
  id,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "muted" | "dark";
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-20 sm:py-28",
        tone === "muted" && "bg-brand-light",
        tone === "dark" && "bg-brand-indigo-950 text-white",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "default",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  tone?: "default" | "dark";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "text-xs font-bold uppercase tracking-[0.2em]",
            tone === "dark" ? "text-brand-gold" : "text-brand-gold-600",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "mt-3 text-balance text-3xl leading-[1.15] sm:text-4xl lg:text-[2.75rem]",
          tone === "dark" ? "text-white" : "text-brand-indigo-900",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-pretty text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-brand-indigo-200" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
