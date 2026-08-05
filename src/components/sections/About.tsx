import { FadeIn } from "@/components/ui/FadeIn";
import { aboutParagraphs, siteConfig } from "@/lib/data/site";
import Image from "next/image";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <FadeIn className="lg:col-span-4 lg:sticky lg:top-32">
            <div className="relative aspect-[4/5] max-w-[21rem] mx-auto lg:max-w-none rounded-soft-lg overflow-hidden shadow-soft-lg">
              <Image
                src={siteConfig.images.portrait}
                alt="Kirstan Earl — Multidimensional Healer"
                fill
                className="object-cover object-[center_15%]"
                loading="lazy"
                sizes="(max-width: 1024px) 336px, 33vw"
              />
            </div>
          </FadeIn>

          <FadeIn delay={200} className="lg:col-span-8">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-text tracking-tight">
              About Me
            </h2>
            <div className="mt-8 space-y-5 text-subtext leading-relaxed">
              {aboutParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
