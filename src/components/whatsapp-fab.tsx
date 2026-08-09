"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { whatsappLink } from "@/lib/site-config";

/**
 * Floating WhatsApp button — the primary lead-gen surface on mobile.
 *
 * Appears after a short scroll rather than immediately: showing it over the
 * hero competes with the hero's own call to action, and an instantly-appearing
 * floating button reads as an ad.
 *
 * Hidden on /admin, where it is noise.
 */
export function WhatsAppFab() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 26 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Chat with us on WhatsApp"
          className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366]"
        >
          <WhatsAppIcon className="size-7" />
          {/* Pulse ring. aria-hidden — decorative, and it must not be
              announced. Suppressed under reduced-motion via globals.css. */}
          <span
            aria-hidden
            className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-20"
          />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
