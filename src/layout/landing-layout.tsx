import { Footer } from "@/feature/landing/components/footer";
import { Navigation } from "@/feature/landing/components/navigation";

function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}

export default LandingLayout;
