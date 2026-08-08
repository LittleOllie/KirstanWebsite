import { FadeIn } from "@/components/ui/FadeIn";
import { heroStatement, siteConfig } from "@/lib/data/site";

export function Statement() {
  return (
    <section
      id="statement"
      className="relative py-24 md:py-32 lg:py-36 bg-background-secondary border-y border-accent/25"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <FadeIn>
          <blockquote className="relative text-center">
            <div
              className="text-accent/40 font-serif text-7xl md:text-8xl leading-none select-none mb-2"
              aria-hidden="true"
            >
              &ldquo;
            </div>

            <p className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.35rem] leading-snug md:leading-snug text-text tracking-tight italic whitespace-pre-line -mt-6 md:-mt-8 px-2">
              {heroStatement}
            </p>

            <div
              className="mx-auto mt-5 w-12 h-px bg-accent/50"
              aria-hidden="true"
            />

            <footer className="mt-4">
              <cite className="not-italic font-serif text-base md:text-lg text-text tracking-[0.2em] uppercase">
                — {siteConfig.name}
              </cite>
            </footer>
          </blockquote>
        </FadeIn>
      </div>
    </section>
  );
}
