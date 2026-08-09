"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Listing gallery with keyboard-navigable thumbnails.
 *
 * Renders an honest empty state when a listing has no photographs rather
 * than a stock image — a stock interior on a real listing is a lie about
 * the property.
 */
export function PropertyGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [index, setIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="flex aspect-16/10 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-brand-light text-muted-foreground">
        <ImageOff className="size-8" aria-hidden />
        <p className="text-sm font-medium">Photographs coming soon</p>
        <p className="max-w-xs px-6 text-center text-xs">
          Ask us and we&apos;ll send the current set directly.
        </p>
      </div>
    );
  }

  const go = (next: number) =>
    setIndex((next + images.length) % images.length);

  return (
    <div>
      <div className="group relative aspect-16/10 overflow-hidden rounded-2xl bg-brand-indigo-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="absolute inset-0"
          >
            <Image
              src={images[index]}
              alt={`${title} — image ${index + 1} of ${images.length}`}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon-lg"
              onClick={() => go(index - 1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </Button>
            <Button
              variant="secondary"
              size="icon-lg"
              onClick={() => go(index + 1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
            >
              <ChevronRight className="size-5" aria-hidden />
            </Button>

            <p className="absolute bottom-3 right-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {index + 1} / {images.length}
            </p>
          </>
        )}
      </div>

      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`View image ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  "relative block aspect-square w-full overflow-hidden rounded-lg transition-all",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  i === index
                    ? "ring-2 ring-primary ring-offset-2"
                    : "opacity-60 hover:opacity-100",
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
