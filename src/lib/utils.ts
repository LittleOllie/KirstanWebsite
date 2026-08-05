export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function scrollToSection(id: string, offset = 120): void {
  const element = document.getElementById(id.replace("#", ""));
  if (!element) return;

  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export function isAnchorHref(href: string): boolean {
  return href.startsWith("#") || href.includes("#");
}

export function getAnchorId(href: string): string | null {
  if (!href.includes("#")) return null;
  const match = href.match(/#(.+)$/);
  return match ? match[1] : null;
}

export function isInternalPageHref(href: string): boolean {
  return href.startsWith("/") && !href.includes("#");
}
