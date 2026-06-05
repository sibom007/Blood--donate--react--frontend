"use client";
import { motion } from "framer-motion";
import { Heart, Zap, Globe, Shield } from "lucide-react";

export function WhyDonate() {
  const benefits = [
    {
      icon: Heart,
      title: "Save Lives",
      description:
        "Every pint of blood you donate can save up to 3 lives during emergencies and medical procedures.",
    },
    {
      icon: Zap,
      title: "Health Benefits",
      description:
        "Regular blood donation helps reduce iron levels and improves cardiovascular health.",
    },
    {
      icon: Globe,
      title: "Community Impact",
      description:
        "Be part of a global movement making a difference in millions of lives worldwide.",
    },
    {
      icon: Shield,
      title: "Free Health Check",
      description:
        "Get a free mini physical exam including blood pressure, iron levels, and more.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="why-donate"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-10 left-5 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            Why Donate Blood?
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto text-balance">
            Discover the incredible benefits of becoming a blood donor and
            making a real difference
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer group">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="mb-4 inline-block">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                </motion.div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
