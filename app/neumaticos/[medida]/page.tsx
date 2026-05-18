import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/catalogo/ProductGrid";
import BuscadorCompacto from "@/components/neumaticos/BuscadorCompacto";
import MedidaDiagrama from "@/components/neumaticos/MedidaDiagrama";
import SectionTitle from "@/components/shared/SectionTitle";
import { autosPorMedida, getTextoAutosPorMedida } from "@/lib/autos-por-medida";
import { productosMock } from "@/lib/mockProductos";
import {
  getMedidasRelacionadas,
  isValidMedidaSlug,
  medidaToSlug,
  MEDIDAS_POPULARES_SLUGS,
  parseMedida,
  productoMatchesMedida,
} from "@/lib/medidas";
import { getSiteUrl } from "@/lib/site";
import type { ProductoMock } from "@/lib/types";

type NeumaticosMedidaPageProps = {
  params: { medida: string };
};

export function generateStaticParams() {
  return MEDIDAS_POPULARES_SLUGS.map((medida) => ({ medida }));
}

export async function generateMetadata({ params }: NeumaticosMedidaPageProps): Promise<Metadata> {
  if (!isValidMedidaSlug(params.medida)) {
    return { title: "Medida no encontrada" };
  }

  const { display, ancho, perfil, rodado } = parseMedida(params.medida);
  const siteUrl = getSiteUrl();
  const canonical = `${siteUrl}/neumaticos/${params.medida}`;
  const title = `Neumáticos ${display} | Comprá Online con Envío a Todo Argentina`;
  const description = `Comprá neumáticos ${display} online. Pirelli, Dunlop, Bridgestone y más marcas. Envío gratis a todo Argentina. Hasta 12 cuotas sin interés vía Mercado Pago.`;
  const keywords = `neumáticos ${display}, cubiertas ${display}, neumáticos ${ancho}/${perfil} R${rodado} Argentina, comprar neumáticos online`;

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

function filterProductosPorMedida(ancho: string, perfil: string, rodado: string): ProductoMock[] {
  return productosMock.filter((p) => productoMatchesMedida(p.medida, ancho, perfil, rodado));
}

function getProductosRelacionados(ancho: string, perfil: string, rodado: string): ProductoMock[] {
  const rodadoNum = Number(rodado);
  const perfilNum = Number(perfil);

  return productosMock
    .filter((p) => !productoMatchesMedida(p.medida, ancho, perfil, rodado))
    .filter((p) => {
      const match = p.medida.match(/(\d+)\/(\d+)\s+R(\d+)/);
      if (!match) return false;
      const pPerfil = Number(match[2]);
      const pRodado = Number(match[3]);
      return pRodado === rodadoNum || Math.abs(pPerfil - perfilNum) <= 10;
    })
    .slice(0, 4);
}

export default function NeumaticosMedidaPage({ params }: NeumaticosMedidaPageProps) {
  if (!isValidMedidaSlug(params.medida)) {
    notFound();
  }

  const { ancho, perfil, rodado, display } = parseMedida(params.medida);
  const productos = filterProductosPorMedida(ancho, perfil, rodado);
  const productosRelacionados = getProductosRelacionados(ancho, perfil, rodado);
  const marcas = [...new Set(productos.map((p) => p.marca))];
  const medidasRelacionadas = getMedidasRelacionadas(params.medida);
  const textoAutos = getTextoAutosPorMedida(display, rodado);
  const tieneAutosEspecificos = Boolean(autosPorMedida[display]);

  return (
    <div className="min-h-screen bg-gray-bg">
      {/* Sección 1 — Header */}
      <section className="w-full border-b-[3px] border-orange bg-navy">
        <div className="mx-auto max-w-[1280px] px-5 py-8 md:px-8 md:py-10">
          <nav className="mb-4 flex flex-wrap items-center gap-1 text-[11px] text-[var(--color-text-on-dark)]">
            <Link href="/" className="transition-colors hover:text-white">
              Inicio
            </Link>
            <span className="opacity-40">→</span>
            <Link href="/catalogo" className="transition-colors hover:text-white">
              Neumáticos
            </Link>
            <span className="opacity-40">→</span>
            <span className="text-white">{display}</span>
          </nav>

          <h1 className="font-condensed text-[32px] font-black uppercase leading-tight tracking-[0.02em] text-white">
            Neumáticos {display}
          </h1>

          <p className="mt-3 max-w-[720px] text-[14px] leading-relaxed text-[var(--color-text-on-dark)]">
            Encontrá los mejores neumáticos {display} con envío a todo Argentina. Stock disponible de
            las principales marcas importadas.
          </p>

          {marcas.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {marcas.map((marca) => (
                <span
                  key={marca}
                  className="rounded-[4px] border border-[var(--color-navy-border)] bg-[var(--color-navy-surface)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-white"
                >
                  {marca}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Sección 2 — Contenido educativo */}
      <section className="w-full bg-gray-bg">
        <div>
          <div className="mx-auto max-w-[1280px] px-5 py-10 md:px-8 md:py-14">
            <div className="grid gap-10 lg:grid-cols-2">
              <article className="rounded-[6px] border border-gray-border bg-white p-6 md:p-8">
                <h2 className="font-condensed text-[20px] font-black uppercase text-text-primary">
                  ¿Qué autos usan la medida {display}?
                </h2>
                <p className="mt-3 text-[14px] leading-relaxed text-text-secondary">
                  {tieneAutosEspecificos ? (
                    <>
                      La medida {display} es muy común en modelos como{" "}
                      <strong className="text-text-primary">{textoAutos}</strong>.
                    </>
                  ) : (
                    <>
                      La medida {display} es habitual en{" "}
                      <strong className="text-text-primary">{textoAutos}</strong> vendidos en
                      Argentina.
                    </>
                  )}
                </p>
              </article>

              <article className="rounded-[6px] border border-gray-border bg-white p-6 md:p-8">
                <h2 className="font-condensed text-[20px] font-black uppercase text-text-primary">
                  ¿Cómo leer la medida {display}?
                </h2>
                <ul className="mt-4 space-y-2 text-[14px] text-text-secondary">
                  <li>
                    <strong className="text-text-primary">{ancho} mm</strong> — ancho de la banda de
                    rodadura
                  </li>
                  <li>
                    <strong className="text-text-primary">{perfil}%</strong> — altura del flanco como
                    porcentaje del ancho
                  </li>
                  <li>
                    <strong className="text-text-primary">R{rodado}</strong> — diámetro del aro en
                    pulgadas
                  </li>
                </ul>
                <div className="mt-6 flex justify-center">
                  <MedidaDiagrama ancho={ancho} perfil={perfil} rodado={rodado} />
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 3 — Productos */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-[1280px] px-5 py-10 md:px-8 md:py-14">
          <SectionTitle
            title={`Neumáticos ${display} `}
            highlight="disponibles"
            linkText="Ver catálogo"
            linkHref="/catalogo"
          />

          <div className="mt-6">
            {productos.length > 0 ? (
              <ProductGrid productos={productos} />
            ) : (
              <div className="space-y-8">
                <div>
                  <div className="rounded-[6px] border border-gray-border bg-gray-bg p-8 text-center">
                    <p className="font-condensed text-[18px] font-black uppercase text-text-primary">
                      Sin stock para {display} en este momento
                    </p>
                    <p className="mt-2 text-[13px] text-text-secondary">
                      Probá otra medida o consultanos por WhatsApp para verificar disponibilidad.
                    </p>
                  </div>
                  <div className="rounded-[6px] border border-gray-border bg-navy p-6 md:p-8">
                    <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--color-text-on-dark)]">
                      Buscar otra medida
                    </p>
                    <BuscadorCompacto
                      defaultAncho={ancho}
                      defaultPerfil={perfil}
                      defaultRodado={rodado}
                    />
                  </div>
                </div>

                {productosRelacionados.length > 0 ? (
                  <div>
                    <h3 className="mb-4 font-condensed text-[18px] font-black uppercase text-text-primary">
                      Productos relacionados
                    </h3>
                    <ProductGrid productos={productosRelacionados} />
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sección 4 — Medidas relacionadas */}
      <section className="w-full bg-gray-bg">
        <div className="mx-auto max-w-[1280px] px-5 py-10 md:px-8 md:py-14">
          <SectionTitle title="Medidas " highlight="similares" />
          <div>
            <div className="mt-5 flex flex-wrap gap-2">
              {medidasRelacionadas.map((medida) => (
                <Link
                  key={medida.display}
                  href={`/neumaticos/${medidaToSlug(medida.ancho, medida.perfil, medida.rodado)}`}
                  className="rounded-[4px] border border-gray-border bg-white px-4 py-2 text-[12px] font-bold tracking-[0.04em] text-text-primary transition-colors duration-150 hover:border-orange hover:bg-orange hover:text-white"
                >
                  {medida.display}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sección 5 — CTA final */}
      <section className="w-full bg-navy">
        <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-8 md:py-16">
          <h2 className="font-condensed text-[24px] font-black uppercase text-white">
            ¿No encontrás lo que buscás?
          </h2>
          <p className="mt-2 text-[14px] text-[var(--color-text-on-dark)]">
            Contactanos y te asesoramos sin cargo
          </p>

          <Link
            href="/contacto"
            className="mt-6 inline-flex h-[52px] items-center rounded-[4px] bg-orange px-8 text-[13px] font-extrabold uppercase tracking-[0.07em] text-white transition-colors hover:bg-[var(--color-orange-hover)]"
          >
            Ir a contacto
          </Link>

          <div className="mt-10 border-t border-[var(--color-navy-border)] pt-8">
            <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--color-text-on-dark)]">
              Buscar por medida
            </p>
            <BuscadorCompacto defaultAncho={ancho} defaultPerfil={perfil} defaultRodado={rodado} />
          </div>
        </div>
      </section>
    </div>
  );
}
