"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full bg-[var(--color-navy)] text-white">
      <svg
        aria-hidden="true"
        role="presentation"
        width="420"
        height="420"
        viewBox="0 0 340 340"
        className="pointer-events-none absolute right-0 top-0 hidden opacity-[0.04] md:block"
      >
        <circle cx="170" cy="170" r="140" stroke="white" strokeWidth="10" fill="none" />
        <circle cx="170" cy="170" r="100" stroke="white" strokeWidth="7" fill="none" />
        <circle cx="170" cy="170" r="55" stroke="white" strokeWidth="5" fill="none" />
        <circle cx="170" cy="170" r="20" fill="white" />
      </svg>

      <div className="relative mx-auto max-w-[1280px] px-6 pb-10 pt-10 md:px-8 md:pb-[52px] md:pt-[56px]">
        <HeroContent />
      </div>
    </section>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut" } },
};

function HeroContent() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ maxWidth: 560 }}
      className="relative z-[1]"
    >
      <motion.p
        variants={itemVariants}
        className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-orange"
      >
        ★ Envío a todo Argentina — Stock permanente
      </motion.p>

      <motion.h1
        variants={itemVariants}
        className="mb-4 font-condensed text-[32px] font-black uppercase leading-[0.92] tracking-[0.01em] sm:text-[44px] md:text-[52px]"
      >
        EL NEUMÁTICO
        <br />
        <span className="text-orange">IMPORTADO</span>
        <br />
        QUE TU AUTO
        <br />
        NECESITA
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="mb-7 max-w-[400px] text-[13px] leading-[1.65] md:text-[14px]"
        style={{ color: "var(--color-text-on-dark)" }}
      >
        Pirelli, Dunlop, Bridgestone, Corven y más. Comprá desde casa con envío a todo el país.
      </motion.p>

      <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-2 rounded-[4px] bg-orange px-5 py-3 text-[12px] font-extrabold uppercase tracking-[0.07em] text-white transition-colors duration-150 hover:bg-[var(--color-orange-hover)]"
        >
          Ver catálogo
        </Link>
        <Link
          href="/catalogo?badge=oferta"
          className="inline-flex items-center gap-2 rounded-[4px] border border-white/20 bg-white/8 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.07em] text-white backdrop-blur-sm transition-colors duration-150 hover:border-white/40"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          Ver ofertas
        </Link>
      </motion.div>
    </motion.div>
  );
}
