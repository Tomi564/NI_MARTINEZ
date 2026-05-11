import SectionTitle from "@/components/shared/SectionTitle";
import type { ReactNode } from "react";

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
    titulo: "Atención personalizada",
    texto: "Respondemos por WhatsApp de lunes a sábado de 9 a 20hs. Asesoramiento sin cargo.",
    icon: <WhatsappIcon />,
  },
];

export default function Confianza() {
  return (
    <section className="w-full bg-[var(--color-gray-bg)]">
      <div className="mx-auto max-w-[1280px] px-6 py-12 md:px-8 md:py-16">
        <SectionTitle title="Por qué " highlight="elegirnos" />

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          {items.map((item) => (
            <article
              key={item.titulo}
              className="flex flex-col gap-3 rounded-[6px] border border-gray-border border-t-[3px] border-t-orange bg-white p-5"
            >
              <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[4px] bg-gray-bg text-navy">
                {item.icon}
              </div>
              <h3 className="text-[14px] font-bold leading-[1.2] text-text-primary">
                {item.titulo}
              </h3>
              <p className="text-[12px] leading-[1.6] text-text-secondary">{item.texto}</p>
            </article>
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

function WhatsappIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 11.5C20 16.2 16.2 20 11.5 20C10.1 20 8.7 19.6 7.5 19L3 20L4 15.5C3.4 14.3 3 12.9 3 11.5C3 6.8 6.8 3 11.5 3C16.2 3 20 6.8 20 11.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9.5 9.5C10 11 11 12 12.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
