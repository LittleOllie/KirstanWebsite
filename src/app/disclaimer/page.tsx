import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { siteConfig } from "@/lib/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: `Disclaimer for ${siteConfig.name}'s healing and mentoring services.`,
};

export default function DisclaimerPage() {
  return (
    <LegalPageLayout title="Disclaimer">
      <p>
        The information and services provided by {siteConfig.name} are intended to support personal
        growth, self-awareness, healing, intuition, and emotional wellbeing.
      </p>
      <p>
        They are not a substitute for medical care, psychological support, counselling, therapy,
        diagnosis, or treatment from a qualified health professional.
      </p>
      <p>
        {siteConfig.name} does not diagnose, treat, cure, or prevent any medical, mental health, or
        psychological condition.
      </p>
      <p>
        If you are experiencing a medical or mental health concern, please seek support from a
        qualified healthcare provider.
      </p>
      <p>
        If you are in crisis or feel unsafe, please contact emergency services or a crisis support
        service in your area.
      </p>
      <p>
        Any guidance, reflections, intuitive insights, or healing support offered through sessions
        are complementary in nature and should be used at your own discretion.
      </p>
      <p>
        By engaging with this website or {siteConfig.name}&apos;s services, you acknowledge that you
        are responsible for your own wellbeing, choices, decisions, and actions.
      </p>
    </LegalPageLayout>
  );
}
