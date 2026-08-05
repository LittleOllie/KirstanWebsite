"use client";

import { getAnchorId, scrollToSection } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // Homepage with hash — scroll to section
    if (pathname === "/") {
      const hash = window.location.hash;
      if (hash) {
        const id = getAnchorId(hash);
        if (id) {
          requestAnimationFrame(() => scrollToSection(id));
          return;
        }
      }
    }

    // All other pages (including legal) — start at top
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
