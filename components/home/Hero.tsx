"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import MagneticButton from "@/components/shared/MagneticButton";
import WipeTitle from "@/components/shared/WipeTitle";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-navy)]">
      <div className="relative mx-auto h-[clamp(520px,min(56vw,72vh),680px)] w-full min-[1220px]:h-[clamp(580px,52vw,78vh)]">
        <Image
          src="/images/heroimg.png"
          alt="Neumáticos importados"
          fill
          priority
          sizes="100vw"
          className="object-contain object-center min-[1220px]:object-cover min-[1220px]:object-[center_84%]"
        />

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(13,27,42,0.5)] via-transparent to-[rgba(13,27,42,0.6)]"
          aria-hidden
        />

        <div className="absolute inset-0 z-10 flex flex-col justify-between px-4 py-6 sm:px-6 sm:py-7 md:px-8 md:py-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="pointer-events-auto mx-auto w-full max-w-[1280px] text-center"
          >
            <motion.p
              variants={itemVariants}
              className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-orange drop-shadow-sm sm:mb-3 sm:text-[11px]"
            >
              ★ Envío a todo Argentina — Stock permanente
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="mx-auto max-w-[20ch] font-condensed text-[clamp(24px,3.8vw,48px)] font-black uppercase leading-[0.95] tracking-[0.01em] text-white drop-shadow-md sm:max-w-none md:text-[clamp(28px,4vw,52px)]"
            >
              <div className="block">
                <WipeTitle delay={0}>EL NEUMÁTICO</WipeTitle>
              </div>
              <div className="block">
                <WipeTitle delay={0.15}>
                  <span className="text-orange">IMPORTADO</span>
                </WipeTitle>
              </div>
              <div className="block">
                <WipeTitle delay={0.3}>QUE TU AUTO</WipeTitle>
              </div>
              <div className="block">
                <WipeTitle delay={0.45}>NECESITA</WipeTitle>
              </div>
            </motion.h1>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="pointer-events-auto mx-auto w-full max-w-[1280px] text-center"
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-3 sm:gap-4"
            >
              <MagneticButton strength={0.12}>
                <motion.div whileHover="hover" className="inline-block">
                  <Link
                    href="/catalogo"
                    className="inline-flex items-center gap-2 rounded-[3px] bg-orange px-6 py-2.5 font-sans text-[12px] font-extrabold uppercase tracking-[0.07em] text-white shadow-lg transition-colors duration-150 hover:bg-[var(--color-orange-hover)] sm:px-8 sm:py-3 sm:text-[13px]"
                  >
                    Ver catálogo
                    <motion.span
                      variants={{ hover: { x: 6 } }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>
              </MagneticButton>
              <MagneticButton strength={0.12}>
                <motion.div whileHover="hover" className="inline-block">
                  <Link
                    href="/catalogo?badge=oferta"
                    className="inline-flex items-center gap-2 rounded-[3px] border-2 border-white/60 bg-[rgba(13,27,42,0.35)] px-6 py-2 font-sans text-[12px] font-bold uppercase tracking-[0.07em] text-white shadow-lg backdrop-blur-sm transition-colors duration-150 hover:border-white sm:px-8 sm:py-[11px] sm:text-[13px]"
                  >
                    Ver ofertas
                    <motion.span
                      variants={{ hover: { x: 6 } }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.div>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
