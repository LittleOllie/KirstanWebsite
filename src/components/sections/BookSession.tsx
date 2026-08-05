"use client";

import { FadeIn, SectionHeading } from "@/components/ui/FadeIn";
import { bookingOptions, siteConfig } from "@/lib/data/site";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface BookSessionProps {
  embedded?: boolean;
}

export function BookSession({ embedded = false }: BookSessionProps) {
  const [activeTab, setActiveTab] = useState<string>(bookingOptions[0].id);

  const activeOption = bookingOptions.find((o) => o.id === activeTab) ?? bookingOptions[0];
  const calendlyEmbedUrl = `${siteConfig.calendlyUrl}${activeOption.calendlyPath}?embed=true&hide_gdpr_banner=1&background_color=f7f4ef&text_color=333333&primary_color=b7c1b2`;

  const content = (
    <>
      {!embedded && (
        <FadeIn>
          <SectionHeading
            title="Book A Session"
            subtitle="Choose the session that's right for you and select a time that works."
          />
        </FadeIn>
      )}

      <FadeIn delay={embedded ? 0 : 200}>
        <div
          className={cn(
            "flex flex-col sm:flex-row gap-3 justify-center",
            !embedded && "mt-12"
          )}
          role="tablist"
          aria-label="Session types"
        >
          {bookingOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              role="tab"
              aria-selected={activeTab === option.id}
              onClick={() => setActiveTab(option.id)}
              className={cn(
                "px-6 py-4 rounded-soft text-left sm:text-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                activeTab === option.id
                  ? "bg-accent text-text shadow-card"
                  : "bg-background text-subtext hover:bg-accent/15"
              )}
            >
              <span className="block font-serif text-lg">{option.label}</span>
              <span className="block text-xs mt-1 opacity-80">{option.description}</span>
            </button>
          ))}
        </div>

        <div className="mt-10 bg-background rounded-soft-lg shadow-card overflow-hidden">
          <iframe
            key={activeTab}
            src={calendlyEmbedUrl}
            title={`Book a ${activeOption.label} with Kirstan Earl`}
            className="w-full border-0"
            style={{ minHeight: "700px" }}
            loading="lazy"
          />
        </div>

        {!embedded && (
          <p className="mt-6 text-center text-xs text-subtext/70">
            Replace calendlyUrl in site config with your actual Calendly link when ready.
          </p>
        )}
      </FadeIn>
    </>
  );

  if (embedded) {
    return (
      <div className="mx-auto max-w-7xl px-6 lg:px-8 bg-background-secondary py-12 md:py-16 rounded-soft-lg">
        {content}
      </div>
    );
  }

  return (
    <section id="book" className="py-24 md:py-32 bg-background-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">{content}</div>
    </section>
  );
}
