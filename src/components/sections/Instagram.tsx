import { Button } from "@/components/ui/Button";
import { FadeIn, SectionHeading } from "@/components/ui/FadeIn";
import { instagramPosts, siteConfig } from "@/lib/data/site";
import Image from "next/image";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Instagram() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeIn>
          <div className="text-center">
            <InstagramIcon className="w-8 h-8 mx-auto text-accent-dark mb-4" />
            <SectionHeading title="Follow Along" subtitle="@kirstanearl on Instagram" />
          </div>
        </FadeIn>

        {/* Grid — replace with API-driven feed when ready */}
        <FadeIn delay={200}>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {instagramPosts.map((post) => (
              <a
                key={post.id}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-soft overflow-hidden shadow-card hover:shadow-soft transition-all duration-500"
                aria-label={`View Instagram post: ${post.alt}`}
              >
                <Image
                  src={post.imageUrl}
                  alt={post.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-text/0 group-hover:bg-text/20 transition-colors duration-500 flex items-center justify-center">
                  <InstagramIcon className="w-6 h-6 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </a>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="mt-10 text-center">
            <Button href={siteConfig.instagram} external variant="outline" size="md">
              Follow on Instagram
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* Future Instagram API integration:
 * Replace instagramPosts with data from /api/instagram
 * Connect to Instagram Basic Display API or a service like Behold
 */
