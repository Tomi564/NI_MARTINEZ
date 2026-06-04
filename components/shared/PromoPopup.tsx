"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "promo_popup_shown";
const SHOW_DELAY_MS = 3000;

export default function PromoPopup() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem(STORAGE_KEY) === "true") return;

    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(STORAGE_KEY, "true");
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const close = () => setOpen(false);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="promo-popup-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(0,0,0,0.7)] p-6"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative mx-auto w-[calc(100%-48px)] max-w-[480px] overflow-hidden rounded-[8px] bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar promoción"
              className="absolute right-3 top-3 z-10 text-[#8899AA] transition-colors hover:text-navy"
            >
              <CloseIcon />
            </button>

            <div
              className="flex h-[220px] flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#0D1B2A] to-[#1A2E44] px-8 text-center"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-orange">
                PROMOCIÓN ESPECIAL
              </span>
              <p
                id="promo-popup-title"
                className="m-0 font-condensed text-[36px] font-black uppercase leading-[1.1] text-white"
              >
                10 CUOTAS SIN
                <br />
                <span className="text-orange">INTERÉS</span>
              </p>
              <p className="m-0 text-[13px] text-[#8FAABB]">
                Con tarjetas Naranja. Válido en todos los productos.
              </p>
            </div>

            <div className="px-6 py-5">
              <p className="mb-3 font-sans text-[13px] font-normal text-text-secondary">
                Aprovechá esta promoción en tu próxima compra
              </p>
              <Link
                href="/catalogo?badge=oferta"
                onClick={close}
                className="block w-full rounded-[4px] bg-orange py-3 text-center font-sans text-[13px] font-bold uppercase text-white transition-colors hover:bg-[var(--color-orange-hover)]"
              >
                Ver productos en oferta →
              </Link>
              <button
                type="button"
                onClick={close}
                className="mt-2 w-full cursor-pointer text-center font-sans text-[12px] font-normal text-[#8899AA] transition-colors hover:text-text-primary"
              >
                No, gracias
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
