"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function CatalogoOfertasBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isOfertas = searchParams.get("badge")?.toLowerCase() === "oferta";

  const hrefVerTodo = useMemo(() => {
    const next = new URLSearchParams(searchParams.toString());
    next.delete("badge");
    const q = next.toString();
    return q ? `${pathname}?${q}` : pathname;
  }, [pathname, searchParams]);

  const hrefOfertas = useMemo(() => {
    const next = new URLSearchParams(searchParams.toString());
    next.set("badge", "oferta");
    return `${pathname}?${next.toString()}`;
  }, [pathname, searchParams]);

  if (isOfertas) {
    return (
      <Link
        href={hrefVerTodo}
        className="inline-flex h-[31px] shrink-0 items-center justify-center rounded-[4px] border border-navy bg-transparent px-4 text-[11px] font-bold uppercase tracking-[0.07em] text-navy transition-colors hover:bg-navy hover:text-white"
      >
        Ver todo el catálogo
      </Link>
    );
  }

  return (
    <Link
      href={hrefOfertas}
      className="inline-flex h-[31px] shrink-0 items-center justify-center rounded-[4px] bg-orange px-4 text-[11px] font-bold uppercase tracking-[0.07em] text-white transition-colors hover:bg-[var(--color-orange-hover)]"
    >
      Ver ofertas
    </Link>
  );
}
