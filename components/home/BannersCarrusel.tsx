"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

interface BannerItem {
  id: number;
  tag: string;
  titulo: string;
  subtitulo: string;
  cta: string;
  href: string;
  color: string;
  acento: string;
}

const banners: BannerItem[] = [
  {
    id: 1,
    tag: "MERCADO PAGO",
    titulo: "Hasta 12 cuotas\nsin interés",
    subtitulo: "Con todas las tarjetas. Pagá cómodo tu próximo neumático.",
    cta: "Ver condiciones",
    href: "/envios",
    color: "#1A2E44",
    acento: "#E84E0F",
  },
  {
    id: 2,
    tag: "PROMO ESPECIAL",
    titulo: "Comprá 4\ny pagá 3",
    subtitulo: "Válido en medidas seleccionadas. Stock limitado.",
    cta: "Ver productos",
    href: "/catalogo?badge=oferta",
    color: "#0D1B2A",
    acento: "#E84E0F",
  },
  {
    id: 3,
    tag: "ENVÍO GRATIS",
    titulo: "A todo\nel país",
    subtitulo: "Sin mínimo de compra. Entrega en 24 a 72hs hábiles.",
    cta: "Cómo funciona",
    href: "/envios",
    color: "#1A2E44",
    acento: "#E84E0F",
  },
];

const AUTO_INTERVAL_MS = 4000;

export default function BannersCarrusel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timerKey, setTimerKey] = useState(0);

  const activeBanner = banners[activeIndex];

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
    setTimerKey((k) => k + 1);
  }, []);

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % banners.length);
  }, [activeIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo((activeIndex - 1 + banners.length) % banners.length);
  }, [activeIndex, goTo]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length);
    }, AUTO_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [timerKey]);

  return (
    <section
      className="relative w-full overflow-hidden transition-colors duration-[400ms] h-[200px] md:h-[160px]"
      style={{ backgroundColor: activeBanner.color }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeBanner.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="mx-auto flex h-full max-w-[1280px] flex-col justify-center px-6 py-6 md:flex-row md:items-center md:px-8">
            <div>
              <span
                className="mb-2 inline-block rounded-[2px] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em]"
                style={{
                  backgroundColor: "rgba(232, 78, 15, 0.2)",
                  color: activeBanner.acento,
                }}
              >
                {activeBanner.tag}
              </span>
              <h2 className="whitespace-pre-line font-condensed text-[26px] font-black uppercase leading-none text-white md:text-[32px]">
                {activeBanner.titulo}
              </h2>
              <p className="mt-2 max-w-[400px] text-[13px] font-normal text-[#8FAABB]">
                {activeBanner.subtitulo}
              </p>
            </div>

            <div className="mt-4 shrink-0 md:ml-auto md:mt-0">
              <Link
                href={activeBanner.href}
                className="inline-block rounded-[3px] bg-orange px-6 py-[10px] text-[12px] font-bold uppercase tracking-[0.06em] text-white transition-colors duration-150 hover:bg-[var(--color-orange-hover)]"
              >
                {activeBanner.cta}
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        type="button"
        onClick={goPrev}
        aria-label="Banner anterior"
        className="absolute left-4 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] text-white transition-colors hover:bg-[rgba(255,255,255,0.2)] md:flex"
      >
        <ChevronIcon direction="left" />
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="Banner siguiente"
        className="absolute right-4 top-1/2 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] text-white transition-colors hover:bg-[rgba(255,255,255,0.2)] md:flex"
      >
        <ChevronIcon direction="right" />
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {banners.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            aria-label={`Ir al banner ${index + 1}`}
            onClick={() => goTo(index)}
            className="p-1"
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`block h-2 rounded-full ${
                index === activeIndex ? "bg-orange" : "bg-[rgba(255,255,255,0.3)]"
              }`}
              style={{ width: index === activeIndex ? 24 : 8 }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d={direction === "left" ? "M15 6L9 12L15 18" : "M9 6L15 12L9 18"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
