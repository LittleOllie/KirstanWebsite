import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { finalInvitation, siteConfig } from "@/lib/data/site";

export function FinalInvitation() {
  return (
    <section id="book" className="py-24 md:py-32 bg-background-secondary">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
        <FadeIn>
          <p className="text-sm tracking-[0.2em] uppercase text-subtext">
            {finalInvitation.title}
          </p>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl text-text tracking-tight">
            {finalInvitation.heading}
          </h2>
          <div className="mt-6 space-y-4">
            {finalInvitation.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-subtext text-base md:text-lg leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mt-4 text-subtext leading-relaxed italic">
            {finalInvitation.details}
          </p>
          <p className="mt-2 text-sm text-subtext/80">{finalInvitation.duration}</p>
          <div className="mt-8">
            <Button href={siteConfig.freeConnectionCallUrl} size="lg" external>
              Book Your Free Call
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
