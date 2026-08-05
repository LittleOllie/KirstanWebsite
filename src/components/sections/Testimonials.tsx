"use client";

import { FadeIn, SectionHeading } from "@/components/ui/FadeIn";
import { testimonials } from "@/lib/data/site";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setCurrent((index + testimonials.length) % testimonials.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 10000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <SectionHeading title="Client Love" />
        </FadeIn>

        <FadeIn delay={200}>
          <div
            className="mt-16 relative max-w-3xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            {/* Carousel */}
            <div className="overflow-hidden rounded-soft-lg">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <article
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-2"
                    aria-hidden={testimonials[current].id !== testimonial.id}
                  >
                    <div className="bg-background-secondary rounded-soft-lg p-10 md:p-14 shadow-card text-center">
                      <div className="text-accent text-4xl font-serif leading-none mb-6">&ldquo;</div>
                      <p className="text-text text-base md:text-lg leading-relaxed italic">
                        {testimonial.review}
                      </p>
                      <footer className="mt-8">
                        <p className="font-serif text-lg text-text">{testimonial.name}</p>
                      </footer>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Arrows */}
            <button
              type="button"
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 w-10 h-10 rounded-full bg-background shadow-card flex items-center justify-center text-text hover:bg-accent/20 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Previous testimonial"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 w-10 h-10 rounded-full bg-background shadow-card flex items-center justify-center text-text hover:bg-accent/20 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Next testimonial"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex flex-wrap justify-center gap-2 mt-8 max-w-md mx-auto" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  type="button"
                  role="tab"
                  aria-selected={index === current}
                  aria-label={`Go to testimonial ${index + 1}`}
                  onClick={() => goTo(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                    index === current ? "bg-accent w-6" : "bg-accent/30 hover:bg-accent/50"
                  )}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
