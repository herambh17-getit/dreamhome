"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button, ButtonLink } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { cn } from "@/lib/utils";
import { mainNav, siteConfig, whatsappLink } from "@/lib/site-config";

/**
 * Sticky header.
 *
 * Starts transparent over the hero and solidifies on scroll. The transparent
 * state is only used on routes that actually have a dark hero behind it —
 * elsewhere it is solid from the top, otherwise the nav would be invisible.
 */
const TRANSPARENT_ROUTES = new Set(["/"]);

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  const canBeTransparent = TRANSPARENT_ROUTES.has(pathname);
  const solid = scrolled || !canBeTransparent;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  // Close the mobile sheet on navigation, otherwise it stays open over the
  // page the user just asked for.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label={`${siteConfig.name} — home`}
          className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <BrandLogo priority inverted={!solid} className="h-14 [&_img]:h-14" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                      solid
                        ? active
                          ? "text-primary"
                          : "text-foreground/75 hover:text-primary"
                        : active
                          ? "text-white"
                          : "text-white/80 hover:text-white",
                    )}
                  >
                    {item.title}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className={cn(
                          "absolute inset-x-3 -bottom-px h-0.5 rounded-full",
                          solid ? "bg-primary" : "bg-brand-gold",
                        )}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href={`tel:${siteConfig.contact.phoneHref}`}
            variant="ghost"
            size="lg"
            className={cn(
              "hidden md:inline-flex",
              !solid && "text-white hover:bg-white/10 hover:text-white",
            )}
          >
            <Phone className="size-4" aria-hidden />
            {siteConfig.contact.phone}
          </ButtonLink>

          <ButtonLink
            href={whatsappLink()}
            external
            size="lg"
            className="hidden bg-[#25D366] text-white hover:bg-[#1da851] sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" aria-hidden />
            WhatsApp
          </ButtonLink>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-lg"
                  className={cn(
                    "lg:hidden",
                    !solid && "text-white hover:bg-white/10 hover:text-white",
                  )}
                  aria-label="Open menu"
                >
                  <Menu className="size-5" aria-hidden />
                </Button>
              }
            />

            <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>

              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <BrandLogo className="h-12 [&_img]:h-12" />
                <Button
                  variant="ghost"
                  size="icon-lg"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="size-5" aria-hidden />
                </Button>
              </div>

              <nav aria-label="Mobile" className="px-3 py-4">
                <ul className="flex flex-col">
                  {mainNav.map((item, i) => {
                    const active =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);

                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * i, duration: 0.3 }}
                      >
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "block rounded-lg px-4 py-3 text-lg font-semibold transition-colors",
                            active
                              ? "bg-brand-indigo-50 text-primary"
                              : "text-foreground hover:bg-muted",
                          )}
                        >
                          {item.title}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-auto space-y-2 border-t border-border p-5">
                <ButtonLink
                  href={whatsappLink()}
                  external
                  size="lg"
                  className="w-full bg-[#25D366] text-white hover:bg-[#1da851]"
                >
                  <WhatsAppIcon className="size-4" aria-hidden />
                  Chat on WhatsApp
                </ButtonLink>
                <ButtonLink
                  href={`tel:${siteConfig.contact.phoneHref}`}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  <Phone className="size-4" aria-hidden />
                  {siteConfig.contact.phone}
                </ButtonLink>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
