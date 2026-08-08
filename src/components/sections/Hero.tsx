import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/data/site";
import Image from "next/image";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 md:pt-28 bg-background"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-20 -left-32 w-[400px] h-[400px] rounded-full bg-accent-2/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-background-secondary/50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-8rem)]">
          <div className="order-1 text-center lg:text-left">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[2.65rem] xl:text-[2.85rem] leading-tight text-text tracking-tight animate-fade-in-up animate-delay-100 [font-family:var(--font-cormorant),'Cormorant_Garamond',serif]">
              Guiding women through
              <br />
              deep healing to remember
              <br />
              who they truly are
            </h1>
            <p className="mt-6 text-subtext text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 animate-fade-in-up animate-delay-200">
              A grounded and compassionate space to uncover and heal the root causes beneath the patterns, beliefs and emotional wounds that keep you feeling stuck, so you can trust your inner wisdom, live authentically and experience true freedom.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animate-delay-300">
              <Button href={siteConfig.freeConnectionCallUrl} size="lg" external>
                Book a FREE Connection Call
              </Button>
            </div>
          </div>

          <div className="relative order-2 animate-fade-in-up">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-none rounded-soft-lg overflow-hidden shadow-soft-lg">
              <Image
                src={siteConfig.images.portrait}
                alt="Kirstan Earl — Multidimensional Healer"
                fill
                className="object-cover object-[center_15%]"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-text/10 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
