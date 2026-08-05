import { ContactForm } from "@/components/contact/ContactForm";
import { FadeIn, SectionHeading } from "@/components/ui/FadeIn";
import { contactConfig } from "@/lib/contact/survey";
import { siteConfig } from "@/lib/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: contactConfig.description,
};

export default function ContactPage() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-background">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <FadeIn>
          <SectionHeading title={contactConfig.title} subtitle={contactConfig.subtitle} />
          <p className="mt-4 text-subtext text-base md:text-lg max-w-2xl leading-relaxed mx-auto text-center">
            {contactConfig.description}
          </p>
          <p className="mt-6 text-center text-subtext text-sm">
            You can also email{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-text underline-offset-4 hover:underline"
            >
              {siteConfig.email}
            </a>
          </p>
        </FadeIn>
        <FadeIn delay={150}>
          <div className="mt-12">
            <ContactForm />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
