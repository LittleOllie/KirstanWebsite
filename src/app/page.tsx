import { FinalInvitation } from "@/components/sections/FinalInvitation";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { SignatureMethodology } from "@/components/sections/SignatureMethodology";
import { Statement } from "@/components/sections/Statement";
import { Testimonials } from "@/components/sections/Testimonials";
import { ThisWorkIsForYou } from "@/components/sections/ThisWorkIsForYou";
import { Transformation } from "@/components/sections/Transformation";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <ThisWorkIsForYou />
      <Transformation />
      <SignatureMethodology />
      <Services />
      <Testimonials />
      <FinalInvitation />
      {/* About section hidden for now — restore <About /> when ready to edit */}
    </>
  );
}
