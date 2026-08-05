"use client";

import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/lib/data/site";
import { cn, getAnchorId, scrollToSection } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SECTION_NAV_MAP: { id: string; href: string }[] = [
  { id: "home", href: "/#home" },
  { id: "services", href: "/#services" },
  { id: "testimonials", href: "/#testimonials" },
  { id: "book", href: "/#book" },
];

function handleAnchorClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
  pathname: string,
  onAfterClick?: () => void
) {
  const id = getAnchorId(href);
  if (!id) return;

  if (pathname !== "/") return;

  e.preventDefault();
  scrollToSection(id);
  onAfterClick?.();
  window.history.pushState(null, "", href);
}

function linkIsActive(href: string, pathname: string, activeHref: string): boolean {
  if (href === "/waitlist" || href === "/contact") {
    return pathname === href;
  }

  if (pathname !== "/") return false;

  return activeHref === href;
}

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("/#home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  useEffect(() => {
    if (pathname === "/waitlist") {
      setActiveHref("/waitlist");
      return;
    }
    if (pathname === "/contact") {
      setActiveHref("/contact");
      return;
    }
    if (pathname !== "/") return;

    const offset = 140;

    const updateActiveFromScroll = () => {
      let current = SECTION_NAV_MAP[0].href;

      for (const section of SECTION_NAV_MAP) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) {
          current = section.href;
        }
      }

      setActiveHref(current);
    };

    updateActiveFromScroll();
    window.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveFromScroll);
  }, [pathname]);

  const closeMobile = () => setIsMobileOpen(false);

  const navLinkClass = (href: string, mobile = false) => {
    const active = linkIsActive(href, pathname, activeHref);

    if (mobile) {
      return cn(
        "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-lg tracking-wide transition-all duration-300",
        active
          ? "bg-accent text-text shadow-card"
          : "text-text hover:bg-accent/15"
      );
    }

    return cn(
      "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm tracking-wide transition-all duration-300",
      active
        ? "bg-accent text-text shadow-card"
        : "text-subtext hover:text-text hover:bg-accent/15"
    );
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-soft py-3"
          : "bg-transparent py-5 md:py-6"
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Logo />

        <ul className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) =>
            link.isButton ? (
              <li key={link.label} className="ml-2">
                <Button
                  href={link.href}
                  size="sm"
                  onClick={(e) =>
                    handleAnchorClick(
                      e as unknown as React.MouseEvent<HTMLAnchorElement>,
                      link.href,
                      pathname
                    )
                  }
                  className={linkIsActive(link.href, pathname, activeHref) ? "ring-2 ring-accent-dark/30" : undefined}
                >
                  {link.label}
                </Button>
              </li>
            ) : (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href, pathname)}
                  className={navLinkClass(link.href)}
                  aria-current={linkIsActive(link.href, pathname, activeHref) ? "page" : undefined}
                >
                  {link.label}
                </a>
              </li>
            )
          )}
        </ul>

        <button
          type="button"
          className="lg:hidden flex flex-col gap-1.5 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-expanded={isMobileOpen}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={cn(
              "block h-0.5 w-6 bg-text transition-all duration-300",
              isMobileOpen && "translate-y-2 rotate-45"
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-6 bg-text transition-all duration-300",
              isMobileOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block h-0.5 w-6 bg-text transition-all duration-300",
              isMobileOpen && "-translate-y-2 -rotate-45"
            )}
          />
        </button>
      </nav>

      <div
        className={cn(
          "lg:hidden fixed inset-0 top-[60px] bg-background/98 backdrop-blur-lg transition-all duration-500",
          isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <ul className="flex flex-col items-center gap-4 pt-12 px-6">
          {navLinks.map((link) => (
            <li key={link.label}>
              {link.isButton ? (
                <Button
                  href={link.href}
                  size="sm"
                  onClick={(e) => {
                    handleAnchorClick(
                      e as unknown as React.MouseEvent<HTMLAnchorElement>,
                      link.href,
                      pathname,
                      closeMobile
                    );
                  }}
                >
                  {link.label}
                </Button>
              ) : (
                <a
                  href={link.href}
                  className={navLinkClass(link.href, true)}
                  onClick={(e) => handleAnchorClick(e, link.href, pathname, closeMobile)}
                  aria-current={linkIsActive(link.href, pathname, activeHref) ? "page" : undefined}
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
