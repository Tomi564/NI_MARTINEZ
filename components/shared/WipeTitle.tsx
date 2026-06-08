"use client";

import { motion } from "framer-motion";

interface WipeTitleProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function WipeTitle({ children, className, delay = 0 }: WipeTitleProps) {
  return (
    <div className={`relative inline-block overflow-hidden ${className ?? ""}`}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.01, delay: delay + 0.3 }}
      >
        {children}
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{ background: "var(--color-orange)", originX: 0 }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: [0, 1, 1, 0] }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          delay,
          times: [0, 0.4, 0.6, 1],
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
