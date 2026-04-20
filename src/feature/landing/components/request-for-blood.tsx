import { motion } from "motion/react";
import { MoveRightIcon } from "lucide-react";
import { Link } from "react-router";

import BloodDonate from "@/assets/RequestForBlood.svg";
import { Button } from "@/components/ui/button";

export const RequestForBlood = () => {
  return (
    <section className="py-20 px-6 lg:px-8 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Column: Animated Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative flex justify-center items-center">
            <div className="absolute -inset-4 rounded-4xl border-2 border-dashed border-primary/20 group-hover:border-primary/40 transition-colors duration-500" />

            <div className="relative w-full overflow-hidden rounded-3xl border border-border bg-muted shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
              <img
                src={BloodDonate}
                alt="Blood Donation Illustration"
                className="w-full h-full max-w-125 object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
              />

              {/* Subtle Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>

          {/* Right Column: Typography & Action */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex flex-col space-y-6 text-center lg:text-left items-center lg:items-start">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-[1.1]">
              Need Blood <span className="text-destructive">Urgently?</span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Life is precious, and every second counts. Our automated network
              instantly connects you with compatible donors in your immediate
              vicinity. <strong>Help is just a click away.</strong>
            </p>

            {/* Features List */}
            <ul className="space-y-3 text-left">
              {[
                "Real-time donor notifications",
                "Location-based matching",
                "Verified emergency requests",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-3 text-muted-foreground">
                  <div className="h-2 w-2 rounded-full bg-destructive" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}>
                <Button variant={"destructive"} className="px-6 py-5" asChild>
                  <Link
                    to="/request-blood"
                    className="group inline-flex items-center justify-center gap-3     transition-all ">
                    Post a Request
                    <MoveRightIcon
                      className="transition-transform group-hover:translate-x-2"
                      size={22}
                    />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
