import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Envíos garantizados | Neumáticos Importados",
  description:
    "Información sobre envíos a todo Argentina, plazos, garantía de fabricante y política de cambios.",
};

const STEPS = [
  {
    title: "Elegís tu neumático",
    body: "Buscá por medida o modelo de auto y seleccioná el que necesitás. Si no sabés cuál es el indicado para tu auto, podés consultarlo con nuestros asesores en el chat de WhatsApp.",
  },
  {
    title: "Comprás en Mercado Libre",
    body: "Una vez que elegís el neumático correcto, te llevamos a la plataforma de Mercado Libre, donde podés abonar con cualquier medio de pago, en cuotas.",
  },
  {
    title: "Preparamos tu pedido",
    body: "Una vez confirmado el pago, preparamos tu pedido en nuestro depósito central.",
  },
  {
    title: "Lo recibís en casa",
    body: "Hacemos envíos a todo el país, para que en un plazo máximo de 72hs hábiles recibas tus neumáticos en el domicilio indicado.",
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
          <h1 className="font-condensed text-[28px] font-black uppercase text-white md:text-[32px]">
            Envíos y Garantías
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
                ¿Tenés alguna consulta?
              </h2>
              <p className="mt-2 font-sans text-[12px] font-normal leading-[1.5] text-white">
                Consultá con nuestros asesores por WhatsApp. Atendemos de lunes a sábado de 8 a 18hs.
              </p>
              <Link
                href="https://wa.me/5493874623496"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex w-full items-center justify-center rounded-[4px] bg-orange px-3 py-3 font-sans text-[13px] font-bold text-white transition-colors hover:bg-[var(--color-orange-hover)]"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="white" className="mr-2 flex-shrink-0" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.855L.057 23.522a.75.75 0 00.921.921l5.667-1.475A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.371l-.36-.214-3.724.969.991-3.62-.235-.374A9.818 9.818 0 1112 21.818z" />
                </svg>
                Consultar por WhatsApp
              </Link>
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
