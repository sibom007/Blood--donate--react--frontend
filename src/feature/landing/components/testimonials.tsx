"use client";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Nurse, City Hospital",
      image: "👩‍⚕️",
      content:
        "The blood donation program has been a lifesaver for our patients. The consistent supply of safe, screened blood has made a tremendous difference in our emergency response capabilities.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Regular Donor",
      image: "👨",
      content:
        "I started donating blood five years ago, and it&apos;s one of the most rewarding experiences of my life. Knowing that my donation could save someone&apos;s life gives me a sense of purpose.",
      rating: 5,
    },
    {
      name: "Emma Wilson",
      role: "Patient & Survivor",
      image: "👩",
      content:
        "A blood transfusion saved my life during a critical surgery. I&apos;m forever grateful to the donors who made my recovery possible. Now I donate regularly too.",
      rating: 5,
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
      id="testimonials"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-accent/5 to-background relative overflow-hidden">
      <motion.div
        animate={{ y: [30, 0, 30] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Quote className="w-4 h-4" />
            Success Stories
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            Voices of Impact
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto text-balance">
            Real stories from donors, healthcare heroes, and those whose lives
            were saved
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
              }}
              className="bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-all group cursor-pointer relative">
              {/* Quote icon background */}
              <motion.div
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-4 right-4">
                <Quote className="w-12 h-12 text-primary/20" />
              </motion.div>

              {/* Rating */}
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}>
                    <Star className="w-5 h-5 fill-primary text-primary" />
                  </motion.div>
                ))}
              </div>

              {/* Content */}
              <motion.p className="text-foreground/80 mb-6 leading-relaxed relative z-10">
                &quot;{testimonial.content}&quot;
              </motion.p>

              {/* Author */}
              <div className="flex items-center gap-4 border-t border-border pt-6 relative z-10">
                <motion.div whileHover={{ scale: 1.1 }} className="text-4xl">
                  {testimonial.image}
                </motion.div>
                <div>
                  <h4 className="font-bold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-foreground/60">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
