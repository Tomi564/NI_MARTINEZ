"use client";

import Image from "next/image";
import { useState } from "react";

type MarcaLogoHeaderProps = {
  nombre: string;
  slug: string;
};

export default function MarcaLogoHeader({ nombre, slug }: MarcaLogoHeaderProps) {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div
        className="mb-4 flex items-center justify-center"
        style={{
          width: 140,
          height: 70,
          background: "rgba(255,255,255,0.1)",
          borderRadius: 8,
          padding: 12,
        }}
      >
        <span className="font-condensed text-[28px] font-black text-white">
          {nombre.charAt(0)}
        </span>
      </div>
    );
  }

  return (
    <div
      className="mb-4 flex items-center justify-center"
      style={{
        width: 140,
        height: 70,
        background: "rgba(255,255,255,0.1)",
        borderRadius: 8,
        padding: 12,
      }}
    >
      <Image
        src={`/images/marcas/${slug}.png`}
        alt={`Logo ${nombre}`}
        width={116}
        height={46}
        className="object-contain"
        style={{ filter: "brightness(0) invert(1)" }}
        onError={() => setImgError(true)}
      />
    </div>
  );
}
