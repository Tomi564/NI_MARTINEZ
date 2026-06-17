"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "promo_toast_shown";
const SHOW_DELAY_MS = 2000;
const VISIBLE_DURATION_S = 10;

export default function PromoToast() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem(STORAGE_KEY) === "true") {
      return;
    }

    const showTimer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem(STORAGE_KEY, "true");
    }, SHOW_DELAY_MS);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, VISIBLE_DURATION_S * 1000);

    return () => clearTimeout(hideTimer);
  }, [visible]);

  const dismiss = () => setVisible(false);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.aside
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 left-6 z-[45] w-[calc(100vw-48px)] max-w-[320px] overflow-hidden rounded-[6px] border border-[rgba(232,78,15,0.4)] border-l-4 border-l-orange bg-[#0D1B2A] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Cerrar promoción"
            className="absolute right-3 top-3 text-[#5A7080] transition-colors hover:text-white"
          >
            <CloseIcon />
          </button>

          <p className="pr-6 text-[10px] font-bold uppercase tracking-[0.1em] text-orange">
            🔥 PROMOCIÓN ACTIVA
          </p>

          <h2 className="mt-2 whitespace-pre-line font-condensed text-[20px] font-black uppercase leading-tight text-white">
            Hasta 12 cuotas
            sin interés
          </h2>

          <p className="mt-1 text-[12px] font-normal leading-[1.5] text-[#8FAABB]">
            Con tarjetas Naranja y todas las tarjetas vía Mercado Pago.
          </p>

          <Link
            href="/catalogo?badge=oferta"
            onClick={dismiss}
            className="mt-3 block w-full rounded-[3px] bg-orange py-[9px] text-center text-[11px] font-bold uppercase tracking-[0.06em] text-white transition-colors duration-150 hover:bg-[var(--color-orange-hover)]"
          >
            Ver promociones →
          </Link>

          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[rgba(232,78,15,0.3)]">
            <motion.div
              className="h-full bg-orange"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: VISIBLE_DURATION_S, ease: "linear" }}
            />
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
