import Link from "next/link";
import type { Metadata } from "next";
import PageHeroTitle from "@/components/shared/PageHeroTitle";

export const metadata: Metadata = {
  title: "Marcas | Martínez Neumáticos",
  description: "Trabajamos con Pirelli, Dunlop, Bridgestone, Goodyear, Corven y más.",
};

const marcas = [
  { id: "pirelli", nombre: "Pirelli", productos: 42 },
  { id: "dunlop", nombre: "Dunlop", productos: 38 },
  { id: "bridgestone", nombre: "Bridgestone", productos: 51 },
  { id: "goodyear", nombre: "Goodyear", productos: 29 },
  { id: "corven", nombre: "Corven", productos: 33 },
  { id: "michelin", nombre: "Michelin", productos: 27 },
  { id: "continental", nombre: "Continental", productos: 19 },
  { id: "hankook", nombre: "Hankook", productos: 24 },
  { id: "maxxis", nombre: "Maxxis", productos: 31 },
  { id: "fate", nombre: "Fate", productos: 16 },
] as const;

const descripcionPorMarca: Record<string, string> = {
  pirelli: "Marca italiana fundada en 1872. Referente mundial en neumáticos de alto rendimiento.",
  dunlop: "Marca británica con más de 130 años de historia en innovación automotriz.",
  bridgestone: "La mayor fabricante de neumáticos del mundo, fundada en Japón en 1931.",
  goodyear: "Marca americana icónica, presente en la Fórmula 1 y en millones de vehículos.",
  corven: "Marca nacional argentina con amplia distribución y excelente relación precio-calidad.",
};

export default function MarcasPage() {
  return (
    <div className="min-h-screen bg-[var(--color-gray-bg)]">
      <header className="w-full border-b-[3px] border-orange bg-navy">
        <div className="mx-auto max-w-[1280px] px-5 py-8 md:px-8 md:py-10">
          <nav className="mb-2 flex flex-wrap items-center gap-1 text-[11px] text-[var(--color-text-on-dark)]">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
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
          {marcas.map((marca) => (
            <article
              key={marca.id}
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
                    {descripcionPorMarca[marca.id] ??
                      "Marca de reconocida trayectoria internacional con amplio catálogo para todo tipo de vehículo."}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <span className="inline-block rounded-[3px] bg-orange px-3 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-white">
                      {marca.productos} productos
                    </span>
                    <Link
                      href={`/catalogo?marca=${encodeURIComponent(marca.id)}`}
                      className="inline-flex items-center gap-1 rounded-[3px] border border-navy bg-navy px-4 py-2 text-[11px] font-bold uppercase tracking-[0.06em] text-white transition-colors duration-150 hover:bg-orange hover:border-orange"
                    >
                      Ver catálogo →
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
