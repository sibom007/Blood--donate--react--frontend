
import { HeroSection } from "@/feature/landing/components/hero-section";
import { ImpactSection } from "@/feature/landing/components/impact-section";
import { RequestBlood } from "@/feature/landing/components/request-blood";

import { Testimonials } from "@/feature/landing/components/testimonials";
import { WhyDonate } from "@/feature/landing/components/why-donate";



function LandingPage() {
  return (
    <div className="">
      <HeroSection />
      <WhyDonate />
      <ImpactSection />
      <RequestBlood />
      <Testimonials />
    </div>
  );
}

export default LandingPage;
