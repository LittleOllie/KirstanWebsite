import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { FadeIn } from "@/components/ui/FadeIn";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 bg-background min-h-screen">
      <div className="mx-auto max-w-md px-6 lg:px-8">
        <FadeIn>
          <p className="text-sm tracking-[0.2em] uppercase text-subtext">Admin</p>
          <h1 className="mt-3 font-serif text-3xl md:text-4xl text-text tracking-tight">
            Sign in
          </h1>
          <p className="mt-4 text-subtext leading-relaxed">
            Access the waitlist dashboard and exports.
          </p>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="mt-10 bg-background-secondary rounded-soft-lg p-8 shadow-card">
            <Suspense fallback={<p className="text-subtext text-sm">Loading…</p>}>
              <AdminLoginForm />
            </Suspense>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
