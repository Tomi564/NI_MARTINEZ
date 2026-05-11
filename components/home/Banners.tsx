import Link from "next/link";

type Banner = { href: string; titulo: string; sub: string; cta: string };

const banners: Banner[] = [
  {
    href: "/envios",
    titulo: "Hasta 12 cuotas\nsin interés",
    sub: "Con todas las tarjetas vía Mercado Pago",
    cta: "Ver más",
  },
  {
    href: "/catalogo?badge=oferta",
    titulo: "Comprá 4 y\npagá 3",
    sub: "Promo válida en medidas seleccionadas",
    cta: "Aprovechar",
  },
];

export default function Banners() {
  return (
    <section className="w-full bg-[var(--color-gray-bg)]">
      <div className="mx-auto max-w-[1280px] px-6 py-5 md:px-8 md:py-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {banners.map((banner, index) => (
            <Link key={`${banner.href}-${index}`} href={banner.href} className="group">
              <article className="flex items-center gap-4 rounded-[6px] border-[0.5px] border-[var(--color-navy-strong-border)] border-l-[4px] border-l-orange bg-navy p-5 transition-colors duration-150 hover:bg-[var(--color-navy-surface)]">
                <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[4px] bg-[var(--color-orange-12)]">
                  {index === 0 ? <TruckIcon /> : <PackageIcon />}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-condensed text-[17px] font-black uppercase leading-[1.1] text-white whitespace-pre-line">
                    {banner.titulo}
                  </h3>
                  <p className="mt-1 text-[11px] leading-[1.4] whitespace-pre-line" style={{ color: "var(--color-text-on-dark)" }}>
                    {banner.sub}
                  </p>
                </div>
                <span className="ml-auto shrink-0 rounded-[3px] bg-orange px-4 py-2 text-[10px] font-bold uppercase tracking-[0.06em] text-white">
                  {banner.cta}
                </span>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function TruckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 6h12v10H3V6Z" stroke="var(--color-orange)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M15 10h4l2 2v4h-6V10Z" stroke="var(--color-orange)" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="7" cy="18" r="2" fill="var(--color-orange)" />
      <circle cx="17" cy="18" r="2" fill="var(--color-orange)" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 8 12 3 3 8v10l9 3 9-3V8Z" stroke="var(--color-orange)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M3 8l9 3 9-3" stroke="var(--color-orange)" strokeWidth="2" />
      <path d="M12 11v10" stroke="var(--color-orange)" strokeWidth="2" />
    </svg>
  );
}
