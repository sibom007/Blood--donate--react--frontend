"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-linear-to-br from-background via-background to-accent/5 pt-20 overflow-hidden relative">
      {/* Animated background elements */}
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 4, repeat: 5 }}
        className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [30, 0, 30] }}
        transition={{ duration: 5, repeat: 5 }}
        className="absolute bottom-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div variants={itemVariants} className="mb-6">
          <div className="inline-flex items-center justify-center gap-2 bg-accent/20 text-muted-foreground px-4 py-2 rounded-full text-sm font-semibold">
            <Heart className="w-4 h-4" />
            Save Lives Today
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
          Donate Blood,{" "}
          <span className="text-primary bg-linear-to-r from-primary to-accent bg-clip-text">
            Save Lives
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto text-balance">
          One donation can save up to 3 lives. Join our community of heroes who
          believe in the power of giving.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base">
              Start Donating
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-background font-bold text-base">
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 mt-16 pt-12 border-t border-border">
          {[
            { number: "50K+", label: "Lives Saved" },
            { number: "25K+", label: "Active Donors" },
            { number: "100+", label: "Blood Banks" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-card border border-border rounded-lg p-4">
              <div className="text-2xl sm:text-3xl font-bold text-primary">
                {stat.number}
              </div>
              <div className="text-sm text-foreground/60 mt-2">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
