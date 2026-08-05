import { Button } from "@/components/ui/Button";
import { FadeIn, SectionHeading } from "@/components/ui/FadeIn";
import { services } from "@/lib/data/site";

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-background-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <SectionHeading title="Ways to Work With Kirstan" />
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:gap-10 max-w-3xl mx-auto">
          {services.map((service, index) => {
            const learnMoreHref =
              "learnMoreHref" in service && service.learnMoreHref
                ? service.learnMoreHref
                : `/services/${service.slug}`;

            return (
              <FadeIn key={service.id} delay={index * 100}>
                <article className="group flex flex-col h-full bg-background rounded-soft-lg p-8 md:p-10 shadow-card hover:shadow-soft-lg transition-all duration-500 hover:-translate-y-1">
                  <h3 className="font-serif text-xl md:text-2xl text-text mb-5">
                    {service.title}
                  </h3>
                  <div className="space-y-4 flex-grow">
                    {service.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="text-subtext text-sm md:text-base leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    {"ctaLabel" in service && service.ctaLabel ? (
                      <Button
                        href={service.ctaHref}
                        size="sm"
                        external={service.ctaHref.startsWith("http")}
                      >
                        {service.ctaLabel}
                      </Button>
                    ) : (
                      <>
                        {service.showLearnMore && (
                          <Button href={learnMoreHref} size="sm">
                            Learn More
                          </Button>
                        )}
                        {service.showBookSession && "bookSessionHref" in service && (
                          <Button
                            href={service.bookSessionHref}
                            size="sm"
                            external={service.bookSessionHref.startsWith("http")}
                          >
                            Book 1:1 Healing Session
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
