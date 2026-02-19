"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ReactNode } from "react";

type SectionFadeProps = {
  children: ReactNode;
  delay?: number;
  fallback?: ReactNode;
  eager?: boolean;
};

export default function SectionFade({ children, delay = 0, fallback, eager = false }: SectionFadeProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px 0px",
  });
  const shouldRender = eager || inView;

  return (
    <div ref={ref}>
      {shouldRender ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay }}
        >
          {children}
        </motion.div>
      ) : (
        fallback || <div className="min-h-[240px]" />
      )}
    </div>
  );
}
