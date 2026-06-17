"use client";

import type { Producto, ProductoMock } from "@/lib/types";
import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedPrice from "@/components/shared/AnimatedPrice";
import TiltCard from "@/components/shared/TiltCard";

type ProductoCardLike = Producto | ProductoMock;

interface ProductCardProps {
  producto: ProductoCardLike;
  className?: string;
}

function formatPriceARS(value: number) {
  return value.toLocaleString("es-AR");
}

export default function ProductCard({ producto, className }: ProductCardProps) {
  const discountPercent =
    producto.precioOriginal && producto.precioOriginal > producto.precio
      ? Math.round(
          ((producto.precioOriginal - producto.precio) / producto.precioOriginal) * 100,
        )
      : null;

  const cuotaValue =
    typeof producto.cuotas === "number" && producto.cuotas > 0
      ? Math.ceil(producto.precio / producto.cuotas)
      : null;

  const productoHref = `/producto/${encodeURIComponent(producto.id)}`;

  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: "0 12px 28px rgba(13,27,42,0.10)" }}
      transition={{ duration: 0.18 }}
      className={["flex h-full w-full flex-col", className ?? ""].filter(Boolean).join(" ")}
    >
      <TiltCard className="h-full w-full">
        <article className="relative flex h-full flex-col overflow-hidden rounded-[6px] border border-gray-border bg-white border-t-[3px] border-t-orange">
          <Link
            href={productoHref}
            aria-label={`Ver detalle: ${producto.marca} ${producto.titulo}`}
            className="relative flex h-full min-h-0 flex-1 flex-col text-inherit no-underline outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange"
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

            <div className="flex flex-1 flex-col px-3 pb-3 pt-2">
              <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.12em] text-orange">
                {producto.marca}
              </p>

              <p className="line-clamp-2 min-h-[2.85rem] text-[15px] font-bold leading-[1.25] text-text-primary md:min-h-[3.1rem] md:text-[16px]">
                {producto.titulo}
              </p>

              <p className="mt-1 text-[10px] font-medium text-text-secondary">{producto.medida}</p>

              <div className="mt-auto pt-3">
                {producto.precioOriginal ? (
                  <p className="text-[11px] text-text-secondary line-through">
                    ${formatPriceARS(producto.precioOriginal)}
                  </p>
                ) : null}

                <AnimatedPrice
                  price={producto.precio}
                  className="font-condensed text-[20px] font-black leading-none text-text-primary md:text-[22px]"
                />

                <div className="flex min-h-[1.5rem] items-end">
                  {producto.cuotas && cuotaValue ? (
                    <p className="mb-2 text-[10px] font-semibold leading-tight text-[#1A6E32]">
                      <span className="block">{producto.cuotas} cuotas de</span>
                      <span className="block font-bold">
                        ${cuotaValue.toLocaleString("es-AR")}
                      </span>
                    </p>
                  ) : null}
                </div>

                <motion.span
                  className="mt-2 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-navy px-2 py-[10px] text-[10px] font-bold uppercase tracking-[0.07em] text-white md:py-[7px]"
                  initial="rest"
                  whileHover="hover"
                  variants={{
                    rest: { backgroundColor: "var(--color-navy)" },
                    hover: { backgroundColor: "var(--color-orange)" },
                  }}
                  transition={{ duration: 0.15 }}
                >
                  <CartIcon />
                  Comprar
                  <motion.span
                    className="ml-1 inline-block"
                    variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                    transition={{ duration: 0.15 }}
                  >
                    →
                  </motion.span>
                </motion.span>
              </div>
            </div>
          </Link>
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

function CartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6h15l-1.5 9H7.5L6 6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M6 6 5 3H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="9" cy="20" r="1.6" fill="currentColor" />
      <circle cx="18" cy="20" r="1.6" fill="currentColor" />
    </svg>
  );
}
