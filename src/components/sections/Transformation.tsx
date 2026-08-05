import { FadeIn } from "@/components/ui/FadeIn";
import { transformationContent } from "@/lib/data/site";

export function Transformation() {
  return (
    <section id="transformation" className="py-24 md:py-32 lg:py-40 bg-background-secondary">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-serif text-[clamp(0.8rem,3.2vw,1.75rem)] md:text-[clamp(1.1rem,2.4vw,1.875rem)] text-text tracking-[0.1em] uppercase text-center whitespace-nowrap">
            {transformationContent.heading}
          </h2>
        </FadeIn>

        <FadeIn delay={150}>
          <ul className="mt-12 space-y-4">
            {transformationContent.feelings.map((item) => (
              <li key={item} className="flex gap-4 items-start">
                <span
                  className="mt-2.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"
                  aria-hidden="true"
                />
                <p className="text-subtext leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>

          <div className="mt-14 space-y-5 text-center">
            {transformationContent.closing.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-subtext leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
