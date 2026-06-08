"use client";

import Link from "next/link";
import MarcaCard from "@/components/home/MarcaCard";
import FadeInView from "@/components/shared/FadeInView";
import SectionTitle from "@/components/shared/SectionTitle";

type Marca = { id: string; nombre: string; categorias: string[]; productos: number };

const marcas: Marca[] = [
  { id: "pirelli", nombre: "Pirelli", categorias: ["Auto", "Camión"], productos: 0 },
  { id: "dunlop", nombre: "Dunlop", categorias: ["Auto"], productos: 0 },
  { id: "continental", nombre: "Continental", categorias: ["Auto"], productos: 0 },
  { id: "falken", nombre: "Falken", categorias: ["Auto"], productos: 0 },
  { id: "corven", nombre: "Corven", categorias: ["Auto", "Camión"], productos: 0 },
  { id: "chaoyang", nombre: "Chao Yang", categorias: ["Auto"], productos: 0 },
  { id: "cargopower", nombre: "Cargo Power", categorias: ["Camión"], productos: 0 },
  { id: "westlake", nombre: "Westlake", categorias: ["Camión"], productos: 0 },
  { id: "seat", nombre: "Seat Agrícola", categorias: ["Agrícola"], productos: 0 },
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

        <FadeInView delay={0.1}>
          <div className="mt-5 grid grid-cols-3 items-stretch gap-2 sm:grid-cols-5 md:grid-cols-5">
            {marcas.map((marca) => (
              <Link key={marca.id} href={`/marcas/${marca.id}`} className="group flex">
                <MarcaCard marca={marca} className="w-full" />
              </Link>
            ))}
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
