"use client";

import Image from "next/image";
import { useState } from "react";

type MarcaLogoHeaderProps = {
  nombre: string;
  slug: string;
};

const BOX_CLASS =
  "relative mb-4 h-[88px] w-[176px] overflow-hidden rounded-lg bg-white md:h-[96px] md:w-[192px]";

export default function MarcaLogoHeader({ nombre, slug }: MarcaLogoHeaderProps) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div className={`${BOX_CLASS} flex items-center justify-center`}>
        <span className="font-condensed text-[28px] font-black text-[var(--color-navy)]">
          {nombre.charAt(0)}
        </span>
      </div>
    );
  }

  return (
    <div className={BOX_CLASS}>
      <Image
        src={`/images/marcas/${slug}.png`}
        alt={`Logo ${nombre}`}
        fill
        sizes="(max-width: 768px) 176px, 192px"
        className="object-contain p-1"
        onError={() => setImgError(true)}
      />
    </div>
  );
}
