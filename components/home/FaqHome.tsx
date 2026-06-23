"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TireTrack from "@/components/shared/TireTrack";

type FaqItem = {
  pregunta: string;
  respuesta: string;
};

const faqs: FaqItem[] = [
  {
    pregunta: "¿Hacen instalación?",
    respuesta:
      "Sí, hacemos instalación en Salta y Jujuy en las siguientes ubicaciones:\n• Av. Chile 1301, Salta\n• Av. Sarmiento 275, Salta\n• Las Heras 1245, Salta\n• San Antonio 615, Jujuy\nSi estás en otra ciudad, cualquier gomería cercana y de confianza puede hacerlo.",
  },
  {
    pregunta: "¿Los precios incluyen IVA?",
    respuesta: "Sí, todos los precios publicados son finales y con IVA incluido.",
  },
  {
    pregunta: "¿Puedo comprar desde cualquier lugar del país?",
    respuesta: "Sí, realizamos envíos a todo el país.",
  },
];

export default function FaqHome() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-navy)]">
      <TireTrack />
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 py-16 md:px-8">
        <header className="mb-8 text-center">
          <h2 className="font-condensed text-[clamp(28px,4vw,40px)] font-black uppercase leading-[1.1] text-white">
            Preguntas <span className="text-[#E84E0F]">Frecuentes</span>
          </h2>

          <p className="mx-auto mt-3 max-w-[480px] font-sans text-[14px] font-normal leading-[1.6] text-[#8FAABB]">
            Resolvemos las dudas más comunes antes de tu primera compra.
          </p>
        </header>

        <div className="mx-auto max-w-[720px]">
          <ul className="list-none p-0">
            {faqs.map((faq, index) => {
              const open = activeIndex === index;
              const isFirst = index === 0;

              return (
                <li
                  key={faq.pregunta}
                  className={[
                    "border-b border-[rgba(255,255,255,0.08)]",
                    isFirst ? "border-t border-[rgba(255,255,255,0.08)]" : "",
                  ].join(" ")}
                >
                  <button
                    type="button"
                    className="group flex w-full items-center justify-between py-5 text-left"
                    onClick={() => setActiveIndex(open ? null : index)}
                    aria-expanded={open}
                  >
                    <span className="pr-4 font-sans text-[15px] font-bold text-white transition-colors duration-150 group-hover:text-orange">
                      {faq.pregunta}
                    </span>
                    <motion.span
                      className="ml-4 flex shrink-0 text-orange"
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      aria-hidden
                    >
                      <ChevronIcon />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        key={faq.pregunta}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 font-sans text-[13px] font-normal leading-[1.7] text-[#8FAABB]">
                          {faq.respuesta}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ChevronIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
