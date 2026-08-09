import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

/**
 * Inner-page hero.
 *
 * Sits under the fixed header, so it carries its own top padding. Always
 * dark: the header is transparent only on the homepage, but this keeps a
 * consistent, premium entry to every inner page.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: { name: string; href: string }[];
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "brand-gradient relative isolate overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute -right-32 -top-32 -z-10 size-[30rem] rounded-full bg-brand-sky/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-white/60 transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => {
                const last = i === breadcrumbs.length - 1;
                return (
                  <li key={crumb.href} className="flex items-center gap-1">
                    <ChevronRight
                      className="size-3.5 text-white/35"
                      aria-hidden
                    />
                    {last ? (
                      <span aria-current="page" className="text-white/90">
                        {crumb.name}
                      </span>
                    ) : (
                      <Link
                        href={crumb.href}
                        className="text-white/60 transition-colors hover:text-white"
                      >
                        {crumb.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            {eyebrow}
          </p>
        )}

        <h1 className="mt-3 max-w-4xl text-balance text-4xl leading-[1.1] text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        {description && (
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
            {description}
          </p>
        )}

        {children}
      </div>

      {breadcrumbs && breadcrumbs.length > 0 && (
        <BreadcrumbJsonLd
          items={[{ name: "Home", href: "/" }, ...breadcrumbs]}
        />
      )}
    </header>
  );
}
