import Link from "next/link";
import type { ReactNode } from "react";
import SectionTitle from "@/components/shared/SectionTitle";

type Categoria = {
  id: string;
  label: string;
  sub: string;
  href: string;
};

const categorias: Array<Categoria & { icon: ReactNode }> = [
  {
    id: "autos",
    label: "Autos",
    sub: "Desde utilitarios hasta deportivos",
    href: "/catalogo?tipo=auto",
    icon: <AutoSvg />,
  },
  {
    id: "suv",
    label: "SUV y 4x4",
    sub: "Pickups, SUV y todo terreno",
    href: "/catalogo?tipo=suv",
    icon: <SuvSvg />,
  },
  {
    id: "comerciales",
    label: "Comerciales",
    sub: "Furgones, vans y carga liviana",
    href: "/catalogo?tipo=comercial",
    icon: <VanSvg />,
  },
  {
    id: "motos",
    label: "Motos",
    sub: "Delantera y trasera, todas las cilindradas",
    href: "/catalogo?tipo=moto",
    icon: <MotoSvg />,
  },
];

export default function Categorias() {
  return (
    <section className="w-full bg-[var(--color-navy)]">
      <div className="mx-auto max-w-[1280px] px-6 py-12 md:px-8 md:py-16">
        <SectionTitle title="Buscá por " highlight="tipo de vehículo" light />

        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {categorias.map((categoria) => (
            <Link key={categoria.id} href={categoria.href} className="group block">
              <article className="cursor-pointer rounded-[6px] border-[0.5px] border-[var(--color-navy-strong-border)] border-l-[3px] border-l-orange bg-[var(--color-navy)] p-5 transition-colors duration-150 hover:bg-[var(--color-navy-surface)]">
                <span className="block text-white/15">{categoria.icon}</span>
                <h3 className="mt-3 font-condensed text-[16px] font-black uppercase tracking-[0.04em] text-white">
                  {categoria.label}
                </h3>
                <p className="mt-1 text-[11px] leading-[1.5]" style={{ color: "var(--color-text-on-dark)" }}>
                  {categoria.sub}
                </p>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.08em] text-orange">
                  Ver catálogo →
                </p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function AutoSvg() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 16L7 9C7.2 8.4 7.8 8 8.4 8H15.6C16.2 8 16.8 8.4 17 9L19 16" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M7 16V18M17 16V18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="9" cy="19" r="1.3" fill="currentColor" />
      <circle cx="15" cy="19" r="1.3" fill="currentColor" />
    </svg>
  );
}

function SuvSvg() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.5 16.5L6 9.5C6.2 9 6.7 8.7 7.2 8.7H16.8C17.3 8.7 17.8 9 18 9.5L20.5 16.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M7 16.5V19M17 16.5V19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="8.5" cy="19" r="1.3" fill="currentColor" />
      <circle cx="15.5" cy="19" r="1.3" fill="currentColor" />
      <path d="M11 6.8L13.2 6.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function VanSvg() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 16V9.5C6 8.7 6.7 8 7.5 8H14.2C14.8 8 15.3 8.3 15.6 8.8L18 12.8V16" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M6 16H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="9" cy="18.5" r="1.3" fill="currentColor" />
      <circle cx="16.5" cy="18.5" r="1.3" fill="currentColor" />
    </svg>
  );
}

function MotoSvg() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 17.5H9.2L11.5 13.2H15.2L19.5 17.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M11.5 13.2V10.2C11.5 9.7 11.9 9.3 12.4 9.3H14.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="7" cy="17.5" r="1.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="17.5" r="1.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
