import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { legalContactEmail } from "@/lib/data/legal";
import { siteConfig } from "@/lib/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}. How we collect, use and protect your personal information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy">
      <p>
        {siteConfig.name} respects your privacy and is committed to protecting your personal
        information.
      </p>
      <p>
        This Privacy Policy explains how personal information is collected, used and stored when
        you visit this website, make an enquiry, book a session, or interact with{" "}
        {siteConfig.name}&apos;s services.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We may collect personal information including your name, email address, phone number,
        booking details, enquiry details, and any information you choose to share through contact
        forms, booking forms, email, or session-related communication.
      </p>
      <p>
        We may also collect basic website usage information such as pages visited, browser type,
        device information, and general analytics data.
      </p>

      <h2>How Your Information Is Used</h2>
      <p>Your information may be used to:</p>
      <ul>
        <li>Respond to enquiries</li>
        <li>Manage bookings and appointments</li>
        <li>Provide healing, mentoring, or related services</li>
        <li>Send relevant communication about your booking or enquiry</li>
        <li>Improve the website and client experience</li>
        <li>Meet legal or administrative obligations</li>
      </ul>
      <p>
        Your personal information will not be sold or shared with third parties for marketing
        purposes.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        This website may use third-party services such as booking platforms, email providers,
        analytics tools, or payment processors. These third parties may collect and process personal
        information in accordance with their own privacy policies.
      </p>

      <h2>Data Storage and Security</h2>
      <p>
        Reasonable steps are taken to protect personal information from misuse, loss, unauthorised
        access, modification, or disclosure.
      </p>
      <p>
        However, no method of online transmission or electronic storage is completely secure, and
        absolute security cannot be guaranteed.
      </p>

      <h2>Accessing or Updating Your Information</h2>
      <p>
        You may request access to your personal information or ask for it to be corrected by
        contacting {siteConfig.name}.
      </p>

      <h2>Contact</h2>
      <p>For privacy-related questions, please contact:</p>
      <p>
        Email:{" "}
        <a href={`mailto:${legalContactEmail}`}>{legalContactEmail}</a>
      </p>
    </LegalPageLayout>
  );
}
