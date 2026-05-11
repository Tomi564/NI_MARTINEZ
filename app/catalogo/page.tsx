import Link from "next/link";
import { Suspense } from "react";
import CatalogoOfertasBar from "@/components/catalogo/CatalogoOfertasBar";
import CatalogoOrdenSelect, {
  CatalogoOrdenSelectFallback,
} from "@/components/catalogo/CatalogoOrdenSelect";
import Filtros from "@/components/catalogo/Filtros";
import ProductGrid from "@/components/catalogo/ProductGrid";
import PageHeroTitle from "@/components/shared/PageHeroTitle";
import { productosMock } from "@/lib/mockProductos";

type SearchValue = string | string[] | undefined;

type CatalogoPageProps = {
  searchParams: {
    ancho?: SearchValue; perfil?: SearchValue; rodado?: SearchValue;
    marca?: SearchValue; tipo?: SearchValue; medida?: SearchValue; badge?: SearchValue;
    precio_min?: SearchValue;
    precio_max?: SearchValue;
    orden?: SearchValue;
  };
};

function getParam(value: SearchValue): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function parsePrecioParam(value: SearchValue): number | undefined {
  const raw = getParam(value);
  if (raw === undefined || raw === "") return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

function formatTipoLabel(tipo: string): string {
  if (tipo === "suv") return "SUV y 4x4";
  if (tipo === "comercial") return "Comerciales";
  if (tipo === "auto") return "Autos";
  return tipo.charAt(0).toUpperCase() + tipo.slice(1);
}

export default function CatalogoPage({ searchParams }: CatalogoPageProps) {
  const filters = {
    ancho: getParam(searchParams.ancho),
    perfil: getParam(searchParams.perfil),
    rodado: getParam(searchParams.rodado),
    marca: getParam(searchParams.marca),
    tipo: getParam(searchParams.tipo),
    medida: getParam(searchParams.medida),
    badge: getParam(searchParams.badge),
    precio_min: getParam(searchParams.precio_min),
    precio_max: getParam(searchParams.precio_max),
    orden: getParam(searchParams.orden),
  };

  const precioMinNum = parsePrecioParam(searchParams.precio_min);
  const precioMaxNum = parsePrecioParam(searchParams.precio_max);

  const isOfertas = filters.badge?.toLowerCase() === "oferta";

  const filtered = productosMock.filter((producto) => {
    const byMarca = filters.marca
      ? producto.marca.toLowerCase() === filters.marca.toLowerCase()
      : true;

    let byBadge = true;
    if (filters.badge) {
      const norm = filters.badge.toLowerCase();
      const pb = (producto.badge ?? "").toLowerCase();
      byBadge = norm === "oferta" ? pb === "oferta" : pb === norm;
    }

    const byMedida = filters.medida
      ? producto.medida.toLowerCase().includes(filters.medida.toLowerCase())
      : true;

    const byTriple =
      filters.ancho && filters.perfil && filters.rodado
        ? producto.medida
            .toLowerCase()
            .includes(`${filters.ancho}/${filters.perfil} r${filters.rodado}`.toLowerCase())
        : true;

    const byPrecioMin = precioMinNum === undefined ? true : producto.precio >= precioMinNum;
    const byPrecioMax = precioMaxNum === undefined ? true : producto.precio <= precioMaxNum;

    return byMarca && byBadge && byMedida && byTriple && byPrecioMin && byPrecioMax;
  });

  const orden = getParam(searchParams.orden)?.toLowerCase();
  const productosOrdenados = (() => {
    const list = [...filtered];
    if (orden === "precio_asc") list.sort((a, b) => a.precio - b.precio);
    else if (orden === "precio_desc") list.sort((a, b) => b.precio - a.precio);
    return list;
  })();

  const activeFilterLabel = isOfertas
    ? ""
    : filters.marca
      ? filters.marca.charAt(0).toUpperCase() + filters.marca.slice(1)
      : filters.medida
        ? filters.medida
        : filters.ancho && filters.perfil && filters.rodado
          ? `${filters.ancho}/${filters.perfil} R${filters.rodado}`
          : filters.tipo
            ? formatTipoLabel(filters.tipo)
            : "";

  const title = isOfertas
    ? "Ofertas Especiales"
    : filters.marca
      ? `Neumáticos ${filters.marca.charAt(0).toUpperCase()}${filters.marca.slice(1)}`
      : filters.ancho && filters.perfil && filters.rodado
        ? `Neumáticos ${filters.ancho}/${filters.perfil} R${filters.rodado}`
        : filters.medida
          ? `Neumáticos ${filters.medida}`
          : filters.tipo
            ? `Neumáticos ${formatTipoLabel(filters.tipo)}`
            : "Neumáticos importados";

  const breadcrumb = isOfertas
    ? [{ label: "Inicio", href: "/" }, { label: "Ofertas" }]
    : [
        { label: "Inicio", href: "/" },
        { label: "Catálogo", href: "/catalogo" },
        ...(activeFilterLabel ? [{ label: activeFilterLabel }] : []),
      ];

  return (
    <div className="min-h-screen bg-[var(--color-gray-bg)]">
      <header className="w-full border-b-[3px] border-orange bg-navy">
        <div className="mx-auto max-w-[1280px] px-5 py-8 md:px-8 md:py-10">
          <nav className="mb-2 flex flex-wrap items-center gap-1 text-[11px] text-[var(--color-text-on-dark)]">
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <span className="opacity-40">→</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/70">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
          <h1 className="font-condensed text-[28px] font-black uppercase leading-none text-white md:text-[34px]">
            <PageHeroTitle text={title} />
          </h1>
          <p className="mt-1.5 text-[13px]" style={{ color: "var(--color-text-on-dark)" }}>
            {filtered.length} producto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-5 py-8 md:px-8 md:py-10">
        <div className="flex gap-6">
          <Filtros initialFilters={filters} />

          <div className="min-w-0 flex-1">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[13px] font-bold text-text-primary">
                {filtered.length} productos
              </p>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <Suspense
                  fallback={
                    <div
                      className="h-[31px] w-[118px] shrink-0 animate-pulse rounded-[4px] bg-[var(--color-gray-border)]"
                      aria-hidden
                    />
                  }
                >
                  <CatalogoOfertasBar />
                </Suspense>
                <Suspense fallback={<CatalogoOrdenSelectFallback />}>
                  <CatalogoOrdenSelect />
                </Suspense>
              </div>
            </div>
            <ProductGrid productos={productosOrdenados} />
          </div>
        </div>
      </div>
    </div>
  );
}
