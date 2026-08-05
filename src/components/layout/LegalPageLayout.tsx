import { legalLastUpdated } from "@/lib/data/legal";
import type { ReactNode } from "react";

interface LegalPageLayoutProps {
  title: string;
  children: ReactNode;
}

export function LegalPageLayout({ title, children }: LegalPageLayoutProps) {
  return (
    <article className="min-h-screen bg-background pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-[800px] px-6 lg:px-8">
        <header className="mb-10 md:mb-14 border-b border-accent/25 pb-8">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-text tracking-tight">
            {title}
          </h1>
          <p className="mt-4 text-sm text-subtext tracking-wide">
            Last updated: {legalLastUpdated}
          </p>
        </header>

        <div className="legal-content space-y-6 text-subtext text-base md:text-[1.05rem] leading-relaxed [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-text [&_h2]:tracking-tight [&_h2]:pt-6 [&_h2]:pb-1 [&_h2:first-of-type]:pt-0 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-accent-dark [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-text [&_strong]:text-text">
          {children}
        </div>
      </div>
    </article>
  );
}
