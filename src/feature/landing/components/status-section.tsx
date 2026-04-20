import { HeartIcon, MapPinIcon, UsersIcon } from "lucide-react";
import { motion } from "motion/react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }, // Custom ease-out
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const StatusSection = () => {
  return (
    <section className="py-28 bg-muted relative">
      <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center mask-[linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }} // Animate when 30% visible
          variants={staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              label: "Active Donors",
              value: "12K+",
              icon: UsersIcon,
              delay: 0,
            },
            {
              label: "Lives Saved",
              value: "30K+",
              icon: HeartIcon,
              delay: 0.15,
            },
            {
              label: "Blood Camps",
              value: "150+",
              icon: MapPinIcon,
              delay: 0.3,
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              custom={stat.delay} // Use custom delay logic if needed
              className="bg-card p-12 rounded-3xl border border-border transition-all hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 group text-center flex flex-col items-center gap-6 shadow-sm">
              <div className="p-5 rounded-full bg-primary/5 group-hover:bg-primary/10 border border-primary/10 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <stat.icon
                  className="w-10 h-10 text-primary"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-6xl font-extrabold tracking-tighter text-foreground">
                {stat.value}
              </h3>
              <p className="text-muted-foreground font-semibold text-xl tracking-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
