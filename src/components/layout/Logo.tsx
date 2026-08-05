import { siteConfig } from "@/lib/data/site";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface LogoProps {
  className?: string;
  variant?: "default" | "footer";
}

export function Logo({ className, variant = "default" }: LogoProps) {
  const isFooter = variant === "footer";

  return (
    <Link
      href="/"
      className={cn("group inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm", className)}
      aria-label={`${siteConfig.name} — Home`}
    >
      {/* Replace this block with <Image> when logo file is ready */}
      <div className="flex flex-col">
        <span
          className={cn(
            "font-serif tracking-[0.15em] uppercase transition-colors duration-300",
            isFooter ? "text-lg text-background" : "text-base md:text-lg text-text group-hover:text-accent-dark"
          )}
        >
          Kirstan Earl
        </span>
        <span
          className={cn(
            "text-[0.6rem] md:text-[0.65rem] tracking-[0.25em] uppercase mt-0.5",
            isFooter ? "text-background/70" : "text-subtext"
          )}
        >
          Multidimensional Healer
        </span>
      </div>
    </Link>
  );
}

/* Future logo replacement example:
<Image
  src="/images/logo.svg"
  alt={siteConfig.name}
  width={180}
  height={48}
  priority
/>
*/
