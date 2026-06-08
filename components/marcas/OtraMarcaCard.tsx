"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type OtraMarcaCardProps = {
  slug: string;
  nombre: string;
  productos: number;
};

export default function OtraMarcaCard({ slug, nombre, productos }: OtraMarcaCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="flex flex-col rounded-[6px] border border-[var(--color-navy-border)] bg-[var(--color-navy-surface)] p-4">
      <div className="mb-3 flex h-[56px] w-full items-center justify-center rounded-[4px] bg-white p-2">
        {!imgError ? (
          <Image
            src={`/images/marcas/${slug}.png`}
            alt={nombre}
            width={80}
            height={36}
            className="h-full w-full object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="font-condensed text-[22px] font-black text-navy">
            {nombre.charAt(0)}
          </span>
        )}
      </div>

      <h3 className="font-condensed text-[16px] font-black uppercase text-white">{nombre}</h3>
      <p className="mt-1 text-[10px] text-[#5A7080]">
        {productos > 0 ? `${productos} productos` : "Ver catálogo"}
      </p>
      <Link
        href={`/marcas/${slug}`}
        className="mt-3 inline-flex items-center justify-center rounded-[4px] border border-orange bg-transparent px-3 py-2 text-[10px] font-bold uppercase tracking-[0.06em] text-orange transition-colors hover:bg-orange hover:text-white"
      >
        Ver marca →
      </Link>
    </article>
  );
}
