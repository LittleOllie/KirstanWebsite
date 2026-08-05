import { FadeIn, SectionHeading } from "@/components/ui/FadeIn";
import { signatureMethodology } from "@/lib/data/site";

export function SignatureMethodology() {
  return (
    <section id="methodology" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <FadeIn>
          <SectionHeading title="My Signature Methodology" />
        </FadeIn>

        <FadeIn delay={150}>
          <div className="mt-12 space-y-6 text-subtext leading-relaxed">
            {signatureMethodology.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
