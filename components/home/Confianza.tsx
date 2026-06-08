"use client";

import type { ReactNode } from "react";
import FadeInView from "@/components/shared/FadeInView";
import SectionTitle from "@/components/shared/SectionTitle";

type ConfianzaItem = { titulo: string; texto: string; icon: ReactNode };

const items: ConfianzaItem[] = [
  {
    titulo: "Empresa con trayectoria",
    texto: "Detrás de esta web está Martínez Neumáticos, con 4 sucursales y más de 15 años en el rubro automotriz.",
    icon: <StoreIcon />,
  },
  {
    titulo: "Vendedor Platinum en MELI",
    texto: "+5000 ventas concretadas y más de 4.8 estrellas. Comprá con total confianza.",
    icon: <StarIcon />,
  },
  {
    titulo: "Envío gratis a todo el país",
    texto:
      "Despachamos a cualquier provincia de Argentina sin costo adicional. Entrega estimada de 24 a 72hs hábiles según tu zona.",
    icon: <TruckIcon />,
  },
];

export default function Confianza() {
  return (
    <section className="w-full bg-[var(--color-gray-bg)]">
      <div className="mx-auto max-w-[1280px] px-6 py-12 md:px-8 md:py-16">
        <SectionTitle title="Por qué " highlight="elegirnos" />

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          {items.map((item, index) => (
            <FadeInView key={item.titulo} delay={index * 0.08}>
              <article className="flex h-full flex-col gap-3 rounded-[6px] border border-gray-border border-t-[3px] border-t-orange bg-white p-5">
                <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[4px] bg-gray-bg text-navy">
                  {item.icon}
                </div>
                <h3 className="text-[14px] font-bold leading-[1.2] text-text-primary">
                  {item.titulo}
                </h3>
                <p className="text-[12px] leading-[1.6] text-text-secondary">{item.texto}</p>
              </article>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}

function StoreIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 10L12 3L21 10V21H3V10Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 21V14H15V21" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 7h12v8H3V7Z" stroke="currentColor" strokeWidth="2" />
      <path d="M15 10h4l2 2v3h-6v-5Z" stroke="currentColor" strokeWidth="2" />
      <circle cx="7" cy="17" r="1.5" fill="currentColor" />
      <circle cx="17" cy="17" r="1.5" fill="currentColor" />
    </svg>
  );
}
