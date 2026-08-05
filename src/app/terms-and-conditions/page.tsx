import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import {
  cancellationNoticeHours,
  legalContactEmail,
} from "@/lib/data/legal";
import { siteConfig } from "@/lib/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and Conditions for using ${siteConfig.name}'s website and services.`,
};

export default function TermsAndConditionsPage() {
  return (
    <LegalPageLayout title="Terms & Conditions">
      <p>
        By using this website, booking a session, or engaging with {siteConfig.name}&apos;s
        services, you agree to the following Terms &amp; Conditions.
      </p>

      <h2>General Information</h2>
      <p>
        The information provided on this website is for general educational, personal development,
        healing, and wellbeing purposes only.
      </p>
      <p>
        It is not intended to replace medical, psychological, legal, financial, or professional
        advice.
      </p>

      <h2>Services</h2>
      <p>
        {siteConfig.name} provides healing, mentoring, intuitive, and personal development services
        designed to support self-awareness, emotional wellbeing, personal growth, and reconnection
        with self.
      </p>
      <p>
        These services are complementary in nature and are not intended to diagnose, treat, cure, or
        prevent any medical, mental health, or psychological condition.
      </p>

      <h2>Personal Responsibility</h2>
      <p>
        By engaging with these services, you acknowledge that you are responsible for your own
        choices, decisions, actions, and wellbeing.
      </p>
      <p>
        Any insights, guidance, or reflections offered during sessions are intended to support your
        personal growth, but you remain responsible for how you choose to interpret and apply them.
      </p>

      <h2>Results Disclaimer</h2>
      <p>
        Every person&apos;s experience is unique. No specific results, outcomes, or transformations
        are guaranteed.
      </p>
      <p>
        Testimonials or client experiences shared on this website are individual experiences and do
        not guarantee the same or similar results for others.
      </p>

      <h2>Bookings, Payments and Cancellations</h2>
      <p>Booking and payment details will be provided at the time of booking.</p>
      <p>
        If you need to cancel or reschedule a session, please provide at least{" "}
        {cancellationNoticeHours} hours notice.
      </p>
      <p>
        Late cancellations or missed appointments may result in the session fee being forfeited.
      </p>

      <h2>Website Content</h2>
      <p>
        All content on this website, including text, imagery, branding, design, and written
        materials, belongs to {siteConfig.name} unless otherwise stated.
      </p>
      <p>
        You may not copy, reproduce, distribute, or use website content without written permission.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, {siteConfig.name} is not liable for any direct,
        indirect, incidental, or consequential loss or damage arising from the use of this website,
        services, or any information provided.
      </p>

      <h2>Contact</h2>
      <p>For questions about these Terms &amp; Conditions, please contact:</p>
      <p>
        Email:{" "}
        <a href={`mailto:${legalContactEmail}`}>{legalContactEmail}</a>
      </p>
    </LegalPageLayout>
  );
}
