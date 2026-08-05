import { Logo } from "@/components/layout/Logo";
import { footerLinks, siteConfig } from "@/lib/data/site";
import Image from "next/image";
import Link from "next/link";

function ConnectLink({
  href,
  iconSrc,
  iconAlt,
  label,
  value,
  external = true,
  iconClassName,
}: {
  href: string;
  iconSrc: string;
  iconAlt: string;
  label: string;
  value: string;
  external?: boolean;
  iconClassName?: string;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex items-center gap-3 text-sm text-background/70 hover:text-background transition-colors duration-300"
      >
        <span
          className={`relative w-6 h-6 flex-shrink-0 overflow-hidden rounded-[6px] ${iconClassName ?? ""}`}
        >
          <Image src={iconSrc} alt={iconAlt} fill className="object-cover" sizes="24px" />
        </span>
        <span>
          {label}: {value}
        </span>
      </a>
    </li>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text text-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo variant="footer" />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg tracking-wide mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-lg tracking-wide mb-4">Services</h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg tracking-wide mb-4">Connect</h3>
            <ul className="space-y-3">
              <ConnectLink
                href={siteConfig.instagram}
                iconSrc="/images/icons/instagram.png"
                iconAlt="Instagram"
                label="Instagram"
                value={siteConfig.instagramHandle}
              />
              <ConnectLink
                href={siteConfig.substack}
                iconSrc="/images/icons/substack.png"
                iconAlt="Substack"
                label="Substack"
                value={siteConfig.substackHandle}
              />
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-center gap-3 text-sm text-background/70 hover:text-background transition-colors duration-300"
                >
                  <span
                    className="relative flex h-6 w-6 flex-shrink-0 items-center justify-center overflow-hidden rounded-[6px] bg-accent"
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5 text-text"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </span>
                  <span>
                    Email: {siteConfig.email}
                  </span>
                </a>
              </li>
              <li>
                <span className="text-sm text-background/70 pl-9">{siteConfig.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/50">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-background/50 hover:text-background/80 transition-colors duration-300 text-center"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
