import { FadeIn } from "@/components/ui/FadeIn";
import { thisWorkIsForYou } from "@/lib/data/site";

export function ThisWorkIsForYou() {
  return (
    <section id="for-you" className="py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <FadeIn>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-text tracking-tight text-center">
            You May Recognise Yourself Here…
          </h2>
        </FadeIn>

        <FadeIn delay={150}>
          <ul className="mt-12 space-y-5">
            {thisWorkIsForYou.map((item) => (
              <li key={item} className="flex gap-4 items-start">
                <span
                  className="mt-2.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"
                  aria-hidden="true"
                />
                <p className="text-subtext leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}
