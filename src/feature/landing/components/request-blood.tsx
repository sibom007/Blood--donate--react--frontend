"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertCircle, Droplets } from "lucide-react";
import { useState } from "react";

export function RequestBlood() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const bloodTypes = [
    { type: "O+", desc: "Universal Donor", available: "450 units" },
    { type: "O-", desc: "Emergency Supply", available: "320 units" },
    { type: "A+", desc: "Most Common", available: "380 units" },
    { type: "B+", desc: "High Demand", available: "290 units" },
    { type: "AB+", desc: "Universal Recipient", available: "180 units" },
    { type: "B-", desc: "Special Need", available: "150 units" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="request"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      <motion.div
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Droplets className="w-4 h-4" />
            Need Blood?
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            Request Blood Now
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto text-balance">
            Urgent blood requests for hospitals and patients in need
          </p>
        </motion.div>

        {/* Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-12 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-accent mb-1">
              Emergency Support Available
            </h3>
            <p className="text-sm text-foreground/70">
              If you need urgent blood, contact our emergency hotline:{" "}
              <span className="font-bold text-accent">1-800-BLOOD-911</span>
            </p>
          </div>
        </motion.div>

        {/* Blood Types Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {bloodTypes.map((blood, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onClick={() => setSelectedType(blood.type)}
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                selectedType === blood.type
                  ? "bg-primary/10 border-primary"
                  : "bg-card border-border hover:border-primary/50"
              }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-3xl font-bold text-foreground">
                  {blood.type}
                </h3>
                <motion.div
                  animate={
                    selectedType === blood.type ? { scale: [1, 1.1, 1] } : {}
                  }
                  transition={{ duration: 0.6 }}
                  className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Droplets className="w-4 h-4 text-primary" />
                </motion.div>
              </div>
              <p className="text-sm font-semibold text-foreground mb-2">
                {blood.desc}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground/60">Available:</span>
                <span className="text-sm font-bold text-primary">
                  {blood.available}
                </span>
              </div>

              {/* Selection indicator */}
              {selectedType === blood.type && (
                <motion.div
                  layoutId="selector"
                  className="mt-4 pt-4 border-t border-primary/30">
                  <p className="text-xs text-primary font-semibold">
                    Selected for request
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Request Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-card border border-border rounded-lg p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-6">
            Submit Blood Request
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Hospital Name
              </label>
              <input
                type="text"
                placeholder="Enter hospital name"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Contact Number
              </label>
              <input
                type="tel"
                placeholder="Enter contact number"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Urgency Level
              </label>
              <select className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Critical (Within 2 hours)</option>
                <option>High (Within 6 hours)</option>
                <option>Normal (Within 24 hours)</option>
              </select>
            </div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pt-2">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                Submit Request
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
