import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import { FadeIn, SectionHeading } from "@/components/ui/FadeIn";
import { healingRoomContent } from "@/lib/data/healing-room";
import { waitlistConfig } from "@/lib/waitlist/survey";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Healing Room",
  description: waitlistConfig.description,
};

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-4 items-start">
          <span
            className="mt-2.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"
            aria-hidden="true"
          />
          <p className="text-subtext leading-relaxed">{item}</p>
        </li>
      ))}
    </ul>
  );
}

export default function WaitlistPage() {
  const content = healingRoomContent;

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-background">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <FadeIn>
          <SectionHeading title={waitlistConfig.title} />
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mt-12 space-y-6 text-subtext leading-relaxed">
            {content.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10">
            <h3 className="font-serif text-xl md:text-2xl text-text tracking-tight">
              {content.opportunityHeading}
            </h3>
            <BulletList items={content.opportunities} />
          </div>

          <div className="mt-10 space-y-6 text-subtext leading-relaxed">
            {content.middle.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10">
            <h3 className="font-serif text-xl md:text-2xl text-text tracking-tight">
              {content.beginHeading}
            </h3>
            <BulletList items={content.beginItems} />
          </div>

          <p className="mt-10 text-subtext leading-relaxed">{content.closing}</p>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            <div className="bg-background-secondary rounded-soft-lg p-6 md:p-8">
              <h3 className="font-serif text-xl text-text tracking-tight">
                {content.foundingMembership.title}
              </h3>
              <p className="mt-2 text-text font-medium">{content.foundingMembership.price}</p>
              <BulletList items={content.foundingMembership.items} />
            </div>
            <div className="bg-background-secondary rounded-soft-lg p-6 md:p-8">
              <h3 className="font-serif text-xl text-text tracking-tight">
                {content.oneOff.title}
              </h3>
              <p className="mt-2 text-text font-medium">{content.oneOff.price}</p>
              <p className="mt-4 text-subtext leading-relaxed">{content.oneOff.description}</p>
            </div>
          </div>

          <div className="mt-8 space-y-3 text-subtext leading-relaxed">
            {content.notes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="mt-16 md:mt-20">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-text tracking-tight text-center mb-10">
              {waitlistConfig.subtitle}
            </h2>
            <WaitlistForm />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
