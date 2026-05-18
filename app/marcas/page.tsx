import Link from "next/link";
import type { Metadata } from "next";
import PageHeroTitle from "@/components/shared/PageHeroTitle";
import { marcasData } from "@/lib/marcas-data";
import { countProductosPorMarca } from "@/lib/marcas";

export const metadata: Metadata = {
  title: "Marcas | Neumáticos Importados",
  description: "Trabajamos con Pirelli, Dunlop, Bridgestone, Goodyear, Corven y más.",
};

export default function MarcasPage() {
  return (
    <div className="min-h-screen bg-[var(--color-gray-bg)]">
      <header className="w-full border-b-[3px] border-orange bg-navy">
        <div className="mx-auto max-w-[1280px] px-5 py-8 md:px-8 md:py-10">
          <nav className="mb-2 flex flex-wrap items-center gap-1 text-[11px] text-[var(--color-text-on-dark)]">
            <Link href="/" className="transition-colors hover:text-white">
              Inicio
            </Link>
            <span className="opacity-40">→</span>
            <span className="text-white/60">Marcas</span>
          </nav>
          <h1 className="font-condensed text-[28px] font-black uppercase leading-none text-white md:text-[34px]">
            <PageHeroTitle text="Nuestras Marcas" />
          </h1>
          <p className="mt-1.5 text-[13px]" style={{ color: "var(--color-text-on-dark)" }}>
            Trabajamos con las mejores marcas de neumáticos del mundo
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-[1280px] px-5 py-8 md:px-8 md:py-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {marcasData.map((marca) => {
            const productos = countProductosPorMarca(marca.nombre);
            return (
              <article
                key={marca.slug}
                className="overflow-hidden rounded-[6px] border border-gray-border border-t-[3px] border-t-orange bg-white"
              >
                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6">
                  <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[6px] bg-gray-bg">
                    <span className="font-condensed text-[34px] font-black leading-none text-[var(--color-logo-muted)]">
                      {marca.nombre.charAt(0)}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h2 className="font-condensed text-[22px] font-black uppercase leading-none text-text-primary">
                      {marca.nombre}
                    </h2>
                    <p className="mt-1.5 text-[12px] leading-[1.55] text-text-secondary">
                      {marca.descripcionCorta}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <span className="inline-block rounded-[3px] bg-orange px-3 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-white">
                        {productos > 0 ? `${productos} productos` : "Ver disponibilidad"}
                      </span>
                      <Link
                        href={`/marcas/${marca.slug}`}
                        className="inline-flex items-center gap-1 rounded-[3px] border border-navy bg-navy px-4 py-2 text-[11px] font-bold uppercase tracking-[0.06em] text-white transition-colors duration-150 hover:border-orange hover:bg-orange"
                      >
                        Ver marca completa →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
