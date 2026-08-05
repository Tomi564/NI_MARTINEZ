import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarcaLogoHeader from "@/components/marcas/MarcaLogoHeader";
import OtraMarcaCard from "@/components/marcas/OtraMarcaCard";
import SectionTitle from "@/components/shared/SectionTitle";
import { marcasData } from "@/lib/marcas-data";
import {
  getBanderaPais,
  getEspecialidadDescripcion,
  getMarcaBySlug,
  getMedidasParaMarca,
  getOtrasMarcasPopulares,
  isValidMarcaSlug,
} from "@/lib/marcas";
import { getSiteUrl } from "@/lib/site";

type MarcaPageProps = {
  params: { marca: string };
};

export function generateStaticParams() {
  return marcasData.map((m) => ({ marca: m.slug }));
}

export async function generateMetadata({ params }: MarcaPageProps): Promise<Metadata> {
  const marca = getMarcaBySlug(params.marca);
  if (!marca) {
    return { title: "Marca no encontrada" };
  }

  const siteUrl = getSiteUrl();
  const canonical = `${siteUrl}/marcas/${marca.slug}`;
  const title = `Neumáticos ${marca.nombre} | Comprá Online con Envío a Todo Argentina`;
  const description = `${marca.descripcionCorta} Comprá online con envío gratis a todo Argentina. Hasta 12 cuotas sin interés.`;
  const keywords = `neumáticos ${marca.nombre}, cubiertas ${marca.nombre}, ${marca.nombre} Argentina, comprar ${marca.nombre} online`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonical,
    },
  };
}

export default function MarcaPage({ params }: MarcaPageProps) {
  const marca = getMarcaBySlug(params.marca);
  if (!marca || !isValidMarcaSlug(params.marca)) {
    notFound();
  }

  const medidas = getMedidasParaMarca(marca.nombre);
  const otrasMarcas = getOtrasMarcasPopulares(marca.slug);
  const bandera = getBanderaPais(marca.paisOrigen);
  const puntosFuertes = marca.especialidad.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-bg">
      {/* Sección 1 — Header */}
      <section className="relative w-full overflow-hidden border-b-[3px] border-orange bg-navy">
        <div className="relative z-10 mx-auto max-w-[1280px] px-5 py-8 md:px-8 md:py-10">
          <nav className="mb-4 flex flex-wrap items-center gap-1 text-[11px] text-[var(--color-text-on-dark)]">
            <Link href="/" className="transition-colors hover:text-white">
              Inicio
            </Link>
            <span className="opacity-40">→</span>
            <Link href="/marcas" className="transition-colors hover:text-white">
              Marcas
            </Link>
            <span className="opacity-40">→</span>
            <span className="text-white">{marca.nombre}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
            <div>
              <MarcaLogoHeader nombre={marca.nombre} slug={marca.slug} />
              <h1 className="font-condensed text-[32px] font-black uppercase leading-tight text-white">
                Neumáticos {marca.nombre}
              </h1>
              <p className="mt-3 max-w-[640px] text-[14px] font-normal leading-relaxed text-[#8FAABB]">
                {marca.descripcionCorta}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {marca.especialidad.map((item) => (
                  <span
                    key={item}
                    className="rounded-[2px] border border-[rgba(232,78,15,0.3)] bg-[rgba(232,78,15,0.15)] px-[10px] py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-orange"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid w-full max-w-[320px] grid-cols-2 gap-2 sm:max-w-none lg:w-[320px]">
              <StatCard label="Origen" value={`${bandera} ${marca.paisOrigen}`} />
              <StatCard label="Fundación" value={marca.fundacion} />
              <StatCard label="En catálogo" value="Próximamente" />
              <StatCard label="Envío" value="🚚 Gratis a todo el país" />
            </div>
          </div>
        </div>
      </section>

      {/* Sección 2 — Historia */}
      <section className="w-full bg-gray-bg">
        <div>
          <div className="mx-auto max-w-[1280px] px-5 py-10 md:px-8 md:py-14">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <SectionTitle title="Sobre " highlight={marca.nombre} />
                <p className="mt-4 text-[14px] font-normal leading-[1.7] text-text-secondary">
                  {marca.descripcionLarga}
                </p>
                <ul className="mt-6 space-y-2">
                  {marca.especialidad.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[13px] text-text-secondary">
                      <CheckIcon className="mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <article className="rounded-[5px] border-t-[3px] border-orange bg-white p-5 md:p-6">
                <h2 className="font-condensed text-[18px] font-black uppercase text-text-primary">
                  ¿Por qué elegir {marca.nombre}?
                </h2>
                <ul className="mt-4 space-y-4">
                  {puntosFuertes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <StarIcon className="mt-0.5 shrink-0 text-orange" />
                      <div>
                        <p className="text-[13px] font-bold text-text-primary">{item}</p>
                        <p className="mt-0.5 text-[12px] leading-relaxed text-text-secondary">
                          {getEspecialidadDescripcion(item)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 3 — Productos (ocultos mientras catálogo en próximamente) */}
      <div className="w-full bg-[var(--color-gray-bg)] py-12">
        <div className="mx-auto max-w-[1280px] px-6 text-center md:px-8">
          <p className="text-[13px] italic text-[var(--color-text-secondary)]">
            Los productos de esta marca estarán disponibles próximamente.
          </p>
        </div>
      </div>

      {/* Sección 4 — Medidas */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-[1280px] px-5 py-10 md:px-8 md:py-14">
          <SectionTitle title="Medidas " highlight="disponibles" />
          <div className="mt-5 flex flex-wrap gap-2">
            {medidas.map((medida) => (
              <Link
                key={medida.slug}
                href={`/neumaticos/${medida.slug}`}
                className="rounded-[4px] border border-gray-border bg-white px-4 py-2 text-[12px] font-bold tracking-[0.04em] text-text-primary transition-colors duration-150 hover:border-orange hover:bg-orange hover:text-white"
              >
                {medida.display}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sección 5 — Otras marcas */}
      <section className="w-full bg-navy">
        <div className="mx-auto max-w-[1280px] px-5 py-10 md:px-8 md:py-14">
          <SectionTitle title="Otras " highlight="marcas" light />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {otrasMarcas.map((otra) => (
              <OtraMarcaCard
                key={otra.slug}
                slug={otra.slug}
                nombre={otra.nombre}
                productos={0}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-[5px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] p-3"
      style={{ borderWidth: "0.5px" }}
    >
      <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--color-text-on-dark-muted)]">
        {label}
      </p>
      <p className="mt-1 text-[12px] font-bold text-white">{value}</p>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M13.5 4.5L6.5 11.5L2.5 7.5"
        stroke="var(--color-orange)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2L14.9 8.6L22 9.3L16.5 14.1L18.2 21.2L12 17.8L5.8 21.2L7.5 14.1L2 9.3L9.1 8.6L12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}
