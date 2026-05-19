import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import ProductCard from "@/components/catalogo/ProductCard";
import SectionTitle from "@/components/shared/SectionTitle";
import { productosMock } from "@/lib/mockProductos";

interface ProductoPageProps {
  params: { id: string };
}

function formatPriceARS(value: number) {
  return value.toLocaleString("es-AR");
}

function truncate(text: string, max: number) {
  return text.length <= max ? text : `${text.slice(0, max - 1)}…`;
}

export default function ProductoPage({ params }: ProductoPageProps) {
  const producto = productosMock.find((item) => item.id === params.id);
  if (!producto) notFound();

  const related = productosMock.filter((item) => item.id !== producto.id).slice(0, 4);
  const cuotas = producto.cuotas ?? 12;
  const valorCuota = Math.ceil(producto.precio / cuotas);
  const specs = [
    { label: "Medida", valor: producto.medida },
    { label: "Marca", valor: producto.marca },
    { label: "Índice de carga", valor: "112" },
    { label: "Índice de velocidad", valor: "T (190 km/h)" },
    { label: "Tipo de terreno", valor: "All Terrain" },
    { label: "Estación", valor: "All Season" },
    { label: "Construcción", valor: "Radial" },
    { label: "DOT", valor: "Certificado" },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-gray-bg)]">
      {/* Breadcrumb header */}
      <div className="w-full bg-navy">
        <div className="mx-auto max-w-[1280px] px-5 py-3 md:px-8">
          <nav className="flex flex-wrap items-center gap-1 text-[11px] text-[var(--color-text-on-dark)]">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <span className="opacity-40">→</span>
            <Link href="/catalogo" className="hover:text-white transition-colors">Catálogo</Link>
            <span className="opacity-40">→</span>
            <Link
              href={`/catalogo?marca=${encodeURIComponent(producto.marca.toLowerCase())}`}
              className="hover:text-white transition-colors"
            >
              {producto.marca}
            </Link>
            <span className="opacity-40">→</span>
            <span className="text-white/60">{truncate(producto.titulo, 30)}</span>
          </nav>
        </div>
      </div>

      {/* Main product section */}
      <section className="mx-auto max-w-[1280px] px-5 py-8 md:px-8 md:py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="relative flex h-[280px] items-center justify-center rounded-[8px] border border-gray-border bg-[var(--color-surface-soft)] md:h-[360px]">
              {producto.badge ? (
                <span className="absolute left-3 top-3 rounded-[3px] bg-orange px-2 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-white">
                  {producto.badge}
                </span>
              ) : null}
              <DetailedWheel />
            </div>
            <div className="mt-3 flex gap-2">
              {[0, 1, 2].map((idx) => (
                <div
                  key={`thumb-${idx}`}
                  className={`flex h-[64px] w-[80px] items-center justify-center rounded-[6px] bg-[var(--color-surface-soft)] ${
                    idx === 0 ? "border-[2px] border-orange" : "border border-gray-border"
                  }`}
                >
                  <DetailedWheel small />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-orange">
              {producto.marca}
            </p>
            <h1 className="mt-1 font-condensed text-[24px] font-black uppercase leading-[1.05] text-text-primary md:text-[30px]">
              {producto.titulo}
            </h1>
            <span className="mt-2 inline-block rounded-[4px] bg-navy px-3 py-1 text-[12px] font-bold text-white">
              {producto.medida}
            </span>

            {/* Price box */}
            <div className="mt-4 rounded-[6px] border border-gray-border bg-white p-4">
              {producto.precioOriginal ? (
                <p className="text-[14px] text-text-secondary line-through">
                  ${formatPriceARS(producto.precioOriginal)}
                </p>
              ) : null}
              <p className="font-condensed text-[40px] font-black leading-none text-text-primary">
                ${formatPriceARS(producto.precio)}
              </p>
              <p className="mt-1 text-[13px] font-semibold text-[#1A6E32]">
                {cuotas} cuotas sin interés de ${formatPriceARS(valorCuota)}
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href="#"
                className="inline-flex w-full items-center justify-center gap-2 rounded-[4px] bg-orange px-4 py-[13px] text-[14px] font-extrabold uppercase tracking-[0.07em] text-white transition-colors duration-150 hover:bg-[var(--color-orange-hover)]"
              >
                <CartIcon />
                Comprar en Mercado Libre
              </Link>
              <Link
                href="/contacto"
                className="inline-flex w-full items-center justify-center gap-2 rounded-[4px] border-[1.5px] border-navy px-4 py-3 text-[13px] font-bold text-navy transition-colors duration-150 hover:bg-navy hover:text-white"
              >
                Consultar disponibilidad
              </Link>
            </div>
            <p className="mt-2 text-center text-[10px] text-text-secondary">
              Serás redirigido a Mercado Libre para finalizar tu compra
            </p>

            {/* Trust bullets */}
            <div className="mt-4 rounded-[6px] border border-gray-border bg-white p-4">
              <InfoRow icon={<TruckIcon />} title="Envío gratis a todo el país" detail="Entrega estimada: 24 a 72hs hábiles" />
              <InfoRow icon={<ShieldIcon />} title="Producto original certificado" detail="DOT visible en cada unidad" />
              <InfoRow icon={<RefreshIcon />} title="Cambio gratis" detail="Si te equivocás de medida, lo cambiamos" last />
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="mx-auto max-w-[1280px] px-5 pb-8 md:px-8">
        <SectionTitle title="Especificaciones " highlight="técnicas" />
        <div className="mt-4 overflow-hidden rounded-[6px] border border-gray-border bg-white">
          {specs.map((spec, idx) => (
            <div
              key={spec.label}
              className={`grid grid-cols-2 border-b border-gray-border px-4 py-3 last:border-b-0 ${
                idx % 2 === 1 ? "bg-gray-bg" : "bg-white"
              }`}
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-text-secondary">
                {spec.label}
              </span>
              <span className="text-[12px] font-semibold text-text-primary">{spec.valor}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Características */}
      <section className="mx-auto max-w-[1280px] px-5 pb-8 md:px-8">
        <SectionTitle title="Características " highlight="del producto" />
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          <FeatureCard
            icon={<TractionIcon />}
            titulo="Tracción Superior"
            descripcion="Diseño de banda optimizado para máximo agarre en seco y mojado"
          />
          <FeatureCard
            icon={<DurabilityIcon />}
            titulo="Larga Vida Útil"
            descripcion="Compuesto de caucho reforzado para mayor kilometraje"
          />
          <FeatureCard
            icon={<ComfortIcon />}
            titulo="Confort de Marcha"
            descripcion="Diseño que minimiza el ruido y absorbe las irregularidades del camino"
          />
          <FeatureCard
            icon={<EfficiencyIcon />}
            titulo="Bajo Consumo"
            descripcion="Resistencia a la rodadura optimizada para menor consumo de combustible"
          />
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-[1280px] px-5 pb-12 md:px-8 md:pb-16">
        <SectionTitle title="También te puede " highlight="interesar" />
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {related.map((item) => (
            <div key={item.id} className="flex">
              <ProductCard producto={item} className="w-full" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  titulo,
  descripcion,
}: {
  icon: ReactNode;
  titulo: string;
  descripcion: string;
}) {
  return (
    <article className="rounded-[5px] border border-[0.5px] border-gray-border border-t-[3px] border-t-orange bg-white p-4 text-center">
      <div className="mb-3 flex justify-center text-orange">{icon}</div>
      <h3 className="mb-1 font-sans text-[13px] font-bold text-text-primary">{titulo}</h3>
      <p className="font-sans text-[11px] font-normal leading-[1.5] text-text-secondary">
        {descripcion}
      </p>
    </article>
  );
}

function InfoRow({
  icon, title, detail, last = false,
}: {
  icon: ReactNode; title: string; detail: string; last?: boolean;
}) {
  return (
    <div className={`flex items-start gap-3 py-2.5 ${last ? "" : "border-b border-gray-border"}`}>
      <span className="mt-0.5 shrink-0 text-navy">{icon}</span>
      <div>
        <p className="text-[12px] font-bold text-text-primary">{title}</p>
        <p className="text-[10px] text-text-secondary">{detail}</p>
      </div>
    </div>
  );
}

function DetailedWheel({ small = false }: { small?: boolean }) {
  const size = small ? 36 : 160;
  const stroke = "var(--color-wheel-placeholder)";
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" fill="none" aria-hidden="true">
      <circle cx="80" cy="80" r="70" stroke={stroke} strokeWidth="8" />
      <circle cx="80" cy="80" r="50" stroke={stroke} strokeWidth="5" />
      <circle cx="80" cy="80" r="16" fill={stroke} />
      <path d="M80 24V54M80 106V136M24 80H54M106 80H136M43 43L61 61M117 43L99 61M43 117L61 99M117 117L99 99" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
      {Array.from({ length: 12 }, (_, idx) => (
        <rect key={`tread-${idx}`} x={76} y={6} width={8} height={12} rx={2} fill={stroke} transform={`rotate(${idx * 30} 80 80)`} />
      ))}
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6h15l-1.5 9H7.5L6 6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M6 6 5 3H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="9" cy="20" r="1.5" fill="currentColor" />
      <circle cx="18" cy="20" r="1.5" fill="currentColor" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 7h12v8H3V7Z" stroke="currentColor" strokeWidth="2" />
      <path d="M15 10h4l2 2v3h-6v-5Z" stroke="currentColor" strokeWidth="2" />
      <circle cx="7" cy="17" r="1.5" fill="currentColor" />
      <circle cx="17" cy="17" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3 19 6V12C19 16.4 15.9 20.3 12 21C8.1 20.3 5 16.4 5 12V6L12 3Z" stroke="currentColor" strokeWidth="2" />
      <path d="M9 12 11 14 15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12a8 8 0 0 1 13.7-5.6L20 9M20 9V5M20 12a8 8 0 0 1-13.7 5.6L4 15M4 15v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TractionIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M12 5v4M12 15v4M5 12h4M15 12h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7.5 7.5l2.8 2.8M13.7 13.7l2.8 2.8M16.5 7.5l-2.8 2.8M10.3 13.7l-2.8 2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DurabilityIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3 19 6V12C19 16.4 15.9 20.3 12 21C8.1 20.3 5 16.4 5 12V6L12 3Z" stroke="currentColor" strokeWidth="2" />
      <path d="M9 12 11 14 15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ComfortIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 14h16l-1-4H6l-2 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="7" cy="17" r="1.5" fill="currentColor" />
      <circle cx="17" cy="17" r="1.5" fill="currentColor" />
      <path d="M9 10V8a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function EfficiencyIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3C8 8 6 11 6 14a6 6 0 0 0 12 0c0-3-2-6-6-11Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 14v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
