import Link from "next/link";
import SectionTitle from "@/components/shared/SectionTitle";

type Marca = { id: string; nombre: string; productos: number };

const marcas: Marca[] = [
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
];

export default function Marcas() {
  return (
    <section className="w-full bg-[var(--color-gray-bg)]">
      <div className="mx-auto max-w-[1280px] px-6 py-12 md:px-8 md:py-16">
        <SectionTitle
          title="Nuestras "
          highlight="marcas"
          linkText="Ver todas"
          linkHref="/marcas"
        />

        <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-5">
          {marcas.map((marca) => (
            <Link key={marca.id} href={`/catalogo?marca=${encodeURIComponent(marca.id)}`} className="group">
              <article className="flex cursor-pointer flex-col items-center gap-2 rounded-[6px] border border-gray-border bg-white p-4 transition-all duration-150 hover:border-orange hover:shadow-sm">
                <div className="flex h-[32px] w-[56px] items-center justify-center rounded-[3px] bg-gray-bg">
                  <span className="text-[15px] font-black text-[var(--color-logo-muted)]">
                    {marca.nombre.charAt(0)}
                  </span>
                </div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.08em] text-text-primary">
                  {marca.nombre}
                </h3>
                <p className="text-[9px] text-text-secondary">{marca.productos} productos</p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
