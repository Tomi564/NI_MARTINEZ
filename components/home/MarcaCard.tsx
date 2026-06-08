"use client";

import Image from "next/image";
import { useState } from "react";

type Marca = {
  id: string;
  nombre: string;
  categorias: string[];
  productos: number;
};

type MarcaCardProps = {
  marca: Marca;
  className?: string;
};

export default function MarcaCard({ marca, className = "" }: MarcaCardProps) {
  const [imgError, setImgError] = useState(false);
  const showChip =
    marca.categorias.includes("Camión") || marca.categorias.includes("Agrícola");
  const chipLabel = marca.categorias.includes("Agrícola") ? "🌾 Agrícola" : "🚛 Camión";

  return (
    <article
      className={`flex h-full min-h-[120px] cursor-pointer flex-col items-center justify-between rounded-[6px] border border-gray-border bg-white p-4 transition-all duration-150 hover:border-orange hover:shadow-sm ${className}`}
    >
      <div className="flex h-[56px] w-[100px] items-center justify-center rounded-[4px] bg-gray-bg p-2">
        {!imgError ? (
          <Image
            src={`/images/marcas/${marca.id}.png`}
            alt={marca.nombre}
            width={96}
            height={48}
            className="h-full w-full object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-[15px] font-black text-[var(--color-logo-muted)]">
            {marca.nombre.charAt(0)}
          </span>
        )}
      </div>

      <h3 className="mt-2 text-center text-[11px] font-bold uppercase tracking-[0.08em] text-text-primary">
        {marca.nombre}
      </h3>

      <p className="text-[9px] text-text-secondary">{marca.productos} productos</p>

      <div className="mt-1 flex h-[20px] items-center justify-center">
        {showChip && (
          <span
            style={{
              background: "rgba(232,78,15,0.1)",
              color: "#E84E0F",
              fontSize: 9,
              fontWeight: 700,
              textTransform: "uppercase",
              padding: "2px 6px",
              borderRadius: 2,
            }}
          >
            {chipLabel}
          </span>
        )}
      </div>
    </article>
  );
}
