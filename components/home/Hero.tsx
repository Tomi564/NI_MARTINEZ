"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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
              EL NEUMÁTICO <span className="text-orange">IMPORTADO</span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              QUE TU AUTO NECESITA
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
              <Link
                href="/catalogo"
                className="inline-block rounded-[3px] bg-orange px-6 py-2.5 font-sans text-[12px] font-extrabold uppercase tracking-[0.07em] text-white shadow-lg transition-colors duration-150 hover:bg-[var(--color-orange-hover)] sm:px-8 sm:py-3 sm:text-[13px]"
              >
                Ver catálogo
              </Link>
              <Link
                href="/catalogo?badge=oferta"
                className="inline-block rounded-[3px] border-2 border-white/60 bg-[rgba(13,27,42,0.35)] px-6 py-2 font-sans text-[12px] font-bold uppercase tracking-[0.07em] text-white shadow-lg backdrop-blur-sm transition-colors duration-150 hover:border-white sm:px-8 sm:py-[11px] sm:text-[13px]"
              >
                Ver ofertas
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
