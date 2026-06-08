"use client";

import Link from "next/link";
import FadeInView from "@/components/shared/FadeInView";
import SectionTitle from "@/components/shared/SectionTitle";
import { displayToSlug } from "@/lib/medidas";

const medidas = [
  "175/65 R14","185/60 R14","185/65 R15","195/55 R15","195/65 R15",
  "205/55 R16","205/60 R16","215/55 R17","215/60 R17","225/45 R18",
  "235/65 R17","265/65 R17",
] as const;

export default function MedidasRapidas() {
  return (
    <section className="w-full bg-[var(--color-gray-bg)]">
      <div className="mx-auto max-w-[1280px] px-6 pt-10 pb-5 md:px-8 md:pt-14 md:pb-6">
        <SectionTitle
          title="Medidas "
          highlight="más buscadas"
          linkText="Ver catálogo"
          linkHref="/catalogo"
        />

        <FadeInView delay={0.1}>
          <div className="mt-5 flex flex-wrap gap-2">
            {medidas.map((medida) => (
              <Link
                key={medida}
                href={`/neumaticos/${displayToSlug(medida)}`}
                className="rounded-[4px] border border-gray-border bg-white px-4 py-2 text-[12px] font-bold tracking-[0.04em] text-text-primary transition-colors duration-150 hover:border-orange hover:bg-orange hover:text-white"
              >
                {medida}
              </Link>
            ))}
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
