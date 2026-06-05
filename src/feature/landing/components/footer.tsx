"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe2Icon } from "lucide-react";

import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from "react-icons/fa";
import { Link } from "react-router";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        "Donate Blood",
        "Request Blood",
        "Become A Hero",
        "Emergency Help",
      ],
    },
    {
      title: "Company",
      links: ["About Us", "Our Mission", "Team", "Blog"],
    },
    {
      title: "Resources",
      links: ["FAQ", "Safety Guidelines", "Blood Types", "Contact Us"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookies", "Security"],
    },
  ];

  const socialLinks = [
    { icon: <Globe2Icon />, label: "Website" },
    {
      icon: <FaInstagramSquare className="text-pink-500" />,
      label: "Instagram",
    },
    { icon: <FaFacebookSquare className="text-blue-500" />, label: "Facebook" },
    { icon: <FaTwitterSquare className="text-blue-500" />, label: "Twitter" },
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="bg-linear-to-b from-background to-foreground/5 border-t border-border relative overflow-hidden">
      <motion.div
        animate={{ y: [20, 0, 20] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 relative z-10">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-6">
              <img alt="logo" src={"/logo.svg"} />

              <span className="font-bold text-xl text-foreground">RedLink</span>
            </div>
            <p className="text-sm text-foreground/70 mb-6 leading-relaxed">
              Connecting donors with those in need. Save lives, one drop at a
              time.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-foreground/70">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>1-800-BLOOD-911</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/70">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>support@lifegive.org</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/70">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>123 Hope Street, Health City</span>
              </div>
            </div>
          </motion.div>

          {/* Links Columns */}
          {footerLinks.map((column, colIndex) => (
            <motion.div key={colIndex} variants={itemVariants}>
              <h4 className="font-bold text-foreground mb-6">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <motion.li key={linkIndex} whileHover={{ x: 5 }}>
                    <Link
                      to="#"
                      className="text-sm text-foreground/70 hover:text-primary transition-colors">
                      {link}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          className="h-px bg-border origin-left mb-8"
        />

        {/* Bottom Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.p
            variants={itemVariants}
            className="text-sm text-foreground/60 text-center md:text-left">
            © {currentYear} RedLink. All rights reserved. Saving lives together.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors flex items-center justify-center text-lg"
                title={social.label}>
                {social.icon}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
