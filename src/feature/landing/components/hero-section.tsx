import { motion } from "motion/react";
import HeroImage from "@/assets/landing-hero.svg";
import { Button } from "@/components/ui/button";
import { HeartHandshakeIcon, UserRoundSearchIcon } from "lucide-react";
import useAuthStore from "@/zustand/auth-zustand";

const imageReveal = {
  initial: { opacity: 0, scale: 0.9, y: 30 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
};

export const HeroSection = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <section className="relative overflow-hidden mt-10 mb-10  bg-background">
      {/* Decorative background element for depth */}
      <div className="absolute top-0 right-0 -z-10 h-150 w-150 rounded-full bg-primary/5 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* LEFT COLUMN: The Hook (7/12) */}
        <motion.div
          className="lg:col-span-7 space-y-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Over 12,000 donors active today
          </div>

          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-foreground">
            Donate Blood. <br />
            <span className="text-primary italic">Save a Life.</span>
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
            Every drop matters. Connect with local patients in need and become
            the hero in someone's story. Fast, secure, and life-changing.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button variant={"outline"} className="px-16 py-3">
              <UserRoundSearchIcon className="size-4" />
              Find Donor
            </Button>
            {isAuthenticated ? (
              <Button>New Feature comming</Button>
            ) : (
              <Button className="px-16 py-3">
                <HeartHandshakeIcon className="size-4" /> Donate
              </Button>
            )}
          </div>
        </motion.div>

        {/* RIGHT COLUMN: The Visual (5/12) */}
        <motion.div
          className="lg:col-span-5 relative"
          initial="initial"
          animate="animate"
          variants={imageReveal}>
          {/* The Styled Image Container */}
          <div className="relative group">
            <div className="absolute -inset-4 rounded-4xl border-2 border-dashed border-primary/20 group-hover:border-primary/40 transition-colors duration-500" />

            <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-border bg-muted shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
              <img
                src={HeroImage}
                alt="Blood Donation Illustration"
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
              />

              {/* Subtle Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Floating Stat Card */}
            <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-2xl shadow-xl border border-border animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">85%</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">
                    Urgency
                  </p>
                  <p className="font-bold">AB+ Needed Now</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
