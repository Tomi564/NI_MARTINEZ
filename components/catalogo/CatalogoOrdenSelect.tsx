"use client";

import type { ChangeEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SELECT_CLASS =
  "rounded-[4px] border border-gray-border bg-white px-3 py-[6px] text-[11px] font-semibold text-text-primary focus:border-orange focus:outline-none";

function ordenFromQuery(raw: string | null): "relevancia" | "precio_asc" | "precio_desc" {
  if (raw === "precio_asc" || raw === "precio_desc") return raw;
  return "relevancia";
}

export default function CatalogoOrdenSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const value = ordenFromQuery(searchParams.get("orden"));

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextOrden = e.target.value as "relevancia" | "precio_asc" | "precio_desc";
    const next = new URLSearchParams(searchParams.toString());
    if (nextOrden === "relevancia") next.delete("orden");
    else next.set("orden", nextOrden);
    const q = next.toString();
    router.push(q ? `${pathname}?${q}` : pathname);
  };

  return (
    <select
      id="catalogo-orden"
      value={value}
      onChange={onChange}
      className={SELECT_CLASS}
      aria-label="Ordenar productos"
    >
      <option value="relevancia">Más relevantes</option>
      <option value="precio_asc">Menor precio</option>
      <option value="precio_desc">Mayor precio</option>
    </select>
  );
}

export function CatalogoOrdenSelectFallback() {
  return (
    <select disabled className={`${SELECT_CLASS} opacity-70`} aria-hidden>
      <option>Más relevantes</option>
    </select>
  );
}
