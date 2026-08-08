import { FadeIn } from "@/components/ui/FadeIn";
import { siteConfig } from "@/lib/data/site";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact",
  description: `Beyond the Session — reflections and writing from ${siteConfig.name}.`,
};

export default function ContactPage() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-background min-h-[70vh]">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <FadeIn>
          <div className="text-left">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-text tracking-tight">
              Beyond the Session
            </h1>
            <p className="mt-5 text-subtext text-base md:text-lg leading-relaxed">
              Stay up to date with Kirstan
            </p>

            <div className="mt-10 space-y-8">
              <div className="flex gap-4 items-start">
                <a
                  href={siteConfig.substack}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-0.5 h-10 w-10 flex-shrink-0 overflow-hidden rounded-soft"
                  aria-label="Substack"
                >
                  <Image
                    src="/images/icons/substack.png"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </a>
                <p className="text-subtext text-base md:text-lg leading-relaxed">
                  Read my Substack:{" "}
                  <a
                    href={siteConfig.substack}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text underline-offset-4 hover:underline"
                  >
                    Let There Be Light
                  </a>{" "}
                  where I share personal reflections and stories of healing, intuition,
                  identity and the ordinary moments that quietly change us.
                </p>
              </div>

              <div className="flex gap-4 items-start">
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-0.5 h-10 w-10 flex-shrink-0 overflow-hidden rounded-soft"
                  aria-label="Instagram"
                >
                  <Image
                    src="/images/icons/instagram.png"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </a>
                <p className="text-subtext text-base md:text-lg leading-relaxed">
                  Follow along on{" "}
                  <a
                    href={siteConfig.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text underline-offset-4 hover:underline"
                  >
                    Instagram
                  </a>{" "}
                  for updates and behind-the-scenes glimpses of my life, healing and what
                  I&apos;m learning along the way.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 md:mt-20 pt-12 border-t border-accent/20 text-left">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-text tracking-tight">
              Let&apos;s Connect
            </h2>
            <div className="mt-4 space-y-1 text-subtext text-base md:text-lg leading-relaxed">
              <p>Have a question about working together or one of my offerings?</p>
              <p>I&apos;d love to hear from you.</p>
            </div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-8 inline-flex items-center gap-3 text-subtext hover:text-text transition-colors duration-300"
            >
              <span
                className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-soft bg-accent"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 text-text"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </svg>
              </span>
              <span className="text-base md:text-lg">{siteConfig.email}</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
