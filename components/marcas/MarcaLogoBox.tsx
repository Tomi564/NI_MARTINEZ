"use client";

import Image from "next/image";
import { useState } from "react";

type MarcaLogoBoxProps = {
  src: string;
  nombre: string;
  className?: string;
};

export default function MarcaLogoBox({ src, nombre, className = "" }: MarcaLogoBoxProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`relative flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded-[6px] bg-gray-bg ${className}`}
    >
      {!imgError ? (
        <Image
          src={src}
          alt={`Logo ${nombre}`}
          fill
          sizes="72px"
          className="object-contain p-1"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="font-condensed text-[34px] font-black leading-none text-[var(--color-logo-muted)]">
          {nombre.charAt(0)}
        </span>
      )}
    </div>
  );
}
