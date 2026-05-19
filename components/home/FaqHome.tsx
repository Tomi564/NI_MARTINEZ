"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type FaqItem = {
  pregunta: string;
  respuesta: string;
};

const faqs: FaqItem[] = [
  {
    pregunta: "¿Qué medida de neumático necesito?",
    respuesta:
      "La medida está impresa en el flanco del neumático actual de tu vehículo. Ejemplo: 185/65 R15. También podés encontrarla en el manual del auto o en la etiqueta del pilar de la puerta del conductor.",
  },
  {
    pregunta: "¿Los neumáticos vienen montados?",
    respuesta:
      "No. Vendemos únicamente la cubierta (el neumático sin montar). Una vez que lo recibís en tu domicilio, tenés que llevarlo a una gomería para el montaje y balanceo, que generalmente cuesta entre $3.000 y $8.000 por unidad según la zona.",
  },
  {
    pregunta: "¿Cómo se realiza el pago?",
    respuesta:
      "El pago se realiza a través de Mercado Libre, donde podés pagar con tarjeta de crédito en hasta 12 cuotas sin interés, tarjeta de débito, transferencia bancaria o saldo de Mercado Pago.",
  },
  {
    pregunta: "¿Cuánto tarda el envío?",
    respuesta:
      "El envío tarda entre 24 y 72hs hábiles dependiendo de tu zona. AMBA y GBA reciben en 24-48hs. El interior del país puede tardar hasta 72hs. Zonas remotas entre 5 y 7 días hábiles. El envío es siempre gratis.",
  },
  {
    pregunta: "¿Puedo devolver un neumático?",
    respuesta:
      "Sí. Si el producto tiene un defecto de fábrica o te equivocaste de medida, podés solicitar el cambio dentro de los 30 días desde la recepción. El neumático debe estar sin uso y en su embalaje original. El costo del envío de devolución está a nuestro cargo.",
  },
  {
    pregunta: "¿Son neumáticos originales?",
    respuesta:
      "Sí, todos nuestros neumáticos son 100% originales con DOT visible y verificable. Somos distribuidores oficiales de las marcas que comercializamos. Detrás de esta tienda está Martínez Neumáticos, empresa con más de 15 años en el rubro.",
  },
];

export default function FaqHome() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-[var(--color-navy)]">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-8">
        <header className="mb-12 text-center">
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
