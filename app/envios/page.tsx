import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import PageHeroTitle from "@/components/shared/PageHeroTitle";

export const metadata: Metadata = {
  title: "Envíos garantizados | Neumáticos Importados",
  description:
    "Información sobre envíos a todo Argentina, plazos, garantía de fabricante y política de cambios.",
};

const STEPS = [
  {
    title: "Elegís tu neumático",
    body: "Buscá por medida o modelo de auto y seleccioná el que necesitás.",
  },
  {
    title: "Comprás en Mercado Libre",
    body: "Te llevamos a tu publicación de MELI donde podés pagar con cualquier medio con hasta 12 cuotas sin interés.",
  },
  {
    title: "Preparamos tu pedido",
    body: "Una vez confirmado el pago, preparamos tu neumático en nuestro depósito central.",
  },
  {
    title: "Lo recibís en casa",
    body: "Enviamos a todo el país vía transporte. Entrega estimada: 24 a 72hs hábiles según tu zona.",
  },
] as const;

const ZONAS = [
  { zona: "AMBA y GBA", tiempo: "24-48hs hábiles", costo: "Gratis" },
  { zona: "Interior del país", tiempo: "48-72hs hábiles", costo: "Gratis" },
  { zona: "Zonas remotas", tiempo: "5-7 días hábiles", costo: "Gratis" },
] as const;

const DEVOLUCIONES_ITEMS = [
  "El producto debe estar sin uso y en su embalaje original",
  "Tenés hasta 30 días desde la recepción para solicitar el cambio",
  "El costo del envío de devolución está a nuestro cargo",
] as const;

const GARANTIA_ITEMS = [
  "Garantía de fábrica según cada marca (1 a 5 años)",
  "DOT visible y verificable en cada unidad",
  "En caso de defecto de fabricación, gestionamos el reclamo directo con la marca",
] as const;

function CardShell({
  id,
  children,
}: {
  id?: string;
  children: ReactNode;
}) {
  return (
    <article
      id={id}
      className="rounded-lg border-[0.5px] border-gray-border bg-white p-6 border-t-[3px] border-t-orange"
    >
      {children}
    </article>
  );
}

export default function EnviosPage() {
  return (
    <div className="min-h-screen bg-gray-bg">
      <header className="w-full border-b-[3px] border-orange bg-navy">
        <div className="mx-auto max-w-[1280px] px-5 py-8 md:px-8 md:py-10">
          <nav className="mb-2 flex flex-wrap items-center gap-1 text-[11px] text-[var(--color-text-on-dark)]">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <span className="opacity-40">→</span>
            <span className="text-white/60">Envíos</span>
          </nav>
          <h1 className="font-condensed text-[28px] font-black uppercase leading-none text-white md:text-[34px]">
            <PageHeroTitle text="Envíos garantizados" />
          </h1>
          <p className="mt-1.5 text-[13px]" style={{ color: "var(--color-text-on-dark)" }}>
            Todo lo que necesitás saber antes de comprar
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-5 py-8 md:px-8 md:py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <CardShell>
              <h2 className="mb-4 font-condensed text-[18px] font-black uppercase text-navy">
                Cómo funciona el envío
              </h2>
              <ol className="list-none p-0">
                {STEPS.map((step, i) => (
                  <li key={step.title} className="mb-4 flex gap-3 items-start last:mb-0">
                    <div
                      className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-orange font-sans text-[13px] font-extrabold text-white"
                      aria-hidden
                    >
                      {i + 1}
                    </div>
                    <div>
                      <p className="mb-1 font-sans text-[13px] font-bold text-navy">
                        {step.title}
                      </p>
                      <p
                        className="font-sans text-[11px] font-normal text-text-secondary"
                        style={{ lineHeight: 1.5 }}
                      >
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardShell>

            <CardShell>
              <h2 className="mb-4 font-condensed text-[18px] font-black uppercase text-navy">
                Zonas y tiempos de entrega
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-orange text-white">
                      <th className="px-3 py-2 font-sans text-[11px] font-bold uppercase">
                        Zona
                      </th>
                      <th className="px-3 py-2 font-sans text-[11px] font-bold uppercase">
                        Tiempo estimado
                      </th>
                      <th className="px-3 py-2 font-sans text-[11px] font-bold uppercase">
                        Costo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="font-sans text-[12px] font-normal text-text-primary">
                    {ZONAS.map((row, idx) => (
                      <tr
                        key={row.zona}
                        className={
                          idx % 2 === 0 ? "bg-white" : "bg-gray-bg"
                        }
                      >
                        <td className="border-[0.5px] border-gray-border px-3 py-2">
                          {row.zona}
                        </td>
                        <td className="border-[0.5px] border-gray-border px-3 py-2">
                          {row.tiempo}
                        </td>
                        <td className="border-[0.5px] border-gray-border px-3 py-2">
                          {row.costo}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 font-sans text-[10px] font-normal italic text-text-secondary">
                (*) Envío gratis en todos los pedidos sin mínimo de compra.
              </p>
            </CardShell>
          </div>

          <div className="flex flex-col gap-6">
            <CardShell id="devoluciones">
              <h2 className="mb-4 font-condensed text-[18px] font-black uppercase text-navy">
                Cambios y Devoluciones
              </h2>
              <p className="mb-4 font-sans text-[12px] font-normal text-text-secondary">
                Entendemos que elegir la medida correcta puede ser difícil. Por eso ofrecemos
                cambio gratis si te equivocás.
              </p>
              <ul className="list-none space-y-3 p-0">
                {DEVOLUCIONES_ITEMS.map((item) => (
                  <li key={item} className="flex gap-2 items-start">
                    <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange" />
                    <span className="font-sans text-[12px] font-normal text-text-secondary">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </CardShell>

            <CardShell id="garantia">
              <h2 className="mb-4 font-condensed text-[18px] font-black uppercase text-navy">
                Garantía de Producto
              </h2>
              <p className="mb-4 font-sans text-[12px] font-normal text-text-secondary">
                Todos nuestros neumáticos son originales y cuentan con garantía oficial del
                fabricante.
              </p>
              <ul className="list-none space-y-3 p-0">
                {GARANTIA_ITEMS.map((item) => (
                  <li key={item} className="flex gap-2 items-start">
                    <ShieldIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange" />
                    <span className="font-sans text-[12px] font-normal text-text-secondary">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </CardShell>

            <section className="rounded-lg bg-navy p-5">
              <h2 className="font-condensed text-[18px] font-black uppercase text-orange">
                ¿Necesitás ayuda?
              </h2>
              <p className="mt-2 font-sans text-[12px] font-normal text-white">
                Nuestro equipo responde consultas de lunes a sábado de 9 a 20hs.
              </p>
              <a
                href="https://wa.me/5491100000000"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded bg-[var(--color-whatsapp)] px-3 py-3 font-sans text-[13px] font-bold text-white transition-opacity hover:opacity-90"
              >
                <WhatsappGlyph className="h-5 w-5 text-white" />
                Consultar por WhatsApp
              </a>
              <p className="mt-2 text-center font-sans text-[10px] font-normal text-white/90">
                O escribinos a info@neumaticosimportados.com.ar
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M13.5 4.5L6.5 11.5L2.5 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M8 1.5L3 3.5V7.5C3 11 8 14.5 8 14.5C8 14.5 13 11 13 7.5V3.5L8 1.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.75 8L7.25 9.5L10.75 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsappGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
