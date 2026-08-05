import { services, siteConfig } from "@/lib/data/site";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services
    .filter((service) => !("learnMoreHref" in service && service.learnMoreHref))
    .map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: service.title,
    description: service.paragraphs.join(" "),
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) notFound();

  return (
    <article className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <p className="text-sm tracking-[0.2em] uppercase text-subtext mb-4">
          {siteConfig.name}
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-text tracking-tight">
          {service.title}
        </h1>
        <div className="mt-8 space-y-6">
          {service.paragraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="text-subtext leading-relaxed text-base md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Button href="/#book" size="lg">
            Book a Session
          </Button>
          <Button href="/#services" variant="outline" size="lg">
            View All Services
          </Button>
        </div>
      </div>
    </article>
  );
}
