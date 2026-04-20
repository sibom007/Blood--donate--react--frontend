import { Cta } from "@/feature/landing/components/cta";
import { StatusSection } from "@/feature/landing/components/status-section";
import { HeroSection } from "@/feature/landing/components/hero-section";
import { Footer } from "@/feature/shared/footer";
import { RequestForBlood } from "@/feature/landing/components/request-for-blood";

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* --- HERO SECTION --- */}
      <HeroSection />

      {/* --- Status SECTION --- */}
      <StatusSection />

      {/* --- REQUEST FOR BLOOD (Placeholder) --- */}
      <RequestForBlood />

      {/* --- CTA SECTION --- */}
      <Cta />

      {/* --- FOOTER SECTION --- */}
      <Footer />
    </div>
  );
}

export default LandingPage;
