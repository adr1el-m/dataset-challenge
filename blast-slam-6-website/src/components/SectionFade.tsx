"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionFadeProps = {
  children: ReactNode;
  delay?: number;
};

export default function SectionFade({ children, delay = 0 }: SectionFadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
