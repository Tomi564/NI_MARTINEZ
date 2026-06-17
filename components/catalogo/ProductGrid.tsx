import ProductCard from "./ProductCard";
import { ProductoMock } from "@/lib/types";
import Link from "next/link";

interface ProductGridProps {
  productos: ProductoMock[];
  loading?: boolean;
}

export default function ProductGrid({ productos, loading = false }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, idx) => (
          <div key={`skeleton-${idx}`} className="flex h-[320px]">
            <div className="h-full w-full animate-pulse rounded-[6px] border border-gray-border bg-white" />
          </div>
        ))}
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className="rounded-[6px] border border-gray-border bg-white p-10 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gray-bg">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-text-secondary">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <line x1="16.65" y1="16.65" x2="22" y2="22" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <p className="text-[13px] font-semibold text-text-primary">Sin resultados</p>
        <p className="mt-1 text-[12px] text-text-secondary">
          No encontramos neumáticos con esos filtros.
        </p>
        <Link
          href="/catalogo"
          className="mt-4 inline-block rounded-[4px] bg-orange px-5 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-white"
        >
          Ver todo el catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {productos.map((producto) => (
        <div key={producto.id} className="flex">
          <ProductCard producto={producto} className="w-full" />
        </div>
      ))}
    </div>
  );
}
