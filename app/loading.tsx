"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--color-navy)]"
      role="status"
      aria-live="polite"
      aria-label="Cargando"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 0.8,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <circle cx="32" cy="32" r="30" stroke="#E84E0F" strokeWidth="4" />
          <circle
            cx="32"
            cy="32"
            r="30"
            stroke="rgba(232,78,15,0.3)"
            strokeWidth="8"
            strokeDasharray="12 8"
            strokeLinecap="round"
          />
          <circle cx="32" cy="32" r="18" stroke="white" strokeWidth="2" opacity="0.6" />
          <line x1="32" y1="14" x2="32" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <line x1="32" y1="44" x2="32" y2="50" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <line x1="14" y1="32" x2="20" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <line x1="44" y1="32" x2="50" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <line x1="19" y1="19" x2="23" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <circle cx="32" cy="32" r="5" fill="#E84E0F" />
        </svg>
      </motion.div>

      <motion.p
        className="mt-6 font-condensed text-[16px] font-black uppercase tracking-[0.1em] text-white"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Cargando...
      </motion.p>
    </div>
  );
}
