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
      className={`flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[6px] bg-gray-bg p-2 ${className}`}
    >
      {!imgError ? (
        <Image
          src={src}
          alt={`Logo ${nombre}`}
          width={56}
          height={56}
          className="h-full w-full object-contain"
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
