import { Button } from "@/components/ui/Button";
import { aboutParagraphs, siteConfig } from "@/lib/data/site";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${siteConfig.name}'s healing journey and approach to intuitive wellness.`,
};

export default function AboutPage() {
  return (
    <article className="pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="relative aspect-[4/5] max-w-md mx-auto rounded-soft-lg overflow-hidden shadow-soft-lg mb-12">
          <Image
            src={siteConfig.images.portrait}
            alt="Kirstan Earl"
            fill
            className="object-cover object-[center_15%]"
            priority
            sizes="(max-width: 768px) 100vw, 448px"
          />
        </div>

        <h1 className="font-serif text-4xl md:text-5xl text-text tracking-tight">
          About Me
        </h1>

        <div className="mt-8 space-y-6 text-subtext leading-relaxed text-base md:text-lg">
          {aboutParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Button href="/#book" size="lg">
            Book a Connection Call
          </Button>
          <Button href="/" variant="outline" size="lg">
            Back to Home
          </Button>
        </div>
      </div>
    </article>
  );
}
