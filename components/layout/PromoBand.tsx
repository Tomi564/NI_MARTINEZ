"use client";

import { motion } from "framer-motion";

const messages = [
  "🚚 Envío gratis a todo el país",
  "💳 Hasta 12 cuotas sin interés",
  "✅ Originales certificados con DOT",
  "🔄 Cambio gratis si te equivocás",
];

export default function PromoBand() {
  const marqueeMessages = [...messages, ...messages];

  return (
    <div className="bg-orange py-2 overflow-hidden">
      <div className="hidden md:flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.06em] text-white">
        {messages.map((message, index) => (
          <div key={message} className="flex items-center gap-3">
            <span>{message}</span>
            {index < messages.length - 1 ? (
              <span className="text-white/40" aria-hidden="true">
                ●
              </span>
            ) : null}
          </div>
        ))}
      </div>

      <div className="md:hidden">
        <motion.div
          className="flex w-max items-center text-[11px] font-bold uppercase tracking-[0.06em] text-white whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity }}
        >
          {marqueeMessages.map((message, index) => (
            <div key={`${message}-${index}`} className="flex items-center">
              <span className="px-3">{message}</span>
              <span className="text-white/40" aria-hidden="true">
                ●
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
