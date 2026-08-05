"use client";

import type { Producto, ProductoMock } from "@/lib/types";
import { motion } from "framer-motion";
import Link from "next/link";
import TiltCard from "@/components/shared/TiltCard";

type ProductoCardLike = Producto | ProductoMock;

interface ProductCardProps {
  producto: ProductoCardLike;
  className?: string;
}

export default function ProductCard({ producto, className }: ProductCardProps) {
  const discountPercent =
    producto.precioOriginal && producto.precioOriginal > producto.precio
      ? Math.round(
          ((producto.precioOriginal - producto.precio) / producto.precioOriginal) * 100,
        )
      : null;

  const productoHref = `/producto/${encodeURIComponent(producto.id)}`;
  const whatsappHref = `https://wa.me/5493874623496?text=${encodeURIComponent(
    `Hola, me interesa el neumático ${producto.titulo}`,
  )}`;

  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: "0 12px 28px rgba(13,27,42,0.10)" }}
      transition={{ duration: 0.18 }}
      className={["flex h-full w-full flex-col", className ?? ""].filter(Boolean).join(" ")}
    >
      <TiltCard className="h-full w-full">
        <article className="relative flex h-full flex-col overflow-hidden rounded-[6px] border border-gray-border border-t-[3px] border-t-orange bg-white">
          <Link
            href={productoHref}
            aria-label={`Ver detalle: ${producto.marca} ${producto.titulo}`}
            className="relative flex min-h-0 flex-1 flex-col text-inherit no-underline outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange"
          >
            {producto.badge ? (
              <span className="pointer-events-none absolute left-2 top-[14px] z-10 rounded-[3px] bg-orange px-[7px] py-[3px] text-[9px] font-bold uppercase tracking-[0.07em] text-white">
                {producto.badge}
              </span>
            ) : null}

            {discountPercent ? (
              <span className="pointer-events-none absolute right-2 top-[14px] z-10 rounded-[3px] bg-navy px-[7px] py-[3px] text-[9px] font-bold uppercase tracking-[0.07em] text-white">
                -{discountPercent}%
              </span>
            ) : null}

            <div className="relative h-[140px] shrink-0 overflow-hidden bg-[#F0F4F7] md:h-[160px]">
              <motion.div
                className="flex h-full w-full items-center justify-center"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <WheelIcon />
              </motion.div>
            </div>

            <div className="flex flex-1 flex-col px-3 pt-2">
              <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.12em] text-orange">
                {producto.marca}
              </p>

              <p className="line-clamp-2 min-h-[2.85rem] text-[15px] font-bold leading-[1.25] text-text-primary md:min-h-[3.1rem] md:text-[16px]">
                {producto.titulo}
              </p>

              <p className="mt-1 text-[10px] font-medium text-text-secondary">{producto.medida}</p>

              <p className="mb-2 mt-auto text-[11px] italic text-[var(--color-text-secondary)]">
                Precio disponible por WhatsApp
              </p>
            </div>
          </Link>

          <div className="px-3 pb-3 pt-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-auto flex w-full items-center justify-center gap-2 rounded-[3px] bg-[var(--color-navy)] px-3 py-[10px] text-[10px] font-bold uppercase tracking-[0.06em] text-white transition-colors duration-150 hover:bg-[var(--color-orange)]"
            >
              <svg viewBox="0 0 24 24" width="12" height="12" fill="white" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.855L.057 23.522a.75.75 0 00.921.921l5.667-1.475A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.371l-.36-.214-3.724.969.991-3.62-.235-.374A9.818 9.818 0 1112 21.818z" />
              </svg>
              Consultar
            </a>
          </div>
        </article>
      </TiltCard>
    </motion.div>
  );
}

function WheelIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="16" stroke="rgba(13,27,42,0.18)" strokeWidth="3.5" />
      <circle cx="24" cy="24" r="6" fill="rgba(13,27,42,0.10)" />
      <path
        d="M24 8V16M40 24H32M24 40V32M8 24H16"
        stroke="rgba(13,27,42,0.13)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
