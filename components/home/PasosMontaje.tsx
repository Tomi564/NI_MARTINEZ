"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

import SectionTitle from "@/components/shared/SectionTitle";

type Paso = {
  numero: string;
  titulo: string;
  descripcion: string;
  icono: ReactNode;
};

const pasos: Paso[] = [
  {
    numero: "01",
    titulo: "Elegís tu neumático",
    descripcion:
      "Buscá por medida o por tu vehículo. Si tenés dudas sobre qué medida necesitás, está impresa en el flanco del neumático actual.",
    icono: <SearchIcon />,
  },
  {
    numero: "02",
    titulo: "Comprás en Mercado Libre",
    descripcion:
      "Te redirigimos a nuestra tienda oficial en Mercado Libre donde podés pagar con tarjeta, transferencia o Mercado Pago en hasta 12 cuotas sin interés.",
    icono: <CartIcon />,
  },
  {
    numero: "03",
    titulo: "Lo enviamos a tu domicilio",
    descripcion:
      "Preparamos tu pedido y lo despachamos por transporte. Llega en 24 a 72hs hábiles a cualquier punto del país, sin costo adicional.",
    icono: <TruckIcon />,
  },
  {
    numero: "04",
    titulo: "Lo montás en una gomería",
    descripcion:
      "El neumático llega sin montar — es solo la cubierta. Si estás en Salta o Jujuy, podés llevarlo a cualquier sucursal de Martínez Neumáticos. En el resto del país, cualquier gomería de confianza puede hacerlo.",
    icono: <WrenchIcon />,
  },
];

export default function PasosMontaje() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-navy py-12 md:py-16">
      <div className="mx-auto max-w-[1280px] px-6 md:px-8">
        <SectionTitle light title="¿Cómo " highlight="funciona?" />

        {/* Desktop */}
        <div className="mt-8 hidden md:grid md:grid-cols-4 md:items-start md:gap-6">
          {pasos.map((paso, index) => (
            <PasoDesktop key={paso.numero} paso={paso} isLast={index === pasos.length - 1} />
          ))}
        </div>

        {/* Mobile accordion */}
        <ul className="mt-6 flex list-none flex-col gap-2 p-0 md:hidden">
          {pasos.map((paso, index) => {
            const open = openIndex === index;
            return (
              <li
                key={paso.numero}
                className={[
                  "overflow-hidden rounded-[5px]",
                  open ? "border-l-[3px] border-l-orange" : "border-l-[3px] border-l-transparent",
                ].join(" ")}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 bg-[rgba(255,255,255,0.05)] px-4 py-[14px] text-left"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                >
                  <span className="flex min-w-0 flex-1 items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange font-condensed text-[13px] font-black text-white">
                      {paso.numero}
                    </span>
                    <span className="font-condensed text-[13px] font-black uppercase leading-tight tracking-[0.03em] text-white">
                      {paso.titulo}
                    </span>
                  </span>
                  <ChevronIcon open={open} />
                </button>

                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      key={`mobile-${paso.numero}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden bg-[rgba(255,255,255,0.05)]"
                    >
                      <div className="px-4 pb-4 pt-1">
                        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-[8px] bg-[rgba(232,78,15,0.1)] text-orange">
                          <IconWrapper size={24}>{paso.icono}</IconWrapper>
                        </div>
                        <p className="font-sans text-[12px] font-normal leading-[1.7] text-[#8FAABB]">
                          {paso.descripcion}
                        </p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function PasoDesktop({ paso, isLast }: { paso: Paso; isLast: boolean }) {
  return (
    <article>
      <div className="mb-5 flex items-center">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange font-condensed text-[20px] font-black text-white">
          {paso.numero}
        </div>
        {!isLast ? (
          <div
            className="ml-3 h-0 flex-1 border-t-2 border-dashed border-[rgba(232,78,15,0.3)]"
            aria-hidden
          />
        ) : null}
      </div>

      <div className="mb-3.5 flex h-14 w-14 items-center justify-center rounded-[8px] bg-[rgba(232,78,15,0.1)] text-orange">
        <IconWrapper size={28}>{paso.icono}</IconWrapper>
      </div>

      <h3 className="mb-2 font-condensed text-[15px] font-black uppercase leading-[1.2] tracking-[0.04em] text-white">
        {paso.titulo}
      </h3>
      <p className="font-sans text-[12px] font-normal leading-[1.7] text-[#8FAABB]">{paso.descripcion}</p>
    </article>
  );
}

function IconWrapper({ size, children }: { size: number; children: ReactNode }) {
  return <span className="inline-flex [&_svg]:h-auto [&_svg]:w-full" style={{ width: size, height: size }}>{children}</span>;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      className={`shrink-0 text-orange transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" />
      <path d="M16 16l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6h15l-1.5 9H7.5L6 6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M6 6 5 3H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="9" cy="20" r="1.5" fill="currentColor" />
      <circle cx="18" cy="20" r="1.5" fill="currentColor" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 7h12v8H3V7Z" stroke="currentColor" strokeWidth="2" />
      <path d="M15 10h4l2 2v3h-6v-5Z" stroke="currentColor" strokeWidth="2" />
      <circle cx="7" cy="17" r="1.5" fill="currentColor" />
      <circle cx="17" cy="17" r="1.5" fill="currentColor" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-2.5 2.5-2.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
