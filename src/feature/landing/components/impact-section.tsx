"use client";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp } from "lucide-react";

export function ImpactSection() {
  const impacts = [
    {
      label: "Blood Units Collected",
      value: "250K+",
      growth: "+15%",
      color: "from-primary to-accent",
    },
    {
      label: "Emergency Responses",
      value: "12K+",
      growth: "+22%",
      color: "from-accent to-primary",
    },
    {
      label: "Hospitals Supported",
      value: "150+",
      growth: "+18%",
      color: "from-primary/80 to-accent/80",
    },
    {
      label: "Years of Service",
      value: "25+",
      growth: "+1 Year",
      color: "from-accent/70 to-primary/70",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="impact"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background to-accent/5 relative overflow-hidden">
      <motion.div
        animate={{ y: [20, 0, 20] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-10 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <BarChart3 className="w-4 h-4" />
            Our Impact
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            Making a Real Difference
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto text-balance">
            See the measurable impact we&apos;ve made together through the
            generosity of our donors
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impacts.map((impact, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(0,0,0,0.08)" }}
              className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-all group cursor-pointer">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br ${impact.color} opacity-20 group-hover:opacity-30 transition-opacity`}>
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full group-hover:bg-primary/20 transition-colors">
                  {impact.growth}
                </div>
              </div>

              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                {impact.value}
              </motion.h3>
              <p className="text-foreground/70 text-sm font-medium">
                {impact.label}
              </p>

              {/* Progress bar animation */}
              <motion.div className="mt-6 h-1 bg-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className={`h-full bg-linear-to-r ${impact.color}`}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
